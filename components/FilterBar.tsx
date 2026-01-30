// components/FilterBar.tsx
import React, { useState, useEffect, useRef } from 'react';
import FilterChip from './FilterChip';
import { useDebounce } from '../hooks/useDebounce';
import { BlogFilters } from '../hooks/useURLFilters';
import { Category, Tag } from '../services/api';

interface FilterBarProps {
  filters: BlogFilters;
  categories: Category[];
  tags: Tag[];
  onUpdateFilters: (updates: Partial<BlogFilters>) => void;
  onClearFilters: () => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  categories,
  tags,
  onUpdateFilters,
  onClearFilters,
}) => {
  const [searchInput, setSearchInput] = useState(filters.search);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showTagDropdown, setShowTagDropdown] = useState(false);
  const debouncedSearch = useDebounce(searchInput, 300);
  
  const categoryDropdownRef = useRef<HTMLDivElement>(null);
  const tagDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(event.target as Node)) {
        setShowCategoryDropdown(false);
      }
      if (tagDropdownRef.current && !tagDropdownRef.current.contains(event.target as Node)) {
        setShowTagDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Sync debounced search to filters
  useEffect(() => {
    if (debouncedSearch !== filters.search) {
      onUpdateFilters({ search: debouncedSearch });
    }
  }, [debouncedSearch, filters.search, onUpdateFilters]);

  // Sync filters.search to input when URL changes (back/forward)
  useEffect(() => {
    setSearchInput(filters.search);
  }, [filters.search]);

  // Resolve slugs to display names
  const categoryName = filters.categorySlug
    ? categories.find(c => c.slug === filters.categorySlug)?.name || filters.categorySlug
    : null;
  const tagName = filters.tagSlug
    ? tags.find(t => t.slug === filters.tagSlug)?.name || filters.tagSlug
    : null;

  const hasActiveFilters = filters.categorySlug || filters.tagSlug || filters.search;

  return (
    <div className="space-y-4">
      {/* Search and Filter Controls */}
      <div className="flex flex-wrap gap-3">
        {/* Search Input */}
        <div className="relative flex-1 min-w-[200px] max-w-md">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg className="w-5 h-5 text-[#2C2420]/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="搜尋文章..."
            className="w-full pl-12 pr-4 py-3 bg-white border border-[#E0E0E0] rounded-xl text-[#2C2420] placeholder-[#2C2420]/40 focus:outline-none focus:border-[#D4A373] focus:ring-2 focus:ring-[#D4A373]/20 transition-all"
          />
          {searchInput && (
            <button
              onClick={() => setSearchInput('')}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-[#2C2420]/40 hover:text-[#2C2420]/60"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Category Dropdown */}
        <div className="relative" ref={categoryDropdownRef}>
          <button
            onClick={() => {
              setShowCategoryDropdown(!showCategoryDropdown);
              setShowTagDropdown(false);
            }}
            className={`px-4 py-3 bg-white border rounded-xl flex items-center space-x-2 transition-all ${
              filters.categorySlug 
                ? 'border-[#D4A373] text-[#D4A373]' 
                : 'border-[#E0E0E0] text-[#2C2420]/70 hover:border-[#D4A373]/50'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <span className="text-sm font-medium">
              {categoryName || '分類'}
            </span>
            <svg className={`w-4 h-4 transition-transform ${showCategoryDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {showCategoryDropdown && (
            <div className="absolute z-10 mt-2 w-56 bg-white border border-[#E0E0E0] rounded-xl shadow-lg overflow-hidden">
              <div className="py-2 max-h-60 overflow-y-auto">
                <button
                  onClick={() => {
                    onUpdateFilters({ categorySlug: null });
                    setShowCategoryDropdown(false);
                  }}
                  className={`w-full px-4 py-2 text-left text-sm hover:bg-[#FAF9F6] transition-colors ${
                    !filters.categorySlug ? 'text-[#D4A373] font-medium' : 'text-[#2C2420]/70'
                  }`}
                >
                  全部分類
                </button>
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => {
                      onUpdateFilters({ categorySlug: category.slug, tagSlug: null });
                      setShowCategoryDropdown(false);
                    }}
                    className={`w-full px-4 py-2 text-left text-sm hover:bg-[#FAF9F6] transition-colors flex justify-between items-center ${
                      filters.categorySlug === category.slug ? 'text-[#D4A373] font-medium bg-[#D4A373]/5' : 'text-[#2C2420]/70'
                    }`}
                  >
                    <span>{category.name}</span>
                    {category._count && (
                      <span className="text-xs text-[#2C2420]/40">{category._count.posts}</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Tag Dropdown */}
        <div className="relative" ref={tagDropdownRef}>
          <button
            onClick={() => {
              setShowTagDropdown(!showTagDropdown);
              setShowCategoryDropdown(false);
            }}
            className={`px-4 py-3 bg-white border rounded-xl flex items-center space-x-2 transition-all ${
              filters.tagSlug 
                ? 'border-[#D4A373] text-[#D4A373]' 
                : 'border-[#E0E0E0] text-[#2C2420]/70 hover:border-[#D4A373]/50'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
            <span className="text-sm font-medium">
              {tagName || '標籤'}
            </span>
            <svg className={`w-4 h-4 transition-transform ${showTagDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {showTagDropdown && (
            <div className="absolute z-10 mt-2 w-56 bg-white border border-[#E0E0E0] rounded-xl shadow-lg overflow-hidden">
              <div className="py-2 max-h-60 overflow-y-auto">
                <button
                  onClick={() => {
                    onUpdateFilters({ tagSlug: null });
                    setShowTagDropdown(false);
                  }}
                  className={`w-full px-4 py-2 text-left text-sm hover:bg-[#FAF9F6] transition-colors ${
                    !filters.tagSlug ? 'text-[#D4A373] font-medium' : 'text-[#2C2420]/70'
                  }`}
                >
                  全部標籤
                </button>
                {tags.map(tag => (
                  <button
                    key={tag.id}
                    onClick={() => {
                      onUpdateFilters({ tagSlug: tag.slug, categorySlug: null });
                      setShowTagDropdown(false);
                    }}
                    className={`w-full px-4 py-2 text-left text-sm hover:bg-[#FAF9F6] transition-colors flex justify-between items-center ${
                      filters.tagSlug === tag.slug ? 'text-[#D4A373] font-medium bg-[#D4A373]/5' : 'text-[#2C2420]/70'
                    }`}
                  >
                    <span className="flex items-center space-x-2">
                      {tag.color && (
                        <span 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: tag.color }}
                        />
                      )}
                      <span>{tag.name}</span>
                    </span>
                    {tag._count && (
                      <span className="text-xs text-[#2C2420]/40">{tag._count.posts}</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-[#2C2420]/60 mr-1">目前篩選：</span>

          {categoryName && (
            <FilterChip
              label={categoryName}
              type="category"
              onRemove={() => onUpdateFilters({ categorySlug: null })}
            />
          )}

          {tagName && (
            <FilterChip
              label={tagName}
              type="tag"
              onRemove={() => onUpdateFilters({ tagSlug: null })}
            />
          )}

          {filters.search && (
            <FilterChip
              label={`"${filters.search}"`}
              type="search"
              onRemove={() => {
                setSearchInput('');
                onUpdateFilters({ search: '' });
              }}
            />
          )}

          <button
            onClick={onClearFilters}
            className="text-sm text-[#D4A373] hover:text-[#D4A373]/80 hover:underline ml-2 transition-colors"
          >
            清除全部
          </button>
        </div>
      )}
    </div>
  );
};

export default FilterBar;
