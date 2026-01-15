
import React from 'react';
import AIGeneratedImage from '../components/AIGeneratedImage';

const IndustryVoice: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <div className="pt-10 pb-20 animate-in fade-in duration-700 bg-[#FAF9F6] min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <button onClick={onBack} className="text-[#2C2420]/50 hover:text-[#D4A373] transition-colors flex items-center space-x-2 mb-12 uppercase tracking-widest text-xs font-bold bg-white border border-[#E0E0E0] px-4 py-2 rounded-full w-fit">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
          <span>Back to Strategy</span>
        </button>

        <div className="flex flex-col lg:flex-row gap-12 mb-16 items-center">
          <div className="flex-1">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-[#2C2420] font-serif">
              產業語音 AI<br />
              <span className="text-[#D4A373]">Elite Concierge AI</span>
            </h1>
            <p className="text-[#2C2420]/60 text-lg font-light max-w-xl">
              針對高端垂直產業優化，提供超越人類極限的專業禮賓服務。如同一位訓練有素的數位管家，溫暖、細緻且精準。
            </p>
          </div>
          <div className="w-full lg:w-[400px] rounded-[2rem] overflow-hidden shadow-2xl border border-[#E0E0E0] bg-white">
             <AIGeneratedImage 
               prompt="Elegant glass interface with golden sound waves, minimalism, luxury hotel aesthetic, warm ambient light, tech screen"
               staticImage="assets/page-industry-main.png"
               className="w-full h-[300px]"
               aspectRatio="4:3"
             />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-20">
          <div className="card-coffee p-12 rounded-2xl group hover:border-[#D4A373] transition-all bg-white">
            <h4 className="text-2xl font-bold mb-6 flex items-center space-x-3 text-[#2C2420]">
              <span className="w-8 h-8 rounded-full bg-[#FAF9F6] border border-[#D4A373] text-[#D4A373] flex items-center justify-center text-sm">H</span>
              <span>精品旅館 (Hospitality)</span>
            </h4>
            <p className="text-[#2C2420]/60 font-light leading-relaxed">
              24H 語音禮賓與個人化訂房。AI 能識別尊榮會員的偏好，提供最貼心的入住安排。
            </p>
          </div>
          <div className="card-coffee p-12 rounded-2xl group hover:border-[#D4A373] transition-all bg-white">
            <h4 className="text-2xl font-bold mb-6 flex items-center space-x-3 text-[#2C2420]">
              <span className="w-8 h-8 rounded-full bg-[#FAF9F6] border border-[#D4A373] text-[#D4A373] flex items-center justify-center text-sm">M</span>
              <span>醫療美容 (Medical)</span>
            </h4>
            <p className="text-[#2C2420]/60 font-light leading-relaxed">
              專業療程導引與術後關懷。AI 具備醫學知識庫，隨時安撫客戶的不安。
            </p>
          </div>
          <div className="card-coffee p-12 rounded-2xl group hover:border-[#D4A373] transition-all md:col-span-2 bg-white">
            <h4 className="text-2xl font-bold mb-6 flex items-center space-x-3 text-[#2C2420]">
              <span className="w-8 h-8 rounded-full bg-[#FAF9F6] border border-[#D4A373] text-[#D4A373] flex items-center justify-center text-sm">P</span>
              <span>寵物產業 (Pet Wellness)</span>
            </h4>
            <p className="text-[#2C2420]/60 font-light leading-relaxed max-w-2xl">
              健康數據反饋與行為諮詢。針對高階寵物家庭，提供即時的行為解析。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndustryVoice;
