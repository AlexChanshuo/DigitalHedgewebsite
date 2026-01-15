
import React from 'react';

interface ContactProps {
  onOpenChat: () => void;
}

const Contact: React.FC<ContactProps> = ({ onOpenChat }) => {
  return (
    <section id="contact" className="py-32 relative bg-white">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
        <div>
          <h2 className="text-xs tracking-[0.3em] text-[#D4A373] uppercase mb-6 font-bold">Deploy AI</h2>
          <h3 className="text-4xl md:text-6xl font-bold mb-8 leading-tight text-[#2C2420] font-serif">
            啟動您的<br />數位萃取計劃
          </h3>
          <p className="text-xl text-[#2C2420]/60 mb-12 font-light leading-relaxed">
            這不是一般的軟體採購，而是一場改變決策品質的 AI 革命。
            立即與我們的戰略顧問進行模型校準。
          </p>

          <form className="space-y-6 max-w-md">
            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="您的姓名" className="w-full bg-[#FAF9F6] border border-[#E0E0E0] px-6 py-4 rounded-xl outline-none focus:border-[#D4A373] focus:bg-white transition-all text-sm text-[#2C2420]" />
              <input type="email" placeholder="電子郵件" className="w-full bg-[#FAF9F6] border border-[#E0E0E0] px-6 py-4 rounded-xl outline-none focus:border-[#D4A373] focus:bg-white transition-all text-sm text-[#2C2420]" />
            </div>
            <textarea placeholder="戰略需求詳述" rows={4} className="w-full bg-[#FAF9F6] border border-[#E0E0E0] px-6 py-4 rounded-xl outline-none focus:border-[#D4A373] focus:bg-white transition-all text-sm text-[#2C2420]"></textarea>
            <button className="w-full py-5 bg-[#2C2420] text-white font-bold uppercase tracking-widest rounded-xl hover:bg-[#D4A373] transition-all text-sm shadow-xl">
              送出部署請求
            </button>
          </form>
        </div>

        <div className="relative">
          <div className="card-coffee rounded-[2.5rem] p-12 text-center group cursor-pointer" onClick={onOpenChat}>
            <div className="w-24 h-24 bg-[#FAF9F6] border border-[#E0E0E0] rounded-full flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-500 shadow-inner">
              <svg className="w-10 h-10 text-[#D4A373]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
            </div>
            <h4 className="text-2xl font-bold mb-4 text-[#2C2420] font-serif">預約語音 AI 戰略對談</h4>
            <p className="text-[#2C2420]/60 font-light mb-8 max-w-xs mx-auto">
              透過我們的聲線對沖系統進行初步諮詢，感受 24H 永不疲倦的 AI 智慧服務。
            </p>
            <div className="flex flex-col items-center space-y-4">
              <button className="px-10 py-3 bg-[#FAF9F6] border border-[#D4A373]/30 text-[#D4A373] uppercase text-xs tracking-widest font-bold rounded-full hover:bg-[#D4A373] hover:text-white transition-all">
                啟動語音對話系統
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
