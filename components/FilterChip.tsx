// components/FilterChip.tsx
import React from 'react';

export interface FilterChipProps {
  label: string;
  type: 'category' | 'tag' | 'search';
  onRemove: () => void;
}

const FilterChip: React.FC<FilterChipProps> = ({ label, type, onRemove }) => {
  const colors = {
    category: 'bg-[#D4A373]/10 text-[#D4A373] border-[#D4A373]/20',
    tag: 'bg-[#2C2420]/10 text-[#2C2420] border-[#2C2420]/20',
    search: 'bg-blue-50 text-blue-600 border-blue-200',
  };

  const icons = {
    category: (
      <svg className="w-3.5 h-3.5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z" />
      </svg>
    ),
    tag: (
      <svg className="w-3.5 h-3.5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
      </svg>
    ),
    search: (
      <svg className="w-3.5 h-3.5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm border ${colors[type]} transition-all hover:shadow-sm`}
    >
      {icons[type]}
      <span className="max-w-[150px] truncate">{label}</span>
      <button
        onClick={onRemove}
        className="ml-2 p-0.5 rounded-full hover:bg-black/10 transition-colors"
        aria-label={`Remove ${type} filter: ${label}`}
      >
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </span>
  );
};

export default FilterChip;
