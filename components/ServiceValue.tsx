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
                      prompt="Data Ingestion visualization"
                      staticImage="DataIngestion.webp"
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
                      prompt="AI Filtering visualization"
                      staticImage="Infinite-AIFiltering.webp"
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
                      prompt="Model Calibration visualization"
                      staticImage="ModelCalibration.webp"
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
                      prompt="AI Synthesis visualization"
                      staticImage="AISynthesis.webp"
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
            <h2 className="text-xs tracking-[0.3em] text-[#D4A373] uppercase mb-6 font-bold">How It Works</h2>
            <h3 className="text-4xl md:text-5xl font-bold mb-8 leading-tight text-[#2C2420] font-serif">
              三步驟<br />就這麼簡單
            </h3>
            <p className="text-lg text-[#2C2420]/60 mb-8 leading-relaxed font-light">
              不需要懂技術，不需要寫程式。<br />
              告訴我們你要做什麼，剩下的交給 AI。
            </p>
            <ul className="space-y-6">
              {[
                "給我們名單 — 你要打給誰？電話號碼給我們就好。",
                "設定問題 — 你想問什麼？我們幫你設計對話腳本。",
                "收報告 — AI 自動打完，分析報告直接送到你手上。"
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
