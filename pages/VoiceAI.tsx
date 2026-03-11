// pages/VoiceAI.tsx
import React, { useState, useRef } from 'react';
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
    price: '請洽詢',
    minutes: '60 分鐘',
    callEstimate: '20-30 通',
    validity: '30 天',
    setupFee: '請洽詢',
    hasSetup: false,
    projects: 1,
    scripts: 1,
    highlight: '入門首選',
  },
  {
    id: 'personal-m2',
    name: 'M2 標準包',
    category: 'personal',
    price: '請洽詢',
    minutes: '666 分鐘',
    callEstimate: '222-333 通',
    validity: '45 天',
    setupFee: '請洽詢',
    hasSetup: false,
    projects: 2,
    scripts: 1,
  },
  {
    id: 'personal-m3',
    name: 'M3 進階包',
    category: 'personal',
    price: '請洽詢',
    minutes: '2,325 分鐘',
    callEstimate: '775-1,162 通',
    validity: '60 天',
    setupFee: '請洽詢',
    hasSetup: false,
    projects: 2,
    scripts: 3,
  },
  // 企業方案
  {
    id: 'enterprise-growth',
    name: 'Growth',
    category: 'enterprise',
    price: '請洽詢',
    minutes: '1,942 分鐘',
    callEstimate: '388-971 通',
    validity: '90 天',
    setupFee: '請洽詢',
    hasSetup: false,
    projects: 1,
    scripts: 3,
    highlight: '企業入門',
  },
  {
    id: 'enterprise-scale',
    name: 'Scale',
    category: 'enterprise',
    price: '請洽詢',
    minutes: '5,555 分鐘',
    callEstimate: '1,111-2,777 通',
    validity: '120 天',
    setupFee: '請洽詢',
    hasSetup: true,
    projects: 3,
    scripts: 3,
    highlight: '含建置服務',
  },
  {
    id: 'enterprise-enterprise',
    name: 'Enterprise',
    category: 'enterprise',
    price: '請洽詢',
    minutes: '97,058 分鐘',
    callEstimate: '19,411-48,529 通',
    validity: '180 天',
    setupFee: '請洽詢',
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
    price: '請洽詢',
    minutes: '3,125 分鐘',
    callEstimate: '1,041-1,562 通',
    validity: '60 天',
    setupFee: '請洽詢',
    hasSetup: false,
    projects: 2,
    scripts: 3,
    highlight: '選戰入門',
  },
  {
    id: 'political-p2',
    name: 'P2',
    category: 'political',
    price: '請洽詢',
    minutes: '5,769 分鐘',
    callEstimate: '1,923-2,884 通',
    validity: '90 天',
    setupFee: '請洽詢',
    hasSetup: true,
    projects: 4,
    scripts: 3,
    highlight: '含建置服務',
  },
  {
    id: 'political-p3',
    name: 'P3',
    category: 'political',
    price: '請洽詢',
    minutes: '36,363 分鐘',
    callEstimate: '12,121-18,181 通',
    validity: '120 天',
    setupFee: '請洽詢',
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
    setupFee: '請洽詢',
    monthlyFee: '請洽詢',
    perMinute: '請洽詢',
    projects: 1,
    scripts: 1,
  },
  {
    id: 'inbound-2',
    name: '2 線方案',
    lines: 2,
    setupFee: '請洽詢',
    monthlyFee: '請洽詢',
    perMinute: '請洽詢',
    projects: 1,
    scripts: 1,
  },
  {
    id: 'inbound-5',
    name: '5 線方案',
    lines: 5,
    setupFee: '請洽詢',
    monthlyFee: '請洽詢',
    perMinute: '請洽詢',
    projects: 2,
    scripts: 6,
  },
];

// Demo audio samples (placeholder URLs - replace with actual audio files)
const demoSamples = [
  { id: 'survey', icon: '📊', title: '民調電話', desc: 'AI 進行滿意度調查', duration: '28 秒' },
  { id: 'service', icon: '📞', title: '客服接聽', desc: '處理訂單查詢', duration: '35 秒' },
  { id: 'sales', icon: '🤝', title: '銷售回訪', desc: '舊客戶優惠通知', duration: '32 秒' },
];

