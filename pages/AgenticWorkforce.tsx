// pages/AgenticWorkforce.tsx
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';
import BreadcrumbSchema from '../components/seo/BreadcrumbSchema';

interface AgenticWorkforceProps {
  onBack: () => void;
  onOpenDemo: () => void;
}

interface Plan {
  id: string;
  name: string;
  tagline: string;
  emoji: string;
  targetAudience: string;
  agentCount: string;
  fixedTeams: string[];
  selectableTeams?: number;
  highlights: string[];
  color: string;
  salaryEquivalent: string;
  efficiencyBoost: string;
  performanceHighlights: string[];
  monthlyFee: string;
  roi: string;
}

interface FunctionalTeam {
  id: string;
  name: string;
  emoji: string;
  agentCount: number;
  agents: { name: string; capability: string }[];
  description: string;
}

const plans: Plan[] = [
  {
    id: 'solo-assistant',
    name: 'SOLO Assistant',
    tagline: '您的 AI 特助團隊',
    emoji: '👔',
    targetAudience: '忙碌的專業人士、主管、創業者',
    agentCount: '5 位 Agent',
    fixedTeams: ['特助團隊'],
    highlights: [
      '名片智慧管理 — 掃描、分類、搜尋，人脈一目瞭然',
      '會議安排 — 自動協調 Google Meet / Zoom，找出最佳時段',
      '主動提醒 — 生日、紀念日、重要日期，不再遺忘',
      'Follow-up 追蹤 — 主動追蹤待辦事項，確保不漏接',
    ],
    color: 'from-blue-500 to-indigo-600',
    salaryEquivalent: 'NT$ 10-12 萬',
    efficiencyBoost: '+150%',
    performanceHighlights: [
      '📬 訊息回覆：即時',
      '📅 行程管理：零衝突',
      '🤝 人脈追蹤：零遺漏',
    ],
    monthlyFee: 'NT$ 3 萬',
    roi: '3-4 倍',
  },
  {
    id: 'solo-marketing',
    name: 'SOLO Marketing',
    tagline: '您的 AI 社群行銷團隊',
    emoji: '📱',
    targetAudience: '需要社群行銷的個人創業者、小型企業',
    agentCount: '5 位 Agent',
    fixedTeams: ['社群行銷團隊'],
    highlights: [
      '關鍵字策略規劃',
      '社群經營方向制定',
      '定期發文與自動配圖',
      '社群互動與數據分析',
    ],
    color: 'from-pink-500 to-rose-600',
    salaryEquivalent: 'NT$ 10-15 萬',
    efficiencyBoost: '+200%',
    performanceHighlights: [
      '📱 發文產能：提升 5-10 倍',
      '💬 留言回覆：24/7 即時',
      '📊 數據分析：每日自動報告',
    ],
    monthlyFee: 'NT$ 3 萬',
    roi: '3-5 倍',
  },
  {
    id: 'crew-standard',
    name: 'CREW Standard',
    tagline: '打造你的 AI 部門',
    emoji: '🏢',
    targetAudience: '10-30 人公司、單一部門強化',
    agentCount: '10-16 位 Agent',
    fixedTeams: ['協調員'],
    selectableTeams: 2,
    highlights: [
      '專屬 LINE 群支援',
      '每週使用報告',
      '月度優化會議',
      '季度策略檢討',
    ],
    color: 'from-emerald-500 to-teal-600',
    salaryEquivalent: 'NT$ 25-35 萬',
    efficiencyBoost: '+200%',
    performanceHighlights: [
      '⚡ 跨部門協作：無縫整合',
      '🕐 回應時間：秒級',
      '📈 產出量：倍數成長',
    ],
    monthlyFee: '敬請期待',
    roi: '4-6 倍',
  },
  {
    id: 'crew-plus',
    name: 'CREW Plus',
    tagline: '跨部門協作的 AI 團隊',
    emoji: '🚀',
    targetAudience: '30-50 人公司、跨部門協作',
    agentCount: '15-22 位 Agent',
    fixedTeams: ['協調員', '研究員團隊'],
    selectableTeams: 3,
    highlights: [
      '專屬 LINE 群 + 電話支援',
      '雙週優化會議',
      '月度策略檢討',
      '客製化訓練',
    ],
    color: 'from-violet-500 to-purple-600',
    salaryEquivalent: 'NT$ 45-55 萬',
    efficiencyBoost: '+300%',
    performanceHighlights: [
      '⚡ 營運效能：大幅提升',
      '🕐 全通路回覆：即時',
      '📈 市場研究：自動化',
    ],
    monthlyFee: '敬請期待',
    roi: '5-7 倍',
  },
  {
    id: 'crew-business',
    name: 'CREW Business',
    tagline: '企業級 AI 勞動力',
    emoji: '🏛️',
    targetAudience: '50-200 人公司、多部門整合',
    agentCount: '20-26 位 Agent',
    fixedTeams: ['協調員', '研究員團隊'],
    selectableTeams: 4,
    highlights: [
      '專屬客戶經理',
      '即時通訊 + 電話支援',
      '每週優化會議',
      'SLA 保證 99% uptime',
    ],
    color: 'from-amber-500 to-orange-600',
    salaryEquivalent: 'NT$ 60-80 萬',
    efficiencyBoost: '+400%',
    performanceHighlights: [
      '⚡ 企業級效能：全面提升',
      '🕐 SLA 保證：99% uptime',
      '📈 規模化營運：無上限',
    ],
    monthlyFee: '敬請期待',
    roi: '5-8 倍',
  },
];

