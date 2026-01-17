// src/routes/contactRoutes.ts
import { Router } from 'express';
import { submitContact } from '../controllers/contactController';
import { contactLimiter } from '../middlewares/rateLimitMiddleware';

const router = Router();

// POST /api/contact - Submit contact form (rate limited to 5/minute)
router.post('/', contactLimiter, submitContact);

export default router;
