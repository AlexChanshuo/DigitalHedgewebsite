// pages/Blog.tsx
import React, { useState, useEffect, useCallback } from 'react';
import BlogCard from '../components/BlogCard';
import FilterBar from '../components/FilterBar';
import SEO from '../components/SEO';
import BreadcrumbSchema from '../components/seo/BreadcrumbSchema';
import { getPosts, getCategories, getTags, Post, Category, Tag } from '../services/api';
import { useURLFilters } from '../hooks/useURLFilters';

interface BlogProps {
  onNavigateToPost: (slug: string) => void;
  onBack: () => void;
}

const Blog: React.FC<BlogProps> = ({ onNavigateToPost, onBack }) => {
  const [filters, updateFilters, clearFilters] = useURLFilters();
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const controller = new AbortController();

    async function loadData() {
      setIsLoading(true);
      try {
        const [postsRes, categoriesRes, tagsRes] = await Promise.all([
          getPosts({
            page: filters.page,
            limit: 9,
            status: 'PUBLISHED',
            categorySlug: filters.categorySlug || undefined,
            tagSlug: filters.tagSlug || undefined,
            search: filters.search || undefined,
          }),
          getCategories(),
          getTags(),
        ]);

        if (!controller.signal.aborted) {
          if (postsRes.success && postsRes.data) {
            setPosts(postsRes.data.posts);
            setTotalPages(postsRes.data.pagination.totalPages);
          }

          if (categoriesRes.success && categoriesRes.data) {
            setCategories(categoriesRes.data);
          }

          if (tagsRes.success && tagsRes.data) {
            setTags(tagsRes.data);
          }
        }
      } catch (e) {
        if (!controller.signal.aborted) {
          console.error('Failed to load blog data:', e);
        }
      }
      if (!controller.signal.aborted) {
        setIsLoading(false);
      }
    }

    loadData();
    return () => controller.abort();
  }, [filters.categorySlug, filters.tagSlug, filters.search, filters.page]);

  return (
    <div className="min-h-screen bg-[#FAF9F6]">
      <SEO
        title="部落格"
        description="探索 AI 語音技術、生成式 AI 應用與數位轉型策略的最新文章"
        url="/blog"
      >
        <BreadcrumbSchema
          items={[
            { name: '首頁', url: '/' },
            { name: '部落格' }
          ]}
        />
      </SEO>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-10 w-72 h-72 bg-[#D4A373]/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-10 w-96 h-96 bg-[#D4A373]/5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          {/* Back button */}
          <button
            onClick={onBack}
            className="absolute left-0 top-0 flex items-center space-x-2 text-[#2C2420]/60 hover:text-[#D4A373] transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="text-sm font-medium">返回首頁</span>
          </button>

          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-[#D4A373]/10 rounded-full mb-6">
            <span className="w-2 h-2 bg-[#D4A373] rounded-full"></span>
            <span className="text-sm font-medium text-[#D4A373] tracking-wider uppercase">Blog</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-[#2C2420] font-serif mb-6">
            數位洞察
          </h1>
          
          <p className="text-lg text-[#2C2420]/60 max-w-2xl mx-auto">
            探索 AI 語音技術、數據分析與數位轉型的最新趨勢與深度解析
          </p>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="px-6 pb-8">
        <div className="max-w-6xl mx-auto">
          <FilterBar
            filters={filters}
            categories={categories}
            tags={tags}
            onUpdateFilters={updateFilters}
            onClearFilters={clearFilters}
          />
        </div>
      </section>

      {/* Posts Grid */}
      <section className="px-6 pb-20">
        <div className="max-w-6xl mx-auto">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-[#2C2420]/50">載入中...</div>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-20 h-20 mx-auto mb-6 border-2 border-[#E0E0E0] rounded-2xl flex items-center justify-center">
                <svg className="w-10 h-10 text-[#E0E0E0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#2C2420] font-serif mb-2">尚無文章</h3>
              <p className="text-[#2C2420]/60">敬請期待更多精彩內容</p>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                  <BlogCard
                    key={post.id}
                    title={post.title}
                    excerpt={post.excerpt}
                    coverImage={post.coverImage}
                    category={post.category.name}
                    date={new Date(post.publishedAt || post.createdAt).toLocaleDateString('zh-TW', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                    slug={post.slug}
                    searchWords={filters.search ? [filters.search] : []}
                    onClick={() => onNavigateToPost(post.slug)}
                  />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center space-x-4 mt-12">
                  <button
                    onClick={() => updateFilters({ page: Math.max(1, filters.page - 1) })}
                    disabled={filters.page === 1}
                    className="px-5 py-2 border border-[#E0E0E0] rounded-lg hover:bg-[#FAF9F6] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    上一頁
                  </button>
                  <span className="text-sm text-[#2C2420]/60">
                    第 {filters.page} / {totalPages} 頁
                  </span>
                  <button
                    onClick={() => updateFilters({ page: Math.min(totalPages, filters.page + 1) })}
                    disabled={filters.page === totalPages}
                    className="px-5 py-2 border border-[#E0E0E0] rounded-lg hover:bg-[#FAF9F6] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    下一頁
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default Blog;
