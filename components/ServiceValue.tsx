
import React from 'react';
import AIGeneratedImage from './AIGeneratedImage';

const ServiceValue: React.FC = () => {
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
                          prompt="Digital sound waves transforming into data points, minimalist line art, amber and charcoal" 
                          staticImage="svc-voice.png"
                          className="w-full h-full object-cover mix-blend-multiply opacity-90"
                          aspectRatio="3:4"
                        />
                      </div>
                      <div className="p-4">
                        <h5 className="font-bold text-[#2C2420]">攝取：聲線採樣</h5>
                        <p className="text-xs text-[#2C2420]/50 mt-1">Data Ingestion</p>
                      </div>
                   </div>
                   {/* Storage */}
                   <div className="bg-[#FAF9F6] p-2 rounded-2xl shadow-sm border border-[#E0E0E0]">
                      <div className="h-40 rounded-xl overflow-hidden relative">
                        <AIGeneratedImage 
                          prompt="Glass server blocks filled with glowing data particles, lab style" 
                          staticImage="svc-memory.png"
                          className="w-full h-full object-cover mix-blend-multiply opacity-90"
                          aspectRatio="1:1"
                        />
                      </div>
                      <div className="p-4">
                        <h5 className="font-bold text-[#2C2420]">封存：背景記憶</h5>
                        <p className="text-xs text-[#2C2420]/50 mt-1">Vector Storage</p>
                      </div>
                   </div>
                </div>
                <div className="space-y-6">
                   {/* Calibration */}
                   <div className="bg-[#FAF9F6] p-2 rounded-2xl shadow-sm border border-[#E0E0E0]">
                      <div className="h-40 rounded-xl overflow-hidden relative">
                        <AIGeneratedImage 
                          prompt="Precise alignment of digital structures, tactical execution metaphor, clean lines" 
                          staticImage="svc-tactic.png"
                          className="w-full h-full object-cover mix-blend-multiply opacity-90"
                          aspectRatio="1:1"
                        />
                      </div>
                      <div className="p-4">
                        <h5 className="font-bold text-[#2C2420]">校準：戰術模組</h5>
                        <p className="text-xs text-[#2C2420]/50 mt-1">Model Calibration</p>
                      </div>
                   </div>
                   {/* Synthesis */}
                   <div className="bg-[#FAF9F6] p-2 rounded-2xl shadow-sm border border-[#E0E0E0]">
                      <div className="h-56 rounded-xl overflow-hidden relative">
                        <AIGeneratedImage 
                          prompt="A glowing data insight point, high contrast, clean scientific style" 
                          staticImage="svc-insight.png"
                          className="w-full h-full object-cover mix-blend-multiply opacity-90"
                          aspectRatio="3:4"
                        />
                      </div>
                      <div className="p-4">
                        <h5 className="font-bold text-[#2C2420]">合成：深度洞察</h5>
                        <p className="text-xs text-[#2C2420]/50 mt-1">AI Synthesis</p>
                      </div>
                   </div>
                </div>
             </div>
          </div>
          
          {/* Text Content */}
          <div className="order-1 lg:order-2">
            <h2 className="text-xs tracking-[0.3em] text-[#D4A373] uppercase mb-6 font-bold">The Process</h2>
            <h3 className="text-4xl md:text-5xl font-bold mb-8 leading-tight text-[#2C2420] font-serif">
              從原始數據<br />到決策資產
            </h3>
            <p className="text-lg text-[#2C2420]/60 mb-8 leading-relaxed font-light">
              大多數 AI 服務只提供通用的模型 (Generic LLMs)。<br/>
              我們為您打造的是 <span className="font-medium text-[#D4A373]">Fine-tuned Model (微調模型)</span> ——完全依照您的數據 DNA 進行訓練與校準。
            </p>
            <ul className="space-y-6">
              {[
                "數據攝取：識別核心人格特質與聲線紋理。",
                "精準校準：設定戰術模組的參數與權重。",
                "黃金合成：即時輸出情緒雷達圖與心理模型。"
              ].map((item, idx) => (
                <li key={idx} className="flex items-center space-x-4 p-4 bg-[#FAF9F6] rounded-xl shadow-sm border border-[#E0E0E0] hover:border-[#D4A373] transition-colors">
                  <span className="w-2 h-2 bg-[#D4A373] rounded-full flex-shrink-0"></span>
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
