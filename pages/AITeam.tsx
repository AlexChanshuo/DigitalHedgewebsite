// pages/AITeam.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';
import BreadcrumbSchema from '../components/seo/BreadcrumbSchema';

interface AITeamProps {
  onBack: () => void;
  onOpenDemo: () => void;
}

interface TeamPackage {
  id: string;
  name: string;
  nameEn: string;
  emoji: string;
  description: string;
  agents: string[];
  industries: string[];
  color: string;
}

const teamPackages: TeamPackage[] = [
  {
    id: 'customer-service',
    name: '客服戰隊',
    nameEn: 'Customer Service Squad',
    emoji: '🎧',
    description: '24/7 全天候客服支援，從即時回應到問題追蹤，讓客戶滿意度飆升。',
    agents: ['接待機器人', '技術支援機器人', '滿意度調查機器人', '升級處理機器人'],
    industries: ['電商', 'SaaS', '服務業'],
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'marketing',
    name: '行銷突擊隊',
    nameEn: 'Marketing Strike Force',
    emoji: '📣',
    description: '內容創作、SEO 優化、數據分析一條龍，讓你的品牌聲量持續成長。',
    agents: ['內容創作機器人', 'SEO 分析機器人', '排程發布機器人', '數據分析機器人'],
    industries: ['品牌', '電商', '媒體'],
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 'sales',
    name: '業務開發隊',
    nameEn: 'Sales Development Team',
    emoji: '🎯',
    description: '從名單挖掘到會議預約，自動化你的銷售漏斗，讓業務專注在成交。',
    agents: ['名單挖掘機器人', '外展機器人', '跟進機器人', '預約機器人'],
    industries: ['B2B 銷售', '顧問公司', '房仲'],
    color: 'from-orange-500 to-red-500',
  },
  {
    id: 'research',
    name: '研究分析組',
    nameEn: 'Research & Analysis Unit',
    emoji: '🔬',
    description: '市場調研、競品監控、趨勢分析，用數據驅動你的商業決策。',
    agents: ['資料收集機器人', '分析機器人', '監控機器人'],
    industries: ['投資', '市調', '策略顧問'],
    color: 'from-green-500 to-teal-500',
  },
];

