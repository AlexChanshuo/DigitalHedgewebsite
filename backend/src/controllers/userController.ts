// src/controllers/userController.ts
import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/database';
import { hashPassword } from '../utils/password';
import { createError } from '../middlewares/errorMiddleware';
import { sendWelcomeEmail } from '../services/emailService';

/**
 * 取得所有使用者 (管理員)
 * GET /api/users
 */
export async function getAllUsers(req: Request, res: Response, next: NextFunction) {
  try {
    const { page = 1, limit = 20, role, status, search } = req.query;

    const where: any = {};

    if (role) {
      where.role = role;
    }

    if (status) {
      where.status = status;
    }

    if (search) {
      where.OR = [
        { email: { contains: search as string, mode: 'insensitive' } },
        { name: { contains: search as string, mode: 'insensitive' } },
      ];
    }

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        select: {
          id: true,
          email: true,
          name: true,
          avatar: true,
          role: true,
          status: true,
          createdAt: true,
          lastLoginAt: true,
          _count: {
            select: { posts: true },
          },
        },
        skip: (Number(page) - 1) * Number(limit),
        take: Number(limit),
        orderBy: { createdAt: 'desc' },
      }),
      prisma.user.count({ where }),
    ]);

    res.json({
      success: true,
      data: {
        users,
        pagination: {
          page: Number(page),
          limit: Number(limit),
          total,
          totalPages: Math.ceil(total / Number(limit)),
        },
      },
    });
  } catch (error) {
    next(error);
  }
}

/**
 * 取得單一使用者
 * GET /api/users/:id
 */
export async function getUserById(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        avatar: true,
        role: true,
        status: true,
        createdAt: true,
        lastLoginAt: true,
        _count: {
          select: { posts: true },
        },
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

/**
 * 建立使用者 (管理員)
 * POST /api/users
 */
export async function createUser(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password, name, role } = req.body;

    // 檢查郵件是否已存在
    const existing = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (existing) {
      throw createError('此電子郵件已被使用', 400);
    }

    // 建立使用者
    const passwordHash = await hashPassword(password);
    const user = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        passwordHash,
        name,
        role: role || 'USER',
        mustChangePassword: true,
        status: 'PENDING_PASSWORD_CHANGE',
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        status: true,
        createdAt: true,
      },
    });

    // 發送歡迎郵件
    if (name) {
      await sendWelcomeEmail(user.email, name);
    }

    // 記錄活動
    await prisma.activityLog.create({
      data: {
        userId: req.user!.id,
        action: 'CREATE_USER',
        details: { targetUserId: user.id, targetEmail: user.email },
        ipAddress: req.ip,
        userAgent: req.headers['user-agent'],
      },
    });

    res.status(201).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * 更新使用者資料
 * PATCH /api/users/:id
 */
export async function updateUser(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const { email, name, avatar } = req.body;
    const currentUser = req.user!;

    // 檢查權限：只有本人或管理員可以修改
    if (currentUser.id !== id && currentUser.role !== 'MASTER' && currentUser.role !== 'ADMIN') {
      throw createError('您沒有權限修改此使用者', 403);
    }

    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw createError('使用者不存在', 404);
    }

    // 如果要更改郵件，檢查是否已存在
    if (email && email.toLowerCase() !== user.email) {
      const existing = await prisma.user.findUnique({
        where: { email: email.toLowerCase() },
      });
      if (existing) {
        throw createError('此電子郵件已被使用', 400);
      }
    }

    const updated = await prisma.user.update({
      where: { id },
      data: {
        ...(email && { email: email.toLowerCase() }),
        ...(name !== undefined && { name }),
        ...(avatar !== undefined && { avatar }),
      },
      select: {
        id: true,
        email: true,
        name: true,
        avatar: true,
        role: true,
        status: true,
        updatedAt: true,
      },
    });

    res.json({
      success: true,
      data: updated,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * 更新使用者角色 (僅 MASTER)
 * PATCH /api/users/:id/role
 */
export async function updateUserRole(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const { role } = req.body;

    // 不能更改自己的角色
    if (req.user!.id === id) {
      throw createError('不能更改自己的角色', 400);
    }

    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw createError('使用者不存在', 404);
    }

    // 不能更改 MASTER 的角色
    if (user.role === 'MASTER' && req.user!.role !== 'MASTER') {
      throw createError('不能更改最高管理員的角色', 403);
    }

    const updated = await prisma.user.update({
      where: { id },
      data: { role },
      select: {
        id: true,
        email: true,
        role: true,
      },
    });

    // 記錄活動
    await prisma.activityLog.create({
      data: {
        userId: req.user!.id,
        action: 'UPDATE_USER_ROLE',
        details: { targetUserId: id, oldRole: user.role, newRole: role },
        ipAddress: req.ip,
        userAgent: req.headers['user-agent'],
      },
    });

    res.json({
      success: true,
      data: updated,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * 更新使用者狀態 (管理員)
 * PATCH /api/users/:id/status
 */
export async function updateUserStatus(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // 不能更改自己的狀態
    if (req.user!.id === id) {
      throw createError('不能更改自己的狀態', 400);
    }

    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw createError('使用者不存在', 404);
    }

    // 不能更改 MASTER 的狀態
    if (user.role === 'MASTER') {
      throw createError('不能更改最高管理員的狀態', 403);
    }

    const updated = await prisma.user.update({
      where: { id },
      data: { status },
      select: {
        id: true,
        email: true,
        status: true,
      },
    });

    // 記錄活動
    await prisma.activityLog.create({
      data: {
        userId: req.user!.id,
        action: 'UPDATE_USER_STATUS',
        details: { targetUserId: id, oldStatus: user.status, newStatus: status },
        ipAddress: req.ip,
        userAgent: req.headers['user-agent'],
      },
    });

    res.json({
      success: true,
      data: updated,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * 刪除使用者 (僅 MASTER)
 * DELETE /api/users/:id
 */
export async function deleteUser(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;

    // 不能刪除自己
    if (req.user!.id === id) {
      throw createError('不能刪除自己的帳號', 400);
    }

    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw createError('使用者不存在', 404);
    }

    // 不能刪除 MASTER
    if (user.role === 'MASTER') {
      throw createError('不能刪除最高管理員', 403);
    }

    await prisma.user.delete({
      where: { id },
    });

    // 記錄活動
    await prisma.activityLog.create({
      data: {
        userId: req.user!.id,
        action: 'DELETE_USER',
        details: { targetUserId: id, targetEmail: user.email },
        ipAddress: req.ip,
        userAgent: req.headers['user-agent'],
      },
    });

    res.json({
      success: true,
      message: '使用者已刪除',
    });
  } catch (error) {
    next(error);
  }
}
