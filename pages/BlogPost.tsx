// pages/BlogPost.tsx
import React, { useState, useEffect } from 'react';
import { getPost, Post } from '../services/api';
import SEO from '../components/SEO';
import BreadcrumbSchema from '../components/seo/BreadcrumbSchema';

interface BlogPostProps {
  slug: string;
  onBack: () => void;
  onNavigateToBlog: () => void;
  onNavigateToCategory?: (categorySlug: string) => void;
  onNavigateToTag?: (tagSlug: string) => void;
}

const BlogPost: React.FC<BlogPostProps> = ({ 
  slug, 
  onBack, 
  onNavigateToBlog,
  onNavigateToCategory,
  onNavigateToTag,
}) => {
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadPost();
  }, [slug]);

  async function loadPost() {
    setIsLoading(true);
    setError('');

    try {
      const result = await getPost(slug);
      if (result.success && result.data) {
        setPost(result.data);
      } else {
        setError('文章不存在');
      }
    } catch (e) {
      setError('載入失敗');
    }

    setIsLoading(false);
  }

  // Simple Markdown-like rendering (basic formatting)
  function renderContent(content: string) {
    // Convert markdown-style formatting to HTML
    let html = content
      // Headers
      .replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold text-[#2C2420] font-serif mt-8 mb-4">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold text-[#2C2420] font-serif mt-10 mb-4">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold text-[#2C2420] font-serif mt-10 mb-4">$1</h1>')
      // Bold
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-[#2C2420]">$1</strong>')
      // Italic
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      // Code blocks
      .replace(/```([\s\S]*?)```/g, '<pre class="bg-[#2C2420] text-[#FAF9F6] p-4 rounded-xl overflow-x-auto my-6 text-sm"><code>$1</code></pre>')
      // Inline code
      .replace(/`(.*?)`/g, '<code class="bg-[#FAF9F6] px-2 py-1 rounded text-sm text-[#D4A373]">$1</code>')
      // Links
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-[#D4A373] hover:underline" target="_blank" rel="noopener">$1</a>')
      // Lists
      .replace(/^\- (.*$)/gim, '<li class="ml-4 mb-2">$1</li>')
      // Blockquotes
      .replace(/^> (.*$)/gim, '<blockquote class="border-l-4 border-[#D4A373] pl-4 my-6 italic text-[#2C2420]/70">$1</blockquote>')
      // Paragraphs (double newline)
      .replace(/\n\n/g, '</p><p class="mb-4 leading-relaxed text-[#2C2420]/80">')
      // Single newlines within paragraphs
      .replace(/\n/g, '<br/>');

    // Wrap in paragraph
    html = `<p class="mb-4 leading-relaxed text-[#2C2420]/80">${html}</p>`;

    // Wrap list items in ul
    html = html.replace(/(<li.*?<\/li>)+/g, '<ul class="list-disc my-4">$&</ul>');

    return html;
  }

  const handleCategoryClick = () => {
    if (post && onNavigateToCategory) {
      onNavigateToCategory(post.category.slug);
    }
  };

  const handleTagClick = (tagSlug: string) => {
    if (onNavigateToTag) {
      onNavigateToTag(tagSlug);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FAF9F6] flex items-center justify-center">
        <div className="text-[#2C2420]/50">載入中...</div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-[#FAF9F6] flex items-center justify-center px-6">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-6 border-2 border-[#E0E0E0] rounded-2xl flex items-center justify-center">
            <svg className="w-10 h-10 text-[#E0E0E0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-[#2C2420] font-serif mb-2">{error || '文章不存在'}</h2>
          <p className="text-[#2C2420]/60 mb-6">無法找到您要查看的文章</p>
          <button
            onClick={onNavigateToBlog}
            className="px-6 py-3 bg-[#2C2420] text-white rounded-xl hover:bg-[#D4A373] transition-colors"
          >
            返回部落格
          </button>
        </div>
      </div>
    );
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "image": post.coverImage ? [post.coverImage] : [],
    "datePublished": post.publishedAt || post.createdAt,
    "dateModified": post.updatedAt,
    "author": [{
      "@type": "Person",
      "name": post.author.name || "Digital Hedge Team",
      "url": "https://digitalhedge.ai"
    }]
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6]">
      <SEO
        title={post.title}
        description={post.excerpt || post.content.substring(0, 150)}
        image={post.coverImage || undefined}
        url={`/blog/${post.slug}`}
        type="article"
        publishedTime={post.publishedAt ? new Date(post.publishedAt).toISOString() : new Date(post.createdAt).toISOString()}
        author={post.author.name || 'Digital Hedge Team'}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BreadcrumbSchema
        items={[
          { name: '首頁', url: '/' },
          { name: '部落格', url: '/blog' },
          { name: post.title }
        ]}
      />

      {/* Hero Section */}
      <section className="relative pt-32 pb-12 px-6">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-10 w-72 h-72 bg-[#D4A373]/5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-3xl mx-auto">
          {/* Back button */}
          <button
            onClick={onNavigateToBlog}
            className="flex items-center space-x-2 text-[#2C2420]/60 hover:text-[#D4A373] transition-colors mb-8"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="text-sm font-medium">返回部落格</span>
          </button>

          {/* Category & Date */}
          <div className="flex items-center space-x-4 mb-6">
            <button
              onClick={handleCategoryClick}
              className="px-3 py-1 bg-[#D4A373]/10 rounded-full text-sm font-medium text-[#D4A373] hover:bg-[#D4A373] hover:text-white transition-colors cursor-pointer"
            >
              {post.category.name}
            </button>
            <span className="text-sm text-[#2C2420]/50">
              {new Date(post.publishedAt || post.createdAt).toLocaleDateString('zh-TW', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#2C2420] font-serif mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Excerpt */}
          {post.excerpt && (
            <p className="text-lg text-[#2C2420]/60 mb-8">
              {post.excerpt}
            </p>
          )}

          {/* Author & Read time */}
          <div className="flex items-start space-x-4 pb-8 border-b border-[#E0E0E0]">
            {post.author.avatar ? (
              <img
                src={post.author.avatar}
                alt={post.author.name || 'Author'}
                className="w-14 h-14 rounded-full object-cover flex-shrink-0"
              />
            ) : (
              <div className="w-14 h-14 bg-[#D4A373] rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                {post.author.name?.[0] || 'A'}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="font-medium text-[#2C2420]">{post.author.name || 'Digital Hedge'}</p>
              {post.author.bio && (
                <p className="text-sm text-[#D4A373] italic">{post.author.bio}</p>
              )}
              <p className="text-sm text-[#2C2420]/50 mt-1">
                {Math.ceil(post.content.length / 500)} 分鐘閱讀 · {post.viewCount} 次瀏覽
              </p>
              {/* Contact Links */}
              {(post.author.publicEmail || post.author.socialLinks) && (
                <div className="flex flex-wrap items-center gap-3 mt-2">
                  {post.author.publicEmail && (
                    <a
                      href={`mailto:${post.author.publicEmail}`}
                      className="inline-flex items-center text-xs text-[#2C2420]/60 hover:text-[#D4A373] transition-colors"
                    >
                      <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      {post.author.publicEmail}
                    </a>
                  )}
                  {post.author.socialLinks?.threads && (
                    <a
                      href={post.author.socialLinks.threads.startsWith('http') ? post.author.socialLinks.threads : `https://threads.net/${post.author.socialLinks.threads}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-xs text-[#2C2420]/60 hover:text-[#D4A373] transition-colors"
                    >
                      <svg className="w-3.5 h-3.5 mr-1" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.5 12.068V12c.015-3.58 1.205-6.333 3.509-8.182C7.082 2.174 9.935 1.32 13.453 1.32h.01c3.576.024 6.329 1.205 8.178 3.508 1.644 2.052 2.494 4.905 2.494 8.423v.068c-.015 3.58-1.205 6.333-3.509 8.182-2.056 1.644-4.909 2.494-8.427 2.494l-.013.005zm-.067-4.086c2.108 0 3.738-.632 4.846-1.879 1.097-1.234 1.654-2.982 1.654-5.195v-.034c-.008-2.199-.566-3.943-1.66-5.18-1.104-1.25-2.734-1.883-4.84-1.883h-.01c-2.108 0-3.738.632-4.846 1.879-1.097 1.234-1.654 2.982-1.654 5.195v.034c.008 2.199.566 3.943 1.66 5.18 1.104 1.25 2.734 1.883 4.84 1.883h.01z"/>
                      </svg>
                      Threads
                    </a>
                  )}
                  {post.author.socialLinks?.twitter && (
                    <a
                      href={post.author.socialLinks.twitter.startsWith('http') ? post.author.socialLinks.twitter : `https://twitter.com/${post.author.socialLinks.twitter}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-xs text-[#2C2420]/60 hover:text-[#D4A373] transition-colors"
                    >
                      <svg className="w-3.5 h-3.5 mr-1" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                      X
                    </a>
                  )}
                  {post.author.socialLinks?.facebook && (
                    <a
                      href={post.author.socialLinks.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-xs text-[#2C2420]/60 hover:text-[#D4A373] transition-colors"
                    >
                      <svg className="w-3.5 h-3.5 mr-1" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                      Facebook
                    </a>
                  )}
                  {post.author.socialLinks?.website && (
                    <a
                      href={post.author.socialLinks.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-xs text-[#2C2420]/60 hover:text-[#D4A373] transition-colors"
                    >
                      <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                      </svg>
                      網站
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Cover Image */}
      {post.coverImage && (
        <section className="px-6 pb-12">
          <div className="max-w-4xl mx-auto">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-auto rounded-2xl shadow-lg"
            />
          </div>
        </section>
      )}

      {/* Content */}
      <section className="px-6 pb-20">
        <article className="max-w-3xl mx-auto">
          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: renderContent(post.content) }}
          />
        </article>
      </section>

      {/* Tags - Now Clickable */}
      {post.tags.length > 0 && (
        <section className="px-6 pb-12">
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-wrap items-center gap-2 pt-8 border-t border-[#E0E0E0]">
              <span className="text-sm text-[#2C2420]/50 mr-2">標籤：</span>
              {post.tags.map((tag) => (
                <button
                  key={tag.id}
                  onClick={() => handleTagClick(tag.slug)}
                  className="px-3 py-1 bg-[#FAF9F6] border border-[#E0E0E0] rounded-full text-sm text-[#2C2420]/70 hover:border-[#D4A373] hover:text-[#D4A373] transition-colors cursor-pointer"
                  style={tag.color ? { borderColor: tag.color, color: tag.color } : {}}
                >
                  #{tag.name}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Share & CTA */}
      <section className="px-6 pb-20">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl border border-[#E0E0E0] p-8 text-center">
            <h3 className="text-xl font-bold text-[#2C2420] font-serif mb-2">
              喜歡這篇文章嗎？
            </h3>
            <p className="text-[#2C2420]/60 mb-6">
              探索更多 AI 技術洞察與產業趨勢
            </p>
            <button
              onClick={onNavigateToBlog}
              className="px-8 py-3 bg-[#2C2420] text-white rounded-xl hover:bg-[#D4A373] transition-colors font-medium"
            >
              瀏覽更多文章
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPost;
