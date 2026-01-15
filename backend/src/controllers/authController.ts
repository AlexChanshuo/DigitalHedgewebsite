// src/controllers/authController.ts
import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/database';
import { config } from '../config';
import { hashPassword, comparePassword, validatePasswordStrength } from '../utils/password';
import { generateTokens, verifyRefreshToken } from '../utils/jwt';
import { sendPasswordResetEmail } from '../services/emailService';
import { createError } from '../middlewares/errorMiddleware';
import crypto from 'crypto';

/**
 * 登入
 * POST /api/auth/login
 */
export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;

    // 查找使用者
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user) {
      throw createError('電子郵件或密碼錯誤', 401);
    }

    // 檢查是否被鎖定
    if (user.lockedUntil && user.lockedUntil > new Date()) {
      const remainingMinutes = Math.ceil(
        (user.lockedUntil.getTime() - Date.now()) / 60000
      );
      throw createError(`帳號已被鎖定，請 ${remainingMinutes} 分鐘後再試`, 423);
    }

    // 檢查帳號狀態
    if (user.status === 'SUSPENDED') {
      throw createError('此帳號已被停權', 403);
    }

    if (user.status === 'INACTIVE') {
      throw createError('此帳號已停用', 403);
    }

    // 驗證密碼
    const isValid = await comparePassword(password, user.passwordHash);

    if (!isValid) {
      // 增加失敗次數
      const failedAttempts = user.failedLoginAttempts + 1;
      const updateData: any = { failedLoginAttempts: failedAttempts };

      // 超過最大嘗試次數，鎖定帳號
      if (failedAttempts >= config.password.maxFailedAttempts) {
        updateData.lockedUntil = new Date(Date.now() + config.password.lockDuration);
      }

      await prisma.user.update({
        where: { id: user.id },
        data: updateData,
      });

      throw createError('電子郵件或密碼錯誤', 401);
    }

    // 重設失敗次數
    await prisma.user.update({
      where: { id: user.id },
      data: {
        failedLoginAttempts: 0,
        lockedUntil: null,
        lastLoginAt: new Date(),
        lastLoginIp: req.ip,
      },
    });

    // 生成 Token
    const tokens = generateTokens({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    // 儲存 Refresh Token
    await prisma.session.create({
      data: {
        userId: user.id,
        refreshToken: tokens.refreshToken,
        userAgent: req.headers['user-agent'],
        ipAddress: req.ip,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      },
    });

    // 記錄活動
    await prisma.activityLog.create({
      data: {
        userId: user.id,
        action: 'LOGIN',
        ipAddress: req.ip,
        userAgent: req.headers['user-agent'],
      },
    });

    res.json({
      success: true,
      data: {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          mustChangePassword: user.mustChangePassword,
        },
        ...tokens,
      },
    });
  } catch (error) {
    next(error);
  }
}

/**
 * 登出
 * POST /api/auth/logout
 */
export async function logout(req: Request, res: Response, next: NextFunction) {
  try {
    const refreshToken = req.body.refreshToken;

    if (refreshToken) {
      await prisma.session.deleteMany({
        where: { refreshToken },
      });
    }

    if (req.user) {
      await prisma.activityLog.create({
        data: {
          userId: req.user.id,
          action: 'LOGOUT',
          ipAddress: req.ip,
          userAgent: req.headers['user-agent'],
        },
      });
    }

    res.json({
      success: true,
      message: '已成功登出',
    });
  } catch (error) {
    next(error);
  }
}

/**
 * 刷新 Token
 * POST /api/auth/refresh
 */
