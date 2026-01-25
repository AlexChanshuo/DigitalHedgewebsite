import React from 'react';
import AIGeneratedImage from '../components/AIGeneratedImage';
import SEO from '../components/SEO';
import BreadcrumbSchema from '../components/seo/BreadcrumbSchema';
import FAQSchema from '../components/seo/FAQSchema';

const VoiceSurvey: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <>
      <SEO
        title="Voice Survey - AI 聲線克隆調查系統"
        description="結合 AI 聲線克隆技術的市場調查系統。讓老闆的聲音親自致電客戶，收集第一手真實反饋，強化個人品牌影響力。"
        url="/products/voice-survey"
      >
        <BreadcrumbSchema
          items={[
            { name: '首頁', url: '/' },
            { name: 'Voice Survey' }
          ]}
        />
        <FAQSchema
          faqs={[
            {
              question: "Voice Survey 如何運作？",
              answer: "Voice Survey 透過 AI 語音技術自動進行電話調查，能夠自然對話並即時分析回應，大幅提升調查效率。更特別的是可以克隆老闆的聲音，讓客戶感受到個人化的關懷。"
            },
            {
              question: "Voice Survey 的調查完成率如何？",
              answer: "相較於傳統電話調查，AI 語音調查的完成率平均提升 40%，因為 AI 能在最佳時段撥打並進行個人化對話。當客戶聽到的是「老闆親自致電」的聲音，接聽率與互動意願大幅提升。"
            },
            {
              question: "調查數據如何分析？",
              answer: "系統即時轉錄並分析回應，提供情緒分析、關鍵詞提取和視覺化報告，讓您快速掌握調查結果。AI 能在對話中分析客戶的語氣、遲疑與情緒起伏，提供深度洞察。"
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
              Voice AI Survey
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-[#2C2420] font-serif">
              語音 AI 調查系統<br />
              <span className="text-[#D4A373]">CEO Insight Cloning</span>
            </h1>
            <p className="text-[#2C2420]/60 text-lg font-light max-w-xl mb-8">
              市場調查不應只是冰冷的問卷。我們結合 <span className="text-[#2C2420] font-medium">AI 聲線克隆技術</span>，讓老闆的聲音親自致電給每一位客戶，在收集第一手真實反饋的同時，強化您的個人品牌影響力。
            </p>

            <div className="flex flex-wrap gap-4">
              <span className="px-4 py-2 bg-white rounded-lg border border-[#E0E0E0] text-xs font-bold text-[#2C2420] shadow-sm">AI 聲線克隆</span>
              <span className="px-4 py-2 bg-white rounded-lg border border-[#E0E0E0] text-xs font-bold text-[#2C2420] shadow-sm">情緒數據分析</span>
              <span className="px-4 py-2 bg-white rounded-lg border border-[#E0E0E0] text-xs font-bold text-[#2C2420] shadow-sm">大規模外撥</span>
            </div>
          </div>
          <div className="w-full lg:w-[500px] rounded-[2rem] overflow-hidden shadow-2xl border border-[#E0E0E0] bg-white">
            <AIGeneratedImage
              prompt="CEO Insight Cloning"
              staticImage="CEOInsightCloning.webp"
              className="w-full h-[400px]"
              aspectRatio="1:1"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {/* CEO Branding */}
          <div className="card-coffee p-10 rounded-2xl bg-white group hover:border-[#D4A373] transition-all">
            <div className="w-12 h-12 bg-[#FAF9F6] rounded-full flex items-center justify-center mb-6 text-[#D4A373]">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
            </div>
            <h4 className="text-2xl font-bold mb-4 text-[#2C2420]">CEO 品牌 AI 分身</h4>
            <p className="text-[#2C2420]/60 font-light leading-relaxed">
              傳統工讀生電訪容易被掛斷。但當客戶聽到的是「老闆親自致電」的熟悉聲音與誠懇語氣，接聽率與互動意願將大幅提升。AI 能完美複製您的聲線、語氣甚至停頓習慣。
            </p>
          </div>

          {/* Emotional Data */}
          <div className="card-coffee p-10 rounded-2xl bg-white group hover:border-[#D4A373] transition-all">
            <div className="w-12 h-12 bg-[#FAF9F6] rounded-full flex items-center justify-center mb-6 text-[#D4A373]">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
            </div>
            <h4 className="text-2xl font-bold mb-4 text-[#2C2420]">獲取真實的一手情緒數據</h4>
            <p className="text-[#2C2420]/60 font-light leading-relaxed">
              文字問卷是冰冷的，語音卻藏著真相。AI 能在對話中分析客戶的語氣、遲疑與情緒起伏。我們提供的不只是「滿意/不滿意」的選項，而是客戶對產品真實感受的深度洞察。
            </p>
          </div>
        </div>

        {/* Use Cases */}
        <div className="bg-white rounded-[2rem] p-12 border border-[#E0E0E0] shadow-sm">
          <h3 className="text-2xl font-bold mb-10 text-[#2C2420] text-center font-serif">深度應用場景</h3>
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="w-16 h-16 rounded-xl bg-[#FAF9F6] border border-[#E0E0E0] flex-shrink-0 flex items-center justify-center text-[#D4A373] font-bold text-xl">01</div>
              <div>
                <h5 className="text-xl font-bold text-[#2C2420] mb-2">新品上市前測 (Market Validation)</h5>
                <p className="text-[#2C2420]/60">在產品大規模上市前，透過 AI 快速撥打數千通電話給潛在受眾，收集最直接的市場反應，修正行銷策略。</p>
              </div>
            </div>
            <div className="w-full h-[1px] bg-[#E0E0E0]"></div>
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="w-16 h-16 rounded-xl bg-[#FAF9F6] border border-[#E0E0E0] flex-shrink-0 flex items-center justify-center text-[#D4A373] font-bold text-xl">02</div>
              <div>
                <h5 className="text-xl font-bold text-[#2C2420] mb-2">品牌創始人關懷 (Founder's Call)</h5>
                <p className="text-[#2C2420]/60">在節慶或週年慶時，用創始人的聲音親自致電 VIP 客戶表達感謝。這不僅是調查，更是一次強大的品牌公關活動。</p>
              </div>
            </div>
            <div className="w-full h-[1px] bg-[#E0E0E0]"></div>
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="w-16 h-16 rounded-xl bg-[#FAF9F6] border border-[#E0E0E0] flex-shrink-0 flex items-center justify-center text-[#D4A373] font-bold text-xl">03</div>
              <div>
                <h5 className="text-xl font-bold text-[#2C2420] mb-2">危機處理與反饋 (Crisis Management)</h5>
                <p className="text-[#2C2420]/60">當發生公關危機時，AI 能迅速進行大規模致歉或說明，並收集大眾真實的諒解程度，作為決策依據。</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
    </>
  );
};

export default VoiceSurvey;
