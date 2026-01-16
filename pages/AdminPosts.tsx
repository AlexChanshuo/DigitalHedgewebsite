// pages/AdminPosts.tsx
import React, { useState, useEffect } from 'react';
import { getPosts, deletePost, Post, PostsResponse } from '../services/api';

interface AdminPostsProps {
  onEditPost: (postId: string) => void;
  onNewPost: () => void;
}

const AdminPosts: React.FC<AdminPostsProps> = ({ onEditPost, onNewPost }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, totalPages: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'PUBLISHED' | 'DRAFT'>('all');
  const [search, setSearch] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    loadPosts();
  }, [pagination.page, filter]);

  async function loadPosts() {
    setIsLoading(true);
    const result = await getPosts({
      page: pagination.page,
      limit: pagination.limit,
      status: filter === 'all' ? undefined : filter,
      search: search || undefined,
    });

    if (result.success && result.data) {
      setPosts(result.data.posts);
      setPagination(result.data.pagination);
    }
    setIsLoading(false);
  }

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    setPagination(prev => ({ ...prev, page: 1 }));
    loadPosts();
  }

  async function handleDelete(postId: string) {
    const result = await deletePost(postId);
    if (result.success) {
      loadPosts();
    }
    setDeleteConfirm(null);
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#2C2420] font-serif">文章管理</h1>
          <p className="text-[#2C2420]/60 mt-1">管理您的所有部落格文章</p>
        </div>
        <button
          onClick={onNewPost}
          className="inline-flex items-center space-x-2 px-6 py-3 bg-[#2C2420] text-white rounded-xl hover:bg-[#D4A373] transition-colors font-medium"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
          <span>新增文章</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-[#E0E0E0] p-4">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          {/* Status Filter */}
          <div className="flex rounded-lg bg-[#FAF9F6] p-1">
            {(['all', 'PUBLISHED', 'DRAFT'] as const).map((status) => (
              <button
                key={status}
                onClick={() => {
                  setFilter(status);
                  setPagination(prev => ({ ...prev, page: 1 }));
                }}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  filter === status
                    ? 'bg-white text-[#2C2420] shadow-sm'
                    : 'text-[#2C2420]/60 hover:text-[#2C2420]'
                }`}
              >
                {status === 'all' ? '全部' : status === 'PUBLISHED' ? '已發布' : '草稿'}
              </button>
            ))}
          </div>

          {/* Search */}
          <form onSubmit={handleSearch} className="flex-1 flex gap-2">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="搜尋文章..."
              className="flex-1 bg-[#FAF9F6] border border-[#E0E0E0] px-4 py-2 rounded-lg outline-none focus:border-[#D4A373] text-sm"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-[#FAF9F6] border border-[#E0E0E0] rounded-lg hover:bg-[#D4A373]/10 transition-colors"
            >
              <svg className="w-5 h-5 text-[#2C2420]/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </form>
        </div>
      </div>

      {/* Posts Table */}
      <div className="bg-white rounded-2xl border border-[#E0E0E0] overflow-hidden">
        {isLoading ? (
          <div className="p-12 text-center text-[#2C2420]/50">載入中...</div>
        ) : posts.length === 0 ? (
          <div className="p-12 text-center">
            <svg className="w-16 h-16 mx-auto text-[#E0E0E0] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
            <p className="text-[#2C2420]/50 mb-4">尚無文章</p>
            <button
              onClick={onNewPost}
              className="text-[#D4A373] hover:underline font-medium"
            >
              建立第一篇文章
            </button>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#FAF9F6] border-b border-[#E0E0E0]">
                  <tr>
                    <th className="text-left px-6 py-4 text-sm font-medium text-[#2C2420]/70">標題</th>
                    <th className="text-left px-6 py-4 text-sm font-medium text-[#2C2420]/70">分類</th>
                    <th className="text-left px-6 py-4 text-sm font-medium text-[#2C2420]/70">狀態</th>
                    <th className="text-left px-6 py-4 text-sm font-medium text-[#2C2420]/70">瀏覽</th>
                    <th className="text-left px-6 py-4 text-sm font-medium text-[#2C2420]/70">日期</th>
                    <th className="text-right px-6 py-4 text-sm font-medium text-[#2C2420]/70">操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E0E0E0]">
                  {posts.map((post) => (
                    <tr key={post.id} className="hover:bg-[#FAF9F6]/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          {post.coverImage && (
                            <img
                              src={post.coverImage}
                              alt=""
                              className="w-12 h-12 rounded-lg object-cover"
                            />
                          )}
                          <div className="min-w-0">
                            <p className="font-medium text-[#2C2420] truncate max-w-xs">{post.title}</p>
                            <p className="text-sm text-[#2C2420]/50 truncate max-w-xs">{post.excerpt || '無摘要'}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-[#FAF9F6] rounded-full text-sm text-[#2C2420]/70">
                          {post.category.name}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          post.status === 'PUBLISHED'
                            ? 'bg-green-100 text-green-700'
                            : post.status === 'SCHEDULED'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {post.status === 'PUBLISHED' ? '已發布' : post.status === 'SCHEDULED' ? '排程中' : '草稿'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-[#2C2420]/70">
                        {post.viewCount}
                      </td>
                      <td className="px-6 py-4 text-sm text-[#2C2420]/70">
                        {new Date(post.createdAt).toLocaleDateString('zh-TW')}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => onEditPost(post.id)}
                            className="p-2 text-[#2C2420]/50 hover:text-[#D4A373] transition-colors"
                            title="編輯"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(post.id)}
                            className="p-2 text-[#2C2420]/50 hover:text-red-500 transition-colors"
                            title="刪除"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="flex items-center justify-between px-6 py-4 border-t border-[#E0E0E0]">
                <p className="text-sm text-[#2C2420]/60">
                  共 {pagination.total} 篇文章，第 {pagination.page} / {pagination.totalPages} 頁
                </p>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
                    disabled={pagination.page === 1}
                    className="px-3 py-2 border border-[#E0E0E0] rounded-lg hover:bg-[#FAF9F6] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    上一頁
                  </button>
                  <button
                    onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
                    disabled={pagination.page === pagination.totalPages}
                    className="px-3 py-2 border border-[#E0E0E0] rounded-lg hover:bg-[#FAF9F6] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    下一頁
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full">
            <h3 className="text-lg font-bold text-[#2C2420] mb-2">確認刪除</h3>
            <p className="text-[#2C2420]/60 mb-6">確定要刪除這篇文章嗎？此操作無法復原。</p>
            <div className="flex space-x-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 px-4 py-3 border border-[#E0E0E0] rounded-xl hover:bg-[#FAF9F6] transition-colors font-medium"
              >
                取消
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="flex-1 px-4 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors font-medium"
              >
                刪除
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPosts;