export async function refreshToken(req: Request, res: Response, next: NextFunction) {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      throw createError('請提供 Refresh Token', 400);
    }

    // 驗證 Refresh Token
    let decoded;
    try {
      decoded = verifyRefreshToken(refreshToken);
    } catch {
      throw createError('無效的 Refresh Token', 401);
    }

    // 檢查 Session
    const session = await prisma.session.findUnique({
      where: { refreshToken },
      include: { user: true },
    });

    if (!session) {
      throw createError('Session 不存在', 401);
    }

    if (session.expiresAt < new Date()) {
      await prisma.session.delete({ where: { id: session.id } });
      throw createError('Session 已過期', 401);
    }

    // 生成新 Token
    const tokens = generateTokens({
      userId: session.user.id,
      email: session.user.email,
      role: session.user.role,
    });

    // 更新 Session
    await prisma.session.update({
      where: { id: session.id },
      data: {
        refreshToken: tokens.refreshToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    res.json({
      success: true,
      data: tokens,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * 更改密碼
 * POST /api/auth/change-password
 */
export async function changePassword(req: Request, res: Response, next: NextFunction) {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user!.id;

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw createError('使用者不存在', 404);
    }

    // 驗證目前密碼
    const isValid = await comparePassword(currentPassword, user.passwordHash);
    if (!isValid) {
      throw createError('目前密碼錯誤', 401);
    }

    // 驗證新密碼強度
    const strength = validatePasswordStrength(newPassword);
    if (!strength.valid) {
      throw createError(strength.errors.join(', '), 400);
    }

    // 更新密碼
    const newHash = await hashPassword(newPassword);
    await prisma.user.update({
      where: { id: userId },
      data: {
        passwordHash: newHash,
        mustChangePassword: false,
        status: user.status === 'PENDING_PASSWORD_CHANGE' ? 'ACTIVE' : user.status,
      },
    });

    // 清除所有 Session
    await prisma.session.deleteMany({
      where: { userId },
    });

    // 記錄活動
    await prisma.activityLog.create({
      data: {
        userId,
        action: 'CHANGE_PASSWORD',
        ipAddress: req.ip,
        userAgent: req.headers['user-agent'],
      },
    });

    res.json({
      success: true,
      message: '密碼已更新，請重新登入',
    });
  } catch (error) {
    next(error);
  }
}

/**
 * 忘記密碼 - 發送重設郵件
 * POST /api/auth/forgot-password
 */
export async function forgotPassword(req: Request, res: Response, next: NextFunction) {
  try {
    const { email } = req.body;

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    // 即使使用者不存在也返回成功（避免洩露帳號資訊）
    if (!user) {
      return res.json({
        success: true,
        message: '如果此郵件地址已註冊，您將收到密碼重設郵件',
      });
    }

    // 生成重設 Token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetToken,
        resetTokenExpiry,
      },
    });

    // 發送郵件
    await sendPasswordResetEmail(user.email, resetToken);

    // 記錄活動
    await prisma.activityLog.create({
      data: {
        userId: user.id,
        action: 'FORGOT_PASSWORD',
        ipAddress: req.ip,
        userAgent: req.headers['user-agent'],
      },
    });

    res.json({
      success: true,
      message: '如果此郵件地址已註冊，您將收到密碼重設郵件',
    });
  } catch (error) {
    next(error);
  }
}

/**
 * 重設密碼
 * POST /api/auth/reset-password
 */
export async function resetPassword(req: Request, res: Response, next: NextFunction) {
  try {
    const { token, newPassword } = req.body;

    const user = await prisma.user.findFirst({
      where: {
        resetToken: token,
        resetTokenExpiry: { gt: new Date() },
      },
    });

    if (!user) {
      throw createError('重設連結無效或已過期', 400);
    }

    // 驗證新密碼強度
    const strength = validatePasswordStrength(newPassword);
    if (!strength.valid) {
      throw createError(strength.errors.join(', '), 400);
    }

    // 更新密碼
    const newHash = await hashPassword(newPassword);
    await prisma.user.update({
      where: { id: user.id },
      data: {
        passwordHash: newHash,
        resetToken: null,
        resetTokenExpiry: null,
        mustChangePassword: false,
        status: user.status === 'PENDING_PASSWORD_CHANGE' ? 'ACTIVE' : user.status,
      },
    });

    // 清除所有 Session
    await prisma.session.deleteMany({
      where: { userId: user.id },
    });

    // 記錄活動
    await prisma.activityLog.create({
      data: {
        userId: user.id,
        action: 'RESET_PASSWORD',
        ipAddress: req.ip,
        userAgent: req.headers['user-agent'],
      },
    });

    res.json({
      success: true,
      message: '密碼已重設，請使用新密碼登入',
    });
  } catch (error) {
    next(error);
  }
}

/**
 * 取得目前使用者資訊
 * GET /api/auth/me
 */
export async function me(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user!.id },
      select: {
        id: true,
        email: true,
        name: true,
        avatar: true,
        role: true,
        status: true,
        mustChangePassword: true,
        createdAt: true,
        lastLoginAt: true,
      },
    });

    if (!user) {
      throw createError('使用者不存在', 404);
    }

    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
}
