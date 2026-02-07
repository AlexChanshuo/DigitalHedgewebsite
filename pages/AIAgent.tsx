// pages/AIAgent.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';
import BreadcrumbSchema from '../components/seo/BreadcrumbSchema';
import AIGeneratedImage from '../components/AIGeneratedImage';

interface AIAgentProps {
  onBack: () => void;
  onOpenDemo: () => void;
}

const AIAgent: React.FC<AIAgentProps> = ({ onBack, onOpenDemo }) => {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen bg-[#FAF9F6]">
      <SEO
        title="執行型 AI Agent | 減輕人力負擔"
        description="專為重人力產業打造的執行型 AI Agent。不只是顧問，是真正能執行任務、減輕人力負擔的 AI 團隊成員。24/7 不間斷運作。"
        url="/ai-agent"
      />
      <BreadcrumbSchema
        items={[
          { name: '首頁', url: '/' },
          { name: '執行型 AI Agent' }
        ]}
      />

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
            <span>{t('common.backToHome')}</span>
          </button>

          <div className="grid lg:grid-cols-2 gap-20 mb-20">
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#D4A373]/10 text-[#D4A373] text-[10px] uppercase tracking-widest font-bold mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4A373]"></span>
                <span>{t('pages.aiAgent.badge')}</span>
              </div>

              <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight text-[#2C2420] font-serif">
                {t('pages.aiAgent.title1')}<br />
                <span className="text-[#D4A373]">{t('pages.aiAgent.title2')}</span>
              </h1>
              <p className="text-xl text-[#2C2420]/60 mb-8 font-light leading-relaxed">
                {t('pages.aiAgent.description')}
              </p>

              <div className="flex items-center space-x-4 mb-8">
                <div className="flex -space-x-2">
                  <div className="w-10 h-10 rounded-full bg-[#D4A373] flex items-center justify-center text-white text-xs font-bold">24</div>
                  <div className="w-10 h-10 rounded-full bg-[#2C2420] flex items-center justify-center text-white text-xs font-bold">/7</div>
                </div>
                <span className="text-[#2C2420]/60">全年無休運作</span>
              </div>

              <button
                onClick={onOpenDemo}
                className="px-8 py-4 bg-[#D4A373] hover:bg-[#B08968] text-white rounded-full font-medium transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
              >
                了解如何減輕人力負擔
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
                  <p className="text-[#D4A373] text-xs tracking-[0.3em] font-bold">EXECUTION AI</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-20 px-6 bg-[#2C2420] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 font-serif">重人力產業的痛點</h2>
          <p className="text-white/60 text-lg mb-12">越是需要服務的產業，人力成本越高、越難招人、越容易出錯</p>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
              <div className="text-4xl font-bold text-[#D4A373] mb-2">60%</div>
              <p className="text-white/70 text-sm">時間花在重複性工作</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
              <div className="text-4xl font-bold text-[#D4A373] mb-2">24hr</div>
              <p className="text-white/70 text-sm">客戶期待即時回應</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
              <div className="text-4xl font-bold text-[#D4A373] mb-2">↑35%</div>
              <p className="text-white/70 text-sm">人力成本逐年上漲</p>
            </div>
          </div>
        </div>
      </section>

      {/* Execution vs Consultant */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-[#2C2420] text-center font-serif">執行型 vs 顧問型</h2>
          <p className="text-[#2C2420]/60 text-center mb-12 max-w-2xl mx-auto">大多數 AI 只能給建議，但你需要的是能動手做事的 AI</p>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-[#FAF9F6] p-8 rounded-3xl border border-[#E0E0E0]">
              <div className="text-red-400 text-xs font-bold tracking-widest mb-4">❌ 顧問型 AI</div>
              <h3 className="text-xl font-bold mb-4 text-[#2C2420]">只能給建議</h3>
              <ul className="space-y-3 text-[#2C2420]/60">
                <li className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                  <span>「你應該這樣做...」然後呢？</span>
                </li>
                <li className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                  <span>還是需要人去執行</span>
                </li>
                <li className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                  <span>人力負擔沒有減少</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-3xl border-2 border-[#D4A373]">
              <div className="text-[#D4A373] text-xs font-bold tracking-widest mb-4">✓ 執行型 AI</div>
              <h3 className="text-xl font-bold mb-4 text-[#2C2420]">直接幫你做</h3>
              <ul className="space-y-3 text-[#2C2420]">
                <li className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-[#D4A373] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                  <span><strong>自動回覆</strong>客戶訊息</span>
                </li>
                <li className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-[#D4A373] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                  <span><strong>自動處理</strong>訂單和排程</span>
                </li>
                <li className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-[#D4A373] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                  <span><strong>真正減輕</strong>人力負擔</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-[#2C2420] text-center font-serif">適合重人力產業</h2>
          <p className="text-[#2C2420]/60 text-center mb-12 max-w-2xl mx-auto">越是人力密集的產業，AI 執行能帶來的效益越大</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '🏨', title: '飯店旅宿', desc: '訂房確認、客服回覆、入住指引' },
              { icon: '🍽️', title: '餐飲服務', desc: '訂位管理、外送協調、顧客回饋' },
              { icon: '🏥', title: '醫療診所', desc: '預約排程、病患提醒、初步諮詢' },
              { icon: '🛒', title: '電商零售', desc: '訂單處理、物流追蹤、售後服務' },
            ].map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-[#E0E0E0] hover:border-[#D4A373] transition-colors text-center">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-bold text-[#2C2420] mb-2">{item.title}</h3>
                <p className="text-sm text-[#2C2420]/60">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-[#2C2420] text-center font-serif">AI 團隊如何運作</h2>
          <p className="text-[#2C2420]/60 text-center mb-12 max-w-2xl mx-auto">一個指揮官 + 多個專職 Agent，各司其職</p>

          <div className="bg-[#FAF9F6] p-8 rounded-3xl border border-[#E0E0E0]">
            <div className="flex flex-col items-center mb-8">
              <div className="w-20 h-20 bg-[#2C2420] rounded-2xl flex items-center justify-center text-3xl mb-4">🧠</div>
              <h3 className="font-bold text-[#2C2420]">指揮官 Agent</h3>
              <p className="text-sm text-[#2C2420]/60">統籌調度，分派任務</p>
            </div>
            
            <div className="flex justify-center mb-4">
              <svg className="w-8 h-8 text-[#D4A373]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>

            <div className="grid md:grid-cols-4 gap-4">
              {[
                { emoji: '💬', title: '客服 Agent', desc: '自動回覆客戶問題' },
                { emoji: '📊', title: '營運 Agent', desc: '處理訂單和排程' },
                { emoji: '📱', title: '行銷 Agent', desc: '內容創作和發布' },
                { emoji: '📋', title: '行政 Agent', desc: '資料整理和報表' },
              ].map((item, i) => (
                <div key={i} className="bg-white p-4 rounded-xl border border-[#E0E0E0] text-center">
                  <div className="text-2xl mb-2">{item.emoji}</div>
                  <h4 className="font-bold text-sm text-[#2C2420]">{item.title}</h4>
                  <p className="text-xs text-[#2C2420]/60">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-[#D4A373] mb-1">專業分工</div>
              <p className="text-sm text-[#2C2420]/60">每個 Agent 專精一個領域</p>
            </div>
            <div>
              <div className="text-2xl font-bold text-[#D4A373] mb-1">風險隔離</div>
              <p className="text-sm text-[#2C2420]/60">一個出問題不影響其他</p>
            </div>
            <div>
              <div className="text-2xl font-bold text-[#D4A373] mb-1">永久記憶</div>
              <p className="text-sm text-[#2C2420]/60">知識累積不會離職帶走</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-[#2C2420]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white font-serif">
            讓 AI 接手那些耗時的工作
          </h2>
          <p className="text-white/60 mb-8 text-lg">
            從一個執行型 AI Agent 開始，看看能省下多少人力。
          </p>
          <button
            onClick={onOpenDemo}
            className="px-8 py-4 bg-[#D4A373] hover:bg-[#B08968] text-white rounded-full font-medium transition-all shadow-lg hover:shadow-xl"
          >
            預約免費評估
          </button>
        </div>
      </section>
    </div>
  );
};

export default AIAgent;
