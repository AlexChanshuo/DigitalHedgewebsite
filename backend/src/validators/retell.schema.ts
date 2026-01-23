// src/validators/retell.schema.ts
import { z } from 'zod';

/**
 * Schema for creating a web call
 * POST /api/retell/web-call
 */
export const createWebCallSchema = z.object({
  body: z.object({
    // Optional metadata to pass to the call
    metadata: z.record(z.unknown()).optional(),
  }),
});

/**
 * Schema for Retell webhook payload
 * Based on: https://docs.retellai.com/features/register-webhook
 */
export const webhookEventSchema = z.object({
  body: z.object({
    event: z.enum(['call_started', 'call_ended', 'call_analyzed']),
    call: z.object({
      call_id: z.string(),
      agent_id: z.string(),
      call_status: z.enum(['registered', 'ongoing', 'ended', 'error']),
      start_timestamp: z.number().optional(),
      end_timestamp: z.number().optional(),
      disconnection_reason: z.string().optional(),
      transcript: z.string().optional(),
      transcript_object: z.array(z.object({
        role: z.enum(['agent', 'user']),
        content: z.string(),
        timestamp: z.number(),
      })).optional(),
      call_analysis: z.object({
        call_summary: z.string().optional(),
        user_sentiment: z.string().optional(),
      }).passthrough().optional(),
      metadata: z.record(z.unknown()).optional(),
    }),
  }),
});

export type CreateWebCallInput = z.infer<typeof createWebCallSchema>;
export type WebhookEventInput = z.infer<typeof webhookEventSchema>;
