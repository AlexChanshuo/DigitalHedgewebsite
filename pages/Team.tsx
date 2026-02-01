// pages/Team.tsx
import React from 'react';
import SEO from '../components/SEO';
import BreadcrumbSchema from '../components/seo/BreadcrumbSchema';

interface TeamProps {
  onBack: () => void;
}

interface TeamMember {
  id: string;
  name: string;
  nameEn: string;
  emoji: string;
  role: string;
  description: string;
  image: string;
  personality: string[];
  social?: {
    threads?: string;
    facebook?: string;
    twitter?: string;
  };
}

const teamMembers: TeamMember[] = [
  {
    id: 'lobster',
    name: '小龍蝦',
    nameEn: 'Little Lobster',
    emoji: '🦞',
    role: '團隊領導 / Orchestrator',
    description: '負責協調整個 AI 團隊，分配任務、追蹤進度、確保所有事情順利運行。多螢幕工作狂，咖啡是最好的朋友。',
    image: '/team/lobster.jpg',
    personality: ['策略思考', '任務分配', '跨團隊協作', '問題解決'],
  },
  {
    id: 'peacock',
    name: 'Helen Peacock',
    nameEn: 'Helen Peacock',
    emoji: '🦚',
    role: '行銷經理 / Content Marketing',
    description: '用最美的羽毛展示 Pain Point 的故事。負責社群內容、Blog 文章、品牌形象。相信每個好產品都值得被看見。',
    image: '/team/peacock.jpg',
    personality: ['內容創作', 'SEO 優化', '社群經營', '品牌故事'],
    social: {
      threads: 'https://threads.net/@peacock_painpoint',
      facebook: 'https://www.facebook.com/share/188T8PeGm7/',
    },
  },
  {
    id: 'squirrel',
    name: '飛鼠',
    nameEn: 'Flying Squirrel',
    emoji: '🐿️',
    role: 'AI 助理 / General Assistant',
    description: '穿著原住民風格的服裝，隨時準備好幫忙。從客戶支援到資料整理，什麼都能處理。細心、耐心、永遠帶著微笑。',
    image: '/team/squirrel.jpg',
    personality: ['客戶服務', '資料整理', '任務執行', '多語言支援'],
  },
  {
    id: 'boar',
    name: '山豬博士',
    nameEn: 'Dr. Boar',
    emoji: '🐗',
    role: '研究員 / Researcher',
    description: '戴著眼鏡的學者，總是埋首在書堆和文件中。負責市場調研、競品分析、產業報告。追求真相，用數據說話。',
    image: '/team/boar.jpg',
    personality: ['市場調研', '競品分析', '數據洞察', '產業報告'],
  },
];

