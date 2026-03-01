
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Page } from '../App';

interface ProductPillarsProps {
  onNavigate: (page: Page) => void;
}

const productIcons = {
  'voice-ai': "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z",
  'agentic-workforce': "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
  'agentic-impact': "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
};

const ProductPillars: React.FC<ProductPillarsProps> = ({ onNavigate }) => {
  const { t } = useTranslation();

  const products = [
    {
      id: 'voice-ai' as Page,
      title: t('productPillars.items.voiceAI.title'),
      subtitle: t('productPillars.items.voiceAI.subtitle'),
      description: t('productPillars.items.voiceAI.description'),
      tag: t('productPillars.items.voiceAI.tag'),
      iconPath: productIcons['voice-ai']
    },
    {
      id: 'agentic-workforce' as Page,
      title: t('productPillars.items.agenticWorkforce.title'),
      subtitle: t('productPillars.items.agenticWorkforce.subtitle'),
      description: t('productPillars.items.agenticWorkforce.description'),
      tag: t('productPillars.items.agenticWorkforce.tag'),
      iconPath: productIcons['agentic-workforce']
    },
    {
      id: 'agentic-impact' as Page,
      title: t('productPillars.items.agenticImpact.title'),
      subtitle: t('productPillars.items.agenticImpact.subtitle'),
      description: t('productPillars.items.agenticImpact.description'),
      tag: t('productPillars.items.agenticImpact.tag'),
      iconPath: productIcons['agentic-impact']
    }
  ];
  return (
    <section id="products" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-xs tracking-[0.3em] text-[#D4A373] uppercase mb-4 font-bold">{t('productPillars.badge')}</h2>
          <h3 className="text-4xl md:text-5xl font-bold text-[#2C2420] font-serif">{t('productPillars.title')}</h3>
          <p className="mt-4 text-[#2C2420]/60 max-w-2xl mx-auto font-light">
            {t('productPillars.description')}
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
                  {t('productPillars.flagship')}
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
                <span>{t('productPillars.viewDetails')}</span>
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
