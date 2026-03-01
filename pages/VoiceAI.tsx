// pages/VoiceAI.tsx
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';
import BreadcrumbSchema from '../components/seo/BreadcrumbSchema';

interface VoiceAIProps {
  onBack: () => void;
  onOpenDemo: () => void;
}

// 商機特工 - 外撥方案
interface OutboundPlan {
  id: string;
  name: string;
  category: 'enterprise' | 'political' | 'personal';
  price: string;
  minutes: string;
  callEstimate: string;
  validity: string;
  setupFee: string;
  hasSetup: boolean;
  projects: number;
  scripts: number;
  highlight?: string;
}

// 客服特工 - 內接方案
interface InboundPlan {
  id: string;
  name: string;
  lines: number;
  setupFee: string;
  monthlyFee: string;
  perMinute: string;
  projects: number;
  scripts: number;
}

const outboundPlans: OutboundPlan[] = [
  // 個人方案
  {
    id: 'personal-m1',
    name: 'M1 入門包',
    category: 'personal',
    price: 'NT$ 3,000',
    minutes: '60 分鐘',
    callEstimate: '20-30 通',
    validity: '30 天',
    setupFee: 'NT$ 0',
    hasSetup: false,
    projects: 1,
    scripts: 1,
    highlight: '入門首選',
  },
  {
    id: 'personal-m2',
    name: 'M2 標準包',
    category: 'personal',
    price: 'NT$ 30,000',
    minutes: '666 分鐘',
    callEstimate: '222-333 通',
    validity: '45 天',
    setupFee: 'NT$ 0',
    hasSetup: false,
    projects: 2,
    scripts: 1,
  },
  {
    id: 'personal-m3',
    name: 'M3 進階包',
    category: 'personal',
    price: 'NT$ 100,000',
    minutes: '2,325 分鐘',
    callEstimate: '775-1,162 通',
    validity: '60 天',
    setupFee: 'NT$ 0',
    hasSetup: false,
    projects: 2,
    scripts: 3,
  },
  // 企業方案
  {
    id: 'enterprise-growth',
    name: 'Growth',
    category: 'enterprise',
    price: 'NT$ 68,000',
    minutes: '1,942 分鐘',
    callEstimate: '388-971 通',
    validity: '90 天',
    setupFee: 'NT$ 0',
    hasSetup: false,
    projects: 1,
    scripts: 3,
    highlight: '企業入門',
  },
  {
    id: 'enterprise-scale',
    name: 'Scale',
    category: 'enterprise',
    price: 'NT$ 275,000',
    minutes: '5,555 分鐘',
    callEstimate: '1,111-2,777 通',
    validity: '120 天',
    setupFee: 'NT$ 125,000',
    hasSetup: true,
    projects: 3,
    scripts: 3,
    highlight: '含建置服務',
  },
  {
    id: 'enterprise-enterprise',
    name: 'Enterprise',
    category: 'enterprise',
    price: 'NT$ 1,800,000',
    minutes: '97,058 分鐘',
    callEstimate: '19,411-48,529 通',
    validity: '180 天',
    setupFee: 'NT$ 150,000',
    hasSetup: true,
    projects: 10,
    scripts: 3,
    highlight: '大型專案',
  },
  // 政治方案
  {
    id: 'political-p1',
    name: 'P1',
    category: 'political',
    price: 'NT$ 100,000',
    minutes: '3,125 分鐘',
    callEstimate: '1,041-1,562 通',
    validity: '60 天',
    setupFee: 'NT$ 0',
    hasSetup: false,
    projects: 2,
    scripts: 3,
    highlight: '選戰入門',
  },
  {
    id: 'political-p2',
    name: 'P2',
    category: 'political',
    price: 'NT$ 300,000',
    minutes: '5,769 分鐘',
    callEstimate: '1,923-2,884 通',
    validity: '90 天',
    setupFee: 'NT$ 150,000',
    hasSetup: true,
    projects: 4,
    scripts: 3,
    highlight: '含建置服務',
  },
  {
    id: 'political-p3',
    name: 'P3',
    category: 'political',
    price: 'NT$ 1,000,000',
    minutes: '36,363 分鐘',
    callEstimate: '12,121-18,181 通',
    validity: '120 天',
    setupFee: 'NT$ 200,000',
    hasSetup: true,
    projects: 12,
    scripts: 3,
    highlight: '大型選戰',
  },
];