const VoiceAI: React.FC<VoiceAIProps> = ({ onBack, onOpenDemo }) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'outbound' | 'inbound'>('outbound');
  const [outboundCategory, setOutboundCategory] = useState<'personal' | 'enterprise' | 'political'>('enterprise');
  const [playingDemo, setPlayingDemo] = useState<string | null>(null);
  const demoRef = useRef<HTMLDivElement>(null);

  const scrollToDemo = () => {
    demoRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6]">
      <SEO
        title="語音 AI 代理人 | 商機特工 & 客服特工 | Pain Point"
        description="一天撥 10,000 通電話，0 個員工請假。AI 幫你打電話、接電話，成本省 70%，執行力提升 10 倍，即時儀表板掌握所有數據。"
        url="/voice-ai"
      />
      <BreadcrumbSchema
        items={[
          { name: '首頁', url: '/' },
          { name: '語音 AI 代理人' }
        ]}
      />

      {/* 1. Hero Section */}
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
              <span>你的 24/7 電話軍團</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight text-[#2C2420] font-serif">
              一天撥 10,000 通電話<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4A373] to-[#B08968]">0 個員工請假</span>
            </h1>
            
            <p className="text-xl text-[#2C2420]/60 max-w-3xl mx-auto font-light leading-relaxed mb-12">
              民調、銷售、客服、回訪——AI 幫你打，幫你接。<br />
              成本省 70%，執行力提升 10 倍，品質永遠一致。
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={scrollToDemo}
                className="px-8 py-4 bg-gradient-to-r from-[#D4A373] to-[#B08968] hover:from-[#B08968] hover:to-[#9A7B5B] text-white rounded-full font-medium transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
              >
                🎧 聽聽 AI 怎麼講話
              </button>
              <button
                onClick={onOpenDemo}
                className="px-8 py-4 bg-white border-2 border-[#2C2420] text-[#2C2420] hover:bg-[#2C2420] hover:text-white rounded-full font-medium transition-all"
              >
                算算能省多少錢 →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Demo 試聽區 */}
      <section ref={demoRef} className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#2C2420] font-serif">
              不相信？聽聽看
            </h2>
            <p className="text-[#2C2420]/60">
              這不是錄音室配音，是實際 AI 通話錄音
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {demoSamples.map((demo) => (
              <div
                key={demo.id}
                onClick={() => setPlayingDemo(playingDemo === demo.id ? null : demo.id)}
                className={`p-8 rounded-3xl border-2 cursor-pointer transition-all ${
                  playingDemo === demo.id
                    ? 'border-[#D4A373] bg-[#D4A373]/5 shadow-xl'
                    : 'border-[#E0E0E0] bg-white hover:border-[#D4A373] hover:shadow-lg'
                }`}
              >
                <div className="text-5xl mb-4">{demo.icon}</div>
                <h3 className="text-xl font-bold text-[#2C2420] mb-2">{demo.title}</h3>
                <p className="text-[#2C2420]/60 text-sm mb-4">{demo.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#2C2420]/40">{demo.duration}</span>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                    playingDemo === demo.id
                      ? 'bg-[#D4A373] text-white'
                      : 'bg-[#2C2420] text-white'
                  }`}>
                    {playingDemo === demo.id ? (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <rect x="6" y="4" width="4" height="16" />
                        <rect x="14" y="4" width="4" height="16" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    )}
                  </div>
                </div>
                {playingDemo === demo.id && (
                  <div className="mt-4 pt-4 border-t border-[#D4A373]/20">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1 bg-[#D4A373]/20 rounded-full overflow-hidden">
                        <div className="h-full w-1/3 bg-[#D4A373] rounded-full animate-pulse"></div>
                      </div>
                      <span className="text-xs text-[#D4A373]">播放中...</span>
                    </div>
                    <p className="text-xs text-[#2C2420]/40 mt-2 italic">
                      *Demo 音檔準備中，敬請期待
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. 痛點共鳴區 */}
      <section className="py-20 px-6 bg-[#FAF9F6]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#2C2420] font-serif">
              這些問題，是不是很熟悉？
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              {
                emoji: '😤',
                title: '電話響不停，沒人接',
                desc: '客人打來沒人接 = 客人去找別人',
              },
              {
                emoji: '💸',
                title: '請一個人顧電話',
                desc: '月薪 3 萬起跳，還會請假、離職、鬧情緒',
              },
              {
                emoji: '📉',
                title: '業務打 100 通',
                desc: '接通 20 通，成交 2 單，效率在哪？',
              },
            ].map((pain, index) => (
              <div key={index} className="bg-white p-8 rounded-3xl border border-[#E0E0E0] text-center hover:shadow-lg transition-all">
                <div className="text-5xl mb-4">{pain.emoji}</div>
                <h3 className="text-lg font-bold text-[#2C2420] mb-2">{pain.title}</h3>
                <p className="text-[#2C2420]/60 text-sm">{pain.desc}</p>
              </div>
            ))}
          </div>

          <p className="text-center text-xl text-[#2C2420]/80 font-medium">
            你需要的不是更多人，是<span className="text-[#D4A373]">不會累的幫手</span>
          </p>
        </div>
      </section>

      {/* 4. 關鍵數據區 */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#2C2420] font-serif">
              數字會說話
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { number: '70%', label: '成本節省', desc: 'vs 人工客服團隊' },
              { number: '10x', label: '執行力提升', desc: '一天抵一個月' },
              { number: '24/7', label: '全天候服務', desc: '凌晨 3 點也能接' },
              { number: '100%', label: '逐字稿', desc: '每通電話可追溯' },
              { number: '📊', label: '即時分析', desc: '打完就看報表' },
            ].map((stat, index) => (
              <div key={index} className="bg-[#FAF9F6] p-6 rounded-2xl text-center hover:shadow-lg transition-all">
                <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#D4A373] to-[#B08968] mb-1">
                  {stat.number}
                </div>
                <div className="text-sm font-medium text-[#2C2420] mb-1">{stat.label}</div>
                <div className="text-xs text-[#2C2420]/50">{stat.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. 即時儀表板展示區 */}
      <section className="py-20 px-6 bg-gradient-to-br from-[#2C2420] to-[#3D3530]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white font-serif">
              打完電話，數據立刻到手
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              不用等報告、不用人工整理。每通電話結束的瞬間，數據自動進入儀表板。<br />
              接通率、通話時長、客戶回應、情緒分析——一目了然。
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              {
                icon: '📈',
                title: '即時儀表板',
                desc: '通話完成即刻更新，不用等隔天報告',
              },
              {
                icon: '🎯',
                title: '智能分析',
                desc: 'AI 自動標記關鍵字、情緒傾向、購買意向',
              },
              {
                icon: '📱',
                title: '隨時查看',
                desc: '手機、電腦、LINE 推播，隨時掌握進度',
              },
            ].map((feature, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm p-8 rounded-3xl text-center border border-white/10">
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-white/60 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>

          {/* Dashboard mockup placeholder */}
          <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
            <div className="grid grid-cols-4 gap-4 mb-6">
              {[
                { label: '今日通話', value: '1,247', change: '+12%' },
                { label: '接通率', value: '78%', change: '+5%' },
                { label: '平均時長', value: '2:34', change: '-8s' },
                { label: '意向客戶', value: '89', change: '+23%' },
              ].map((metric, i) => (
                <div key={i} className="bg-white/10 rounded-xl p-4 text-center">
                  <div className="text-white/50 text-xs mb-1">{metric.label}</div>
                  <div className="text-white text-2xl font-bold">{metric.value}</div>
                  <div className="text-green-400 text-xs">{metric.change}</div>
                </div>
              ))}
            </div>
            <div className="h-32 bg-white/5 rounded-xl flex items-center justify-center">
              <span className="text-white/30">📊 即時數據圖表</span>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Product Toggle */}
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

            {/* Why Pipeline Agent */}
            <div className="bg-[#FAF9F6] rounded-3xl p-10 mb-12">
              <h3 className="text-xl font-bold mb-6 text-center text-[#2C2420]">核心優勢</h3>
              <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
                {[
                  { icon: '💰', title: '成本省 70%+', desc: '多線併發、自動整理' },
                  { icon: '🎯', title: '精確度更高', desc: '逐字稿可追蹤' },
                  { icon: '⚡', title: '執行力 10 倍', desc: '併發撥打、自動重撥' },
                  { icon: '😌', title: '沒有情緒瓶頸', desc: '被拒 100 次語氣一樣' },
                  { icon: '📊', title: '即時報表', desc: '打完就有數據' },
                  { icon: '🔄', title: '自動整合', desc: 'CRM、LINE 同步' },
                ].map((item, i) => (
                  <div key={i} className="text-center p-4">
                    <div className="text-3xl mb-2">{item.icon}</div>
                    <div className="font-bold text-sm text-[#2C2420] mb-1">{item.title}</div>
                    <div className="text-[#2C2420]/50 text-xs">{item.desc}</div>
                  </div>
                ))}
              </div>
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
                把「客服」升級成 24 小時不打烊的服務台。電話、LINE、FB、IG，統一接聽、不漏訊息。
              </p>
            </div>

            {/* Channels */}
            <div className="flex justify-center gap-4 mb-12">
              {[
                { icon: '📞', name: '電話' },
                { icon: '💬', name: 'LINE' },
                { icon: '📘', name: 'Facebook' },
                { icon: '📸', name: 'Instagram' },
              ].map((ch, i) => (
                <div key={i} className="bg-white px-6 py-3 rounded-full border border-[#E0E0E0] flex items-center gap-2">
                  <span>{ch.icon}</span>
                  <span className="text-sm text-[#2C2420]">{ch.name}</span>
                </div>
              ))}
            </div>

            {/* Why Service Agent */}
            <div className="bg-[#FAF9F6] rounded-3xl p-10 mb-12">
              <h3 className="text-xl font-bold mb-6 text-center text-[#2C2420]">核心優勢</h3>
              <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
                {[
                  { icon: '💰', title: '成本省 60%+', desc: '80% 問題自動處理' },
                  { icon: '🎯', title: '服務一致', desc: '單一知識庫' },
                  { icon: '⚡', title: '接待量 10 倍', desc: '同時接聽回覆' },
                  { icon: '📊', title: '數據累積', desc: '對話變可用數據' },
                  { icon: '📈', title: '即時監控', desc: '客服狀況即時看' },
                  { icon: '🚨', title: '異常警示', desc: '負評即時通知' },
                ].map((item, i) => (
                  <div key={i} className="text-center p-4">
                    <div className="text-3xl mb-2">{item.icon}</div>
                    <div className="font-bold text-sm text-[#2C2420] mb-1">{item.title}</div>
                    <div className="text-[#2C2420]/50 text-xs">{item.desc}</div>
                  </div>
                ))}
              </div>
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
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl p-8 text-white">
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
          </div>
        </section>
      )}

      {/* 7. 客戶案例區 */}
      <section className="py-20 px-6 bg-[#FAF9F6]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#2C2420] font-serif">
              他們已經在用
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                industry: '補教業',
                company: 'XX 補習班',
                quote: '報名電話接聽率從 60% 提升到 95%，不再漏接任何一個想報名的家長。',
                stats: ['📈 接聽率 +35%', '💰 省下 2 位櫃檯人力'],
              },
              {
                industry: '電商',
                company: '某電商平台',
                quote: '客訴回應時間從 4 小時縮短到 30 秒，客戶滿意度明顯提升。',
                stats: ['⏱️ 回應時間 -99%', '😊 NPS +25'],
              },
              {
                industry: '政治民調',
                company: '某縣市議員候選人',
                quote: '3 天完成 8,000 通選區民調，即時掌握選情，儀表板隨時看最新數據。',
                stats: ['📊 3 天 8,000 通', '📋 即時數據分析'],
              },
            ].map((cs, index) => (
              <div key={index} className="bg-white p-8 rounded-3xl border border-[#E0E0E0] hover:shadow-lg transition-all">
                <div className="inline-block px-3 py-1 bg-[#D4A373]/10 text-[#D4A373] text-xs rounded-full mb-4">
                  {cs.industry}
                </div>
                <h3 className="text-lg font-bold text-[#2C2420] mb-3">{cs.company}</h3>
                <p className="text-[#2C2420]/70 text-sm mb-4 italic">「{cs.quote}」</p>
                <div className="space-y-2">
                  {cs.stats.map((stat, i) => (
                    <div key={i} className="text-sm text-[#2C2420]/60">{stat}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. vs 人工比較表 */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#2C2420] font-serif">
              AI 特工 vs 傳統人力
            </h2>
          </div>

          <div className="bg-[#FAF9F6] rounded-3xl overflow-hidden">
            <div className="grid grid-cols-3 bg-[#2C2420] text-white">
              <div className="p-4 text-center font-medium">項目</div>
              <div className="p-4 text-center font-medium">👤 傳統人力</div>
              <div className="p-4 text-center font-medium">🤖 AI 特工</div>
            </div>
            {[
              { item: '月成本', human: 'NT$ 35,000+ / 人', ai: 'NT$ 3,000 起', aiWin: true },
              { item: '工作時間', human: '8 小時 / 天', ai: '24 小時 / 天', aiWin: true },
              { item: '同時處理', human: '1 通', ai: '無限通', aiWin: true },
              { item: '情緒穩定', human: '會累、會煩', ai: '永遠一致', aiWin: true },
              { item: '請假離職', human: '常常發生', ai: '不存在', aiWin: true },
              { item: '通話紀錄', human: '手寫筆記', ai: '100% 逐字稿', aiWin: true },
              { item: '數據報表', human: '人工整理，隔天才有', ai: '即時更新，打完就看', aiWin: true },
              { item: '擴容速度', human: '招聘 2-4 週', ai: '即時擴容', aiWin: true },
            ].map((row, index) => (
              <div key={index} className={`grid grid-cols-3 ${index % 2 === 0 ? 'bg-white' : 'bg-[#FAF9F6]'}`}>
                <div className="p-4 text-center text-[#2C2420] font-medium">{row.item}</div>
                <div className="p-4 text-center text-[#2C2420]/60">{row.human}</div>
                <div className={`p-4 text-center font-medium ${row.aiWin ? 'text-[#D4A373]' : 'text-[#2C2420]'}`}>
                  {row.ai}
                </div>
              </div>
            ))}
          </div>

          <p className="text-center mt-8 text-xl text-[#2C2420] font-medium">
            一個 AI 特工 = <span className="text-[#D4A373]">3 位全職人力產出</span>
          </p>
        </div>
      </section>

      {/* 9. FAQ 區 */}
      <section className="py-20 px-6 bg-[#FAF9F6]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#2C2420] font-serif">
              常見問題
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: '聽起來會像機器人嗎？',
                a: '我們用最新的語音合成技術，自然度接近真人。而且懂台灣口音和用語。上面有 Demo，聽聽看就知道。',
              },
              {
                q: '客戶會知道是 AI 嗎？',
                a: '大部分客戶分辨不出來。但我們建議在通話開頭簡單說明，既合規又建立信任。',
              },
              {
                q: '導入要多久？',
                a: '最快 3 天上線。基本方案免建置費，複雜專案約 1-2 週。',
              },
              {
                q: '可以處理複雜問題嗎？',
                a: 'AI 處理 80% 的常見問題，複雜狀況自動轉接真人。你設定規則，AI 照做。',
              },
              {
                q: '資料安全嗎？',
                a: '所有通話錄音加密儲存，符合個資法規範。企業方案可選台灣本地機房。',
              },
              {
                q: '數據報表怎麼看？',
                a: '提供即時儀表板，通話完成即刻更新。也可以設定 LINE 推播，隨時掌握最新進度。',
              },
            ].map((faq, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl border border-[#E0E0E0]">
                <h3 className="font-bold text-[#2C2420] mb-2">{faq.q}</h3>
                <p className="text-[#2C2420]/70 text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Final CTA */}
      <section className="py-20 px-6 bg-gradient-to-br from-[#2C2420] to-[#3D3530]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white font-serif">
            讓 AI 處理電話<br />
            <span className="text-[#D4A373]">你專注更重要的事</span>
          </h2>
          <p className="text-white/60 mb-8 text-lg max-w-2xl mx-auto">
            預約免費諮詢，讓我們幫你找到最適合的方案。<br />
            或者，先聽聽 AI 怎麼講話。
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <button
              onClick={onOpenDemo}
              className="px-10 py-5 bg-gradient-to-r from-[#D4A373] to-[#B08968] hover:from-[#B08968] hover:to-[#9A7B5B] text-white rounded-full font-medium text-lg transition-all shadow-2xl hover:shadow-xl hover:-translate-y-1"
            >
              預約免費諮詢
            </button>
            <button
              onClick={scrollToDemo}
              className="px-10 py-5 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-full font-medium text-lg transition-all"
            >
              🎧 再聽一次 Demo
            </button>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-6 text-white/50 text-sm">
            <span>🇹🇼 台灣本土團隊</span>
            <span>🔒 資料加密儲存</span>
            <span>📞 真人客服支援</span>
            <span>📊 即時數據儀表板</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VoiceAI;
