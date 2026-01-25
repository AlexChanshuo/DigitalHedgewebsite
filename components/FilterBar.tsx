// components/FilterBar.tsx
import React, { useState, useEffect } from 'react';
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
  const debouncedSearch = useDebounce(searchInput, 300);

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
      {/* Search Input */}
      <div className="relative max-w-md">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg className="w-5 h-5 text-[#2C2420]/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search posts..."
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

      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-[#2C2420]/60 mr-1">Active filters:</span>

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
            Clear all
          </button>
        </div>
      )}
    </div>
  );
};

export default FilterBar;
