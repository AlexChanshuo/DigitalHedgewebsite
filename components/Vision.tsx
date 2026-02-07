import React from 'react';
import { useTranslation } from 'react-i18next';
import AIGeneratedImage from './AIGeneratedImage';

const Vision: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <section id="vision" className="py-32 relative bg-[#F5F7FA]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-xs tracking-[0.3em] text-[#D4A373] uppercase mb-4 font-bold">{t('vision.badge')}</h2>
            <h3 className="text-4xl font-bold mb-6 text-[#2C2420] leading-tight font-serif">
              {t('vision.title1')}<br />{t('vision.title2')}
            </h3>
            <p className="text-lg text-[#2C2420]/60 mb-8 leading-relaxed font-light">
              {t('vision.description')}
            </p>

            <div className="space-y-6">
              <div className="group flex items-start space-x-6 p-6 bg-white rounded-2xl border border-[#E0E0E0] shadow-sm hover:border-[#D4A373] transition-all">
                <div className="text-3xl font-serif text-[#D4A373] font-bold opacity-50">{t('vision.stat1')}</div>
                <div>
                  <h4 className="text-xl font-bold mb-2 text-[#2C2420]">{t('vision.stat1Title')}</h4>
                  <p className="text-[#2C2420]/50 text-sm leading-relaxed">{t('vision.stat1Desc')}</p>
                </div>
              </div>
              <div className="group flex items-start space-x-6 p-6 bg-white rounded-2xl border border-[#E0E0E0] shadow-sm hover:border-[#D4A373] transition-all">
                <div className="text-3xl font-serif text-[#D4A373] font-bold opacity-50">{t('vision.stat2')}</div>
                <div>
                  <h4 className="text-xl font-bold mb-2 text-[#2C2420]">{t('vision.stat2Title')}</h4>
                  <p className="text-[#2C2420]/50 text-sm leading-relaxed">{t('vision.stat2Desc')}</p>
                </div>
              </div>
              <div className="group flex items-start space-x-6 p-6 bg-white rounded-2xl border border-[#E0E0E0] shadow-sm hover:border-[#D4A373] transition-all">
                <div className="text-3xl font-serif text-[#D4A373] font-bold opacity-50">{t('vision.stat3')}</div>
                <div>
                  <h4 className="text-xl font-bold mb-2 text-[#2C2420]">{t('vision.stat3Title')}</h4>
                  <p className="text-[#2C2420]/50 text-sm leading-relaxed">{t('vision.stat3Desc')}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-white p-3 rounded-[2rem] border border-[#E0E0E0] shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-700">
              <AIGeneratedImage
                prompt="AI Filtering visualization"
                staticImage="Infinite-AIFiltering.webp"
                className="rounded-[1.5rem] w-full aspect-square"
                aspectRatio="1:1"
              />
            </div>
            <div className="absolute -bottom-10 -right-10 text-[200px] text-[#2C2420] opacity-[0.03] font-serif leading-none select-none">
              AI
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Vision;
