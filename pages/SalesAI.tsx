import React from 'react';
import AIGeneratedImage from '../components/AIGeneratedImage';
import SEO from '../components/SEO';
import BreadcrumbSchema from '../components/seo/BreadcrumbSchema';
import FAQSchema from '../components/seo/FAQSchema';

const SalesAI: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <>
      <SEO
        title="Sales AI - 語音 AI 業務與客戶服務系統"
        description="專為舊客激活與產品推薦設計的 AI 業務系統。自動撥號開發、行事曆串接，讓 AI 將有興趣的客戶直接預約到您的行事曆。"
        url="/products/sales-ai"
      >
        <BreadcrumbSchema
          items={[
            { name: '首頁', url: '/' },
            { name: 'Sales AI' }
          ]}
        />
        <FAQSchema
          faqs={[
            {
              question: "Sales AI 能提升多少銷售轉換率？",
              answer: "根據客戶案例，Sales AI 平均提升 30-50% 的銷售轉換率，因為 AI 能 24/7 不間斷進行客戶開發，且面對拒絕依然保持完美禮貌與熱情。"
            },
            {
              question: "Sales AI 如何處理複雜的銷售問題？",
              answer: "Sales AI 基於您的產品知識庫訓練，能處理常見問題。遇到複雜問題時，AI 會記錄客戶需求，並在預約時段由真人業務人員跟進處理。"
            },
            {
              question: "Sales AI 是否支援行事曆整合？",
              answer: "支援。當客戶表示有興趣時，AI 能直接與客戶核對時間，並即時將會議或體驗時段寫入您的 Google/Outlook 行事曆。業務人員只需在預約好的時間出現即可。"
            }
          ]}
        />
      </SEO>
      <div className="pt-10 pb-20 animate-in fade-in duration-700 bg-[#FAF9F6] min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <button onClick={onBack} className="text-[#2C2420]/50 hover:text-[#D4A373] transition-colors flex items-center space-x-2 mb-12 uppercase tracking-widest text-xs font-bold bg-white border border-[#E0E0E0] px-4 py-2 rounded-full w-fit">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
          <span>Back to Products</span>
        </button>

        <div className="flex flex-col lg:flex-row gap-12 mb-16 items-center">
          <div className="flex-1">
            <div className="inline-block px-4 py-1 rounded-full bg-[#D4A373]/10 text-[#D4A373] text-[10px] tracking-[0.2em] uppercase mb-6 font-bold border border-[#D4A373]/20">
              Voice AI Sales Agent
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight text-[#2C2420] font-serif">
              語音 AI 業務<br />
              <span className="text-[#D4A373]">& 客戶服務系統</span>
            </h1>
            <p className="text-[#2C2420]/60 text-lg font-light max-w-xl mb-8">
              專為「舊客激活」與「產品推薦」設計的超級業務員。它不知疲倦、沒有情緒，能自動將有興趣的客戶直接預約到您的行事曆上。
            </p>

            <div className="flex space-x-4">
              <span className="px-4 py-2 bg-white rounded-lg border border-[#E0E0E0] text-xs font-bold text-[#2C2420] shadow-sm">自動撥號開發</span>
              <span className="px-4 py-2 bg-white rounded-lg border border-[#E0E0E0] text-xs font-bold text-[#2C2420] shadow-sm">行事曆串接</span>
              <span className="px-4 py-2 bg-white rounded-lg border border-[#E0E0E0] text-xs font-bold text-[#2C2420] shadow-sm">零情緒耗損</span>
            </div>
          </div>
          <div className="w-full lg:w-[500px] rounded-[2rem] overflow-hidden shadow-2xl border border-[#E0E0E0] bg-white">
            <AIGeneratedImage
              prompt="Voice AI Sales Agent"
              staticImage="VoiceAISalesAgent.webp"
              className="w-full h-[350px]"
              aspectRatio="4:3"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {/* 核心功能 */}
          <div className="card-coffee p-10 rounded-2xl bg-white group hover:border-[#D4A373] transition-all">
            <div className="w-12 h-12 bg-[#FAF9F6] rounded-full flex items-center justify-center mb-6 text-[#D4A373]">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            </div>
            <h4 className="text-2xl font-bold mb-4 text-[#2C2420]">自動預約與行事曆整合</h4>
            <p className="text-[#2C2420]/60 font-light leading-relaxed">
              不只是打電話。當客戶表示有興趣時，AI 能直接與客戶核對時間，並即時將會議或體驗時段寫入您的 Google/Outlook 行事曆。業務人員只需在預約好的時間出現即可。
            </p>
          </div>

          <div className="card-coffee p-10 rounded-2xl bg-white group hover:border-[#D4A373] transition-all">
            <div className="w-12 h-12 bg-[#FAF9F6] rounded-full flex items-center justify-center mb-6 text-[#D4A373]">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <h4 className="text-2xl font-bold mb-4 text-[#2C2420]">消除「情緒勞動」與耗損</h4>
            <p className="text-[#2C2420]/60 font-light leading-relaxed">
              真人業務每天打 50 通電話就會疲憊、害怕被拒絕。AI 可以每天撥打數千通，面對拒絕依然保持完美禮貌與熱情，大幅降低人員流動率與管理成本。
            </p>
          </div>
        </div>

        {/* 應用場景 */}
        <div className="bg-white rounded-[2rem] p-10 border border-[#E0E0E0] shadow-sm">
          <h3 className="text-2xl font-bold mb-8 text-[#2C2420] text-center font-serif">適用場景</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-[#FAF9F6] rounded-xl border border-[#E0E0E0]">
              <h5 className="font-bold text-[#2C2420] mb-2">舊客激活 (Recall)</h5>
              <p className="text-sm text-[#2C2420]/60">針對沈睡客戶名單進行新品通知或優惠推播，喚醒率遠高於簡訊。</p>
            </div>
            <div className="p-6 bg-[#FAF9F6] rounded-xl border border-[#E0E0E0]">
              <h5 className="font-bold text-[#2C2420] mb-2">體驗課預約</h5>
              <p className="text-sm text-[#2C2420]/60">補教業、健身房或醫美診所，自動邀請客戶預約體驗課程並壓好時間。</p>
            </div>
            <div className="p-6 bg-[#FAF9F6] rounded-xl border border-[#E0E0E0]">
              <h5 className="font-bold text-[#2C2420] mb-2">滿意度調查</h5>
              <p className="text-sm text-[#2C2420]/60">售後自動關懷，收集真實反饋，並在發現負評時即時通知主管介入。</p>
            </div>
          </div>
        </div>

      </div>
    </div>
    </>
  );
};

export default SalesAI;
