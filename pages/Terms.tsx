// pages/Terms.tsx
import React from 'react';
import SEO from '../components/SEO';

interface TermsProps {
  onBack: () => void;
}

const Terms: React.FC<TermsProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-[#FAF9F6]">
      <SEO
        title="服務條款 | Pain Point Technologies"
        description="Pain Point Technologies 痛點科技的服務條款，說明使用我們服務的相關規定。"
        url="/terms"
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
            服務條款
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
                歡迎使用痛點科技股份有限公司（以下簡稱「本公司」）提供的服務。使用我們的服務即表示您同意以下條款。
              </p>

              <h2 className="text-2xl font-bold text-[#2C2420] mt-10 mb-4">1. 服務說明</h2>
              <p>本公司提供 AI 語音解決方案，包括但不限於：</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Voice of Choice</strong> — AI 民調系統</li>
                <li><strong>Voice AI Sales</strong> — AI 銷售自動化</li>
                <li><strong>Voice AI Survey</strong> — AI 客戶調查</li>
                <li><strong>Execution AI Agent</strong> — AI Agent 執行方案</li>
              </ul>

              <h2 className="text-2xl font-bold text-[#2C2420] mt-10 mb-4">2. 使用規範</h2>
              <p>使用我們的服務時，您同意：</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>提供真實、準確的資訊</li>
                <li>不將服務用於任何非法目的</li>
                <li>不干擾或破壞服務的正常運作</li>
                <li>遵守所有適用的法律及法規</li>
                <li>不使用服務進行騷擾、詐騙或其他有害行為</li>
                <li>不嘗試未經授權存取系統或資料</li>
              </ul>

              <h2 className="text-2xl font-bold text-[#2C2420] mt-10 mb-4">3. 帳戶責任</h2>
              <p>
                如果您建立帳戶使用我們的服務，您有責任維護帳戶資訊的機密性，並對在您帳戶下發生的所有活動負責。請立即通知我們任何未經授權使用您帳戶的情況。
              </p>

              <h2 className="text-2xl font-bold text-[#2C2420] mt-10 mb-4">4. 智慧財產權</h2>
              <p>
                本服務中的所有內容，包括但不限於文字、圖像、軟體、商標及其他資料，均為本公司或其授權者所有，受智慧財產權法保護。未經書面同意，不得複製、修改、散布或以其他方式使用。
              </p>

              <h2 className="text-2xl font-bold text-[#2C2420] mt-10 mb-4">5. 服務費用</h2>
              <p>
                部分服務可能需要付費。費用將在購買前明確說明。除非另有約定，已支付的費用不予退還。本公司保留隨時調整費用的權利，但會事先通知現有用戶。
              </p>

              <h2 className="text-2xl font-bold text-[#2C2420] mt-10 mb-4">6. 免責聲明</h2>
              <p>
                本服務按「現況」及「可用」基礎提供。在法律允許的最大範圍內，本公司不對服務的準確性、可靠性、適用性或可用性作任何明示或暗示的保證。
              </p>
              <p className="mt-4">
                AI 生成的內容僅供參考，本公司不對其準確性或完整性負責。用戶應自行判斷並驗證 AI 輸出的資訊。
              </p>

              <h2 className="text-2xl font-bold text-[#2C2420] mt-10 mb-4">7. 責任限制</h2>
              <p>
                在法律允許的最大範圍內，本公司對因使用或無法使用本服務而產生的任何直接、間接、附帶、特殊、懲罰性或衍生性損害不承擔責任，包括但不限於利潤損失、資料損失或業務中斷。
              </p>

              <h2 className="text-2xl font-bold text-[#2C2420] mt-10 mb-4">8. 賠償</h2>
              <p>
                您同意賠償並使本公司及其董事、員工、合作夥伴免受因您違反本條款或使用服務而產生的任何索賠、損失、責任及費用。
              </p>

              <h2 className="text-2xl font-bold text-[#2C2420] mt-10 mb-4">9. 服務變更與終止</h2>
              <p>
                本公司保留在任何時候、基於任何原因修改、暫停或終止全部或部分服務的權利，包括違反本條款的情況。我們會盡可能事先通知用戶重大變更。
              </p>

              <h2 className="text-2xl font-bold text-[#2C2420] mt-10 mb-4">10. 條款變更</h2>
              <p>
                本公司保留隨時修改本服務條款的權利。變更後繼續使用服務即表示您接受新條款。重大變更將於本頁面公布並通知用戶。
              </p>

              <h2 className="text-2xl font-bold text-[#2C2420] mt-10 mb-4">11. 準據法與管轄</h2>
              <p>
                本條款受中華民國法律管轄並依其解釋。任何因本條款或服務產生的爭議，雙方同意以臺灣臺北地方法院為第一審管轄法院。
              </p>

              <h2 className="text-2xl font-bold text-[#2C2420] mt-10 mb-4">12. 聯絡資訊</h2>
              <p>如有任何問題，請聯絡：</p>
              <div className="bg-[#FAF9F6] p-6 rounded-xl mt-4">
                <p className="font-bold">Pain Point Technologies Co., Ltd. 痛點科技</p>
                <p>地址：台北市中山區長安西路45-1號五樓-3</p>
                <p>電話：<a href="tel:+886225566810" className="text-[#D4A373] hover:underline">+886 2 2556-6810</a></p>
                <p>電子郵件：<a href="mailto:support@painpoint-ai.com" className="text-[#D4A373] hover:underline">support@painpoint-ai.com</a></p>
                <p>網站：<a href="https://painpoint-ai.com" className="text-[#D4A373] hover:underline">https://painpoint-ai.com</a></p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Terms;
