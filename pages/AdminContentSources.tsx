import React, { useState, useEffect } from 'react';
import { getContentSources, createContentSource, updateContentSource, deleteContentSource, triggerFetchAction, ContentSource } from '../services/api';

const AdminContentSources: React.FC = () => {
    const [sources, setSources] = useState<ContentSource[]>([]);
    const [loading, setLoading] = useState(true);
    const [fetching, setFetching] = useState(false);

    // Form state
    const [isEditing, setIsEditing] = useState(false);
    const [currentId, setCurrentId] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        url: '',
        type: 'RSS',
        fetchInterval: 60,
    });

    useEffect(() => {
        loadSources();
    }, []);

    const loadSources = async () => {
        setLoading(true);
        try {
            const response = await getContentSources();
            if (response.success && response.data) {
                setSources(response.data);
            }
        } catch (error) {
            console.error('Failed to load sources', error);
        } finally {
            setLoading(false);
        }
    };

    const handleFetchAll = async () => {
        setFetching(true);
        try {
            const response = await triggerFetchAction();
            if (response.success) {
                alert(response.message);
                loadSources();
            } else {
                alert('抓取失敗: ' + response.message);
            }
        } catch (error) {
            alert('抓取發生錯誤');
        } finally {
            setFetching(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (currentId) {
                await updateContentSource(currentId, formData as any);
            } else {
                await createContentSource(formData as any);
            }
            setIsEditing(false);
            setCurrentId(null);
            setFormData({ name: '', url: '', type: 'RSS', fetchInterval: 60 });
            loadSources();
        } catch (error) {
            console.error('Error saving source', error);
        }
    };

    const handleEdit = (source: ContentSource) => {
        setIsEditing(true);
        setCurrentId(source.id);
        setFormData({
            name: source.name,
            url: source.url,
            type: source.type,
            fetchInterval: source.fetchInterval,
        });
    };

    const handleDelete = async (id: string) => {
        if (confirm('確定要刪除此來源嗎？')) {
            await deleteContentSource(id);
            loadSources();
        }
    };

    const handleToggleActive = async (source: ContentSource) => {
        await updateContentSource(source.id, { isActive: !source.isActive });
        loadSources();
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-[#2C2420]">內容來源管理</h1>
                <div className="space-x-4">
                    <button
                        onClick={handleFetchAll}
                        disabled={fetching}
                        className="px-4 py-2 bg-[#FAF9F6] border border-[#D4A373] text-[#D4A373] rounded-lg hover:bg-[#D4A373] hover:text-white transition-all disabled:opacity-50"
                    >
                        {fetching ? '抓取中...' : '立即抓取所有來源'}
                    </button>
                    <button
                        onClick={() => { setIsEditing(true); setCurrentId(null); setFormData({ name: '', url: '', type: 'RSS', fetchInterval: 60 }); }}
                        className="px-4 py-2 bg-[#2C2420] text-white rounded-lg hover:bg-[#D4A373] transition-all"
                    >
                        新增來源
                    </button>
                </div>
            </div>

            {isEditing && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-xl p-8 max-w-md w-full">
                        <h3 className="text-xl font-bold mb-6">{currentId ? '編輯來源' : '新增來源'}</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold mb-2">名稱</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full border p-2 rounded"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-2">RSS URL</label>
                                <input
                                    type="url"
                                    value={formData.url}
                                    onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                                    className="w-full border p-2 rounded"
                                    required
                                />
                            </div>
                            <div className="flex justify-end space-x-2 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setIsEditing(false)}
                                    className="px-4 py-2 text-gray-500 hover:text-gray-700"
                                >
                                    取消
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-[#2C2420] text-white rounded hover:bg-[#D4A373]"
                                >
                                    儲存
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <table className="w-full">
                    <thead className="bg-[#FAF9F6] border-b border-[#E0E0E0]">
                        <tr>
                            <th className="px-6 py-4 text-left text-sm font-bold text-[#2C2420]">名稱</th>
                            <th className="px-6 py-4 text-left text-sm font-bold text-[#2C2420]">類別</th>
                            <th className="px-6 py-4 text-left text-sm font-bold text-[#2C2420]">URL</th>
                            <th className="px-6 py-4 text-left text-sm font-bold text-[#2C2420]">狀態</th>
                            <th className="px-6 py-4 text-left text-sm font-bold text-[#2C2420]">上次抓取</th>
                            <th className="px-6 py-4 text-left text-sm font-bold text-[#2C2420]">操作</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E0E0E0]">
                        {sources.map((source) => (
                            <tr key={source.id} className="hover:bg-[#FAF9F6]/50">
                                <td className="px-6 py-4">{source.name}</td>
                                <td className="px-6 py-4"><span className="px-2 py-1 bg-gray-100 rounded text-xs">{source.type}</span></td>
                                <td className="px-6 py-4 text-sm text-gray-500 truncate max-w-xs">{source.url}</td>
                                <td className="px-6 py-4">
                                    <button
                                        onClick={() => handleToggleActive(source)}
                                        className={`px-3 py-1 rounded-full text-xs font-bold ${source.isActive
                                                ? 'bg-green-100 text-green-700'
                                                : 'bg-gray-100 text-gray-600'
                                            }`}
                                    >
                                        {source.isActive ? '啟用中' : '已停用'}
                                    </button>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500">
                                    {source.lastFetched ? new Date(source.lastFetched).toLocaleString() : '-'}
                                </td>
                                <td className="px-6 py-4 flex space-x-2">
                                    <button
                                        onClick={() => handleEdit(source)}
                                        className="text-blue-500 hover:text-blue-700"
                                    >
                                        編輯
                                    </button>
                                    <button
                                        onClick={() => handleDelete(source.id)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        刪除
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {sources.length === 0 && !loading && (
                            <tr>
                                <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                                    尚無資料來源
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminContentSources;
