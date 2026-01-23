// components/voice/VoiceCallModal.tsx
import React from 'react';
import VoiceWaveform, { CallState } from './VoiceWaveform';
import VoiceTranscript, { TranscriptMessage } from './VoiceTranscript';

interface VoiceCallModalProps {
  isOpen: boolean;
  callState: CallState;
  transcript: TranscriptMessage[];
  onEndCall: () => void;
  onClose: () => void;
  error?: string | null;
}

/**
 * Floating card modal for voice calls.
 * Positioned above the FAB button, does NOT block page interaction.
 *
 * Sections:
 * - Header: Agent name + close button
 * - Waveform: Visual call state indicator
 * - Transcript: Chat-style message history
 * - Footer: End call button (during call) or close prompt (after call)
 */
const VoiceCallModal: React.FC<VoiceCallModalProps> = ({
  isOpen,
  callState,
  transcript,
  onEndCall,
  onClose,
  error
}) => {
  if (!isOpen) return null;

  const isCallActive = callState === 'connecting' || callState === 'listening' || callState === 'speaking';
  const isCallEnded = callState === 'ended';

  // State-specific status text
  const getStatusText = () => {
    switch (callState) {
      case 'connecting':
        return '連線中...';
      case 'listening':
        return '聆聽中';
      case 'speaking':
        return 'AI 回應中';
      case 'ended':
        return '通話結束';
      default:
        return '';
    }
  };

  return (
    <div className="fixed bottom-24 right-4 w-80 z-50 animate-fade-in">
      <div className="card-coffee rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#E0E0E0]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#D4A373] flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
            </div>
            <div>
              <div className="text-sm font-medium text-[#2C2420]">Digital Hedge AI</div>
              <div className="text-xs text-gray-500">{getStatusText()}</div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="關閉"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Waveform */}
        <div className="px-4 py-4 flex justify-center">
          <VoiceWaveform state={callState} />
        </div>

        {/* Error Message */}
        {error && (
          <div className="px-4 pb-2">
            <div className="text-red-500 text-sm text-center bg-red-50 rounded-lg py-2 px-3">
              {error}
            </div>
          </div>
        )}

        {/* Transcript */}
        <div className="px-4 h-48">
          <VoiceTranscript messages={transcript} className="h-full" />
        </div>

        {/* Footer */}
        <div className="px-4 py-3 border-t border-[#E0E0E0]">
          {isCallActive ? (
            <button
              onClick={onEndCall}
              className="w-full py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white text-sm font-medium transition-colors"
            >
              結束通話
            </button>
          ) : isCallEnded ? (
            <div className="text-center text-sm text-gray-500">
              點擊 X 關閉視窗
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default VoiceCallModal;
