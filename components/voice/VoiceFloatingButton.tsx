// components/voice/VoiceFloatingButton.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';

interface VoiceFloatingButtonProps {
  onClick: () => void;
  isActive: boolean;
  disabled?: boolean;
}

/**
 * Floating action button for voice calls.
 * Fixed position in bottom-right corner.
 *
 * - Default: dark roast color
 * - Active (call in progress): amber color
 * - Shows microphone icon
 */
const VoiceFloatingButton: React.FC<VoiceFloatingButtonProps> = ({
  onClick,
  isActive,
  disabled = false
}) => {
  const { t } = useTranslation();
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        fixed bottom-6 right-6 z-50
        w-14 h-14 rounded-full
        flex items-center justify-center
        shadow-lg transition-all duration-300
        ${disabled
          ? 'bg-gray-400 cursor-not-allowed'
          : isActive
            ? 'bg-[#D4A373] hover:bg-[#B08968] hover:scale-105'
            : 'bg-[#2C2420] hover:bg-[#D4A373] hover:scale-105'
        }
      `}
      aria-label={t('common.startVoiceCall')}
    >
      {/* Microphone Icon */}
      <svg
        className="w-6 h-6 text-white"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
        />
      </svg>
    </button>
  );
};

export default VoiceFloatingButton;
