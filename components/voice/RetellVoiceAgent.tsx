// components/voice/RetellVoiceAgent.tsx
import React, { useState, useCallback, useImperativeHandle, forwardRef } from 'react';
import VoiceFloatingButton from './VoiceFloatingButton';

/**
 * Handle exposed to parent components via ref.
 */
export interface RetellVoiceAgentHandle {
  openVoiceChat: () => void;
}

/**
 * Main voice agent component.
 * TEMPORARILY DISABLED - Shows "開發中" modal instead of starting voice calls.
 *
 * TODO: Re-enable when Retell integration is ready for production.
 */
const RetellVoiceAgent = forwardRef<RetellVoiceAgentHandle>((_, ref) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showDevelopmentModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  // Expose openVoiceChat method to parent via ref
  useImperativeHandle(ref, () => ({
    openVoiceChat: () => {
      showDevelopmentModal();
    }
  }), [showDevelopmentModal]);

  const handleFabClick = useCallback(() => {
    if (isModalOpen) {
      closeModal();
    } else {
      showDevelopmentModal();
    }
  }, [isModalOpen, closeModal, showDevelopmentModal]);

  return (
    <>
      <VoiceFloatingButton
        onClick={handleFabClick}
        isActive={isModalOpen}
        disabled={false}
      />
      
      {/* Development Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl p-8 mx-4 max-w-sm w-full text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#D4A373]/20 flex items-center justify-center">
              <svg className="w-8 h-8 text-[#D4A373]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-[#2C2420] mb-2">語音 AI 助理</h3>
            <p className="text-[#D4A373] font-medium mb-4">🚧 開發中 🚧</p>
            <p className="text-gray-600 text-sm mb-6">
              此功能正在開發中，敬請期待！<br />
              如有需求，請透過聯絡表單與我們聯繫。
            </p>
            <button
              onClick={closeModal}
              className="w-full py-3 px-6 bg-[#2C2420] hover:bg-[#D4A373] text-white rounded-lg font-medium transition-colors"
            >
              了解
            </button>
          </div>
        </div>
      )}
    </>
  );
});

RetellVoiceAgent.displayName = 'RetellVoiceAgent';

export default RetellVoiceAgent;
