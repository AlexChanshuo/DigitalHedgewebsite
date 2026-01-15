// src/controllers/categoryController.ts
import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/database';
import { createError } from '../middlewares/errorMiddleware';
import { generateSlug, ensureUniqueSlug } from '../utils/slug';

/**
 * 取得所有分類
 * GET /api/categories
 */
export async function getAllCategories(req: Request, res: Response, next: NextFunction) {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { order: 'asc' },
      include: {
        _count: {
          select: { posts: true },
        },
      },
    });

    res.json({
      success: true,
      data: categories,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * 取得單一分類
 * GET /api/categories/:slug
 */
export async function getCategoryBySlug(req: Request, res: Response, next: NextFunction) {
  try {
    const { slug } = req.params;

    const category = await prisma.category.findUnique({
      where: { slug },
      include: {
        _count: {
          select: { posts: true },
        },
      },
    });

    if (!category) {
      throw createError('分類不存在', 404);
    }

    res.json({
      success: true,
      data: category,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * 建立分類
 * POST /api/categories
 */
export async function createCategory(req: Request, res: Response, next: NextFunction) {
  try {
    const { name, slug: customSlug, description, order, metaTitle, metaDescription } = req.body;

    // 檢查名稱是否已存在
    const existing = await prisma.category.findUnique({
      where: { name },
    });

    if (existing) {
      throw createError('此分類名稱已存在', 400);
    }

    // 生成 slug
    const baseSlug = customSlug || generateSlug(name);
    const slug = await ensureUniqueSlug(baseSlug, async (s) => {
      const existing = await prisma.category.findUnique({ where: { slug: s } });
      return !!existing;
    });

    const category = await prisma.category.create({
      data: {
        name,
        slug,
        description,
        order: order || 0,
        metaTitle: metaTitle || name,
        metaDescription,
      },
    });

    // 記錄活動
    await prisma.activityLog.create({
      data: {
        userId: req.user!.id,
        action: 'CREATE_CATEGORY',
        details: { categoryId: category.id, name },
        ipAddress: req.ip,
        userAgent: req.headers['user-agent'],
      },
    });

    res.status(201).json({
      success: true,
      data: category,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * 更新分類
 * PATCH /api/categories/:id
 */
export async function updateCategory(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const { name, slug: customSlug, description, order, metaTitle, metaDescription } = req.body;

    const category = await prisma.category.findUnique({
      where: { id },
    });

    if (!category) {
      throw createError('分類不存在', 404);
    }

    // 檢查名稱是否已存在
    if (name && name !== category.name) {
      const existing = await prisma.category.findUnique({
        where: { name },
      });
      if (existing) {
        throw createError('此分類名稱已存在', 400);
      }
    }

    // 處理 slug
    let slug = category.slug;
    if (customSlug && customSlug !== category.slug) {
      const existing = await prisma.category.findUnique({ where: { slug: customSlug } });
      if (existing && existing.id !== id) {
        throw createError('此 slug 已被使用', 400);
      }
      slug = customSlug;
    }

    const updated = await prisma.category.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(slug !== category.slug && { slug }),
        ...(description !== undefined && { description }),
        ...(order !== undefined && { order }),
        ...(metaTitle !== undefined && { metaTitle }),
        ...(metaDescription !== undefined && { metaDescription }),
      },
    });

    // 記錄活動
    await prisma.activityLog.create({
      data: {
        userId: req.user!.id,
        action: 'UPDATE_CATEGORY',
        details: { categoryId: id },
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
 * 刪除分類
 * DELETE /api/categories/:id
 */
export async function deleteCategory(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;

    const category = await prisma.category.findUnique({
      where: { id },
      include: {
        _count: { select: { posts: true } },
      },
    });

    if (!category) {
      throw createError('分類不存在', 404);
    }

    // 檢查是否有文章
    if (category._count.posts > 0) {
      throw createError(`此分類下有 ${category._count.posts} 篇文章，無法刪除`, 400);
    }

    await prisma.category.delete({ where: { id } });

    // 記錄活動
    await prisma.activityLog.create({
      data: {
        userId: req.user!.id,
        action: 'DELETE_CATEGORY',
        details: { categoryId: id, name: category.name },
        ipAddress: req.ip,
        userAgent: req.headers['user-agent'],
      },
    });

    res.json({
      success: true,
      message: '分類已刪除',
    });
  } catch (error) {
    next(error);
  }
}
