// src/controllers/retellController.ts
import { Request, Response, NextFunction } from 'express';
import Retell from 'retell-sdk';
import { Prisma } from '@prisma/client';
import { prisma } from '../config/database';
import { config } from '../config';
import { createError } from '../middlewares/errorMiddleware';

// Initialize Retell client
const retellClient = new Retell({
  apiKey: config.retell.apiKey,
});

// Types for Retell call data
interface RetellCall {
  call_id: string;
  agent_id: string;
  call_status: 'registered' | 'ongoing' | 'ended' | 'error';
  start_timestamp?: number;
  end_timestamp?: number;
  disconnection_reason?: string;
  transcript?: string;
  transcript_object?: Array<{
    role: 'agent' | 'user';
    content: string;
    timestamp: number;
  }>;
  call_analysis?: {
    call_summary?: string;
    user_sentiment?: string;
    [key: string]: unknown;
  };
  metadata?: Record<string, unknown>;
}

/**
 * Create a web call
 * POST /api/retell/web-call
 *
 * Creates a Retell web call and returns the access token for the frontend.
 * Optionally tracks authenticated users via metadata.
 */
export async function createWebCall(req: Request, res: Response, next: NextFunction) {
  try {
    const { metadata = {} } = req.body;

    // Add user ID to metadata if authenticated
    if (req.user?.id) {
      metadata.userId = req.user.id;
    }

    // Create web call via Retell SDK
    const webCallResponse = await retellClient.call.createWebCall({
      agent_id: config.retell.agentId,
      metadata,
    });

    // Pre-create CallLog entry with REGISTERED status
    await prisma.callLog.create({
      data: {
        retellCallId: webCallResponse.call_id,
        agentId: config.retell.agentId,
        status: 'REGISTERED',
        userId: req.user?.id || null,
        metadata: Object.keys(metadata).length > 0 ? metadata : Prisma.JsonNull,
      },
    });

    res.json({
      success: true,
      data: {
        accessToken: webCallResponse.access_token,
        callId: webCallResponse.call_id,
      },
    });
  } catch (error: any) {
    // Handle Retell API errors
    if (error.status) {
      return next(createError(`Retell API error: ${error.message}`, error.status));
    }
    next(error);
  }
}

/**
 * Handle Retell webhook events
 * POST /api/retell/webhook
 *
 * Receives call events (call_started, call_ended, call_analyzed) from Retell.
 * Validates signature using x-retell-signature header.
 * MUST return 204 to acknowledge receipt.
 */
export async function handleWebhook(req: Request, res: Response, next: NextFunction) {
  try {
    // Get signature from header
    const signature = req.headers['x-retell-signature'] as string;

    if (!signature) {
      console.error('Retell webhook: Missing x-retell-signature header');
      return res.status(401).json({ error: 'Missing signature' });
    }

    // Verify signature using Retell SDK (VOICE-05)
    const isValid = Retell.verify(
      JSON.stringify(req.body),
      config.retell.apiKey,
      signature
    );

    if (!isValid) {
      console.error('Retell webhook: Invalid signature');
      return res.status(401).json({ error: 'Invalid signature' });
    }

    // Process the webhook event
    const { event, call } = req.body as { event: string; call: RetellCall };

    console.log(`Retell webhook: ${event} for call ${call.call_id}`);

    switch (event) {
      case 'call_started':
        await handleCallStarted(call);
        break;
      case 'call_ended':
        await handleCallEnded(call);
        break;
      case 'call_analyzed':
        await handleCallAnalyzed(call);
        break;
      default:
        console.warn(`Retell webhook: Unknown event type: ${event}`);
    }

    // MUST return 204 to acknowledge receipt (not 200)
    res.status(204).send();
  } catch (error) {
    console.error('Retell webhook error:', error);
    // Still return 204 to prevent retries for processing errors
    // Log the error for debugging but acknowledge receipt
    res.status(204).send();
  }
}

/**
 * Handle call_started event
 */
async function handleCallStarted(call: RetellCall) {
  await prisma.callLog.upsert({
    where: { retellCallId: call.call_id },
    update: {
      status: 'ONGOING',
      startedAt: call.start_timestamp ? new Date(call.start_timestamp) : new Date(),
    },
    create: {
      retellCallId: call.call_id,
      agentId: call.agent_id,
      status: 'ONGOING',
      startedAt: call.start_timestamp ? new Date(call.start_timestamp) : new Date(),
      userId: (call.metadata?.userId as string) || null,
      metadata: call.metadata ? (call.metadata as Prisma.InputJsonValue) : Prisma.JsonNull,
    },
  });
}

/**
 * Handle call_ended event
 */
async function handleCallEnded(call: RetellCall) {
  const startedAt = call.start_timestamp ? new Date(call.start_timestamp) : null;
  const endedAt = call.end_timestamp ? new Date(call.end_timestamp) : new Date();
  const durationMs = startedAt && endedAt
    ? endedAt.getTime() - startedAt.getTime()
    : null;

  await prisma.callLog.upsert({
    where: { retellCallId: call.call_id },
    update: {
      status: call.call_status === 'error' ? 'ERROR' : 'ENDED',
      endedAt,
      durationMs,
      disconnectionReason: call.disconnection_reason || null,
      transcript: call.transcript || null,
      transcriptObject: call.transcript_object
        ? (call.transcript_object as unknown as Prisma.InputJsonValue)
        : Prisma.JsonNull,
    },
    create: {
      retellCallId: call.call_id,
      agentId: call.agent_id,
      status: call.call_status === 'error' ? 'ERROR' : 'ENDED',
      startedAt,
      endedAt,
      durationMs,
      disconnectionReason: call.disconnection_reason || null,
      transcript: call.transcript || null,
      transcriptObject: call.transcript_object
        ? (call.transcript_object as unknown as Prisma.InputJsonValue)
        : Prisma.JsonNull,
      userId: (call.metadata?.userId as string) || null,
      metadata: call.metadata ? (call.metadata as Prisma.InputJsonValue) : Prisma.JsonNull,
    },
  });
}

/**
 * Handle call_analyzed event
 */
async function handleCallAnalyzed(call: RetellCall) {
  // call_analyzed may come after call_ended, so just update
  await prisma.callLog.update({
    where: { retellCallId: call.call_id },
    data: {
      callAnalysis: call.call_analysis
        ? (call.call_analysis as Prisma.InputJsonValue)
        : Prisma.JsonNull,
    },
  });
}
