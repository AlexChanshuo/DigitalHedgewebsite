import React from 'react';
import AIGeneratedImage from './AIGeneratedImage';

interface HeroProps {
  onOpenDemo?: () => void;
}

const Hero: React.FC<HeroProps> = ({ onOpenDemo }) => {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-20 items-center">
        
        {/* Left Column: Text */}
        <div className="relative z-10 animate-in slide-in-from-left duration-1000">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#E0E0E0]/30 text-[#2C2420] text-[10px] uppercase tracking-widest font-bold mb-8 border border-[#D4A373]/30">
             <span className="w-1.5 h-1.5 rounded-full bg-[#D4A373]"></span>
             <span>Precision AI Extraction</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-[1.1] text-[#2C2420] tracking-tight">
            AI 智能萃取 <br />
            <span className="text-[#D4A373]">為品牌提煉最純粹的真實</span>
          </h1>

          <p className="text-xl text-[#2C2420]/60 mb-10 leading-relaxed font-light max-w-lg">
            在雜訊爆炸的時代，您不需要更多數據。
            您需要的是透過 AI 濾杯，去除 99% 的無效噪音，精準萃取出剩下的 1% 決策精華。
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={onOpenDemo}
              className="px-8 py-4 bg-[#D4A373] hover:bg-[#B08968] text-white rounded-full font-medium transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center justify-center space-x-2"
            >
              <span>啟動 AI 萃取</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
            </button>
            <button 
              onClick={onOpenDemo}
              className="px-8 py-4 bg-transparent border border-[#2C2420]/20 hover:border-[#D4A373] text-[#2C2420] hover:text-[#D4A373] rounded-full font-medium transition-all flex items-center justify-center"
            >
              參觀技術架構
            </button>
          </div>
          
          <div className="mt-12 border-t border-[#2C2420]/10 pt-6 flex items-center space-x-6 text-xs text-[#2C2420]/40 uppercase tracking-widest font-medium">
             <span>AI Accuracy: 99.8%</span>
             <span className="w-1 h-1 bg-[#D4A373] rounded-full"></span>
             <span>Data Clarity: High</span>
          </div>
        </div>

        {/* Right Column: Visual */}
        <div className="relative h-[650px] hidden lg:block animate-in slide-in-from-right duration-1000 delay-200">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-[#D4A373]/10 to-transparent rounded-full blur-3xl -z-10"></div>
           
           <div className="relative w-full h-full">
              <AIGeneratedImage 
                prompt="AI Extraction visualization" 
                staticImage="Precision-AIExtraction.png" 
                className="w-full h-full object-contain drop-shadow-2xl rounded-3xl"
                aspectRatio="1:1"
              />
              
              <div className="absolute bottom-20 left-10 bg-white/40 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/50 animate-[float_8s_ease-in-out_infinite]">
                 <div className="flex items-center space-x-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-[#2C2420] flex items-center justify-center text-[#D4A373]">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" /></svg>
                    </div>
                    <div>
                        <div className="text-[10px] text-[#2C2420]/60 uppercase tracking-wider">AI Processor</div>
                        <div className="text-sm font-bold text-[#2C2420]">Signal Refined</div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
