import React, { useState, useEffect } from 'react';
import { getFetchedContent, updateFetchedContentStatus, triggerProcessAction, triggerPublishAction, FetchedContent, getCategories, Category, getAppSettings } from '../services/api';

const AdminFetchedContent: React.FC = () => {
    const [items, setItems] = useState<FetchedContent[]>([]);
    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState(false);
    const [publishing, setPublishing] = useState<string | null>(null);

    // Settings for defaults
    const [categories, setCategories] = useState<Category[]>([]);
    const [authorId, setAuthorId] = useState<string>('');
    const [defaultCatId, setDefaultCatId] = useState<string>('');

    // Pagination
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [statusFilter, setStatusFilter] = useState<string>('');

    useEffect(() => {
        loadData();
        loadSettings();
    }, [page, statusFilter]);

    const loadData = async () => {
        setLoading(true);
        try {
            const response = await getFetchedContent({ page, limit: 20, status: statusFilter });
            if (response.success && response.data) {
                setItems(response.data.items);
                setTotalPages(response.data.pagination.totalPages);
            }
        } catch (error) {
            console.error('Failed to load content', error);
        } finally {
            setLoading(false);
        }
    };

    const loadSettings = async () => {
        try {
            const [catsRes, settingsRes, profileRes] = await Promise.all([
                getCategories(),
                getAppSettings(),
                fetch('https://api.digitalhedge.ai/api/auth/me', {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` }
                }).then(r => r.json())
            ]);

            if (catsRes.success && catsRes.data) {
                setCategories(catsRes.data);
            }

            if (settingsRes.success && settingsRes.data) {
                setDefaultCatId(settingsRes.data.defaultCategoryId || '');
                // Ideally get default author from settings or current user
                if (settingsRes.data.defaultAuthorId) {
                    setAuthorId(settingsRes.data.defaultAuthorId);
                } else if (profileRes.success) {
                    setAuthorId(profileRes.data.id);
                }
            }
        } catch (e) {
            console.error(e);
        }
    };

    const handleProcess = async () => {
        setProcessing(true);
        try {
            const response = await triggerProcessAction(5);
            if (response.success) {
                alert(response.message);
                loadData();
            } else {
                alert('處理失敗: ' + response.message);
            }
        } catch (error) {
            alert('處理發生錯誤');
        } finally {
            setProcessing(false);
        }
    };

    const handlePublish = async (item: FetchedContent) => {
        if (!defaultCatId) {
            alert('請先到設定頁面設定預設分類，或選擇一個分類');
            return;
        }

        setPublishing(item.id);
        try {
            const response = await triggerPublishAction(item.id, authorId, defaultCatId);
            if (response.success) {
                alert('發布成功！');
                loadData();
            } else {
                alert('發布失敗: ' + response.message);
            }
        } catch (error) {
            alert('發布發生錯誤');
        } finally {
            setPublishing(null);
        }
    };

    const handleStatusChange = async (id: string, newStatus: string) => {
        await updateFetchedContentStatus(id, newStatus);
        loadData();
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-[#2C2420]">AI 內容聚合審核</h1>
                <div className="space-x-4">
                    <select
                        value={statusFilter}
                        onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
                        className="border p-2 rounded-lg bg-white"
                    >
                        <option value="">所有狀態</option>
                        <option value="PENDING">待處理</option>
                        <option value="PROCESSING">處理中</option>
                        <option value="APPROVED">已審核 (待發布)</option>
                        <option value="PUBLISHED">已發布</option>
                        <option value="REJECTED">已拒絕</option>
                    </select>
                    <button
                        onClick={handleProcess}
                        disabled={processing}
                        className="px-4 py-2 bg-[#FAF9F6] border border-[#D4A373] text-[#D4A373] rounded-lg hover:bg-[#D4A373] hover:text-white transition-all disabled:opacity-50"
                    >
                        {processing ? 'AI 寫作中...' : 'AI 批次處理 (5篇)'}
                    </button>
                </div>
            </div>

            <div className="space-y-6">
                {items.map((item) => (
                    <div key={item.id} className="bg-white rounded-xl shadow-sm overflow-hidden border border-[#E0E0E0]">
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <div className="flex items-center space-x-2 mb-2">
                                        <span className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-600">{item.source.name}</span>
                                        <span className={`px-2 py-1 rounded text-xs font-bold ${item.status === 'PUBLISHED' ? 'bg-green-100 text-green-700' :
                                                item.status === 'APPROVED' ? 'bg-blue-100 text-blue-700' :
                                                    item.status === 'PROCESSING' ? 'bg-yellow-100 text-yellow-700' :
                                                        'bg-gray-100 text-gray-700'
                                            }`}>
                                            {item.status}
                                        </span>
                                        <span className="text-xs text-gray-400">
                                            {new Date(item.fetchedAt).toLocaleString()}
                                        </span>
                                    </div>
                                    <a href={item.originalUrl} target="_blank" rel="noreferrer" className="text-lg font-bold hover:text-[#D4A373] transition-colors">
                                        {item.originalTitle}
                                    </a>
                                </div>
                                <div className="flex space-x-2">
                                    {item.status === 'APPROVED' && (
                                        <button
                                            onClick={() => handlePublish(item)}
                                            disabled={!!publishing}
                                            className="px-3 py-1 bg-[#D4A373] text-white rounded hover:bg-[#b08860] text-sm"
                                        >
                                            {publishing === item.id ? '發布中...' : '發布至部落格'}
                                        </button>
                                    )}
                                    {item.status !== 'PUBLISHED' && (
                                        <>
                                            {(item.status === 'PENDING' || item.status === 'REJECTED') && (
                                                <button
                                                    onClick={() => handleStatusChange(item.id, 'APPROVED')}
                                                    className="px-3 py-1 border border-blue-500 text-blue-500 rounded hover:bg-blue-50 text-sm"
                                                >
                                                    通過
                                                </button>
                                            )}
                                            {item.status !== 'REJECTED' && (
                                                <button
                                                    onClick={() => handleStatusChange(item.id, 'REJECTED')}
                                                    className="px-3 py-1 border border-red-500 text-red-500 rounded hover:bg-red-50 text-sm"
                                                >
                                                    拒絕
                                                </button>
                                            )}
                                        </>
                                    )}
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="bg-[#FAF9F6] p-4 rounded-lg">
                                    <h4 className="text-xs font-bold text-gray-500 mb-2 uppercase">原文摘要</h4>
                                    <p className="text-sm text-gray-600 line-clamp-4">{item.originalExcerpt || item.originalContent.substring(0, 200)}...</p>
                                </div>

                                {item.generatedContent ? (
                                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                                        <h4 className="text-xs font-bold text-blue-500 mb-2 uppercase">AI 生成內容</h4>
                                        <h5 className="font-bold mb-2">{item.generatedTitle}</h5>
                                        <p className="text-sm text-gray-600 line-clamp-4">{item.generatedExcerpt}</p>
                                    </div>
                                ) : (
                                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 flex items-center justify-center text-gray-400 text-sm">
                                        尚未經 AI 處理
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}

                {items.length === 0 && !loading && (
                    <div className="text-center py-12 text-gray-500">
                        暫無內容，請先抓取來源
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminFetchedContent;
