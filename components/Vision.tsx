import React from 'react';
import AIGeneratedImage from './AIGeneratedImage';

const Vision: React.FC = () => {
  return (
    <section id="vision" className="py-32 relative bg-[#F5F7FA]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-xs tracking-[0.3em] text-[#D4A373] uppercase mb-4 font-bold">Why AI</h2>
            <h3 className="text-4xl font-bold mb-6 text-[#2C2420] leading-tight font-serif">
              為什麼用 AI<br />打電話？
            </h3>
            <p className="text-lg text-[#2C2420]/60 mb-8 leading-relaxed font-light">
              傳統電話行銷需要大量人力、時間和管理成本。AI 可以解決這些問題。
            </p>

            <div className="space-y-6">
              <div className="group flex items-start space-x-6 p-6 bg-white rounded-2xl border border-[#E0E0E0] shadow-sm hover:border-[#D4A373] transition-all">
                <div className="text-3xl font-serif text-[#D4A373] font-bold opacity-50">100x</div>
                <div>
                  <h4 className="text-xl font-bold mb-2 text-[#2C2420]">快 100 倍</h4>
                  <p className="text-[#2C2420]/50 text-sm leading-relaxed">傳統民調要兩週，我們一天搞定。一天處理數千通電話，效率完全不同等級。</p>
                </div>
              </div>
              <div className="group flex items-start space-x-6 p-6 bg-white rounded-2xl border border-[#E0E0E0] shadow-sm hover:border-[#D4A373] transition-all">
                <div className="text-3xl font-serif text-[#D4A373] font-bold opacity-50">80%</div>
                <div>
                  <h4 className="text-xl font-bold mb-2 text-[#2C2420]">省 80% 成本</h4>
                  <p className="text-[#2C2420]/50 text-sm leading-relaxed">不用請人、不用培訓、不用管理。AI 不會累、不會請假、不會離職。</p>
                </div>
              </div>
              <div className="group flex items-start space-x-6 p-6 bg-white rounded-2xl border border-[#E0E0E0] shadow-sm hover:border-[#D4A373] transition-all">
                <div className="text-3xl font-serif text-[#D4A373] font-bold opacity-50">0</div>
                <div>
                  <h4 className="text-xl font-bold mb-2 text-[#2C2420]">0 人為誤差</h4>
                  <p className="text-[#2C2420]/50 text-sm leading-relaxed">每通電話品質一致，不會情緒化，不會誘導回答。全程錄音和文字紀錄，100% 可追溯。</p>
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
