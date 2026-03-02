// pages/AgenticImpact.tsx
import React, { useState } from 'react';
import SEO from '../components/SEO';
import BreadcrumbSchema from '../components/seo/BreadcrumbSchema';

interface AgenticImpactProps {
  onBack: () => void;
  onOpenDemo: () => void;
}

const AgenticImpact: React.FC<AgenticImpactProps> = ({ onBack, onOpenDemo }) => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: '我完全不懂 AI，可以嗎？',
      a: '可以。你管生意，我們管技術。你不需要懂任何技術細節，我們會用你聽得懂的方式解釋一切。',
    },
    {
      q: '報告費花下去，不適合怎麼辦？',
      a: '即使評估後不適合導入，你也獲得一份專業的營運診斷報告，了解公司從 AI 角度的改善空間。報告費可 100% 折抵後續啟動費。',
    },
    {
      q: '分潤比例怎麼算？',
      a: '只從「新增的價值」收取，例如省下的成本或增加的營收。具體比例在診斷報告階段會根據你的產業和規模明確說明。',
    },
    {
      q: '我們公司很小，適合嗎？',
      a: '診斷報告會評估。一般 10 人以上、有固定客戶流程的公司最適合。太小的公司可能效益不明顯。',
    },
    {
      q: 'Agent 資料安全嗎？',
      a: '所有資料加密儲存在台灣機房，符合個資法規範。我們不會將你的資料用於其他用途。',
    },
    {
      q: '合作期間是多久？',
      a: '一般合作週期為 3-5 年，讓 AI 有足夠時間學習你的業務並持續優化。具體年限依專案性質而定。',
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAF9F6]">
      <SEO
        title="AI 共利計畫 | 你賺，我們才賺 | Pain Point"
        description="AI Agent 導入不用賭身家。先做診斷、確定適合、按創造的價值分潤。你沒賺到，我們不收。"
        url="/agentic-impact"
      />
      <BreadcrumbSchema
        items={[
          { name: '首頁', url: '/' },
          { name: 'AI 共利計畫' }
        ]}
      />

      {/* 1. Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-10 w-96 h-96 bg-gradient-to-br from-emerald-500/20 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-10 w-80 h-80 bg-gradient-to-tr from-emerald-500/10 to-transparent rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-[#2C2420]/60 hover:text-emerald-600 transition-colors mb-12"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            <span>返回首頁</span>
          </button>

          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500/20 to-emerald-500/10 text-emerald-600 text-xs uppercase tracking-widest font-bold mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>AI 共利計畫</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight text-[#2C2420] font-serif">
              我們賺錢，<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-500">只有在你先賺到的時候。</span>
            </h1>
            
            <p className="text-xl text-[#2C2420]/60 max-w-3xl mx-auto font-light leading-relaxed mb-8">
              還在頭痛 AI 落地？先做診斷、確定適合、按創造的價值分潤。<br />
              <strong className="text-[#2C2420]">你沒賺到，我們不收。</strong>
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <button
                onClick={onOpenDemo}
                className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white rounded-full font-medium transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
              >
                申請 AI 導入可行性報告
              </button>
            </div>

            <p className="text-sm text-[#2C2420]/50">
              NT$ 100,000 - 200,000｜2-3 週交付｜可 100% 折抵啟動費
            </p>
          </div>
        </div>
      </section>

      {/* 2. 痛點共鳴區 */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#2C2420] font-serif">
              你一定聽過這些話
            </h2>
            <div className="text-xl text-[#2C2420]/60 italic mb-8">
              「AI 可以幫你省 50% 人力成本！」<br />
              「再不導入 AI，就會被淘汰！」
            </div>
            <p className="text-lg text-[#2C2420]/80 font-medium">
              但沒人告訴你真相：
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              {
                emoji: '😤',
                title: '花了 200 萬建系統',
                desc: '結果員工不會用，系統變蚊子館',
              },
              {
                emoji: '💸',
                title: '請了顧問來評估',
                desc: '報告寫得漂亮，落地一團亂',
              },
              {
                emoji: '🤷',
                title: '系統上線三個月',
                desc: '維護費比人事成本還高',
              },
            ].map((pain, index) => (
              <div key={index} className="bg-[#FAF9F6] p-8 rounded-3xl text-center">
                <div className="text-5xl mb-4">{pain.emoji}</div>
                <h3 className="text-lg font-bold text-[#2C2420] mb-2">{pain.title}</h3>
                <p className="text-[#2C2420]/60 text-sm">{pain.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <p className="text-2xl text-[#2C2420] font-bold mb-4">
              你怕的不是 AI，你怕的是<span className="text-red-500">花錢踩坑</span>。
            </p>
            <p className="text-lg text-[#2C2420]/70">
              我們懂。所以我們的收費方式很簡單：<br />
              <span className="text-emerald-600 font-bold text-xl">你沒賺到，我們不收。</span>
            </p>
          </div>
        </div>
      </section>

      {/* 3. 三階段服務流程 */}
      <section className="py-20 px-6 bg-gradient-to-br from-[#2C2420] to-[#3D3530]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white font-serif">
              三步驟，低風險導入 AI
            </h2>
            <p className="text-white/60">
              不適合就打住，適合再往下談
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: '診斷報告',
                subtitle: '先做健檢',
                desc: '花 1-2 小時聊公司現況，我們評估你適不適合導入 AI Agent，給你一份看得懂的報告。',
                fee: '報告費 10-20 萬',
                note: '可 100% 折抵啟動費',
                color: 'from-emerald-400 to-emerald-500',
              },
              {
                step: '02',
                title: '建置上線',
                subtitle: '確認再做',
                desc: '報告確認適合，簽約後我們幫你把 AI Agent 團隊建好、測試、上線。',
                fee: '啟動費（一次性）',
                note: '依專案規模報價',
                color: 'from-teal-400 to-teal-500',
              },
              {
                step: '03',
                title: '長期合作',
                subtitle: '賺到才分',
                desc: 'Agent 在雲端幫你跑，我們負責維護升級。只從創造的價值中收取分潤。',
                fee: '價值分潤',
                note: '你賺，我們才賺',
                color: 'from-cyan-400 to-cyan-500',
              },
            ].map((phase, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
                <div className={`inline-block px-3 py-1 rounded-full bg-gradient-to-r ${phase.color} text-white text-xs font-bold mb-4`}>
                  STEP {phase.step}
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{phase.title}</h3>
                <p className="text-white/60 text-sm mb-4">{phase.subtitle}</p>
                <p className="text-white/80 text-sm mb-6">{phase.desc}</p>
                <div className="border-t border-white/10 pt-4">
                  <p className="text-emerald-400 font-bold">{phase.fee}</p>
                  <p className="text-white/50 text-xs">{phase.note}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-white/5 rounded-2xl p-6 text-center">
            <p className="text-white/80">
              <span className="text-emerald-400 font-bold">白話版：</span>
              先花小錢做健檢，不適合就打住。適合再付建置費，系統我們來做。
              上線後按效益分潤，<span className="text-emerald-400">你多賺 100 萬，我們才分其中一部分</span>。
            </p>
          </div>
        </div>
      </section>

      {/* 4. 成功案例 */}
      <section className="py-20 px-6 bg-[#FAF9F6]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-600 text-xs uppercase tracking-widest font-bold mb-4">
              <span>成功案例</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#2C2420] font-serif">
              他們這樣做到的
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                industry: '房仲顧問業',
                company: '某北部知名房仲顧問公司',
                scale: '18 位業務｜年營業額 8,000 萬',
                color: 'from-amber-500 to-orange-500',
                stats: [
                  { label: '首次回覆', value: '8 分鐘', change: '↓ 97%' },
                  { label: '月營業額', value: '+72%', change: '670→1,150萬' },
                ],
                quote: '以前追著客戶跑，現在 Agent 把客戶捧到面前。',
                roi: '70 天回本',
              },
              {
                industry: '飯店旅宿',
                company: '某台中精品商旅',
                scale: '120 間客房｜年營業額 4,800 萬',
                color: 'from-blue-500 to-indigo-500',
                stats: [
                  { label: '訊息回覆', value: '28 秒', change: '↓ 99%' },
                  { label: 'OTA 佣金', value: '年省 168 萬', change: '直訂↑82%' },
                ],
                quote: '省下的 OTA 佣金一年快 170 萬，拿來提升服務品質。',
                roi: '70 天回本',
              },
              {
                industry: '豪華露營',
                company: '某新竹豪華露營區',
                scale: '32 頂帳篷｜年營業額 2,800 萬',
                color: 'from-green-500 to-emerald-500',
                stats: [
                  { label: '諮詢轉換率', value: '38%', change: '↑ 111%' },
                  { label: '加購滲透率', value: '51%', change: '↑ 132%' },
                ],
                quote: '週五晚上訊息爆量，現在我睡醒，訂單都排好了。',
                roi: '110 天回本',
              },
              {
                industry: '美妝電商',
                company: '某美妝電商品牌',
                scale: '4,800+ SKU｜年營業額 1.8 億',
                color: 'from-pink-500 to-rose-500',
                stats: [
                  { label: '月營業額', value: '+43%', change: '1,500→2,150萬' },
                  { label: '回購率', value: '41%', change: '↑ 86%' },
                ],
                quote: '客服成本砍一半，客單價還拉高兩成。',
                roi: '70 天回本',
              },
              {
                industry: '醫美診所',
                company: '某北部醫美診所',
                scale: '2 據點｜年營業額 1.2 億',
                color: 'from-purple-500 to-violet-500',
                stats: [
                  { label: '月營收', value: '+38%', change: '1,000→1,380萬' },
                  { label: 'VIP 續約率', value: '81%', change: '↑ 56%' },
                ],
                quote: '諮詢師不用再花時間解釋基本療程，專心服務到店客人。',
                roi: '65 天回本',
              },
            ].map((cs, index) => (
              <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all">
                <div className={`bg-gradient-to-r ${cs.color} p-4 text-white`}>
                  <span className="text-xs font-bold uppercase tracking-wider opacity-80">{cs.industry}</span>
                  <h3 className="text-lg font-bold mt-1">{cs.company}</h3>
                  <p className="text-xs opacity-80">{cs.scale}</p>
                </div>
                <div className="p-5">
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    {cs.stats.map((stat, i) => (
                      <div key={i} className="bg-[#FAF9F6] p-3 rounded-lg text-center">
                        <p className="text-xs text-[#2C2420]/50">{stat.label}</p>
                        <p className="text-lg font-bold text-emerald-600">{stat.value}</p>
                        <p className="text-xs text-emerald-500">{stat.change}</p>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-[#2C2420]/70 italic mb-3">「{cs.quote}」</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#2C2420]/50">投資回報</span>
                    <span className="text-sm font-bold text-emerald-600">{cs.roi}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. 為什麼選我們 */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#2C2420] font-serif">
              我們跟傳統做法不一樣
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#2C2420] text-white">
                  <th className="p-4 text-left rounded-tl-2xl"></th>
                  <th className="p-4 text-center">傳統顧問</th>
                  <th className="p-4 text-center">自己請工程師</th>
                  <th className="p-4 text-center rounded-tr-2xl bg-emerald-600">
                    <span className="flex items-center justify-center gap-2">
                      ✨ AI 共利計畫
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  { label: '收費方式', trad: '做完就收，不管結果', self: '月薪 8-15 萬', us: '按創造的價值分潤' },
                  { label: '風險', trad: '全在你身上', self: '全在你身上', us: '風險共擔' },
                  { label: '維護', trad: '另外報價', self: '自己搞定', us: '我們負責' },
                  { label: '關係', trad: '專案結束就掰', self: '員工會離職', us: '3-5 年夥伴' },
                  { label: '利益', trad: '不一致', self: '不一致', us: '完全一致' },
                ].map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-[#FAF9F6]' : 'bg-white'}>
                    <td className="p-4 font-bold text-[#2C2420]">{row.label}</td>
                    <td className="p-4 text-center text-[#2C2420]/60">{row.trad}</td>
                    <td className="p-4 text-center text-[#2C2420]/60">{row.self}</td>
                    <td className="p-4 text-center text-emerald-600 font-bold bg-emerald-50">{row.us}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-12 text-center">
            <div className="inline-block bg-[#2C2420] text-white px-8 py-4 rounded-2xl">
              <p className="text-lg font-bold mb-1">我們不是賣服務的，我們是投資你的。</p>
              <p className="text-white/60 text-sm">你賺錢我們才賺錢，所以我們比你更在意這東西有沒有效。</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. 定價透明區 */}
      <section className="py-20 px-6 bg-[#FAF9F6]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#2C2420] font-serif">
              價格說清楚
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                phase: '診斷報告',
                price: 'NT$ 10-20 萬',
                desc: '評估公司是否適合導入 AI Agent',
                details: ['2-3 週交付', '可 100% 折抵啟動費', '包含完整營運診斷'],
                highlight: true,
              },
              {
                phase: '建置啟動',
                price: '依專案報價',
                desc: '建構、測試、上線 AI Agent 團隊',
                details: ['一次性費用', '可分期付款', '包含培訓與交接'],
                highlight: false,
              },
              {
                phase: '價值分潤',
                price: '從增量價值收取',
                desc: '只從新創造的價值中分潤',
                details: ['你賺，我們才賺', '含維護與升級', '3-5 年合作週期'],
                highlight: false,
              },
            ].map((tier, i) => (
              <div
                key={i}
                className={`rounded-3xl p-8 ${
                  tier.highlight
                    ? 'bg-emerald-600 text-white'
                    : 'bg-white border border-[#E0E0E0]'
                }`}
              >
                <h3 className={`text-lg font-bold mb-2 ${tier.highlight ? 'text-white' : 'text-[#2C2420]'}`}>
                  {tier.phase}
                </h3>
                <p className={`text-3xl font-bold mb-4 ${tier.highlight ? 'text-white' : 'text-emerald-600'}`}>
                  {tier.price}
                </p>
                <p className={`text-sm mb-6 ${tier.highlight ? 'text-white/80' : 'text-[#2C2420]/60'}`}>
                  {tier.desc}
                </p>
                <ul className="space-y-2">
                  {tier.details.map((detail, j) => (
                    <li key={j} className={`text-sm flex items-center gap-2 ${tier.highlight ? 'text-white/80' : 'text-[#2C2420]/70'}`}>
                      <span className={tier.highlight ? 'text-white' : 'text-emerald-500'}>✓</span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. FAQ */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#2C2420] font-serif">
              常見問題
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-[#FAF9F6] rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  className="w-full p-6 text-left flex justify-between items-center"
                >
                  <span className="font-bold text-[#2C2420]">{faq.q}</span>
                  <span className={`text-emerald-600 transition-transform ${activeFaq === index ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </button>
                {activeFaq === index && (
                  <div className="px-6 pb-6">
                    <p className="text-[#2C2420]/70">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Final CTA */}
      <section className="py-20 px-6 bg-gradient-to-br from-emerald-600 to-teal-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white font-serif">
            花小錢，先知道適不適合。<br />
            <span className="text-emerald-200">適合再談，不適合就打住。</span>
          </h2>
          <p className="text-white/80 mb-8 text-lg">
            你的風險在哪？幾乎沒有。
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <button
              onClick={onOpenDemo}
              className="px-10 py-5 bg-white text-emerald-600 rounded-full font-bold text-lg transition-all shadow-2xl hover:shadow-xl hover:-translate-y-1"
            >
              申請 AI 導入可行性報告
            </button>
            <button
              onClick={onOpenDemo}
              className="px-10 py-5 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-full font-medium text-lg transition-all"
            >
              還有疑問？預約 15 分鐘電話
            </button>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-white/70 text-sm">
            <span>📊 報告費可 100% 折抵</span>
            <span>⏱️ 2-3 週內交付</span>
            <span>🤝 3-5 年合作夥伴</span>
            <span>🔒 資料加密儲存</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AgenticImpact;
