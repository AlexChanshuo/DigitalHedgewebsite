// hooks/useURLFilters.ts
import { useState, useEffect, useCallback } from 'react';

export interface BlogFilters {
  categorySlug: string | null;
  tagSlug: string | null;
  search: string;
  page: number;
}

function parseURL(): BlogFilters {
  const path = window.location.pathname;
  const params = new URLSearchParams(window.location.search);

  let categorySlug: string | null = null;
  let tagSlug: string | null = null;

  // Parse path-based filters: /blog/category/:slug or /blog/tag/:slug
  const categoryMatch = path.match(/^\/blog\/category\/([^/?]+)/);
  const tagMatch = path.match(/^\/blog\/tag\/([^/?]+)/);

  if (categoryMatch) categorySlug = decodeURIComponent(categoryMatch[1]);
  if (tagMatch) tagSlug = decodeURIComponent(tagMatch[1]);

  return {
    categorySlug,
    tagSlug,
    search: params.get('q') || '',
    page: parseInt(params.get('page') || '1', 10),
  };
}

export function useURLFilters(): [BlogFilters, (updates: Partial<BlogFilters>) => void, () => void] {
  const [filters, setFilters] = useState<BlogFilters>(parseURL);

  // Sync state to URL
  const updateFilters = useCallback((updates: Partial<BlogFilters>) => {
    setFilters(prev => {
      const newFilters = { ...prev, ...updates };

      // Reset page when filters change (except page itself)
      if (!('page' in updates)) {
        newFilters.page = 1;
      }

      // Build new URL
      let path = '/blog';
      if (newFilters.categorySlug) {
        path = `/blog/category/${encodeURIComponent(newFilters.categorySlug)}`;
      } else if (newFilters.tagSlug) {
        path = `/blog/tag/${encodeURIComponent(newFilters.tagSlug)}`;
      }

      const params = new URLSearchParams();
      if (newFilters.search) params.set('q', newFilters.search);
      if (newFilters.page > 1) params.set('page', String(newFilters.page));

      const query = params.toString();
      const url = query ? `${path}?${query}` : path;

      window.history.pushState({}, '', url);
      return newFilters;
    });
  }, []);

  // Clear all filters
  const clearFilters = useCallback(() => {
    setFilters({ categorySlug: null, tagSlug: null, search: '', page: 1 });
    window.history.pushState({}, '', '/blog');
  }, []);

  // Handle browser back/forward
  useEffect(() => {
    const handlePopState = () => setFilters(parseURL());
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return [filters, updateFilters, clearFilters];
}
