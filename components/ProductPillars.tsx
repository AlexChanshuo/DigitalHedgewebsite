
import React from 'react';
import { Page } from '../App';

interface ProductPillarsProps {
  onNavigate: (page: Page) => void;
}

const products = [
  {
    id: 'voice-of-choice' as Page,
    title: '民選之聲',
    subtitle: 'AI 民調系統',
    description: '一天完成傳統民調一週的工作。AI 自動撥打、自動分析、報告直送 LINE。選戰期間，每一天都是關鍵。',
    tag: '快速民調',
    iconPath: "M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
  },
  {
    id: 'sales-ai' as Page,
    title: '語音 AI 業務',
    subtitle: '自動開發客戶',
    description: 'AI 幫你打電話、約客戶、排進行事曆。你只需要在約好的時間出現就好。一天處理千通電話，不累、不抱怨、不請假。',
    tag: '自動銷售',
    iconPath: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
  },
  {
    id: 'voice-survey' as Page,
    title: '語音 AI 調查',
    subtitle: '用你的聲音調查',
    description: '用你的聲音打給每一位客戶。AI 學習你的聲音與語氣，大規模調查但保持一對一的溫度。',
    tag: '品牌連結',
    iconPath: "M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
  },
  {
    id: 'ai-agent' as Page,
    title: 'AI Agent 顧問',
    subtitle: '打造你的 AI 團隊',
    description: '協助企業建立專屬 AI Agent 和 AI Agent 團隊。從個人助理到部門級協作，讓 AI 成為你的第 N+1 號員工。',
    tag: 'AI 團隊',
    iconPath: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
  }
];

const ProductPillars: React.FC<ProductPillarsProps> = ({ onNavigate }) => {
  return (
    <section id="products" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-xs tracking-[0.3em] text-[#D4A373] uppercase mb-4 font-bold">Product Matrix</h2>
          <h3 className="text-4xl md:text-5xl font-bold text-[#2C2420] font-serif">核心產品矩陣</h3>
          <p className="mt-4 text-[#2C2420]/60 max-w-2xl mx-auto font-light">
            我們利用 AI 語音技術解決傳統調查與業務開發的「慢、貴、不準」三大痛點。
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {products.map((p, index) => (
            <div 
              key={p.id} 
              onClick={() => onNavigate(p.id)}
              className={`card-coffee rounded-[2rem] p-10 flex flex-col h-full cursor-pointer group relative overflow-hidden ${index === 0 ? 'border-[#D4A373] bg-white' : ''}`}
            >
              {/* Highlight for First Item */}
              {index === 0 && (
                <div className="absolute top-4 right-4 bg-[#D4A373] text-white text-[10px] px-3 py-1 rounded-full uppercase tracking-widest font-bold">
                  Flagship
                </div>
              )}

              <div className="mb-8 w-16 h-16 rounded-full bg-[#FAF9F6] border border-[#E0E0E0] flex items-center justify-center text-[#2C2420] group-hover:bg-[#2C2420] group-hover:text-[#D4A373] transition-colors duration-500 shadow-sm">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d={p.iconPath} />
                </svg>
              </div>
              
              <div className="text-[10px] tracking-widest text-[#D4A373] uppercase mb-3 font-bold">{p.tag}</div>
              <h4 className="text-2xl font-bold mb-1 text-[#2C2420] font-serif">{p.title}</h4>
              <p className="text-sm text-[#2C2420]/40 font-medium mb-6 uppercase tracking-wider">{p.subtitle}</p>
              
              <p className="text-[#2C2420]/70 font-light leading-relaxed mb-8 flex-grow">
                {p.description}
              </p>
              
              <button className="flex items-center space-x-2 text-sm font-bold text-[#2C2420] group-hover:text-[#D4A373] transition-colors">
                <span>查看功能詳情</span>
                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductPillars;