const inboundPlans: InboundPlan[] = [
  {
    id: 'inbound-1',
    name: '1 線方案',
    lines: 1,
    setupFee: 'NT$ 350,000',
    monthlyFee: 'NT$ 18,000',
    perMinute: 'NT$ 2.5',
    projects: 1,
    scripts: 1,
  },
  {
    id: 'inbound-2',
    name: '2 線方案',
    lines: 2,
    setupFee: 'NT$ 400,000',
    monthlyFee: 'NT$ 20,000',
    perMinute: 'NT$ 2',
    projects: 1,
    scripts: 1,
  },
  {
    id: 'inbound-5',
    name: '5 線方案',
    lines: 5,
    setupFee: 'NT$ 500,000',
    monthlyFee: 'NT$ 26,000',
    perMinute: 'NT$ 1.5',
    projects: 2,
    scripts: 6,
  },
];

const VoiceAI: React.FC<VoiceAIProps> = ({ onBack, onOpenDemo }) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'outbound' | 'inbound'>('outbound');
  const [outboundCategory, setOutboundCategory] = useState<'personal' | 'enterprise' | 'political'>('enterprise');

  return (
    <div className="min-h-screen bg-[#FAF9F6]">
      <SEO
        title="語音 AI 解決方案 | 商機特工 & 客服特工 | Pain Point"
        description="AI 幫你打電話、接電話。商機特工（外撥）處理民調、銷售、回訪；客服特工（內接）24/7 接聽來電、回覆訊息。成本省 60-70%，執行力提升 10 倍。"
        url="/voice-ai"
      />
      <BreadcrumbSchema
        items={[
          { name: '首頁', url: '/' },
          { name: '語音 AI 解決方案' }
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
              <span>語音 AI 解決方案</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight text-[#2C2420] font-serif">
              AI 幫你<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4A373] to-[#B08968]">打電話、接電話</span>
            </h1>
            
            <p className="text-xl text-[#2C2420]/60 max-w-3xl mx-auto font-light leading-relaxed mb-12">
              民調、銷售、回訪、客服，一套系統搞定。<br />
              成本省 60-70%，執行力提升 10 倍，品質一致 24/7。
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={onOpenDemo}
                className="px-8 py-4 bg-gradient-to-r from-[#D4A373] to-[#B08968] hover:from-[#B08968] hover:to-[#9A7B5B] text-white rounded-full font-medium transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
              >
                預約免費諮詢
              </button>
            </div>
          </div>

          {/* Key Numbers */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { number: '70%', label: '成本節省', desc: '相比傳統人工' },
              { number: '10x', label: '執行力提升', desc: '併發撥打' },
              { number: '24/7', label: '全天候服務', desc: '不漏接' },
              { number: '100%', label: '逐字稿', desc: '可追蹤稽核' },
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

      {/* Product Toggle */}
      <section className="py-8 px-6 bg-white sticky top-16 z-40 border-b border-[#E0E0E0]">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center gap-4">
            <button
              onClick={() => setActiveTab('outbound')}
              className={`px-8 py-4 rounded-full font-medium transition-all ${
                activeTab === 'outbound'
                  ? 'bg-[#2C2420] text-white shadow-lg'
                  : 'bg-[#FAF9F6] text-[#2C2420] hover:bg-[#D4A373]/10'
              }`}
            >
              📞 商機特工（外撥）
            </button>
            <button
              onClick={() => setActiveTab('inbound')}
              className={`px-8 py-4 rounded-full font-medium transition-all ${
                activeTab === 'inbound'
                  ? 'bg-[#2C2420] text-white shadow-lg'
                  : 'bg-[#FAF9F6] text-[#2C2420] hover:bg-[#D4A373]/10'
              }`}
            >
              🎧 客服特工（內接）
            </button>
          </div>
        </div>
      </section>

      {/* Outbound Section */}
      {activeTab === 'outbound' && (
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#2C2420] font-serif">
                商機特工 | Pipeline Agent
              </h2>
              <p className="text-[#2C2420]/60 max-w-2xl mx-auto">
                把「打電話」升級成可管理的 Pipeline。民調、老客回訪、陌生開發、推廣活動，一套搞定。
              </p>
            </div>

            {/* Use Cases */}
            <div className="grid md:grid-cols-4 gap-4 mb-12">
              {[
                { icon: '📊', title: '民調', desc: '2-3 分/通' },
                { icon: '🤝', title: '老客回訪', desc: '3-5 分/通' },
                { icon: '🎯', title: '陌生開發', desc: '5 分/通' },
                { icon: '📣', title: '推廣活動', desc: '3 分/通' },
              ].map((item, i) => (
                <div key={i} className="bg-white p-4 rounded-xl border border-[#E0E0E0] text-center">
                  <div className="text-2xl mb-2">{item.icon}</div>
                  <div className="font-bold text-[#2C2420]">{item.title}</div>
                  <div className="text-xs text-[#2C2420]/50">{item.desc}</div>
                </div>
              ))}
            </div>

            {/* Category Toggle */}
            <div className="flex justify-center gap-2 mb-8">
              {[
                { id: 'personal', label: '👤 個人', desc: '無建置費' },
                { id: 'enterprise', label: '🏢 企業', desc: '專業方案' },
                { id: 'political', label: '🗳️ 政治', desc: '選戰專用' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setOutboundCategory(cat.id as 'personal' | 'enterprise' | 'political')}
                  className={`px-6 py-3 rounded-full font-medium transition-all ${
                    outboundCategory === cat.id
                      ? 'bg-[#D4A373] text-white'
                      : 'bg-white border border-[#E0E0E0] text-[#2C2420] hover:border-[#D4A373]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Plans Grid */}
            <div className="grid md:grid-cols-3 gap-6">
              {outboundPlans
                .filter((p) => p.category === outboundCategory)
                .map((plan) => (
                  <div
                    key={plan.id}
                    className="bg-white rounded-3xl border border-[#E0E0E0] overflow-hidden hover:border-[#D4A373] hover:shadow-xl transition-all"
                  >
                    <div className="bg-gradient-to-r from-[#2C2420] to-[#3D3530] p-6 text-white">
                      {plan.highlight && (
                        <span className="inline-block px-2 py-1 bg-[#D4A373] text-white text-xs rounded-full mb-2">
                          {plan.highlight}
                        </span>
                      )}
                      <h3 className="text-2xl font-bold">{plan.name}</h3>
                      <p className="text-3xl font-bold mt-2">{plan.price}</p>
                    </div>
                    <div className="p-6">
                      <div className="space-y-3 mb-6">
                        <div className="flex justify-between text-sm">
                          <span className="text-[#2C2420]/60">⏱️ 分鐘包</span>
                          <span className="font-medium text-[#2C2420]">{plan.minutes}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-[#2C2420]/60">📞 預估通數</span>
                          <span className="font-medium text-[#2C2420]">{plan.callEstimate}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-[#2C2420]/60">📅 使用期限</span>
                          <span className="font-medium text-[#2C2420]">{plan.validity}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-[#2C2420]/60">🔧 建置費</span>
                          <span className={`font-medium ${plan.hasSetup ? 'text-[#D4A373]' : 'text-green-600'}`}>
                            {plan.hasSetup ? plan.setupFee : '免建置費'}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-[#2C2420]/60">📁 專案/劇本</span>
                          <span className="font-medium text-[#2C2420]">{plan.projects} 專案 / {plan.scripts} 劇本</span>
                        </div>
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

            {/* Why Pipeline Agent */}
            <div className="mt-20 bg-[#2C2420] rounded-3xl p-10 text-white">
              <h3 className="text-2xl font-bold mb-6 text-center">為什麼選擇商機特工？</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { icon: '💰', title: '成本省 70%+', desc: '多線併發、自動整理、減少無效通話' },
                  { icon: '🎯', title: '精確度更高', desc: '逐字稿可追蹤，結構化輸出' },
                  { icon: '⚡', title: '執行力 10 倍', desc: '併發撥打、自動分類、自動重撥' },
                  { icon: '😌', title: '沒有情緒瓶頸', desc: '被拒 100 次，第 101 次語氣一樣' },
                ].map((item, i) => (
                  <div key={i} className="text-center">
                    <div className="text-4xl mb-3">{item.icon}</div>
                    <div className="font-bold mb-1">{item.title}</div>
                    <div className="text-white/60 text-sm">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Inbound Section */}
      {activeTab === 'inbound' && (
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#2C2420] font-serif">
                客服特工 | Service Agent
              </h2>
              <p className="text-[#2C2420]/60 max-w-2xl mx-auto">
                把「客服」升級成可管理的 Service Pipeline。電話、LINE、FB、IG，統一接聽、不漏訊息。
              </p>
            </div>

            {/* Plans Grid */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {inboundPlans.map((plan) => (
                <div
                  key={plan.id}
                  className="bg-white rounded-3xl border border-[#E0E0E0] overflow-hidden hover:border-[#D4A373] hover:shadow-xl transition-all"
                >
                  <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-6 text-white">
                    <div className="text-4xl mb-2">🎧</div>
                    <h3 className="text-2xl font-bold">{plan.name}</h3>
                    <p className="text-white/80">{plan.lines} 線同時接聽</p>
                  </div>
                  <div className="p-6">
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between text-sm">
                        <span className="text-[#2C2420]/60">🔧 建置費</span>
                        <span className="font-medium text-[#2C2420]">{plan.setupFee}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-[#2C2420]/60">📅 月費</span>
                        <span className="font-medium text-[#D4A373]">{plan.monthlyFee}/月</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-[#2C2420]/60">⏱️ 通話費</span>
                        <span className="font-medium text-[#2C2420]">{plan.perMinute}/分</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-[#2C2420]/60">📁 專案/劇本</span>
                        <span className="font-medium text-[#2C2420]">{plan.projects} 專案 / {plan.scripts} 劇本</span>
                      </div>
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

            {/* Chat Add-on */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl p-8 text-white mb-12">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1">
                  <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm mb-4">加購項目</span>
                  <h3 className="text-2xl font-bold mb-4">社群客服整合</h3>
                  <p className="text-white/80 mb-4">
                    串接 LINE、Facebook、Instagram、Threads，跨平台統一收件匣，AI 即時回覆常見問題。
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {['LINE', 'Facebook', 'Instagram', 'Threads'].map((platform) => (
                      <span key={platform} className="px-3 py-1 bg-white/20 rounded-full text-sm">
                        {platform}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-white/60 mb-1">建置費</div>
                  <div className="text-2xl font-bold">NT$ 250,000</div>
                  <div className="text-sm text-white/60 mt-2">月費 NT$ 6,500 起</div>
                </div>
              </div>
            </div>

            {/* Why Service Agent */}
            <div className="bg-[#2C2420] rounded-3xl p-10 text-white">
              <h3 className="text-2xl font-bold mb-6 text-center">為什麼選擇客服特工？</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { icon: '💰', title: '成本省 60%+', desc: '80% 重複問題自動化處理' },
                  { icon: '🎯', title: '服務一致', desc: '單一知識來源，回答不打架' },
                  { icon: '⚡', title: '接待量 10 倍', desc: '同時接聽、同時回覆' },
                  { icon: '📊', title: '資料累積', desc: '每次對話都變成可用數據' },
                ].map((item, i) => (
                  <div key={i} className="text-center">
                    <div className="text-4xl mb-3">{item.icon}</div>
                    <div className="font-bold mb-1">{item.title}</div>
                    <div className="text-white/60 text-sm">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className="py-20 px-6 bg-gradient-to-br from-[#2C2420] to-[#3D3530]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white font-serif">
            讓 AI 處理電話<br />
            <span className="text-[#D4A373]">你專注重要的事</span>
          </h2>
          <p className="text-white/60 mb-8 text-lg max-w-2xl mx-auto">
            預約免費諮詢，讓我們幫你找到最適合的語音 AI 方案。
          </p>
          <button
            onClick={onOpenDemo}
            className="px-10 py-5 bg-gradient-to-r from-[#D4A373] to-[#B08968] hover:from-[#B08968] hover:to-[#9A7B5B] text-white rounded-full font-medium text-lg transition-all shadow-2xl hover:shadow-xl hover:-translate-y-1"
          >
            預約免費諮詢
          </button>
        </div>
      </section>
    </div>
  );
};

export default VoiceAI;
