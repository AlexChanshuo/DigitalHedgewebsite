
import React from 'react';
import AIGeneratedImage from '../components/AIGeneratedImage';

const CognitiveHedge: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <div className="pt-10 pb-20 animate-in fade-in duration-700 bg-[#FAF9F6] min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <button onClick={onBack} className="text-[#2C2420]/50 hover:text-[#D4A373] transition-colors flex items-center space-x-2 mb-12 uppercase tracking-widest text-xs font-bold bg-white border border-[#E0E0E0] px-4 py-2 rounded-full w-fit">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
          <span>Back to Strategy</span>
        </button>

        <div className="max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight text-[#2C2420] font-serif">
            認知對沖系統<br />
            <span className="text-[#D4A373] font-light italic">The Cognitive Hedge</span>
          </h1>
          <p className="text-2xl text-[#2C2420]/60 mb-20 font-light leading-relaxed">
            這是針對生物局限性的終極保險。如同將最核心的數據進行封存，我們將您的隱性知識轉化為永久保存的 AI 數位資產。
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          <div className="lg:col-span-2 rounded-[2rem] overflow-hidden shadow-xl border border-[#E0E0E0] bg-white">
            <AIGeneratedImage 
              prompt="A sleek, modern digital server or data capsule holding glowing golden fluid, representing preserved knowledge, lab aesthetic, minimalist" 
              staticImage="assets/page-cognitive-main.png"
              className="w-full h-[400px]"
              aspectRatio="16:9"
            />
          </div>
          <div className="space-y-4">
             <div className="card-coffee p-10 h-full flex flex-col justify-center rounded-[2rem] bg-white">
                <h4 className="text-xl font-bold mb-4 text-[#D4A373]">Decoupling Asset</h4>
                <p className="text-[#2C2420]/60 font-light text-sm">解耦大腦與載體。當 GPT-5 或更高版本發布，您的數據資產可無縫遷移。</p>
             </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {[
            { title: "Shadow Mode", desc: "隱形攝取層，在背景學習您的決策日誌，不干擾您的日常工作流程。" },
            { title: "Infinite Retention", desc: "無限留存。解決「記憶流失」痛點，將您十年前的決策脈絡瞬間帶到今日。" },
            { title: "Asset Decoupling", desc: "獨立於肉體之外的資產。即使生物載體休息，智慧資產仍在產生複利。" }
          ].map((item, idx) => (
            <div key={idx} className="card-coffee p-10 rounded-2xl group hover:-translate-y-2 transition-transform bg-white">
              <h4 className="text-xl font-bold mb-4 text-[#2C2420] group-hover:text-[#D4A373] transition-colors">{item.title}</h4>
              <p className="text-[#2C2420]/50 font-light text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CognitiveHedge;
