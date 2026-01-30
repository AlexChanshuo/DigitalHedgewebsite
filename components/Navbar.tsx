import React, { useState } from 'react';
import { Page } from '../App';

interface NavbarProps {
  isScrolled: boolean;
  currentPage: Page;
  onNavigate: (page: Page) => void;
  onOpenConsulting: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isScrolled, currentPage, onNavigate, onOpenConsulting }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const products = [
    { id: 'voice-of-choice', name: '民選之聲 (Political Survey)' },
    { id: 'sales-ai', name: '語音 AI 業務 (Sales Agent)' },
    { id: 'voice-survey', name: '語音 AI 調查 (Voice Survey)' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-[#FAF9F6]/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo Area */}
        <button onClick={() => onNavigate('home')} className="flex items-center space-x-3 group">
          <div className="w-8 h-8 border border-[#2C2420] rounded-lg flex items-center justify-center text-[#2C2420] font-serif font-bold text-xs group-hover:bg-[#2C2420] group-hover:text-[#D4A373] transition-colors duration-500">
            PP
          </div>
          <span className="text-xl font-bold tracking-tight text-[#2C2420]">PAIN POINT</span>
        </button>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-10 text-sm font-medium items-center text-[#2C2420]/70">
          <button onClick={() => onNavigate('home')} className={`hover:text-[#D4A373] transition-colors ${currentPage === 'home' ? 'text-[#D4A373]' : ''}`}>品牌哲學</button>
          
          <div 
            className="relative"
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            <button className={`hover:text-[#D4A373] transition-colors flex items-center space-x-1 h-full py-2 ${['voice-of-choice', 'sales-ai', 'voice-survey'].includes(currentPage) ? 'text-[#D4A373]' : ''}`}>
              <span>產品矩陣</span>
              <svg className={`w-3 h-3 transition-transform duration-300 ${showDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            <div 
              className={`absolute top-full left-1/2 -translate-x-1/2 w-64 pt-4 transition-all duration-300 origin-top ${showDropdown ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'}`}
            >
              <div className="bg-white/95 backdrop-blur-xl border border-[#D4A373]/20 shadow-xl rounded-xl overflow-hidden p-2">
                {products.map(p => (
                  <button 
                    key={p.id}
                    onClick={() => { 
                      onNavigate(p.id as Page); 
                      setShowDropdown(false); 
                    }}
                    className="w-full text-left px-4 py-3 rounded-lg hover:bg-[#FAF9F6] text-[#2C2420] hover:text-[#D4A373] transition-colors text-sm font-medium"
                  >
                    {p.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button 
            onClick={() => onNavigate('blog')} 
            className={`hover:text-[#D4A373] transition-colors ${currentPage === 'blog' || currentPage === 'blog-post' ? 'text-[#D4A373]' : ''}`}
          >
            部落格
          </button>

        </div>

        {/* CTA Button */}
        <button 
          onClick={onOpenConsulting}
          className="px-6 py-2.5 bg-[#2C2420] hover:bg-[#D4A373] text-[#FAF9F6] transition-all rounded-full text-sm font-medium shadow-lg hover:shadow-[#D4A373]/30"
        >
          預約演示
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
