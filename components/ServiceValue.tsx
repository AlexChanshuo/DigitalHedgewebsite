import React from 'react';
import { useTranslation } from 'react-i18next';
import AIGeneratedImage from './AIGeneratedImage';

const ServiceValue: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <section id="services" className="py-32 relative overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Images Grid */}
          <div className="order-2 lg:order-1">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-6 mt-12">
                {/* Ingestion */}
                <div className="bg-[#FAF9F6] p-2 rounded-2xl shadow-sm border border-[#E0E0E0]">
                  <div className="h-56 rounded-xl overflow-hidden relative">
                    <AIGeneratedImage
                      prompt="Data Ingestion visualization"
                      staticImage="DataIngestion.webp"
                      className="w-full h-full object-cover mix-blend-multiply opacity-90"
                      aspectRatio="3:4"
                    />
                  </div>
                  <div className="p-4">
                    <h5 className="font-bold text-[#2C2420]">{t('serviceValue.ingestion')}</h5>
                    <p className="text-xs text-[#2C2420]/50 mt-1">{t('serviceValue.ingestionSub')}</p>
                  </div>
                </div>
                {/* Storage */}
                <div className="bg-[#FAF9F6] p-2 rounded-2xl shadow-sm border border-[#E0E0E0]">
                  <div className="h-40 rounded-xl overflow-hidden relative">
                    <AIGeneratedImage
                      prompt="AI Filtering visualization"
                      staticImage="Infinite-AIFiltering.webp"
                      className="w-full h-full object-cover mix-blend-multiply opacity-90"
                      aspectRatio="1:1"
                    />
                  </div>
                  <div className="p-4">
                    <h5 className="font-bold text-[#2C2420]">{t('serviceValue.storage')}</h5>
                    <p className="text-xs text-[#2C2420]/50 mt-1">{t('serviceValue.storageSub')}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                {/* Calibration */}
                <div className="bg-[#FAF9F6] p-2 rounded-2xl shadow-sm border border-[#E0E0E0]">
                  <div className="h-40 rounded-xl overflow-hidden relative">
                    <AIGeneratedImage
                      prompt="Model Calibration visualization"
                      staticImage="ModelCalibration.webp"
                      className="w-full h-full object-cover mix-blend-multiply opacity-90"
                      aspectRatio="1:1"
                    />
                  </div>
                  <div className="p-4">
                    <h5 className="font-bold text-[#2C2420]">{t('serviceValue.calibration')}</h5>
                    <p className="text-xs text-[#2C2420]/50 mt-1">{t('serviceValue.calibrationSub')}</p>
                  </div>
                </div>
                {/* Synthesis */}
                <div className="bg-[#FAF9F6] p-2 rounded-2xl shadow-sm border border-[#E0E0E0]">
                  <div className="h-56 rounded-xl overflow-hidden relative">
                    <AIGeneratedImage
                      prompt="AI Synthesis visualization"
                      staticImage="AISynthesis.webp"
                      className="w-full h-full object-cover mix-blend-multiply opacity-90"
                      aspectRatio="3:4"
                    />
                  </div>
                  <div className="p-4">
                    <h5 className="font-bold text-[#2C2420]">{t('serviceValue.synthesis')}</h5>
                    <p className="text-xs text-[#2C2420]/50 mt-1">{t('serviceValue.synthesisSub')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="order-1 lg:order-2">
            <h2 className="text-xs tracking-[0.3em] text-[#D4A373] uppercase mb-6 font-bold">{t('serviceValue.badge')}</h2>
            <h3 className="text-4xl md:text-5xl font-bold mb-8 leading-tight text-[#2C2420] font-serif">
              {t('serviceValue.title1')}<br />{t('serviceValue.title2')}
            </h3>
            <p className="text-lg text-[#2C2420]/60 mb-8 leading-relaxed font-light">
              {t('serviceValue.description')}
            </p>
            <ul className="space-y-6">
              {[
                t('serviceValue.step1'),
                t('serviceValue.step2'),
                t('serviceValue.step3')
              ].map((item, idx) => (
                <li key={idx} className="flex items-center space-x-4 p-4 bg-[#FAF9F6] rounded-xl shadow-sm border border-[#E0E0E0] hover:border-[#D4A373] transition-colors">
                  <span className="w-8 h-8 bg-[#D4A373] rounded-full flex-shrink-0 flex items-center justify-center text-white font-bold text-sm">{idx + 1}</span>
                  <span className="text-[#2C2420] font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceValue;
