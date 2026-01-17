// pages/BlogPost.tsx
import React, { useState, useEffect } from 'react';
import { getPost, Post } from '../services/api';
import SEO from '../components/SEO';

interface BlogPostProps {
  slug: string;
  onBack: () => void;
  onNavigateToBlog: () => void;
}

const BlogPost: React.FC<BlogPostProps> = ({ slug, onBack, onNavigateToBlog }) => {
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
      >
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      </SEO>

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
            <span className="px-3 py-1 bg-[#D4A373]/10 rounded-full text-sm font-medium text-[#D4A373]">
              {post.category.name}
            </span>
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
          <div className="flex items-center space-x-4 pb-8 border-b border-[#E0E0E0]">
            <div className="w-12 h-12 bg-[#D4A373] rounded-full flex items-center justify-center text-white font-bold">
              {post.author.name?.[0] || 'A'}
            </div>
            <div>
              <p className="font-medium text-[#2C2420]">{post.author.name || 'Digital Hedge'}</p>
              <p className="text-sm text-[#2C2420]/50">
                {Math.ceil(post.content.length / 500)} 分鐘閱讀 · {post.viewCount} 次瀏覽
              </p>
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

      {/* Tags */}
      {post.tags.length > 0 && (
        <section className="px-6 pb-12">
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-wrap items-center gap-2 pt-8 border-t border-[#E0E0E0]">
              <span className="text-sm text-[#2C2420]/50 mr-2">標籤：</span>
              {post.tags.map((tag) => (
                <span
                  key={tag.id}
                  className="px-3 py-1 bg-[#FAF9F6] border border-[#E0E0E0] rounded-full text-sm text-[#2C2420]/70"
                  style={tag.color ? { borderColor: tag.color, color: tag.color } : {}}
                >
                  #{tag.name}
                </span>
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
