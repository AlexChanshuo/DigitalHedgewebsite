import React from 'react';
import { useTranslation } from 'react-i18next';
import AIGeneratedImage from '../components/AIGeneratedImage';
import SEO from '../components/SEO';
import BreadcrumbSchema from '../components/seo/BreadcrumbSchema';
import FAQSchema from '../components/seo/FAQSchema';

const VoiceOfChoice: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { t } = useTranslation();
  
  return (
    <>
      <SEO
        title="Voice of Choice - AI 自動化電話民調系統"
        description="專為選戰設計的 AI 自動化電話民調系統。解決傳統民調速度慢、成本高、人為誤差大的痛點，提供全字稿紀錄與 LINE 即時報告。"
        url="/products/voice-of-choice"
      />
      <BreadcrumbSchema
        items={[
          { name: '首頁', url: '/' },
          { name: 'Voice of Choice' }
        ]}
      />
      <FAQSchema
        faqs={[
          {
            question: "Voice of Choice 是什麼？",
            answer: "Voice of Choice 是 Digital Hedge 的 AI 自動化電話民調系統，專為選戰設計。透過 AI 進行標準化問卷調查，並將所有對話轉為逐字稿，最後透過 LINE 即時傳送分析報告。"
          },
          {
            question: "Voice of Choice 與傳統民調有什麼不同？",
            answer: "相較於傳統民調耗時數週、成本高且容易有人為誤差，Voice of Choice 數小時內即可完成數千通有效樣本撥打，一天內產出完整報告，且所有對話都有逐字稿紀錄可回溯驗證。"
          },
          {
            question: "Voice of Choice 如何確保民調數據準確性？",
            answer: "AI 自動將每通電話轉為逐字稿，並標記關鍵字與情緒，確保數據精準可回溯。標準化的 AI 提問避免了人工電訪員可能的誘導回答或紀錄偏差問題。"
          }
        ]}
      />
      <div className="pt-10 pb-20 animate-in fade-in duration-700 bg-[#FAF9F6] min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <button onClick={onBack} className="text-[#2C2420]/50 hover:text-[#D4A373] transition-colors flex items-center space-x-2 mb-12 uppercase tracking-widest text-xs font-bold bg-white border border-[#E0E0E0] px-4 py-2 rounded-full w-fit">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
          <span>{t('common.backToProducts')}</span>
        </button>

        <div className="grid lg:grid-cols-2 gap-20 mb-20">
          <div>
            <div className="inline-block px-4 py-1 rounded-full bg-[#D4A373]/10 text-[#D4A373] text-[10px] tracking-[0.2em] uppercase mb-6 font-bold border border-[#D4A373]/20">
              {t('pages.voiceOfChoice.badge')}
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight text-[#2C2420] font-serif">
              {t('pages.voiceOfChoice.title1')}<br />
              <span className="text-[#D4A373]">{t('pages.voiceOfChoice.title2')}</span>
            </h1>
            <p className="text-xl text-[#2C2420]/60 mb-8 font-light leading-relaxed">
              {t('pages.voiceOfChoice.description')}
            </p>

            <div className="flex flex-col space-y-4">
              <div className="flex items-center space-x-3 text-[#2C2420]">
                <div className="w-6 h-6 rounded-full bg-[#D4A373] flex items-center justify-center text-white text-xs">✓</div>
                <span>{t('pages.voiceOfChoice.features.transcripts')}</span>
              </div>
              <div className="flex items-center space-x-3 text-[#2C2420]">
                <div className="w-6 h-6 rounded-full bg-[#D4A373] flex items-center justify-center text-white text-xs">✓</div>
                <span>{t('pages.voiceOfChoice.features.targeting')}</span>
              </div>
              <div className="flex items-center space-x-3 text-[#2C2420]">
                <div className="w-6 h-6 rounded-full bg-[#D4A373] flex items-center justify-center text-white text-xs">✓</div>
                <span>{t('pages.voiceOfChoice.features.lineReport')}</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="sticky top-40 aspect-square rounded-[3rem] overflow-hidden shadow-2xl border border-[#E0E0E0] bg-white">
              <AIGeneratedImage
                prompt="Voice of Choice Survey System"
                staticImage="Voice-ofChoice.webp"
                className="w-full h-full"
                aspectRatio="1:1"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2C2420]/80 to-transparent flex items-end p-12">
                <p className="text-[#D4A373] text-xs tracking-[0.5em] font-bold">AUTOMATED SURVEY</p>
              </div>
            </div>
          </div>
        </div>

        {/* 痛點對比區塊 */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-10 text-[#2C2420] text-center font-serif">{t('pages.voiceOfChoice.whyAI')}</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* 傳統民調痛點 */}
            <div className="bg-white/50 p-8 rounded-3xl border border-red-100">
              <h3 className="text-xl font-bold mb-6 text-[#2C2420]/80 flex items-center">
                <span className="w-2 h-2 bg-red-400 rounded-full mr-3"></span>
                {t('pages.voiceOfChoice.painPoints.title')}
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3 text-[#2C2420]/60">
                  <svg className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                  <span><strong>{t('pages.voiceOfChoice.painPoints.slow')}</strong>{t('pages.voiceOfChoice.painPoints.slowDesc')}</span>
                </li>
                <li className="flex items-start space-x-3 text-[#2C2420]/60">
                  <svg className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                  <span><strong>{t('pages.voiceOfChoice.painPoints.error')}</strong>{t('pages.voiceOfChoice.painPoints.errorDesc')}</span>
                </li>
                <li className="flex items-start space-x-3 text-[#2C2420]/60">
                  <svg className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                  <span><strong>{t('pages.voiceOfChoice.painPoints.opaque')}</strong>{t('pages.voiceOfChoice.painPoints.opaqueDesc')}</span>
                </li>
              </ul>
            </div>

            {/* AI 民調優勢 */}
            <div className="bg-white p-8 rounded-3xl border border-[#D4A373] shadow-lg">
              <h3 className="text-xl font-bold mb-6 text-[#2C2420] flex items-center">
                <span className="w-2 h-2 bg-[#D4A373] rounded-full mr-3"></span>
                {t('pages.voiceOfChoice.advantages.title')}
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3 text-[#2C2420]">
                  <svg className="w-5 h-5 text-[#D4A373] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                  <span><strong>{t('pages.voiceOfChoice.advantages.fast')}</strong>{t('pages.voiceOfChoice.advantages.fastDesc')}</span>
                </li>
                <li className="flex items-start space-x-3 text-[#2C2420]">
                  <svg className="w-5 h-5 text-[#D4A373] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                  <span><strong>{t('pages.voiceOfChoice.advantages.transcript')}</strong>{t('pages.voiceOfChoice.advantages.transcriptDesc')}</span>
                </li>
                <li className="flex items-start space-x-3 text-[#2C2420]">
                  <svg className="w-5 h-5 text-[#D4A373] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                  <span><strong>{t('pages.voiceOfChoice.advantages.line')}</strong>{t('pages.voiceOfChoice.advantages.lineDesc')}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* 流程圖示 */}
        <div className="bg-white rounded-[2rem] p-10 border border-[#E0E0E0]">
          <h3 className="text-2xl font-bold mb-8 text-center text-[#2C2420]">{t('pages.voiceOfChoice.process.title')}</h3>
          <div className="grid md:grid-cols-4 gap-4 text-center">
            <div className="p-4">
              <div className="w-12 h-12 bg-[#FAF9F6] rounded-full flex items-center justify-center mx-auto mb-4 text-[#D4A373] font-bold border border-[#E0E0E0]">1</div>
              <h4 className="font-bold text-[#2C2420]">{t('pages.voiceOfChoice.process.step1')}</h4>
              <p className="text-xs text-[#2C2420]/50 mt-2">{t('pages.voiceOfChoice.process.step1Desc')}</p>
            </div>
            <div className="p-4">
              <div className="w-12 h-12 bg-[#FAF9F6] rounded-full flex items-center justify-center mx-auto mb-4 text-[#D4A373] font-bold border border-[#E0E0E0]">2</div>
              <h4 className="font-bold text-[#2C2420]">{t('pages.voiceOfChoice.process.step2')}</h4>
              <p className="text-xs text-[#2C2420]/50 mt-2">{t('pages.voiceOfChoice.process.step2Desc')}</p>
            </div>
            <div className="p-4">
              <div className="w-12 h-12 bg-[#FAF9F6] rounded-full flex items-center justify-center mx-auto mb-4 text-[#D4A373] font-bold border border-[#E0E0E0]">3</div>
              <h4 className="font-bold text-[#2C2420]">{t('pages.voiceOfChoice.process.step3')}</h4>
              <p className="text-xs text-[#2C2420]/50 mt-2">{t('pages.voiceOfChoice.process.step3Desc')}</p>
            </div>
            <div className="p-4">
              <div className="w-12 h-12 bg-[#FAF9F6] rounded-full flex items-center justify-center mx-auto mb-4 text-[#D4A373] font-bold border border-[#E0E0E0]">4</div>
              <h4 className="font-bold text-[#2C2420]">{t('pages.voiceOfChoice.process.step4')}</h4>
              <p className="text-xs text-[#2C2420]/50 mt-2">{t('pages.voiceOfChoice.process.step4Desc')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default VoiceOfChoice;