const functionalTeams: FunctionalTeam[] = [
  {
    id: 'assistant',
    name: '特助團隊',
    emoji: '📋',
    agentCount: 5,
    agents: [
      { name: '行程管理專員', capability: '每日行程回報、任務提醒' },
      { name: 'Email 輔助專員', capability: '信件摘要、草稿、追蹤' },
      { name: '聯絡人管理專員', capability: '名片、互動歷史、提醒' },
      { name: '會議助理專員', capability: '準備包、會議記錄、follow-up' },
      { name: '簡報提案專員', capability: 'NotebookLM 整合、資料彙整' },
    ],
    description: '讓瑣事不再佔用你的專注時間，從行程到人脈一手包辦。',
  },
  {
    id: 'social-marketing',
    name: '社群行銷團隊',
    emoji: '📣',
    agentCount: 5,
    agents: [
      { name: '關鍵字策略專員', capability: 'Google Trend 分析、關鍵字計畫' },
      { name: '社群策略專員', capability: '社群經營方向、量化目標' },
      { name: '社群發文專員', capability: '定期發文、自動配圖' },
      { name: '社群回文專員', capability: '互動回覆、負評處理' },
      { name: '社群分析專員', capability: '流量分析、策略調整' },
    ],
    description: '從策略到執行，讓你的社群聲量持續成長。',
  },
  {
    id: 'seo-marketing',
    name: 'SEO 行銷團隊',
    emoji: '🔍',
    agentCount: 4,
    agents: [
      { name: '關鍵字策略專員', capability: 'SEO 計畫、排名目標' },
      { name: '部落格撰寫專員', capability: '專業內容產出' },
      { name: '部落格分析專員', capability: '流量排名分析、優化建議' },
      { name: 'SEO 優化專員', capability: '技術優化、競品分析' },
    ],
    description: '用內容搶佔搜尋排名，讓客戶主動找上門。',
  },
  {
    id: 'sales',
    name: '業務團隊',
    emoji: '🎯',
    agentCount: 4,
    agents: [
      { name: '業務目標專員', capability: '目標定義、客群對應' },
      { name: '名單搜尋專員', capability: '潛在客戶挖掘' },
      { name: '對談篩選專員', capability: 'LINE/WhatsApp/Email 分類' },
      { name: '對談分析專員', capability: '成交分析、策略建議' },
    ],
    description: '從名單挖掘到會議預約，讓業務專注在成交。',
  },
  {
    id: 'customer-service',
    name: '客服團隊',
    emoji: '🎧',
    agentCount: 4,
    agents: [
      { name: 'FAQ 管理專員', capability: '知識庫建立維護' },
      { name: '線上對話專員', capability: 'LINE/WA/Email 回覆' },
      { name: '問題分類專員', capability: '轉接判斷、升級處理' },
      { name: '客服分析專員', capability: '數據分析、策略建議' },
    ],
    description: '24/7 全天候客服，讓客戶滿意度飆升。',
  },
  {
    id: 'design',
    name: '美編團隊',
    emoji: '🎨',
    agentCount: 3,
    agents: [
      { name: '視覺策略專員', capability: '風格定義、設計指南' },
      { name: '平面設計專員', capability: '海報/Banner/簡報優化' },
      { name: '社群素材專員', capability: '社群圖片、限動設計' },
    ],
    description: '視覺設計不再是瓶頸，品牌形象一致呈現。',
  },
];

