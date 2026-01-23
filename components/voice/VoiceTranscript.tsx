// components/voice/VoiceTranscript.tsx
import React, { useEffect, useRef } from 'react';

export interface TranscriptMessage {
  role: 'agent' | 'user';
  content: string;
}

interface VoiceTranscriptProps {
  messages: TranscriptMessage[];
  className?: string;
}

/**
 * Chat-style transcript display with auto-scroll.
 * User messages on right (amber), AI messages on left (light).
 */
const VoiceTranscript: React.FC<VoiceTranscriptProps> = ({ messages, className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  if (messages.length === 0) {
    return (
      <div className={`flex items-center justify-center text-gray-400 text-sm py-8 ${className}`}>
        對話將顯示在這裡...
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`flex flex-col gap-2 overflow-y-auto ${className}`}
    >
      {messages.map((message, index) => (
        <TranscriptBubble key={index} {...message} />
      ))}
    </div>
  );
};

/**
 * Individual transcript bubble.
 */
const TranscriptBubble: React.FC<TranscriptMessage> = ({ role, content }) => {
  const isUser = role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`
          max-w-[80%] px-4 py-2 rounded-2xl text-sm
          ${isUser
            ? 'bg-[#D4A373] text-white rounded-br-md'
            : 'bg-[#FAF9F6] text-[#2C2420] border border-[#E0E0E0] rounded-bl-md'
          }
        `}
      >
        {content}
      </div>
    </div>
  );
};

export default VoiceTranscript;
