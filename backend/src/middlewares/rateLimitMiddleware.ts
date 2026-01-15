// src/middlewares/rateLimitMiddleware.ts
import rateLimit from 'express-rate-limit';
import { config } from '../config';

/**
 * 一般 API 限流
 * 每分鐘 100 次請求
 */
export const generalLimiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.max,
  message: {
    success: false,
    message: '請求過於頻繁，請稍後再試',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

/**
 * 登入限流 - 更嚴格
 * 每 15 分鐘最多 5 次嘗試
 */
export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  message: {
    success: false,
    message: '登入嘗試次數過多，請 15 分鐘後再試',
  },
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true, // 成功登入不計入
});

/**
 * 密碼重設限流
 * 每小時最多 3 次
 */
export const passwordResetLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3,
  message: {
    success: false,
    message: '密碼重設請求過多，請 1 小時後再試',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

/**
 * 註冊限流
 * 每小時最多 5 次
 */
export const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5,
  message: {
    success: false,
    message: '註冊請求過多，請 1 小時後再試',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

/**
 * API 寫入限流
 * 每分鐘最多 30 次寫入操作
 */
export const writeLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 30,
  message: {
    success: false,
    message: '操作過於頻繁，請稍後再試',
  },
  standardHeaders: true,
  legacyHeaders: false,
});
