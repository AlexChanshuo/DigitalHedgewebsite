// pages/Privacy.tsx
import React from 'react';
import SEO from '../components/SEO';

interface PrivacyProps {
  onBack: () => void;
}

const Privacy: React.FC<PrivacyProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-[#FAF9F6]">
      <SEO
        title="隱私權政策 | Pain Point Technologies"
        description="Pain Point Technologies 痛點科技的隱私權政策，說明我們如何收集、使用及保護您的個人資料。"
        url="/privacy"
      />

      {/* Hero Section */}
      <section className="relative pt-32 pb-12 px-6 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-10 w-96 h-96 bg-[#D4A373]/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-[#2C2420]/60 hover:text-[#D4A373] transition-colors mb-8"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>返回首頁</span>
          </button>

          <h1 className="text-4xl md:text-5xl font-bold text-[#2C2420] mb-4">
            隱私權政策
          </h1>
          <p className="text-[#2C2420]/60">
            最後更新日期：2026 年 2 月 8 日
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm">
            <div className="prose prose-lg max-w-none text-[#2C2420]">
              <p className="lead text-xl text-[#2C2420]/80 mb-8">
                痛點科技股份有限公司（以下簡稱「本公司」）非常重視您的隱私權。本隱私權政策說明我們如何收集、使用、揭露及保護您的個人資料。
              </p>

              <h2 className="text-2xl font-bold text-[#2C2420] mt-10 mb-4">1. 資料收集</h2>
              <p>我們可能收集以下類型的資訊：</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>個人識別資訊</strong>：姓名、電子郵件地址、電話號碼</li>
                <li><strong>使用資料</strong>：您與我們服務互動的相關資訊</li>
                <li><strong>LINE 帳號資訊</strong>：當您透過 LINE 與我們互動時，我們可能收集您的 LINE 用戶 ID 及顯示名稱</li>
                <li><strong>通話記錄</strong>：當您使用我們的 AI 語音服務時，通話內容可能被記錄以提供服務及改善品質</li>
              </ul>

              <h2 className="text-2xl font-bold text-[#2C2420] mt-10 mb-4">2. 資料使用目的</h2>
              <p>我們使用收集的資料用於：</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>提供及改善我們的服務</li>
                <li>回應您的詢問及客戶服務需求</li>
                <li>發送服務相關通知</li>
                <li>進行市場調查及分析</li>
                <li>遵守法律義務</li>
              </ul>

              <h2 className="text-2xl font-bold text-[#2C2420] mt-10 mb-4">3. 資料保護</h2>
              <p>
                我們採取適當的技術及組織措施保護您的個人資料，防止未經授權的存取、使用或揭露。這些措施包括但不限於資料加密、存取控制及定期安全稽核。
              </p>

              <h2 className="text-2xl font-bold text-[#2C2420] mt-10 mb-4">4. 資料分享</h2>
              <p>
                除非取得您的同意或法律要求，我們不會將您的個人資料出售或分享給第三方。在以下情況，我們可能分享您的資料：
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>與提供服務所必需的服務供應商合作</li>
                <li>遵守法律程序或政府機關的合法要求</li>
                <li>保護本公司、用戶或公眾的權利、財產或安全</li>
              </ul>

              <h2 className="text-2xl font-bold text-[#2C2420] mt-10 mb-4">5. 您的權利</h2>
              <p>根據個人資料保護法，您有權：</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>查詢或請求閱覽您的個人資料</li>
                <li>請求製給複製本</li>
                <li>請求補充或更正</li>
                <li>請求停止蒐集、處理或利用</li>
                <li>請求刪除</li>
              </ul>
              <p className="mt-4">
                如需行使上述權利，請透過下方聯絡資訊與我們聯繫。
              </p>

              <h2 className="text-2xl font-bold text-[#2C2420] mt-10 mb-4">6. Cookie 使用</h2>
              <p>
                我們的網站使用 Cookie 及類似技術來改善用戶體驗、分析網站流量及提供個人化內容。您可以透過瀏覽器設定管理 Cookie 偏好。
              </p>

              <h2 className="text-2xl font-bold text-[#2C2420] mt-10 mb-4">7. 資料保留</h2>
              <p>
                我們僅在達成收集目的所需的期間內保留您的個人資料，除非法律要求或允許更長的保留期限。
              </p>

              <h2 className="text-2xl font-bold text-[#2C2420] mt-10 mb-4">8. 政策變更</h2>
              <p>
                本隱私權政策可能不時更新。任何重大變更將於本頁面公布，並在適用法律要求時通知您。
              </p>

              <h2 className="text-2xl font-bold text-[#2C2420] mt-10 mb-4">9. 聯絡我們</h2>
              <p>如有任何隱私權相關問題，請聯絡：</p>
              <div className="bg-[#FAF9F6] p-6 rounded-xl mt-4">
                <p className="font-bold">Pain Point Technologies Co., Ltd. 痛點科技</p>
                <p>電子郵件：<a href="mailto:privacy@painpoint-ai.com" className="text-[#D4A373] hover:underline">privacy@painpoint-ai.com</a></p>
                <p>網站：<a href="https://painpoint-ai.com" className="text-[#D4A373] hover:underline">https://painpoint-ai.com</a></p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Privacy;