const AITeam: React.FC<AITeamProps> = ({ onBack, onOpenDemo }) => {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen bg-[#FAF9F6]">
      <SEO
        title="AI Agent 團隊方案 | 打造你的專屬 AI 團隊"
        description="選擇適合你的 AI Agent 團隊方案：客服戰隊、行銷突擊隊、業務開發隊、研究分析組，或客製化你的專屬團隊。"
        url="/ai-team"
      />
      <BreadcrumbSchema
        items={[
          { name: '首頁', url: '/' },
          { name: 'AI Agent 團隊方案' }
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
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            <span>{t('common.backToHome')}</span>
          </button>

          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#D4A373]/10 text-[#D4A373] text-[10px] uppercase tracking-widest font-bold mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4A373]"></span>
              <span>{t('pages.aiTeam.badge')}</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight text-[#2C2420] font-serif">
              {t('pages.aiTeam.title1')}<br />
              <span className="text-[#D4A373]">{t('pages.aiTeam.title2')}</span>
            </h1>
            
            <p className="text-xl text-[#2C2420]/60 max-w-3xl mx-auto font-light leading-relaxed">
              {t('pages.aiTeam.description')}
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-20">
            {[
              { number: '3-4', label: '個 Agent / 團隊' },
              { number: '24/7', label: '全年無休' },
              { number: '∞', label: '知識累積' },
              { number: '1', label: '整合介面' },
            ].map((stat, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl border border-[#E0E0E0] text-center">
                <div className="text-3xl font-bold text-[#D4A373] mb-1">{stat.number}</div>
                <div className="text-sm text-[#2C2420]/60">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Packages */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-[#2C2420] text-center font-serif">選擇你的團隊</h2>
          <p className="text-[#2C2420]/60 text-center mb-12 max-w-2xl mx-auto">
            每個團隊都經過精心設計，多個 AI Agent 各司其職、協同運作
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {teamPackages.map((pkg) => (
              <div
                key={pkg.id}
                className="bg-white rounded-3xl border border-[#E0E0E0] overflow-hidden hover:border-[#D4A373] hover:shadow-xl transition-all duration-300 group"
              >
                {/* Header with gradient */}
                <div className={`bg-gradient-to-r ${pkg.color} p-6 text-white`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-4xl mb-2 block">{pkg.emoji}</span>
                      <h3 className="text-2xl font-bold">{pkg.name}</h3>
                      <p className="text-white/80 text-sm">{pkg.nameEn}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold">{pkg.agents.length}</div>
                      <div className="text-white/80 text-sm">AI Agents</div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-[#2C2420]/70 mb-6">{pkg.description}</p>

                  {/* Agents */}
                  <div className="mb-6">
                    <div className="text-xs uppercase tracking-wider text-[#2C2420]/40 mb-3">團隊成員</div>
                    <div className="flex flex-wrap gap-2">
                      {pkg.agents.map((agent, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-[#FAF9F6] text-[#2C2420]/70 text-sm rounded-full flex items-center space-x-1"
                        >
                          <span className="text-[#D4A373]">🤖</span>
                          <span>{agent}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Industries */}
                  <div className="mb-6">
                    <div className="text-xs uppercase tracking-wider text-[#2C2420]/40 mb-3">適合產業</div>
                    <div className="flex flex-wrap gap-2">
                      {pkg.industries.map((industry, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 border border-[#E0E0E0] text-[#2C2420]/60 text-sm rounded-full"
                        >
                          {industry}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <button
                    onClick={onOpenDemo}
                    className="w-full py-3 bg-[#2C2420] hover:bg-[#D4A373] text-white rounded-full font-medium transition-all"
                  >
                    了解更多
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Team Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-[#2C2420] to-[#3D3530] rounded-3xl p-10 md:p-16 text-center">
            <span className="text-6xl mb-6 block">🛠️</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white font-serif">
              客製化團隊
            </h2>
            <p className="text-white/70 mb-8 text-lg leading-relaxed max-w-2xl mx-auto">
              有其他團隊組合想法嗎？跟我們說吧！
              <br /><br />
              我們可以根據你的需求，打造專屬的 AI Agent 團隊。
              無論是特殊產業、獨特流程，還是跨部門協作，
              我們都能為你量身訂製。
            </p>
            <button
              onClick={onOpenDemo}
              className="px-8 py-4 bg-[#D4A373] hover:bg-[#B08968] text-white rounded-full font-medium transition-all shadow-lg hover:shadow-xl"
            >
              預約諮詢
            </button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-[#2C2420] text-center font-serif">如何運作</h2>
          <p className="text-[#2C2420]/60 text-center mb-12 max-w-2xl mx-auto">
            從選擇到上線，我們全程陪伴
          </p>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '1', title: '選擇方案', desc: '選擇適合你的團隊方案，或客製化組合' },
              { step: '2', title: '需求訪談', desc: '深入了解你的業務流程和痛點' },
              { step: '3', title: '團隊訓練', desc: '根據你的資料和需求訓練 AI 團隊' },
              { step: '4', title: '上線運作', desc: '團隊開始 24/7 為你工作' },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-[#D4A373] rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold mb-2 text-[#2C2420]">{item.title}</h3>
                <p className="text-[#2C2420]/60 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-[#FAF9F6]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#2C2420] font-serif">
            準備好組建你的 AI 團隊了嗎？
          </h2>
          <p className="text-[#2C2420]/60 mb-8 text-lg">
            預約免費諮詢，讓我們幫你找到最適合的方案
          </p>
          <button
            onClick={onOpenDemo}
            className="px-8 py-4 bg-[#D4A373] hover:bg-[#B08968] text-white rounded-full font-medium transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
          >
            預約免費諮詢
          </button>
        </div>
      </section>
    </div>
  );
};

export default AITeam;
