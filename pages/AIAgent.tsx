// pages/AIAgent.tsx
import React from 'react';
import SEO from '../components/SEO';
import BreadcrumbSchema from '../components/seo/BreadcrumbSchema';
import AIGeneratedImage from '../components/AIGeneratedImage';

interface AIAgentProps {
  onBack: () => void;
  onOpenDemo: () => void;
}

const AIAgent: React.FC<AIAgentProps> = ({ onBack, onOpenDemo }) => {
  return (
    <div className="min-h-screen bg-[#FAF9F6]">
      <SEO
        title="AI Agent 顧問 | 打造你的 AI 團隊"
        description="協助企業建立專屬 AI Agent 和 AI Agent 團隊。從個人助理到部門級協作，讓 AI 成為你的第 N+1 號員工。"
        url="/ai-agent"
      >
        <BreadcrumbSchema
          items={[
            { name: '首頁', url: '/' },
            { name: 'AI Agent 顧問' }
          ]}
        />
      </SEO>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-10 w-96 h-96 bg-[#D4A373]/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#D4A373]/5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-[#2C2420]/60 hover:text-[#D4A373] transition-colors mb-12"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
            <span>返回首頁</span>
          </button>

          <div className="grid lg:grid-cols-2 gap-20 mb-20">
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#D4A373]/10 text-[#D4A373] text-[10px] uppercase tracking-widest font-bold mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4A373]"></span>
                <span>AI Team Building</span>
              </div>

              <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight text-[#2C2420] font-serif">
                AI Agent 顧問<br />
                <span className="text-[#D4A373]">打造你的 AI 團隊</span>
              </h1>
              <p className="text-xl text-[#2C2420]/60 mb-8 font-light leading-relaxed">
                不只是工具，是你的團隊成員。
                <br /><br />
                我們協助企業建立專屬的 AI Agent，從個人助理到整個 AI 團隊，讓 AI 真正成為你組織的一部分。
              </p>

              <button
                onClick={onOpenDemo}
                className="px-8 py-4 bg-[#D4A373] hover:bg-[#B08968] text-white rounded-full font-medium transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
              >
                預約諮詢
              </button>
            </div>

            <div className="relative hidden lg:flex items-center justify-center">
              <div className="w-80 h-80 relative">
                <AIGeneratedImage
                  prompt="AI Agent Team visualization"
                  staticImage="AIAgentTeam.webp"
                  className="w-full h-full object-contain rounded-3xl"
                  aspectRatio="1:1"
                />
                <div className="absolute -bottom-4 -right-4 bg-white p-4 rounded-xl shadow-lg border border-[#E0E0E0]">
                  <p className="text-[#D4A373] text-xs tracking-[0.5em] font-bold">AI TEAM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What is AI Agent */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-[#2C2420] text-center font-serif">什麼是 AI Agent？</h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-[#FAF9F6] p-8 rounded-3xl border border-[#E0E0E0]">
              <h3 className="text-xl font-bold mb-4 text-[#2C2420]">傳統 AI 工具</h3>
              <ul className="space-y-3 text-[#2C2420]/60">
                <li className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                  <span>問一次答一次，沒有記憶</span>
                </li>
                <li className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                  <span>不了解你的業務和偏好</span>
                </li>
                <li className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                  <span>無法主動執行任務</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-3xl border-2 border-[#D4A373]">
              <h3 className="text-xl font-bold mb-4 text-[#2C2420]">AI Agent</h3>
              <ul className="space-y-3 text-[#2C2420]">
                <li className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-[#D4A373] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                  <span><strong>永久記憶</strong> — 記得所有對話和決策</span>
                </li>
                <li className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-[#D4A373] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                  <span><strong>了解你</strong> — 學習你的風格和偏好</span>
                </li>
                <li className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-[#D4A373] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                  <span><strong>主動執行</strong> — 24/7 自動處理任務</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-[#2C2420] text-center font-serif">我們的服務</h2>
          <p className="text-[#2C2420]/60 text-center mb-12 max-w-2xl mx-auto">從個人到團隊，從簡單到複雜，我們提供完整的 AI Agent 建置服務。</p>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-[#E0E0E0] hover:border-[#D4A373] transition-colors">
              <div className="w-16 h-16 bg-[#D4A373]/10 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-[#D4A373]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-[#2C2420]">個人 AI Agent</h3>
              <p className="text-[#2C2420]/60 mb-6">專屬於你的 AI 助理。處理郵件、排程、資料整理、內容創作。用越久越了解你，越用越順手。</p>
              <ul className="space-y-2 text-sm text-[#2C2420]/70">
                <li>• 串接你的工具（Email、行事曆、Notion...）</li>
                <li>• 學習你的溝通風格和決策習慣</li>
                <li>• 24/7 待命，隨時回應</li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-[#E0E0E0] hover:border-[#D4A373] transition-colors">
              <div className="w-16 h-16 bg-[#D4A373]/10 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-[#D4A373]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-[#2C2420]">AI Agent 團隊</h3>
              <p className="text-[#2C2420]/60 mb-6">多個 AI Agent 協作，各司其職。營運、行銷、客服、財務，每個領域都有專屬 Agent。</p>
              <ul className="space-y-2 text-sm text-[#2C2420]/70">
                <li>• 專業分工，context 不混亂</li>
                <li>• Agent 之間可以溝通協作</li>
                <li>• 知識永久保存，不會離職帶走</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-[#2C2420]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white font-serif">
            準備好擁有你的 AI 團隊了嗎？
          </h2>
          <p className="text-white/60 mb-8 text-lg">
            從一個 AI Agent 開始，逐步建立你的 AI 組織。
          </p>
          <button
            onClick={onOpenDemo}
            className="px-8 py-4 bg-[#D4A373] hover:bg-[#B08968] text-white rounded-full font-medium transition-all shadow-lg hover:shadow-xl"
          >
            預約免費諮詢
          </button>
        </div>
      </section>
    </div>
  );
};

export default AIAgent;
