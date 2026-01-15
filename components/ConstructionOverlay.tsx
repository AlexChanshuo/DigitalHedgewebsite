
import React from 'react';

interface ConstructionOverlayProps {
  onClose: () => void;
}

const ConstructionOverlay: React.FC<ConstructionOverlayProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-white/80 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="bg-white max-w-xl w-full p-12 text-center rounded-3xl border border-[#E9ECEF] shadow-2xl relative">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-slate-400 hover:text-[#2A9D8F] transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <div className="w-20 h-20 bg-[#E0F2F1] rounded-full flex items-center justify-center mx-auto mb-8 text-[#2A9D8F]">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
          </svg>
        </div>
        
        <h2 className="text-3xl font-bold mb-4 tracking-tighter text-[#264653]">網站建置中</h2>
        <p className="text-slate-500 font-light mb-10 leading-relaxed">
          數位對沖戰略系統與語音 AI 代理人目前正在進行深度部署與微調。<br />
          為了提供最高品質的對沖體驗，語音諮詢功能將於近期對外開放。
        </p>
        
        <button 
          onClick={onClose}
          className="px-10 py-4 bg-[#264653] hover:bg-[#2A9D8F] text-white font-bold uppercase tracking-[0.2em] text-xs transition-all shadow-lg rounded-full"
        >
          返回官網
        </button>
      </div>
    </div>
  );
};

export default ConstructionOverlay;
