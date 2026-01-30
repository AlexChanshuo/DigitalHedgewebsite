// components/BlogCard.tsx
import React from 'react';
import Highlighter from 'react-highlight-words';

interface BlogCardProps {
  title: string;
  excerpt: string | null;
  coverImage: string | null;
  category: string;
  categorySlug: string;
  date: string;
  slug: string;
  searchWords?: string[];
  onClick: () => void;
  onCategoryClick?: (slug: string) => void;
}

const BlogCard: React.FC<BlogCardProps> = ({
  title,
  excerpt,
  coverImage,
  category,
  categorySlug,
  date,
  searchWords = [],
  onClick,
  onCategoryClick,
}) => {
  const handleCategoryClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the card's onClick
    if (onCategoryClick) {
      onCategoryClick(categorySlug);
    }
  };

  return (
    <article
      onClick={onClick}
      className="group cursor-pointer bg-white rounded-2xl border border-[#E0E0E0] overflow-hidden hover:shadow-xl hover:border-[#D4A373]/30 transition-all duration-300"
    >
      {/* Cover Image */}
      <div className="relative h-48 overflow-hidden bg-[#FAF9F6]">
        {coverImage ? (
          <img
            src={coverImage}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-16 h-16 border-2 border-[#E0E0E0] rounded-xl flex items-center justify-center text-[#E0E0E0] font-serif font-bold text-2xl">
              DH
            </div>
          </div>
        )}
        
        {/* Category Badge - Now Clickable */}
        <div className="absolute top-4 left-4">
          <button
            onClick={handleCategoryClick}
            className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-[#2C2420] shadow-sm hover:bg-[#D4A373] hover:text-white transition-colors"
          >
            {category}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-lg font-bold text-[#2C2420] font-serif mb-2 line-clamp-2 group-hover:text-[#D4A373] transition-colors">
          {searchWords.length > 0 ? (
            <Highlighter
              searchWords={searchWords}
              autoEscape={true}
              textToHighlight={title}
              highlightClassName="bg-yellow-200 rounded px-0.5"
            />
          ) : (
            title
          )}
        </h3>
        
        {excerpt && (
          <p className="text-sm text-[#2C2420]/60 line-clamp-2 mb-4">
            {searchWords.length > 0 ? (
              <Highlighter
                searchWords={searchWords}
                autoEscape={true}
                textToHighlight={excerpt}
                highlightClassName="bg-yellow-200 rounded px-0.5"
              />
            ) : (
              excerpt
            )}
          </p>
        )}

        <div className="flex items-center justify-between">
          <span className="text-xs text-[#2C2420]/40">
            {date}
          </span>
          
          <span className="flex items-center text-sm font-medium text-[#D4A373] group-hover:translate-x-1 transition-transform">
            閱讀更多
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
