import React, { useState, useEffect } from 'react';
import {
    getUsers,
    createUser,
    deleteUser,
    updateUserRole,
    updateUserStatus,
    User
} from '../services/api';
import { useAuth } from '../contexts/AuthContext';

const AdminUsers: React.FC = () => {
    const { user: currentUser } = useAuth();

    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Filter state
    const [roleFilter, setRoleFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    // Modal State for Invite (Create)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalForm, setModalForm] = useState({ email: '', name: '', role: 'EDITOR', password: '' });
    const [isSaving, setIsSaving] = useState(false);
    const [createdUser, setCreatedUser] = useState<{ email: string; password: string } | null>(null);

    useEffect(() => {
        if (currentUser?.role === 'MASTER') {
            loadUsers();
        } else {
            setIsLoading(false);
        }
    }, [currentUser?.role, roleFilter, statusFilter, searchQuery]);

    async function loadUsers() {
        setIsLoading(true);
        const result = await getUsers({
            role: roleFilter || undefined,
            status: statusFilter || undefined,
            search: searchQuery || undefined,
        });
        if (result.success && result.data) {
            setUsers(result.data);
        } else {
            setError(result.error || '載入使用者列表失敗');
        }
        setIsLoading(false);
    }

    function handleAddNew() {
        setModalForm({ email: '', name: '', role: 'EDITOR', password: '' });
        setCreatedUser(null);
        setIsModalOpen(true);
    }

    function closeModal() {
        setIsModalOpen(false);
        setCreatedUser(null);
        setModalForm({ email: '', name: '', role: 'EDITOR', password: '' });
    }

    async function handleDelete(id: string) {
        if (!window.confirm('確定要刪除此使用者嗎？此操作無法復原。')) return;

        const result = await deleteUser(id);
        if (result.success) {
            loadUsers();
        } else {
            alert(result.error || '刪除失敗');
        }
    }

    async function handleRoleChange(id: string, newRole: string) {
        if (!window.confirm(`確定要將此使用者的權限變更為 ${newRole} 嗎？`)) return;
        const result = await updateUserRole(id, newRole);
        if (result.success) loadUsers();
        else alert(result.error || '權限變更失敗');
    }

    async function handleStatusChange(id: string, newStatus: string) {
        const result = await updateUserStatus(id, newStatus);
        if (result.success) loadUsers();
        else alert(result.error || '狀態變更失敗');
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setIsSaving(true);
        try {
            const result = await createUser(modalForm);
            if (result.success) {
                setCreatedUser({ email: modalForm.email, password: modalForm.password });
                loadUsers();
                // Don't close modal - show success state
            } else {
                alert(result.error || '建立失敗');
            }
        } catch (err) {
            alert('發生錯誤');
        }
        setIsSaving(false);
    }

    const roleLabels: Record<string, string> = {
        'MASTER': '最高管理員',
        'ADMIN': '管理員',
        'EDITOR': '編輯',
        'USER': '一般會員',
    };

    const statusLabels: Record<string, string> = {
        'ACTIVE': '使用中',
        'INACTIVE': '停用',
        'SUSPENDED': '已凍結',
        'PENDING_PASSWORD_CHANGE': '待更改密碼',
    };

    // Role-based access check - only MASTER can access this page
    if (currentUser?.role !== 'MASTER') {
        return (
            <div className="text-center py-12">
                <h2 className="text-xl font-bold text-[#2C2420]">權限不足</h2>
                <p className="text-gray-500 mt-2">只有最高管理員可以存取此頁面</p>
            </div>
        );
    }

    if (isLoading) return <div className="text-center py-12 text-gray-500">載入中...</div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-[#2C2420] font-serif">使用者管理</h2>
                    <p className="text-sm text-gray-500 mt-1">僅 MASTER 權限可見</p>
                </div>
                <button
                    onClick={handleAddNew}
                    className="px-4 py-2 bg-[#D4A373] text-white rounded-lg hover:bg-[#B08968] transition-colors flex items-center space-x-2"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                    <span>新增使用者</span>
                </button>
            </div>

            {/* Filter controls */}
            <div className="flex flex-wrap gap-4 items-center">
                <select
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                    className="px-4 py-2 rounded-lg border border-[#E0E0E0] outline-none focus:border-[#D4A373]"
                >
                    <option value="">全部角色</option>
                    <option value="MASTER">最高管理員</option>
                    <option value="ADMIN">管理員</option>
                    <option value="EDITOR">編輯</option>
                    <option value="USER">一般會員</option>
                </select>

                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-4 py-2 rounded-lg border border-[#E0E0E0] outline-none focus:border-[#D4A373]"
                >
                    <option value="">全部狀態</option>
                    <option value="ACTIVE">使用中</option>
                    <option value="INACTIVE">停用</option>
                    <option value="SUSPENDED">已凍結</option>
                    <option value="PENDING_PASSWORD_CHANGE">待更改密碼</option>
                </select>

                <input
                    type="text"
                    placeholder="搜尋姓名或 Email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 min-w-[200px] px-4 py-2 rounded-lg border border-[#E0E0E0] outline-none focus:border-[#D4A373]"
                />
            </div>

            {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-lg border border-red-100">
                    {error}
                </div>
            )}

            <div className="bg-white rounded-xl border border-[#E0E0E0] overflow-hidden shadow-sm">
                <table className="w-full text-left">
                    <thead className="bg-[#FAF9F6] border-b border-[#E0E0E0]">
                        <tr>
                            <th className="px-6 py-4 font-medium text-[#2C2420]">用戶</th>
                            <th className="px-6 py-4 font-medium text-[#2C2420]">角色</th>
                            <th className="px-6 py-4 font-medium text-[#2C2420]">狀態</th>
                            <th className="px-6 py-4 font-medium text-[#2C2420]">加入時間</th>
                            <th className="px-6 py-4 font-medium text-[#2C2420] text-right">操作</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E0E0E0]">
                        {users.map((u) => (
                            <tr key={u.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-bold text-gray-600">
                                            {u.name?.[0] || u.email[0].toUpperCase()}
                                        </div>
                                        <div>
                                            <p className="font-medium text-[#2C2420]">{u.name || '-'}</p>
                                            <p className="text-sm text-gray-500">{u.email}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${u.role === 'MASTER' ? 'bg-purple-100 text-purple-700' :
                                        u.role === 'ADMIN' ? 'bg-blue-100 text-blue-700' :
                                            'bg-gray-100 text-gray-700'
                                        }`}>
                                        {roleLabels[u.role] || u.role}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${u.status === 'ACTIVE' ? 'bg-green-100 text-green-700' :
                                        u.status === 'SUSPENDED' ? 'bg-red-100 text-red-700' :
                                            'bg-yellow-100 text-yellow-700'
                                        }`}>
                                        {statusLabels[u.status] || u.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-gray-500 text-sm">
                                    {new Date(u.createdAt).toLocaleDateString('zh-TW')}
                                </td>
                                <td className="px-6 py-4 text-right space-x-3">
                                    {u.role !== 'MASTER' && (
                                        <>
                                            <select
                                                value={u.role}
                                                onChange={(e) => handleRoleChange(u.id, e.target.value)}
                                                className="text-xs border border-gray-300 rounded px-1 py-1 mr-2"
                                            >
                                                <option value="ADMIN">管理員</option>
                                                <option value="EDITOR">編輯</option>
                                                <option value="USER">一般</option>
                                            </select>
                                            <button
                                                onClick={() => handleStatusChange(u.id, u.status === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE')}
                                                className={`text-xs font-medium ${u.status === 'ACTIVE' ? 'text-orange-600 hover:text-orange-800' : 'text-green-600 hover:text-green-800'}`}
                                            >
                                                {u.status === 'ACTIVE' ? '凍結' : '啟用'}
                                            </button>
                                            <button
                                                onClick={() => handleDelete(u.id)}
                                                className="text-xs text-red-600 hover:text-red-800 font-medium ml-2"
                                            >
                                                刪除
                                            </button>
                                        </>
                                    )}
                                    {u.role === 'MASTER' && (
                                        <span className="text-xs text-gray-400">無法操作</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
                        {createdUser ? (
                            // Success state - show password
                            <>
                                <div className="p-6 border-b border-[#E0E0E0] bg-green-50">
                                    <div className="flex items-center space-x-2">
                                        <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                        <h3 className="text-xl font-bold text-green-800">使用者已建立</h3>
                                    </div>
                                </div>
                                <div className="p-6 space-y-4">
                                    <p className="text-gray-600">請將以下資訊傳送給新使用者：</p>

                                    <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                                        <div>
                                            <span className="text-sm text-gray-500">帳號：</span>
                                            <p className="font-mono text-[#2C2420]">{createdUser.email}</p>
                                        </div>
                                        <div>
                                            <span className="text-sm text-gray-500">臨時密碼：</span>
                                            <div className="flex items-center space-x-2">
                                                <p className="font-mono text-lg text-[#2C2420] bg-yellow-50 px-2 py-1 rounded">{createdUser.password}</p>
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        navigator.clipboard.writeText(createdUser.password);
                                                        alert('已複製密碼');
                                                    }}
                                                    className="text-sm text-[#D4A373] hover:text-[#B08968]"
                                                >
                                                    複製
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <p className="text-sm text-gray-500">
                                        使用者首次登入後需更改密碼。邀請郵件已發送至對方信箱。
                                    </p>

                                    <div className="flex justify-end pt-4">
                                        <button
                                            type="button"
                                            onClick={closeModal}
                                            className="px-6 py-2 bg-[#D4A373] text-white rounded-lg hover:bg-[#B08968] font-medium"
                                        >
                                            完成
                                        </button>
                                    </div>
                                </div>
                            </>
                        ) : (
                            // Create form state
                            <>
                                <div className="p-6 border-b border-[#E0E0E0]">
                                    <h3 className="text-xl font-bold text-[#2C2420]">新增使用者</h3>
                                </div>
                                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-[#2C2420] mb-1">
                                            Email <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            required
                                            value={modalForm.email}
                                            onChange={(e) => setModalForm({ ...modalForm, email: e.target.value })}
                                            className="w-full px-4 py-2 rounded-lg border border-[#E0E0E0] outline-none focus:border-[#D4A373]"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-[#2C2420] mb-1">
                                            姓名
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={modalForm.name}
                                            onChange={(e) => setModalForm({ ...modalForm, name: e.target.value })}
                                            className="w-full px-4 py-2 rounded-lg border border-[#E0E0E0] outline-none focus:border-[#D4A373]"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-[#2C2420] mb-1">
                                            角色
                                        </label>
                                        <select
                                            value={modalForm.role}
                                            onChange={(e) => setModalForm({ ...modalForm, role: e.target.value })}
                                            className="w-full px-4 py-2 rounded-lg border border-[#E0E0E0] outline-none focus:border-[#D4A373]"
                                        >
                                            <option value="ADMIN">管理員</option>
                                            <option value="EDITOR">編輯者</option>
                                            <option value="USER">一般會員</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-[#2C2420] mb-1">
                                            初始密碼 <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={modalForm.password}
                                            onChange={(e) => setModalForm({ ...modalForm, password: e.target.value })}
                                            className="w-full px-4 py-2 rounded-lg border border-[#E0E0E0] outline-none focus:border-[#D4A373]"
                                            placeholder="至少 8 碼"
                                        />
                                    </div>

                                    <div className="flex justify-end space-x-3 pt-4">
                                        <button
                                            type="button"
                                            onClick={closeModal}
                                            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                                        >
                                            取消
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={isSaving}
                                            className="px-6 py-2 bg-[#D4A373] text-white rounded-lg hover:bg-[#B08968] font-medium"
                                        >
                                            {isSaving ? '建立中...' : '建立'}
                                        </button>
                                    </div>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminUsers;
