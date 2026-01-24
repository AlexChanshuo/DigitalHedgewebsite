// components/voice/RetellVoiceAgent.tsx
import React, { useRef, useState, useCallback, useEffect, useImperativeHandle, forwardRef } from 'react';
import { RetellWebClient } from 'retell-client-js-sdk';
import { createWebCall } from '../../services/api';
import VoiceFloatingButton from './VoiceFloatingButton';
import VoiceCallModal from './VoiceCallModal';
import { CallState } from './VoiceWaveform';
import { TranscriptMessage } from './VoiceTranscript';

/**
 * Handle exposed to parent components via ref.
 */
export interface RetellVoiceAgentHandle {
  openVoiceChat: () => void;
}

/**
 * Main voice agent component.
 * Manages Retell SDK lifecycle, state transitions, and UI composition.
 *
 * Usage: Place once in App.tsx to enable voice calls site-wide.
 * Use ref to trigger voice chat programmatically: ref.current.openVoiceChat()
 *
 * SDK Events handled:
 * - call_started -> 'listening'
 * - call_ended -> 'ended'
 * - agent_start_talking -> 'speaking'
 * - agent_stop_talking -> 'listening'
 * - update -> transcript update
 * - error -> 'ended' with error message (user can close modal and retry)
 */
const RetellVoiceAgent = forwardRef<RetellVoiceAgentHandle>((_, ref) => {
  // SDK instance ref (survives re-renders, cleaned up on unmount)
  const clientRef = useRef<RetellWebClient | null>(null);

  // UI state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [callState, setCallState] = useState<CallState>('idle');
  const [transcript, setTranscript] = useState<TranscriptMessage[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isStarting, setIsStarting] = useState(false);

  /**
   * Start a new voice call.
   * Fetches access token from backend, initializes SDK, sets up event listeners.
   */
  const startCall = useCallback(async () => {
    // Prevent double-starts
    if (isStarting || clientRef.current) return;

    setIsStarting(true);
    setError(null);
    setTranscript([]);
    setCallState('connecting');
    setIsModalOpen(true);

    try {
      // Get access token from backend (30-second expiry!)
      const response = await createWebCall();

      if (!response.success || !response.data) {
        throw new Error(response.error || '無法建立通話');
      }

      const { accessToken } = response.data;

      // Initialize Retell client
      const client = new RetellWebClient();
      clientRef.current = client;

      // Set up event listeners BEFORE starting call
      client.on('call_started', () => {
        console.log('Retell: call_started');
        setCallState('listening');
      });

      client.on('call_ended', () => {
        console.log('Retell: call_ended');
        setCallState('ended');
        clientRef.current = null;
      });

      client.on('agent_start_talking', () => {
        console.log('Retell: agent_start_talking');
        setCallState('speaking');
      });

      client.on('agent_stop_talking', () => {
        console.log('Retell: agent_stop_talking');
        setCallState('listening');
      });

      client.on('update', (update: { transcript?: TranscriptMessage[] }) => {
        if (update.transcript) {
          setTranscript(update.transcript);
        }
      });

      client.on('error', (err: Error) => {
        console.error('Retell error:', err);
        // Set error message in Chinese - user can close modal and click FAB to retry
        setError(getErrorMessage(err));
        setCallState('ended');
        clientRef.current = null;
      });

      // Start the call (must be within 30s of getting token)
      await client.startCall({ accessToken });

    } catch (err: unknown) {
      console.error('Failed to start call:', err);
      // Set error message - user can close modal and click FAB to retry
      setError(getErrorMessage(err));
      setCallState('ended');
      clientRef.current = null;
    } finally {
      setIsStarting(false);
    }
  }, [isStarting]);

  // Expose openVoiceChat method to parent via ref
  useImperativeHandle(ref, () => ({
    openVoiceChat: () => {
      if (!isModalOpen && !isStarting) {
        startCall();
      }
    }
  }), [isModalOpen, isStarting, startCall]);

  /**
   * End the current call.
   */
  const endCall = useCallback(() => {
    if (clientRef.current) {
      clientRef.current.stopCall();
      clientRef.current = null;
    }
    setCallState('ended');
  }, []);

  /**
   * Close the modal. If call is active, end it first.
   * After closing, user can click FAB again to start a new call (retry after error).
   */
  const closeModal = useCallback(() => {
    if (clientRef.current) {
      clientRef.current.stopCall();
      clientRef.current = null;
    }
    setIsModalOpen(false);
    setCallState('idle');
    setTranscript([]);
    setError(null);
  }, []);

  /**
   * Handle FAB click.
   * If modal is closed, start a call. If modal is open, close it.
   */
  const handleFabClick = useCallback(() => {
    if (isModalOpen) {
      closeModal();
    } else {
      startCall();
    }
  }, [isModalOpen, closeModal, startCall]);

  /**
   * Cleanup on unmount - stop any active call.
   */
  useEffect(() => {
    return () => {
      if (clientRef.current) {
        clientRef.current.stopCall();
        clientRef.current = null;
      }
    };
  }, []);

  // Determine if call is active (for FAB state)
  const isCallActive = callState === 'connecting' || callState === 'listening' || callState === 'speaking';

  return (
    <>
      <VoiceFloatingButton
        onClick={handleFabClick}
        isActive={isCallActive || isModalOpen}
        disabled={isStarting}
      />
      <VoiceCallModal
        isOpen={isModalOpen}
        callState={callState}
        transcript={transcript}
        onEndCall={endCall}
        onClose={closeModal}
        error={error}
      />
    </>
  );
});

/**
 * Convert error to user-friendly Chinese message.
 */
function getErrorMessage(error: unknown): string {
  const message = (error instanceof Error ? error.message : String(error)).toLowerCase();

  if (message.includes('permission') || message.includes('microphone')) {
    return '無法存取麥克風。請允許瀏覽器使用麥克風權限。';
  }
  if (message.includes('token') || message.includes('expired')) {
    return '連線逾時，請重試。';
  }
  if (message.includes('network') || message.includes('connection')) {
    return '網路連線錯誤，請檢查網路狀態。';
  }

  return '發生錯誤，請稍後重試。';
}

RetellVoiceAgent.displayName = 'RetellVoiceAgent';

export default RetellVoiceAgent;
