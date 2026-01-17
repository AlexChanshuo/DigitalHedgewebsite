// pages/Admin.tsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import AdminNavbar from '../components/AdminNavbar';
import AdminPosts from './AdminPosts';
import AdminPostEditor from './AdminPostEditor';
import { getPosts, getCategories, PostsResponse, Category } from '../services/api';
import AdminContentSources from './AdminContentSources';
import AdminFetchedContent from './AdminFetchedContent';

type AdminPage = 'dashboard' | 'posts' | 'categories' | 'tags' | 'users' | 'content-sources' | 'fetched-content';
type AdminView = 'list' | 'editor';

interface AdminProps {
  onLogout: () => void;
  onBackToSite: () => void;
}

const Admin: React.FC<AdminProps> = ({ onLogout, onBackToSite }) => {
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState<AdminPage>('dashboard');
  const [currentView, setCurrentView] = useState<AdminView>('list');
  const [editingPostId, setEditingPostId] = useState<string | null>(null);

  // Dashboard stats
  const [stats, setStats] = useState({
    totalPosts: 0,
    publishedPosts: 0,
    draftPosts: 0,
    totalViews: 0,
  });
  const [recentPosts, setRecentPosts] = useState<PostsResponse['posts']>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (currentPage === 'dashboard') {
      loadDashboardData();
    }
  }, [currentPage]);

  async function loadDashboardData() {
    setIsLoading(true);
    try {
      const [postsRes, categoriesRes] = await Promise.all([
        getPosts({ limit: 100 }),
        getCategories(),
      ]);

      if (postsRes.success && postsRes.data) {
        const posts = postsRes.data.posts;
        setStats({
          totalPosts: postsRes.data.pagination.total,
          publishedPosts: posts.filter(p => p.status === 'PUBLISHED').length,
          draftPosts: posts.filter(p => p.status === 'DRAFT').length,
          totalViews: posts.reduce((sum, p) => sum + p.viewCount, 0),
        });
        setRecentPosts(posts.slice(0, 5));
      }

      if (categoriesRes.success && categoriesRes.data) {
        setCategories(categoriesRes.data);
      }
    } catch (e) {
      console.error('Failed to load dashboard data:', e);
    }
    setIsLoading(false);
  }

  function handleEditPost(postId: string) {
    setEditingPostId(postId);
    setCurrentView('editor');
  }

  function handleNewPost() {
    setEditingPostId(null);
    setCurrentView('editor');
  }

  function handleBackToList() {
    setCurrentView('list');
    setEditingPostId(null);
  }

  const renderContent = () => {
    if (currentPage === 'content-sources') {
      return <AdminContentSources />;
    }

    if (currentPage === 'fetched-content') {
      return <AdminFetchedContent />;
    }

    if (currentPage === 'posts') {
      if (currentView === 'editor') {
        return (
          <AdminPostEditor
            postId={editingPostId}
            onBack={handleBackToList}
            onSaved={handleBackToList}
          />
        );
      }
      return (
        <AdminPosts
          onEditPost={handleEditPost}
          onNewPost={handleNewPost}
        />
      );
    }

    if (currentPage === 'dashboard') {
      return (
        <div className="space-y-8">
          {/* Welcome */}
          <div>
            <h1 className="text-2xl font-bold text-[#2C2420] font-serif">
              歡迎回來，{user?.name || user?.email}
            </h1>
            <p className="text-[#2C2420]/60 mt-1">以下是您的網站概況</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title="總文章數"
              value={stats.totalPosts}
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              }
            />
            <StatCard
              title="已發布"
              value={stats.publishedPosts}
              color="green"
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
            />
            <StatCard
              title="草稿"
              value={stats.draftPosts}
              color="yellow"
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              }
            />
            <StatCard
              title="總瀏覽數"
              value={stats.totalViews}
              color="blue"
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              }
            />
          </div>

          {/* Quick Actions & Recent Posts */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-2xl border border-[#E0E0E0] p-6">
              <h2 className="text-lg font-bold text-[#2C2420] mb-4">快速操作</h2>
              <div className="space-y-3">
                <button
                  onClick={() => { setCurrentPage('posts'); handleNewPost(); }}
                  className="w-full flex items-center space-x-3 px-4 py-3 bg-[#FAF9F6] rounded-xl hover:bg-[#D4A373]/10 transition-colors group"
                >
                  <div className="w-10 h-10 bg-[#D4A373]/20 rounded-lg flex items-center justify-center text-[#D4A373] group-hover:bg-[#D4A373] group-hover:text-white transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                  <span className="font-medium text-[#2C2420]">新增文章</span>
                </button>
                <button
                  onClick={() => setCurrentPage('posts')}
                  className="w-full flex items-center space-x-3 px-4 py-3 bg-[#FAF9F6] rounded-xl hover:bg-[#D4A373]/10 transition-colors group"
                >
                  <div className="w-10 h-10 bg-[#2C2420]/10 rounded-lg flex items-center justify-center text-[#2C2420]/70 group-hover:bg-[#2C2420] group-hover:text-white transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                    </svg>
                  </div>
                  <span className="font-medium text-[#2C2420]">管理文章</span>
                </button>
                <button
                  onClick={() => setCurrentPage('fetched-content')}
                  className="w-full flex items-center space-x-3 px-4 py-3 bg-[#FAF9F6] rounded-xl hover:bg-[#D4A373]/10 transition-colors group"
                >
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                  <span className="font-medium text-[#2C2420]">AI 內容審核</span>
                </button>
              </div>
            </div>

            {/* Recent Posts */}
            <div className="lg:col-span-2 bg-white rounded-2xl border border-[#E0E0E0] p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-[#2C2420]">最新文章</h2>
                <button
                  onClick={() => setCurrentPage('posts')}
                  className="text-sm text-[#D4A373] hover:underline"
                >
                  查看全部
                </button>
              </div>

              {isLoading ? (
                <div className="text-center py-8 text-[#2C2420]/50">載入中...</div>
              ) : recentPosts.length === 0 ? (
                <div className="text-center py-8 text-[#2C2420]/50">尚無文章</div>
              ) : (
                <div className="space-y-3">
                  {recentPosts.map((post) => (
                    <div
                      key={post.id}
                      className="flex items-center justify-between p-4 bg-[#FAF9F6] rounded-xl"
                    >
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-[#2C2420] truncate">{post.title}</h3>
                        <p className="text-sm text-[#2C2420]/50">
                          {post.category.name} · {new Date(post.createdAt).toLocaleDateString('zh-TW')}
                        </p>
                      </div>
                      <div className="flex items-center space-x-3 ml-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${post.status === 'PUBLISHED'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                          }`}>
                          {post.status === 'PUBLISHED' ? '已發布' : '草稿'}
                        </span>
                        <button
                          onClick={() => { setCurrentPage('posts'); handleEditPost(post.id); }}
                          className="text-[#D4A373] hover:text-[#2C2420] transition-colors"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }

    // Placeholder for other pages
    return (
      <div className="bg-white rounded-2xl border border-[#E0E0E0] p-12 text-center">
        <p className="text-[#2C2420]/50">此功能開發中...</p>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6]">
      <AdminNavbar
        currentPage={currentPage}
        onNavigate={(page) => {
          setCurrentPage(page);
          setCurrentView('list');
        }}
        onLogout={onLogout}
        onBackToSite={onBackToSite}
      />

      <main className="pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

// Stat Card Component
interface StatCardProps {
  title: string;
  value: number;
  icon: JSX.Element;
  color?: 'default' | 'green' | 'yellow' | 'blue';
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color = 'default' }) => {
  const colorClasses = {
    default: 'bg-[#D4A373]/10 text-[#D4A373]',
    green: 'bg-green-100 text-green-600',
    yellow: 'bg-yellow-100 text-yellow-600',
    blue: 'bg-blue-100 text-blue-600',
  };

  return (
    <div className="bg-white rounded-2xl border border-[#E0E0E0] p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-[#2C2420]/60 mb-1">{title}</p>
          <p className="text-3xl font-bold text-[#2C2420]">{value}</p>
        </div>
        <div className={`p-3 rounded-xl ${colorClasses[color]}`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

export default Admin;
