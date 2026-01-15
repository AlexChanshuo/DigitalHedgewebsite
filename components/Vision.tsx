import React from 'react';
import AIGeneratedImage from './AIGeneratedImage';

const Vision: React.FC = () => {
  return (
    <section id="vision" className="py-32 relative bg-[#F5F7FA]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-xs tracking-[0.3em] text-[#D4A373] uppercase mb-4 font-bold">Core Technology</h2>
            <h3 className="text-4xl font-bold mb-6 text-[#2C2420] leading-tight font-serif">
              過濾數據雜訊，<br />僅留決策真實。
            </h3>
            <p className="text-lg text-[#2C2420]/60 mb-8 leading-relaxed font-light">
              人類大腦如同一個容量有限的處理器。在資訊過載的時代，過多的雜訊會堵塞決策的通道。我們提供的是最頂級的 AI 過濾層 (AI Filtering Layer)。
            </p>
            
            <div className="space-y-6">
              <div className="group flex items-start space-x-6 p-6 bg-white rounded-2xl border border-[#E0E0E0] shadow-sm hover:border-[#D4A373] transition-all">
                <div className="text-3xl font-serif text-[#D4A373] font-bold opacity-50">01</div>
                <div>
                  <h4 className="text-xl font-bold mb-2 text-[#2C2420]">無限過濾 (Infinite AI Filtering)</h4>
                  <p className="text-[#2C2420]/50 text-sm leading-relaxed">24/7 持續運作，AI 將海量社群輿論進行去雜質處理，保留最純淨的觀點。</p>
                </div>
              </div>
              <div className="group flex items-start space-x-6 p-6 bg-white rounded-2xl border border-[#E0E0E0] shadow-sm hover:border-[#D4A373] transition-all">
                <div className="text-3xl font-serif text-[#D4A373] font-bold opacity-50">02</div>
                <div>
                  <h4 className="text-xl font-bold mb-2 text-[#2C2420]">資產封存 (Data Retention)</h4>
                  <p className="text-[#2C2420]/50 text-sm leading-relaxed">將您的決策邏輯進行向量化封存，確保智慧資產永不磨損。</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative">
             <div className="bg-white p-3 rounded-[2rem] border border-[#E0E0E0] shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-700">
                <AIGeneratedImage 
                   prompt="AI Filtering visualization"
                   staticImage="Infinite-AIFiltering.png"
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
