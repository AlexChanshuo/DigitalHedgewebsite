import React, { useState, useEffect } from 'react';
import {
    getTags,
    createTag,
    updateTag,
    deleteTag,
    Tag
} from '../services/api';

const AdminTags: React.FC = () => {
    const [tags, setTags] = useState<Tag[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTag, setEditingTag] = useState<Tag | null>(null);
    const [modalForm, setModalForm] = useState({ name: '', slug: '', color: '#D4A373' });
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        loadTags();
    }, []);

    async function loadTags() {
        setIsLoading(true);
        const result = await getTags();
        if (result.success && result.data) {
            setTags(result.data);
        } else {
            setError(result.error || '載入標籤失敗');
        }
        setIsLoading(false);
    }

    function handleAddNew() {
        setEditingTag(null);
        setModalForm({ name: '', slug: '', color: '#D4A373' });
        setIsModalOpen(true);
    }

    function handleEdit(tag: Tag) {
        setEditingTag(tag);
        setModalForm({
            name: tag.name,
            slug: tag.slug,
            color: tag.color || '#D4A373',
        });
        setIsModalOpen(true);
    }

    async function handleDelete(id: string) {
        const tag = tags.find(t => t.id === id);
        if (!tag) return;

        // Should not happen due to disabled button, but double-check
        if (tag._count?.posts > 0) {
            alert(`此標籤有 ${tag._count.posts} 篇文章使用，無法刪除`);
            return;
        }

        if (!window.confirm('確定要刪除此標籤嗎？')) return;

        const result = await deleteTag(id);
        if (result.success) {
            loadTags();
        } else {
            alert(result.error || '刪除失敗');
        }
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setIsSaving(true);

        try {
            if (editingTag) {
                // Update
                const result = await updateTag(editingTag.id, modalForm);
                if (result.success) {
                    setIsModalOpen(false);
                    loadTags();
                } else {
                    alert(result.error || '更新失敗');
                }
            } else {
                // Create
                const result = await createTag(modalForm);
                if (result.success) {
                    setIsModalOpen(false);
                    loadTags();
                } else {
                    alert(result.error || '新增失敗');
                }
            }
        } catch (err) {
            console.error(err);
            alert('發生錯誤');
        }
        setIsSaving(false);
    }

    function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
        const name = e.target.value;
        if (!editingTag) {
            const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
            setModalForm(prev => ({ ...prev, name, slug: slug || prev.slug }));
        } else {
            setModalForm(prev => ({ ...prev, name }));
        }
    }

    const presetColors = [
        '#D4A373', // Project Primary
        '#B08968', // Darker brown
        '#8B7355',
        '#6B5344',
        '#4A3728',
        '#2C2420', // Blackish
        '#E8DDD4', // Light Beige
        '#C4B5A6',
        '#A09080',
        '#7C6F60',
        '#3B82F6', // Blue
        '#10B981', // Green
        '#EF4444', // Red
    ];

    if (isLoading) return <div className="text-center py-12 text-gray-500">載入中...</div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-[#2C2420] font-serif">標籤管理</h2>
                <button
                    onClick={handleAddNew}
                    className="px-4 py-2 bg-[#D4A373] text-white rounded-lg hover:bg-[#B08968] transition-colors flex items-center space-x-2"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                    <span>新增標籤</span>
                </button>
            </div>

            {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-lg border border-red-100">
                    {error}
                </div>
            )}

            {/* Grid for Tags */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {tags.map((tag) => (
                    <div key={tag.id} className="bg-white border border-[#E0E0E0] rounded-xl p-4 flex justify-between items-center shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center space-x-3">
                            <div
                                className="w-4 h-4 rounded-full border border-gray-200"
                                style={{ backgroundColor: tag.color || '#D4A373' }}
                            />
                            <div>
                                <p className="font-medium text-[#2C2420]">{tag.name}</p>
                                <p className="text-xs text-gray-400 font-mono">{tag.slug}</p>
                                {tag._count?.posts > 0 && (
                                    <span className="text-xs text-gray-400 ml-2">
                                        ({tag._count.posts} 篇文章)
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="flex space-x-2">
                            <button
                                onClick={() => handleEdit(tag)}
                                className="p-1 text-gray-400 hover:text-blue-600 rounded-md hover:bg-blue-50 transition-colors"
                                title="編輯"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                </svg>
                            </button>
                            <button
                                onClick={() => handleDelete(tag.id)}
                                disabled={tag._count?.posts > 0}
                                className={`p-1 rounded-md transition-colors ${
                                    tag._count?.posts > 0
                                        ? 'text-gray-300 cursor-not-allowed'
                                        : 'text-gray-400 hover:text-red-600 hover:bg-red-50'
                                }`}
                                title={tag._count?.posts > 0 ? `有 ${tag._count.posts} 篇文章使用此標籤` : '刪除'}
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </button>
                        </div>
                    </div>
                ))}
                {tags.length === 0 && (
                    <div className="col-span-full py-12 text-center text-gray-400 border-2 border-dashed border-[#E0E0E0] rounded-xl">
                        尚無標籤，請點擊新增
                    </div>
                )}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
                        <div className="p-6 border-b border-[#E0E0E0]">
                            <h3 className="text-xl font-bold text-[#2C2420]">
                                {editingTag ? '編輯標籤' : '新增標籤'}
                            </h3>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-[#2C2420] mb-1">
                                    標籤名稱 <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={modalForm.name}
                                    onChange={handleNameChange}
                                    className="w-full px-4 py-2 rounded-lg border border-[#E0E0E0] focus:ring-2 focus:ring-[#D4A373] focus:border-transparent outline-none transition-shadow"
                                    placeholder="例如：技術"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[#2C2420] mb-1">
                                    代稱 (Slug) <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={modalForm.slug}
                                    onChange={(e) => setModalForm({ ...modalForm, slug: e.target.value })}
                                    className="w-full px-4 py-2 rounded-lg border border-[#E0E0E0] focus:ring-2 focus:ring-[#D4A373] focus:border-transparent outline-none transition-shadow font-mono text-sm"
                                    placeholder="例如：tech"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[#2C2420] mb-2">
                                    標籤顏色
                                </label>
                                <div className="flex flex-wrap gap-2 mb-3">
                                    {presetColors.map(color => (
                                        <button
                                            key={color}
                                            type="button"
                                            onClick={() => setModalForm(prev => ({ ...prev, color }))}
                                            className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${modalForm.color === color ? 'border-gray-500' : 'border-transparent'}`}
                                            style={{ backgroundColor: color }}
                                        />
                                    ))}
                                </div>
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="color"
                                        value={modalForm.color}
                                        onChange={(e) => setModalForm(prev => ({ ...prev, color: e.target.value }))}
                                        className="w-10 h-10 p-1 rounded border border-[#E0E0E0]"
                                    />
                                    <input
                                        type="text"
                                        value={modalForm.color}
                                        onChange={(e) => setModalForm(prev => ({ ...prev, color: e.target.value }))}
                                        className="px-3 py-2 rounded border border-[#E0E0E0] font-mono text-sm w-32"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end space-x-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    取消
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSaving}
                                    className="px-6 py-2 bg-[#D4A373] text-white rounded-lg hover:bg-[#B08968] disabled:opacity-50 transition-colors font-medium"
                                >
                                    {isSaving ? '儲存中...' : '儲存'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminTags;
