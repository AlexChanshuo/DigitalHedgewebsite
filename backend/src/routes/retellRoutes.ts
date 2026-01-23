// src/routes/retellRoutes.ts
import { Router } from 'express';
import { createWebCall, handleWebhook } from '../controllers/retellController';
import { optionalAuth } from '../middlewares/authMiddleware';

const router = Router();

// Create web call - optionally authenticated to track user
// POST /api/retell/web-call
router.post('/web-call', optionalAuth, createWebCall);

// Webhook endpoint - no auth (Retell servers call this)
// Signature verification happens in controller
// POST /api/retell/webhook
router.post('/webhook', handleWebhook);

export default router;