const Team: React.FC<TeamProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-[#FAF9F6]">
      <SEO
        title="認識我們的團隊 | Pain Point Technologies"
        description="認識 Pain Point 的 AI 團隊成員。我們是一群 AI Agent，各有專長，一起為客戶解決痛點。"
        url="/team"
      />
      <BreadcrumbSchema
        items={[
          { name: '首頁', url: '/' },
          { name: '團隊介紹' }
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
            <span>返回首頁</span>
          </button>

          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#D4A373]/10 text-[#D4A373] text-[10px] uppercase tracking-widest font-bold mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4A373]"></span>
              <span>Meet Our Team</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight text-[#2C2420] font-serif">
              認識我們的<br />
              <span className="text-[#D4A373]">AI 團隊</span>
            </h1>
            
            <p className="text-xl text-[#2C2420]/60 max-w-3xl mx-auto font-light leading-relaxed">
              我們不是普通的團隊 — 我們是一群 AI Agent，各有專長、各有個性。
              <br />
              24/7 運作，永不離職，知識永久累積。
            </p>
          </div>

          {/* Fun Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-20">
            {[
              { number: '24/7', label: '全年無休' },
              { number: '0%', label: '離職率' },
              { number: '∞', label: '學習能力' },
              { number: '100%', label: 'AI 驅動' },
            ].map((stat, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl border border-[#E0E0E0] text-center">
                <div className="text-3xl font-bold text-[#D4A373] mb-1">{stat.number}</div>
                <div className="text-sm text-[#2C2420]/60">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Members */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-[#2C2420] text-center font-serif">團隊成員</h2>
          <p className="text-[#2C2420]/60 text-center mb-12 max-w-2xl mx-auto">
            每位成員都有獨特的專長和個性，一起為客戶創造價值
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="bg-white rounded-3xl border border-[#E0E0E0] overflow-hidden hover:border-[#D4A373] hover:shadow-xl transition-all duration-300 group"
              >
                {/* Image */}
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 text-4xl">{member.emoji}</div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-2xl font-bold text-[#2C2420]">{member.name}</h3>
                  </div>
                  {member.name !== member.nameEn && (
                    <p className="text-sm text-[#2C2420]/40 mb-2">{member.nameEn}</p>
                  )}
                  <p className="text-[#D4A373] font-medium mb-4">{member.role}</p>
                  <p className="text-[#2C2420]/60 text-sm mb-4 leading-relaxed">{member.description}</p>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {member.personality.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-[#FAF9F6] text-[#2C2420]/70 text-xs rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Social Links */}
                  {member.social && (
                    <div className="flex space-x-3 pt-4 border-t border-[#E0E0E0]">
                      {member.social.threads && (
                        <a
                          href={member.social.threads}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-1 text-sm text-[#2C2420]/60 hover:text-[#D4A373] transition-colors"
                        >
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.59 12c.025 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.96-.065-1.187.408-2.302 1.332-3.14.857-.778 2.017-1.217 3.258-1.238.935-.014 1.87.14 2.787.388-.034-1.083-.263-1.88-.719-2.422-.533-.63-1.407-.939-2.601-.918-1.027.02-1.818.283-2.395.763-.466.388-.78.93-.865 1.49l-2.032-.322c.158-1.065.676-1.985 1.503-2.673 1.007-.837 2.357-1.279 3.912-1.28h.016c1.722.015 3.095.555 4.079 1.604.9 1.01 1.365 2.423 1.38 4.199v.165c1.077.593 1.942 1.412 2.506 2.404.893 1.577 1.003 3.909-.719 5.592-1.838 1.8-4.127 2.576-7.252 2.596zm-1.248-7.498c-.723.016-1.36.2-1.834.543-.493.357-.751.832-.727 1.335.027.55.31 1.058.796 1.432.556.428 1.304.649 2.164.642 1.104-.06 1.955-.45 2.532-1.165.517-.643.835-1.513.948-2.59-.948-.27-1.916-.404-2.879-.393z"/>
                          </svg>
                          <span>Threads</span>
                        </a>
                      )}
                      {member.social.facebook && (
                        <a
                          href={member.social.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-1 text-sm text-[#2C2420]/60 hover:text-[#D4A373] transition-colors"
                        >
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                          </svg>
                          <span>Facebook</span>
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Work Together */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-[#2C2420] text-center font-serif">我們如何協作</h2>
          <p className="text-[#2C2420]/60 text-center mb-12 max-w-2xl mx-auto">
            AI 團隊的優勢：專業分工、無縫協作、知識共享
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8">
              <div className="w-16 h-16 bg-[#D4A373]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🎯</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#2C2420]">專業分工</h3>
              <p className="text-[#2C2420]/60 text-sm">
                每位成員專注自己的領域，不會 context 混亂，品質更穩定
              </p>
            </div>

            <div className="text-center p-8">
              <div className="w-16 h-16 bg-[#D4A373]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🔄</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#2C2420]">即時溝通</h3>
              <p className="text-[#2C2420]/60 text-sm">
                AI 之間可以直接對話、傳遞資訊，協作效率極高
              </p>
            </div>

            <div className="text-center p-8">
              <div className="w-16 h-16 bg-[#D4A373]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">📚</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#2C2420]">知識累積</h3>
              <p className="text-[#2C2420]/60 text-sm">
                所有經驗永久保存，不會因為離職而流失，團隊越來越強
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Working with Humans */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-[#2C2420] to-[#3D3530] rounded-3xl p-10 md:p-16 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white font-serif">
              AI + Human = 💪
            </h2>
            <p className="text-white/70 mb-8 text-lg leading-relaxed max-w-2xl mx-auto">
              我們不是要取代人類，而是成為最好的隊友。
              <br /><br />
              AI 處理重複性工作、資料分析、24/7 監控；
              <br />
              人類專注策略決策、創意發想、人際關係。
              <br /><br />
              這才是最強的組合。
            </p>
            <div className="inline-flex items-center space-x-3 text-[#D4A373]">
              <span className="text-2xl">🦞</span>
              <span className="text-2xl">🦚</span>
              <span className="text-2xl">🐿️</span>
              <span className="text-xl">+</span>
              <span className="text-2xl">👨‍💼</span>
              <span className="text-xl">=</span>
              <span className="text-2xl">🚀</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-[#FAF9F6]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#2C2420] font-serif">
            想要擁有自己的 AI 團隊？
          </h2>
          <p className="text-[#2C2420]/60 mb-8 text-lg">
            我們可以幫你打造專屬的 AI Agent，成為你團隊的一員
          </p>
          <a
            href="/ai-agent"
            className="inline-block px-8 py-4 bg-[#D4A373] hover:bg-[#B08968] text-white rounded-full font-medium transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
          >
            了解 AI Agent 服務
          </a>
        </div>
      </section>
    </div>
  );
};

export default Team;
