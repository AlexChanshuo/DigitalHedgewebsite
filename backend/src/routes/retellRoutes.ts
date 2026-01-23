// src/routes/retellRoutes.ts
import { Router } from 'express';
import { optionalAuth } from '../middlewares/authMiddleware';

const router = Router();

// Create web call - optionally authenticated to track user
// POST /api/retell/web-call
router.post('/web-call', optionalAuth, (req, res) => {
  // TODO: Implement in Plan 04
  res.status(501).json({
    success: false,
    error: 'Not implemented yet',
  });
});

// Webhook endpoint - no auth (Retell servers call this)
// Signature verification happens in controller
// POST /api/retell/webhook
router.post('/webhook', (req, res) => {
  // TODO: Implement in Plan 04
  res.status(501).json({
    success: false,
    error: 'Not implemented yet',
  });
});

export default router;
