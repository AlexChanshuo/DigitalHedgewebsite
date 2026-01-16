// pages/AdminPostEditor.tsx
import React, { useState, useEffect } from 'react';
import { getPost, createPost, updatePost, getCategories, getTags, Category, Tag } from '../services/api';

interface AdminPostEditorProps {
  postId: string | null;
  onBack: () => void;
  onSaved: () => void;
}

const AdminPostEditor: React.FC<AdminPostEditorProps> = ({ postId, onBack, onSaved }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [allTags, setAllTags] = useState<Tag[]>([]);

  // Form state
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [status, setStatus] = useState<'DRAFT' | 'PUBLISHED'>('DRAFT');

  // Preview mode
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    loadData();
  }, [postId]);

  async function loadData() {
    setIsLoading(true);
    setError('');

    try {
      // Load categories and tags
      const [catRes, tagRes] = await Promise.all([
        getCategories(),
        getTags(),
      ]);

      if (catRes.success && catRes.data) {
        setCategories(catRes.data);
        if (!categoryId && catRes.data.length > 0) {
          setCategoryId(catRes.data[0].id);
        }
      }

      if (tagRes.success && tagRes.data) {
        setAllTags(tagRes.data);
      }

      // Load post if editing
      if (postId) {
        // Need to get post by ID - use slug workaround or add API
        // For now, we'll need to fetch all posts and find by ID
        const postsRes = await fetch(`https://api.digitalhedge.ai/api/posts?limit=100`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });
        const postsData = await postsRes.json();
        
        if (postsData.success && postsData.data) {
          const post = postsData.data.posts.find((p: any) => p.id === postId);
          if (post) {
            // Fetch full post content
            const fullPost = await fetch(`https://api.digitalhedge.ai/api/posts/${post.slug}`, {
              headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
              },
            });
            const fullPostData = await fullPost.json();
            
            if (fullPostData.success && fullPostData.data) {
              const p = fullPostData.data;
              setTitle(p.title);
              setContent(p.content);
              setExcerpt(p.excerpt || '');
              setCoverImage(p.coverImage || '');
              setCategoryId(p.category.id);
              setSelectedTags(p.tags.map((t: Tag) => t.id));
              setStatus(p.status as 'DRAFT' | 'PUBLISHED');
            }
          }
        }
      }
    } catch (e) {
      setError('載入資料失敗');
    }

    setIsLoading(false);
  }

  async function handleSave(saveStatus: 'DRAFT' | 'PUBLISHED') {
    if (!title.trim()) {
      setError('請輸入標題');
      return;
    }
    if (!content.trim()) {
      setError('請輸入內容');
      return;
    }
    if (!categoryId) {
      setError('請選擇分類');
      return;
    }

    setIsSaving(true);
    setError('');

    const data = {
      title,
      content,
      excerpt: excerpt || undefined,
      coverImage: coverImage || undefined,
      categoryId,
      tagIds: selectedTags,
      status: saveStatus,
    };

    let result;
    if (postId) {
      result = await updatePost(postId, data);
    } else {
      result = await createPost(data);
    }

    if (result.success) {
      onSaved();
    } else {
      setError(result.error || '儲存失敗');
    }

    setIsSaving(false);
  }

  function toggleTag(tagId: string) {
    setSelectedTags(prev =>
      prev.includes(tagId)
        ? prev.filter(id => id !== tagId)
        : [...prev, tagId]
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-[#2C2420]/50">載入中...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-[#FAF9F6] rounded-lg transition-colors"
          >
            <svg className="w-6 h-6 text-[#2C2420]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <div>
            <h1 className="text-2xl font-bold text-[#2C2420] font-serif">
              {postId ? '編輯文章' : '新增文章'}
            </h1>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="px-4 py-2 border border-[#E0E0E0] rounded-lg hover:bg-[#FAF9F6] transition-colors text-sm font-medium"
          >
            {showPreview ? '編輯' : '預覽'}
          </button>
          <button
            onClick={() => handleSave('DRAFT')}
            disabled={isSaving}
            className="px-4 py-2 border border-[#E0E0E0] rounded-lg hover:bg-[#FAF9F6] transition-colors text-sm font-medium disabled:opacity-50"
          >
            儲存草稿
          </button>
          <button
            onClick={() => handleSave('PUBLISHED')}
            disabled={isSaving}
            className="px-6 py-2 bg-[#2C2420] text-white rounded-lg hover:bg-[#D4A373] transition-colors text-sm font-medium disabled:opacity-50"
          >
            {isSaving ? '儲存中...' : '發布'}
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
          {error}
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {showPreview ? (
            <div className="bg-white rounded-2xl border border-[#E0E0E0] p-8">
              <h1 className="text-3xl font-bold text-[#2C2420] font-serif mb-4">{title || '無標題'}</h1>
              {excerpt && <p className="text-lg text-[#2C2420]/60 mb-6">{excerpt}</p>}
              {coverImage && (
                <img src={coverImage} alt="" className="w-full h-64 object-cover rounded-xl mb-6" />
              )}
              <div className="prose prose-lg max-w-none">
                <pre className="whitespace-pre-wrap font-sans text-[#2C2420]/80">{content}</pre>
              </div>
            </div>
          ) : (
            <>
              {/* Title */}
              <div className="bg-white rounded-2xl border border-[#E0E0E0] p-6">
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="輸入文章標題..."
                  className="w-full text-2xl font-bold text-[#2C2420] font-serif outline-none placeholder:text-[#2C2420]/30"
                />
              </div>

              {/* Excerpt */}
              <div className="bg-white rounded-2xl border border-[#E0E0E0] p-6">
                <label className="block text-sm font-medium text-[#2C2420]/70 mb-2">摘要</label>
                <textarea
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="簡短描述文章內容（選填）..."
                  rows={2}
                  className="w-full text-[#2C2420] outline-none resize-none placeholder:text-[#2C2420]/30"
                />
              </div>

              {/* Content */}
              <div className="bg-white rounded-2xl border border-[#E0E0E0] p-6">
                <label className="block text-sm font-medium text-[#2C2420]/70 mb-2">
                  內容 (支援 Markdown)
                </label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="開始撰寫您的文章..."
                  rows={20}
                  className="w-full text-[#2C2420] outline-none resize-none font-mono text-sm leading-relaxed placeholder:text-[#2C2420]/30"
                />
              </div>
            </>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Cover Image */}
          <div className="bg-white rounded-2xl border border-[#E0E0E0] p-6">
            <label className="block text-sm font-medium text-[#2C2420] mb-3">封面圖片</label>
            <input
              type="url"
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              placeholder="輸入圖片網址..."
              className="w-full bg-[#FAF9F6] border border-[#E0E0E0] px-4 py-3 rounded-xl outline-none focus:border-[#D4A373] text-sm"
            />
            {coverImage && (
              <img src={coverImage} alt="Preview" className="w-full h-32 object-cover rounded-xl mt-3" />
            )}
          </div>

          {/* Category */}
          <div className="bg-white rounded-2xl border border-[#E0E0E0] p-6">
            <label className="block text-sm font-medium text-[#2C2420] mb-3">分類</label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full bg-[#FAF9F6] border border-[#E0E0E0] px-4 py-3 rounded-xl outline-none focus:border-[#D4A373] text-sm"
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          {/* Tags */}
          <div className="bg-white rounded-2xl border border-[#E0E0E0] p-6">
            <label className="block text-sm font-medium text-[#2C2420] mb-3">標籤</label>
            <div className="flex flex-wrap gap-2">
              {allTags.map((tag) => (
                <button
                  key={tag.id}
                  onClick={() => toggleTag(tag.id)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    selectedTags.includes(tag.id)
                      ? 'bg-[#D4A373] text-white'
                      : 'bg-[#FAF9F6] text-[#2C2420]/70 hover:bg-[#D4A373]/20'
                  }`}
                  style={tag.color && selectedTags.includes(tag.id) ? { backgroundColor: tag.color } : {}}
                >
                  {tag.name}
                </button>
              ))}
              {allTags.length === 0 && (
                <p className="text-sm text-[#2C2420]/50">尚無標籤</p>
              )}
            </div>
          </div>

          {/* Status Info */}
          <div className="bg-[#FAF9F6] rounded-2xl p-6">
            <div className="flex items-center space-x-2 text-sm text-[#2C2420]/60">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>按下「發布」後文章將公開顯示</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPostEditor;
