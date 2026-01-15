
import React from 'react';
import AIGeneratedImage from '../components/AIGeneratedImage';

const VoiceOfChoice: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <div className="pt-10 pb-20 animate-in fade-in duration-700 bg-[#FAF9F6] min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <button onClick={onBack} className="text-[#2C2420]/50 hover:text-[#D4A373] transition-colors flex items-center space-x-2 mb-12 uppercase tracking-widest text-xs font-bold bg-white border border-[#E0E0E0] px-4 py-2 rounded-full w-fit">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
          <span>Back to Products</span>
        </button>

        <div className="grid lg:grid-cols-2 gap-20 mb-20">
          <div>
            <div className="inline-block px-4 py-1 rounded-full bg-[#D4A373]/10 text-[#D4A373] text-[10px] tracking-[0.2em] uppercase mb-6 font-bold border border-[#D4A373]/20">
              Political Survey System
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight text-[#2C2420] font-serif">
              民選之聲<br />
              <span className="text-[#D4A373]">Voice of Choice</span>
            </h1>
            <p className="text-xl text-[#2C2420]/60 mb-8 font-light leading-relaxed">
              專為選戰設計的 AI 自動化電話民調系統。我們解決了傳統民調「速度慢、成本高、人為誤差大」的痛點。
              <br/><br/>
              系統可針對指定縣市區域進行大量撥號，透過 AI 進行標準化問卷調查，並將所有對話轉為逐字稿，最後透過 LINE 即時傳送分析報告。
            </p>
            
            <div className="flex flex-col space-y-4">
              <div className="flex items-center space-x-3 text-[#2C2420]">
                <div className="w-6 h-6 rounded-full bg-[#D4A373] flex items-center justify-center text-white text-xs">✓</div>
                <span>全字稿紀錄 (Verbatim Transcripts)</span>
              </div>
              <div className="flex items-center space-x-3 text-[#2C2420]">
                <div className="w-6 h-6 rounded-full bg-[#D4A373] flex items-center justify-center text-white text-xs">✓</div>
                <span>指定區域精準撥號</span>
              </div>
              <div className="flex items-center space-x-3 text-[#2C2420]">
                <div className="w-6 h-6 rounded-full bg-[#D4A373] flex items-center justify-center text-white text-xs">✓</div>
                <span>LINE 即時報告傳送</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="sticky top-40 aspect-square rounded-[3rem] overflow-hidden shadow-2xl border border-[#E0E0E0] bg-white">
               <AIGeneratedImage 
                 prompt="Data visualization of a phone survey map, glowing lines connecting specific regions, automated report generation on a smartphone screen showing LINE app interface, clean amber and charcoal infographic style" 
                 staticImage="assets/page-voice-main.png"
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
          <h2 className="text-3xl font-bold mb-10 text-[#2C2420] text-center font-serif">為什麼選擇 AI 民調？</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* 傳統民調痛點 */}
            <div className="bg-white/50 p-8 rounded-3xl border border-red-100">
              <h3 className="text-xl font-bold mb-6 text-[#2C2420]/80 flex items-center">
                <span className="w-2 h-2 bg-red-400 rounded-full mr-3"></span>
                傳統人工民調的痛點
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3 text-[#2C2420]/60">
                  <svg className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                  <span><strong>耗時過長：</strong>完成一份有效樣本報告往往需要數週，無法反應即時輿情。</span>
                </li>
                <li className="flex items-start space-x-3 text-[#2C2420]/60">
                  <svg className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                  <span><strong>人為誤差與成本：</strong>電訪員訓練成本高，且容易受情緒影響導致紀錄偏差或誘導回答。</span>
                </li>
                <li className="flex items-start space-x-3 text-[#2C2420]/60">
                  <svg className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                  <span><strong>數據不透明：</strong>缺乏逐字稿，難以驗證訪談細節，分析往往流於表面數據。</span>
                </li>
              </ul>
            </div>

            {/* AI 民調優勢 */}
            <div className="bg-white p-8 rounded-3xl border border-[#D4A373] shadow-lg">
              <h3 className="text-xl font-bold mb-6 text-[#2C2420] flex items-center">
                <span className="w-2 h-2 bg-[#D4A373] rounded-full mr-3"></span>
                民選之聲 AI 優勢
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3 text-[#2C2420]">
                  <svg className="w-5 h-5 text-[#D4A373] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                  <span><strong>極速完成：</strong>數小時內即可完成數千通有效樣本撥打，一天內產出完整報告。</span>
                </li>
                <li className="flex items-start space-x-3 text-[#2C2420]">
                  <svg className="w-5 h-5 text-[#D4A373] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                  <span><strong>逐字稿全紀錄：</strong>AI 自動將每通電話轉為文字，並標記關鍵字與情緒，數據精準可回溯。</span>
                </li>
                <li className="flex items-start space-x-3 text-[#2C2420]">
                  <svg className="w-5 h-5 text-[#D4A373] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                  <span><strong>LINE 報告整合：</strong>分析結果直接推送到您的 LINE，手機即可掌握最新選情動態。</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* 流程圖示 */}
        <div className="bg-white rounded-[2rem] p-10 border border-[#E0E0E0]">
          <h3 className="text-2xl font-bold mb-8 text-center text-[#2C2420]">AI 民調執行流程</h3>
          <div className="grid md:grid-cols-4 gap-4 text-center">
            <div className="p-4">
               <div className="w-12 h-12 bg-[#FAF9F6] rounded-full flex items-center justify-center mx-auto mb-4 text-[#D4A373] font-bold border border-[#E0E0E0]">1</div>
               <h4 className="font-bold text-[#2C2420]">名單與區域設定</h4>
               <p className="text-xs text-[#2C2420]/50 mt-2">匯入指定縣市或電話區段</p>
            </div>
            <div className="p-4">
               <div className="w-12 h-12 bg-[#FAF9F6] rounded-full flex items-center justify-center mx-auto mb-4 text-[#D4A373] font-bold border border-[#E0E0E0]">2</div>
               <h4 className="font-bold text-[#2C2420]">AI 自動撥號</h4>
               <p className="text-xs text-[#2C2420]/50 mt-2">高併發撥打，標準化提問</p>
            </div>
            <div className="p-4">
               <div className="w-12 h-12 bg-[#FAF9F6] rounded-full flex items-center justify-center mx-auto mb-4 text-[#D4A373] font-bold border border-[#E0E0E0]">3</div>
               <h4 className="font-bold text-[#2C2420]">全字稿轉錄</h4>
               <p className="text-xs text-[#2C2420]/50 mt-2">語音轉文字，情緒標籤</p>
            </div>
            <div className="p-4">
               <div className="w-12 h-12 bg-[#FAF9F6] rounded-full flex items-center justify-center mx-auto mb-4 text-[#D4A373] font-bold border border-[#E0E0E0]">4</div>
               <h4 className="font-bold text-[#2C2420]">LINE 報告輸出</h4>
               <p className="text-xs text-[#2C2420]/50 mt-2">即時接收 PDF 與圖表</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceOfChoice;
