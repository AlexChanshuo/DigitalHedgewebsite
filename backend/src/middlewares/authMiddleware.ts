// src/middlewares/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken, TokenPayload } from '../utils/jwt';
import { prisma } from '../config/database';
import { UserRole } from '@prisma/client';
import { createError } from './errorMiddleware';

// Extend Express Request type
declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload & { id: string };
    }
  }
}

/**
 * 驗證 JWT Token
 */
export async function authenticate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw createError('請先登入', 401);
    }

    const token = authHeader.split(' ')[1];
    
    try {
      const decoded = verifyAccessToken(token);
      
      // Verify user still exists and is active
      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
        select: { id: true, status: true, role: true },
      });

      if (!user) {
        throw createError('使用者不存在', 401);
      }

      if (user.status === 'SUSPENDED') {
        throw createError('帳號已被停權', 403);
      }

      if (user.status === 'INACTIVE') {
        throw createError('帳號已停用', 403);
      }

      req.user = {
        ...decoded,
        id: user.id,
      };
      
      next();
    } catch (error: any) {
      if (error.name === 'TokenExpiredError') {
        throw createError('登入已過期，請重新登入', 401);
      }
      if (error.name === 'JsonWebTokenError') {
        throw createError('無效的登入憑證', 401);
      }
      throw error;
    }
  } catch (error) {
    next(error);
  }
}

/**
 * 可選驗證 - 如果有 token 就解析，沒有就繼續
 */
export async function optionalAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authHeader = req.headers.authorization;
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      
      try {
        const decoded = verifyAccessToken(token);
        req.user = { ...decoded, id: decoded.userId };
      } catch {
        // Token invalid, but continue without auth
      }
    }
    
    next();
  } catch (error) {
    next(error);
  }
}

/**
 * 角色檢查
 */
export function requireRole(...roles: UserRole[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(createError('請先登入', 401));
    }

    if (!roles.includes(req.user.role as UserRole)) {
      return next(createError('您沒有權限執行此操作', 403));
    }

    next();
  };
}

/**
 * 需要管理員權限
 */
export const requireAdmin = requireRole(UserRole.MASTER, UserRole.ADMIN);

/**
 * 需要編輯權限
 */
export const requireEditor = requireRole(UserRole.MASTER, UserRole.ADMIN, UserRole.EDITOR);

/**
 * 需要最高管理員權限
 */
export const requireMaster = requireRole(UserRole.MASTER);
