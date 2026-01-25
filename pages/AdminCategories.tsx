import React, { useState, useEffect } from 'react';
import {
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory,
    Category
} from '../services/api';

const AdminCategories: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);
    const [modalForm, setModalForm] = useState({ name: '', slug: '', description: '' });
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        loadCategories();
    }, []);

    async function loadCategories() {
        setIsLoading(true);
        const result = await getCategories();
        if (result.success && result.data) {
            setCategories(result.data);
        } else {
            setError(result.error || '載入分類失敗');
        }
        setIsLoading(false);
    }

    function handleAddNew() {
        setEditingCategory(null);
        setModalForm({ name: '', slug: '', description: '' });
        setIsModalOpen(true);
    }

    function handleEdit(category: Category) {
        setEditingCategory(category);
        setModalForm({
            name: category.name,
            slug: category.slug,
            description: category.description || '',
        });
        setIsModalOpen(true);
    }

    async function handleDelete(id: string) {
        const category = categories.find(c => c.id === id);
        if (!category) return;

        // Should not happen due to disabled button, but double-check
        if (category._count?.posts > 0) {
            alert(`此分類有 ${category._count.posts} 篇文章使用，無法刪除`);
            return;
        }

        if (!window.confirm('確定要刪除此分類嗎？')) return;

        const result = await deleteCategory(id);
        if (result.success) {
            loadCategories();
        } else {
            alert(result.error || '刪除失敗');
        }
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setIsSaving(true);

        try {
            if (editingCategory) {
                // Update
                const result = await updateCategory(editingCategory.id, modalForm);
                if (result.success) {
                    setIsModalOpen(false);
                    loadCategories();
                } else {
                    alert(result.error || '更新失敗');
                }
            } else {
                // Create
                const result = await createCategory(modalForm);
                if (result.success) {
                    setIsModalOpen(false);
                    loadCategories();
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

    // Auto-generate slug from name if creating
    function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
        const name = e.target.value;
        if (!editingCategory) {
            // Simple slugify
            const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
            setModalForm(prev => ({ ...prev, name, slug: slug || prev.slug }));
        } else {
            setModalForm(prev => ({ ...prev, name }));
        }
    }

    if (isLoading) return <div className="text-center py-12 text-gray-500">載入中...</div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-[#2C2420] font-serif">分類管理</h2>
                <button
                    onClick={handleAddNew}
                    className="px-4 py-2 bg-[#D4A373] text-white rounded-lg hover:bg-[#B08968] transition-colors flex items-center space-x-2"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                    <span>新增分類</span>
                </button>
            </div>

            {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-lg border border-red-100">
                    {error}
                </div>
            )}

            {/* Table */}
            <div className="bg-white rounded-xl border border-[#E0E0E0] overflow-hidden shadow-sm">
                <table className="w-full text-left">
                    <thead className="bg-[#FAF9F6] border-b border-[#E0E0E0]">
                        <tr>
                            <th className="px-6 py-4 font-medium text-[#2C2420]">名稱</th>
                            <th className="px-6 py-4 font-medium text-[#2C2420]">代稱 (Slug)</th>
                            <th className="px-6 py-4 font-medium text-[#2C2420]">描述</th>
                            <th className="px-6 py-4 font-medium text-[#2C2420]">文章數</th>
                            <th className="px-6 py-4 font-medium text-[#2C2420] text-right">操作</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E0E0E0]">
                        {categories.map((category) => (
                            <tr key={category.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 font-medium text-[#2C2420]">{category.name}</td>
                                <td className="px-6 py-4 text-gray-500 font-mono text-sm">{category.slug}</td>
                                <td className="px-6 py-4 text-gray-500">{category.description || '-'}</td>
                                <td className="px-6 py-4 text-gray-500">{category._count?.posts || 0}</td>
                                <td className="px-6 py-4 text-right space-x-3">
                                    <button
                                        onClick={() => handleEdit(category)}
                                        className="text-blue-600 hover:text-blue-800 font-medium"
                                    >
                                        編輯
                                    </button>
                                    <button
                                        onClick={() => handleDelete(category.id)}
                                        disabled={category._count?.posts > 0}
                                        className={`font-medium ${
                                            category._count?.posts > 0
                                                ? 'text-gray-400 cursor-not-allowed'
                                                : 'text-red-600 hover:text-red-800'
                                        }`}
                                        title={category._count?.posts > 0 ? `有 ${category._count.posts} 篇文章使用此分類` : '刪除'}
                                    >
                                        刪除
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {categories.length === 0 && (
                            <tr>
                                <td colSpan={5} className="px-6 py-12 text-center text-gray-400">
                                    尚無分類
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
                        <div className="p-6 border-b border-[#E0E0E0]">
                            <h3 className="text-xl font-bold text-[#2C2420]">
                                {editingCategory ? '編輯分類' : '新增分類'}
                            </h3>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-[#2C2420] mb-1">
                                    分類名稱 <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={modalForm.name}
                                    onChange={handleNameChange}
                                    className="w-full px-4 py-2 rounded-lg border border-[#E0E0E0] focus:ring-2 focus:ring-[#D4A373] focus:border-transparent outline-none transition-shadow"
                                    placeholder="例如：人工智慧"
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
                                    placeholder="例如：artificial-intelligence"
                                />
                                <p className="text-xs text-gray-500 mt-1">用於網址，只能包含小寫英文、數字與連字號</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[#2C2420] mb-1">
                                    描述
                                </label>
                                <textarea
                                    value={modalForm.description}
                                    onChange={(e) => setModalForm({ ...modalForm, description: e.target.value })}
                                    className="w-full px-4 py-2 rounded-lg border border-[#E0E0E0] focus:ring-2 focus:ring-[#D4A373] focus:border-transparent outline-none transition-shadow h-24 resize-none"
                                    placeholder="簡短描述此分類..."
                                />
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

export default AdminCategories;