const AgenticWorkforce: React.FC<AgenticWorkforceProps> = ({ onBack, onOpenDemo }) => {
  const { t } = useTranslation();
  const [expandedTeam, setExpandedTeam] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-[#FAF9F6]">
      <SEO
        title="AI代理人勞動力 | AI 員工團隊 | Pain Point"
        description="打造你的專屬 AI 員工團隊。從個人特助到企業級部門，選擇適合你的方案，讓 AI 處理瑣事，你專注重要的事。"
        url="/agentic-workforce"
      />
      <BreadcrumbSchema
        items={[
          { name: '首頁', url: '/' },
          { name: 'AI代理人勞動力' }
        ]}
      />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-10 w-96 h-96 bg-gradient-to-br from-[#D4A373]/20 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-10 w-80 h-80 bg-gradient-to-tr from-[#D4A373]/10 to-transparent rounded-full blur-3xl"></div>
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
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#D4A373]/20 to-[#D4A373]/10 text-[#D4A373] text-xs uppercase tracking-widest font-bold mb-6">
              <span className="w-2 h-2 rounded-full bg-[#D4A373] animate-pulse"></span>
              <span>AI代理人勞動力</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight text-[#2C2420] font-serif">
              你的 AI 員工團隊<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4A373] to-[#B08968]">24/7 為你工作</span>
            </h1>
            
            <p className="text-xl text-[#2C2420]/60 max-w-3xl mx-auto font-light leading-relaxed mb-12">
              不只是一個 AI 助手，而是一個完整的 AI 員工團隊。<br />
              每位 Agent 各司其職，協同運作，讓你專注在真正重要的事。
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={onOpenDemo}
                className="px-8 py-4 bg-gradient-to-r from-[#D4A373] to-[#B08968] hover:from-[#B08968] hover:to-[#9A7B5B] text-white rounded-full font-medium transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
              >
                預約免費諮詢
              </button>
              <a
                href="#plans"
                className="px-8 py-4 bg-white border-2 border-[#2C2420] text-[#2C2420] hover:bg-[#2C2420] hover:text-white rounded-full font-medium transition-all"
              >
                探索方案
              </a>
            </div>
          </div>

          {/* Key Numbers */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { number: '5-26', label: '位 AI 員工', desc: '依方案而定' },
              { number: '24/7', label: '全年無休', desc: '永遠在線' },
              { number: '6', label: '種功能團隊', desc: '專業分工' },
              { number: '∞', label: '知識累積', desc: '不會離職' },
            ].map((stat, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl border border-[#E0E0E0] text-center hover:border-[#D4A373] transition-colors">
                <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#D4A373] to-[#B08968] mb-1">{stat.number}</div>
                <div className="text-sm font-medium text-[#2C2420] mb-1">{stat.label}</div>
                <div className="text-xs text-[#2C2420]/50">{stat.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why AI代理人勞動力 */}
      <section className="py-20 px-6 bg-[#2C2420] text-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center font-serif">為什麼需要 AI 員工團隊？</h2>
          <p className="text-white/60 text-center mb-12 max-w-2xl mx-auto">傳統 AI 助手只能一對一，而 AI代理人勞動力 是一整個團隊</p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-white/10">
              <div className="text-4xl mb-4">🧠</div>
              <h3 className="text-xl font-bold mb-3">專業分工</h3>
              <p className="text-white/70">每位 AI 員工專精一個領域，而不是什麼都做但都不精。協調員統籌全局，功能團隊各司其職。</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-white/10">
              <div className="text-4xl mb-4">🔗</div>
              <h3 className="text-xl font-bold mb-3">協同運作</h3>
              <p className="text-white/70">不同團隊之間可以協作。行銷團隊產出的內容，可以直接交給美編團隊設計，再由社群團隊發布。</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-white/10">
              <div className="text-4xl mb-4">📈</div>
              <h3 className="text-xl font-bold mb-3">持續進化</h3>
              <p className="text-white/70">知識累積不會因為離職而消失。每次互動都讓 AI 員工更了解你的業務，越用越聰明。</p>
            </div>
          </div>
        </div>
      </section>

      {/* Plans Section */}
      <section id="plans" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#2C2420] text-center font-serif">選擇你的方案</h2>
          <p className="text-[#2C2420]/60 text-center mb-4 max-w-2xl mx-auto">從個人特助到企業級部門，我們有適合各種規模的方案</p>
          <p className="text-[#D4A373] text-center mb-12 text-sm">💡 所有方案皆包含 Email 支援與定期使用報告</p>

          {/* SOLO Plans */}
          <div className="mb-16">
            <div className="flex items-center justify-center mb-8">
              <div className="h-px bg-[#E0E0E0] flex-1 max-w-[100px]"></div>
              <span className="px-4 text-sm font-bold text-[#2C2420]/40 uppercase tracking-widest">SOLO 系列</span>
              <div className="h-px bg-[#E0E0E0] flex-1 max-w-[100px]"></div>
            </div>
            <p className="text-center text-[#2C2420]/60 mb-8">適合個人與小型團隊</p>
            
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {plans.filter(p => p.id.startsWith('solo')).map((plan) => (
                <div key={plan.id} className="bg-white rounded-3xl border border-[#E0E0E0] overflow-hidden hover:border-[#D4A373] hover:shadow-xl transition-all duration-300">
                  <div className={`bg-gradient-to-r ${plan.color} p-6 text-white`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-4xl block mb-2">{plan.emoji}</span>
                        <h3 className="text-2xl font-bold">{plan.name}</h3>
                        <p className="text-white/80 text-sm">{plan.tagline}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold">{plan.agentCount.split(' ')[0]}</div>
                        <div className="text-white/80 text-sm">AI 員工</div>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    {/* 價格與產值對比 */}
                    <div className="mb-4 p-4 bg-gradient-to-r from-[#FAF9F6] to-[#F5F0EB] rounded-xl border border-[#D4A373]/20">
                      {/* 方案月費 */}
                      <div className="mb-3 pb-3 border-b border-[#D4A373]/10">
                        <span className="text-xs uppercase tracking-wider text-[#2C2420]/40">💳 方案月費</span>
                        <p className="text-2xl font-bold text-[#2C2420]">{plan.monthlyFee}<span className="text-sm font-normal text-[#2C2420]/60">/月</span></p>
                      </div>
                      {/* 相當於產值 */}
                      <div className="mb-3">
                        <span className="text-xs uppercase tracking-wider text-[#2C2420]/40">💰 相當於人類薪水產值</span>
                        <p className="text-xl font-bold text-[#D4A373]">{plan.salaryEquivalent}<span className="text-sm font-normal text-[#2C2420]/60">/月</span></p>
                      </div>
                      {/* 投資報酬 */}
                      <div className="flex items-center justify-between bg-[#D4A373]/10 rounded-lg p-2">
                        <span className="text-xs text-[#2C2420]/60">🚀 投資報酬</span>
                        <span className="text-lg font-bold text-[#D4A373]">{plan.roi}</span>
                      </div>
                    </div>

                    {/* 效能亮點 */}
                    <div className="mb-4">
                      <span className="text-xs uppercase tracking-wider text-[#2C2420]/40">⚡ 營運效能提升</span>
                      <ul className="mt-2 space-y-1">
                        {plan.performanceHighlights.map((highlight, i) => (
                          <li key={i} className="text-sm text-[#2C2420]/70">{highlight}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="mb-4">
                      <span className="text-xs uppercase tracking-wider text-[#2C2420]/40">適合對象</span>
                      <p className="text-[#2C2420] font-medium text-sm">{plan.targetAudience}</p>
                    </div>
                    
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

          {/* CREW Plans */}
          <div>
            <div className="flex items-center justify-center mb-8">
              <div className="h-px bg-[#E0E0E0] flex-1 max-w-[100px]"></div>
              <span className="px-4 text-sm font-bold text-[#2C2420]/40 uppercase tracking-widest">CREW 系列</span>
              <div className="h-px bg-[#E0E0E0] flex-1 max-w-[100px]"></div>
            </div>
            <p className="text-center text-[#2C2420]/60 mb-8">適合中型到大型企業，可自由組合功能團隊</p>
            
            <div className="grid md:grid-cols-3 gap-6">
              {plans.filter(p => p.id.startsWith('crew')).map((plan) => (
                <div key={plan.id} className="bg-white rounded-3xl border border-[#E0E0E0] overflow-hidden hover:border-[#D4A373] hover:shadow-xl transition-all duration-300">
                  <div className={`bg-gradient-to-r ${plan.color} p-6 text-white`}>
                    <span className="text-4xl block mb-2">{plan.emoji}</span>
                    <h3 className="text-xl font-bold">{plan.name}</h3>
                    <p className="text-white/80 text-sm">{plan.tagline}</p>
                    <div className="mt-4 flex items-baseline gap-2">
                      <span className="text-3xl font-bold">{plan.agentCount.split(' ')[0]}</span>
                      <span className="text-white/80 text-sm">AI 員工</span>
                    </div>
                  </div>
                  <div className="p-6">
                    {/* 價格與產值對比 */}
                    <div className="mb-4 p-3 bg-gradient-to-r from-[#FAF9F6] to-[#F5F0EB] rounded-xl border border-[#D4A373]/20">
                      {/* 方案月費 */}
                      <div className="mb-2 pb-2 border-b border-[#D4A373]/10">
                        <span className="text-[10px] uppercase tracking-wider text-[#2C2420]/40">💳 方案月費</span>
                        <p className="text-lg font-bold text-[#2C2420]/60 italic">{plan.monthlyFee}</p>
                      </div>
                      {/* 相當於產值 */}
                      <div className="mb-2">
                        <span className="text-[10px] uppercase tracking-wider text-[#2C2420]/40">💰 相當於人類薪水產值</span>
                        <p className="text-lg font-bold text-[#D4A373]">{plan.salaryEquivalent}<span className="text-[10px] font-normal text-[#2C2420]/60">/月</span></p>
                      </div>
                      {/* 投資報酬 */}
                      <div className="flex items-center justify-between bg-[#D4A373]/10 rounded-lg p-1.5">
                        <span className="text-[10px] text-[#2C2420]/60">🚀 預估投資報酬</span>
                        <span className="text-sm font-bold text-[#D4A373]">{plan.roi}</span>
                      </div>
                    </div>

                    {/* 效能亮點 */}
                    <div className="mb-3">
                      <span className="text-[10px] uppercase tracking-wider text-[#2C2420]/40">⚡ 營運效能</span>
                      <ul className="mt-1 space-y-0.5">
                        {plan.performanceHighlights.map((highlight, i) => (
                          <li key={i} className="text-xs text-[#2C2420]/70">{highlight}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="mb-3">
                      <span className="text-[10px] uppercase tracking-wider text-[#2C2420]/40">固定配置</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {plan.fixedTeams.map((team, i) => (
                          <span key={i} className="px-2 py-0.5 bg-[#FAF9F6] text-[#2C2420]/70 text-[10px] rounded-full">{team}</span>
                        ))}
                      </div>
                    </div>
                    {plan.selectableTeams && (
                      <div className="mb-3">
                        <span className="text-[10px] uppercase tracking-wider text-[#2C2420]/40">自選團隊</span>
                        <p className="text-[#D4A373] font-bold text-sm">可選擇 {plan.selectableTeams} 個功能團隊</p>
                      </div>
                    )}
                    <button
                      onClick={onOpenDemo}
                      className="w-full py-3 bg-[#2C2420] hover:bg-[#D4A373] text-white rounded-full font-medium transition-all text-sm"
                    >
                      預約諮詢
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Functional Teams */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#2C2420] text-center font-serif">功能團隊一覽</h2>
          <p className="text-[#2C2420]/60 text-center mb-12 max-w-2xl mx-auto">
            每個功能團隊都由多位專業 AI 員工組成，各司其職
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {functionalTeams.map((team) => (
              <div
                key={team.id}
                className="bg-[#FAF9F6] rounded-2xl border border-[#E0E0E0] overflow-hidden hover:border-[#D4A373] transition-all cursor-pointer"
                onClick={() => setExpandedTeam(expandedTeam === team.id ? null : team.id)}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{team.emoji}</span>
                      <div>
                        <h3 className="font-bold text-[#2C2420]">{team.name}</h3>
                        <span className="text-xs text-[#D4A373]">{team.agentCount} 位 AI 員工</span>
                      </div>
                    </div>
                    <svg
                      className={`w-5 h-5 text-[#2C2420]/40 transition-transform ${expandedTeam === team.id ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                  <p className="text-sm text-[#2C2420]/60">{team.description}</p>
                </div>

                {expandedTeam === team.id && (
                  <div className="border-t border-[#E0E0E0] p-6 bg-white">
                    <h4 className="text-xs uppercase tracking-wider text-[#2C2420]/40 mb-3">團隊成員</h4>
                    <div className="space-y-3">
                      {team.agents.map((agent, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <span className="text-[#D4A373]">🤖</span>
                          <div>
                            <p className="font-medium text-sm text-[#2C2420]">{agent.name}</p>
                            <p className="text-xs text-[#2C2420]/50">{agent.capability}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Teams (Orchestrator & Researcher) */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-[#2C2420] text-center font-serif">核心團隊</h2>
          <p className="text-[#2C2420]/60 text-center mb-12 max-w-2xl mx-auto">
            CREW 系列方案的固定配置，負責統籌與研究
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Orchestrator */}
            <div className="bg-gradient-to-br from-[#2C2420] to-[#3D3530] rounded-3xl p-8 text-white">
              <div className="text-5xl mb-4">🧠</div>
              <h3 className="text-2xl font-bold mb-2">協調員</h3>
              <p className="text-white/60 text-sm mb-6">CREW 系列固定配置</p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#D4A373] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm">長期目標規劃與拆解</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#D4A373] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm">執行方式規劃與資源協調</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#D4A373] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm">工作分配與進度追蹤</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#D4A373] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm">每日/每週/每月工作匯報</span>
                </li>
              </ul>
            </div>

            {/* Researcher */}
            <div className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-3xl p-8 text-white">
              <div className="text-5xl mb-4">🔬</div>
              <h3 className="text-2xl font-bold mb-2">研究員團隊</h3>
              <p className="text-white/60 text-sm mb-6">CREW Plus 以上固定配置（2 位 Agent）</p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-white mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <span className="text-sm font-medium">網路研究專員</span>
                    <p className="text-xs text-white/60">從網路收集資料、建立研究報告</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-white mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <span className="text-sm font-medium">RAG 管理專員</span>
                    <p className="text-xs text-white/60">建立企業知識庫、資料分類整理</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Add-ons */}
      <section className="py-20 px-6 bg-[#FAF9F6]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-[#2C2420] text-center font-serif">可加購升級</h2>
          <p className="text-[#2C2420]/60 text-center mb-12">根據需求擴展你的 AI 團隊</p>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-[#E0E0E0]">
              <div className="text-3xl mb-3">💬</div>
              <h3 className="font-bold text-[#2C2420] mb-2">群組助理</h3>
              <p className="text-sm text-[#2C2420]/60">在 LINE 群組安排專屬 Agent，每天整理聊天內容回報，含關鍵字即時通報。</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-[#E0E0E0]">
              <div className="text-3xl mb-3">📞</div>
              <h3 className="font-bold text-[#2C2420] mb-2">語音客服</h3>
              <p className="text-sm text-[#2C2420]/60">AI 語音接聽電話，使用知識庫回答問題，可轉接人工或預約回撥。</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-[#E0E0E0]">
              <div className="text-3xl mb-3">👔</div>
              <h3 className="font-bold text-[#2C2420] mb-2">額外特助團隊</h3>
              <p className="text-sm text-[#2C2420]/60">為不同主管配置專屬的特助團隊，每人 5 位 AI 員工。</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-[#2C2420] text-center font-serif">如何開始</h2>
          <p className="text-[#2C2420]/60 text-center mb-12 max-w-2xl mx-auto">
            從諮詢到上線，我們全程陪伴
          </p>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '1', title: '免費諮詢', desc: '了解你的需求，推薦適合方案', icon: '💬' },
              { step: '2', title: '團隊配置', desc: '選擇功能團隊，客製化設定', icon: '⚙️' },
              { step: '3', title: 'AI 訓練', desc: '根據你的資料和需求訓練團隊', icon: '🎓' },
              { step: '4', title: '上線運作', desc: '團隊開始 24/7 為你工作', icon: '🚀' },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-[#D4A373] to-[#B08968] rounded-2xl flex items-center justify-center mx-auto mb-4 text-4xl shadow-lg">
                  {item.icon}
                </div>
                <div className="text-xs text-[#D4A373] font-bold mb-2">STEP {item.step}</div>
                <h3 className="text-lg font-bold mb-2 text-[#2C2420]">{item.title}</h3>
                <p className="text-[#2C2420]/60 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6 bg-gradient-to-br from-[#2C2420] to-[#3D3530]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white font-serif">
            讓 AI 處理瑣事<br />
            <span className="text-[#D4A373]">你專注重要的事</span>
          </h2>
          <p className="text-white/60 mb-8 text-lg max-w-2xl mx-auto">
            預約免費諮詢，讓我們幫你找到最適合的 AI 員工團隊配置。
          </p>
          <button
            onClick={onOpenDemo}
            className="px-10 py-5 bg-gradient-to-r from-[#D4A373] to-[#B08968] hover:from-[#B08968] hover:to-[#9A7B5B] text-white rounded-full font-medium text-lg transition-all shadow-2xl hover:shadow-xl hover:-translate-y-1"
          >
            預約免費諮詢
          </button>
          <p className="text-white/40 text-sm mt-6">Pain Point Technologies — 讓 AI 處理瑣事，你專注重要的事</p>
        </div>
      </section>
    </div>
  );
};

export default AgenticWorkforce;
