// components/voice/VoiceWaveform.tsx
import React from 'react';

export type CallState = 'idle' | 'connecting' | 'listening' | 'speaking' | 'ended';

interface VoiceWaveformProps {
  state: CallState;
  className?: string;
}

/**
 * Animated waveform visualization for voice call states.
 * Uses CSS animations defined in index.html.
 *
 * States:
 * - idle: static low bars
 * - connecting: gentle pulsing
 * - listening: gentle pulsing (waiting for user)
 * - speaking: active wave (AI talking)
 * - ended: flat, faded bars
 */
const VoiceWaveform: React.FC<VoiceWaveformProps> = ({ state, className = '' }) => {
  return (
    <div className={`voice-waveform ${state} ${className}`}>
      <div className="voice-bar" />
      <div className="voice-bar" />
      <div className="voice-bar" />
      <div className="voice-bar" />
      <div className="voice-bar" />
    </div>
  );
};

export default VoiceWaveform;
