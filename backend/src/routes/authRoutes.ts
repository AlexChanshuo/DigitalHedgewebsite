// src/routes/authRoutes.ts
import { Router } from 'express';
import * as authController from '../controllers/authController';
import { authenticate } from '../middlewares/authMiddleware';
import { validateBody } from '../middlewares/validateMiddleware';
import { loginLimiter, passwordResetLimiter } from '../middlewares/rateLimitMiddleware';
import {
  loginSchema,
  changePasswordSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} from '../validators/auth.schema';

const router = Router();

// 公開路由
router.post('/login', loginLimiter, validateBody(loginSchema), authController.login);
router.post('/forgot-password', passwordResetLimiter, validateBody(forgotPasswordSchema), authController.forgotPassword);
router.post('/reset-password', validateBody(resetPasswordSchema), authController.resetPassword);
router.post('/refresh', authController.refreshToken);

// 需要認證的路由
router.post('/logout', authenticate, authController.logout);
router.post('/change-password', authenticate, validateBody(changePasswordSchema), authController.changePassword);
router.get('/me', authenticate, authController.me);

export default router;
