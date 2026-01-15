// src/controllers/tagController.ts
import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/database';
import { createError } from '../middlewares/errorMiddleware';
import { generateSlug, ensureUniqueSlug } from '../utils/slug';

/**
 * 取得所有標籤
 * GET /api/tags
 */
export async function getAllTags(req: Request, res: Response, next: NextFunction) {
  try {
    const tags = await prisma.tag.findMany({
      orderBy: { name: 'asc' },
      include: {
        _count: {
          select: { posts: true },
        },
      },
    });

    res.json({
      success: true,
      data: tags,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * 取得單一標籤
 * GET /api/tags/:slug
 */
export async function getTagBySlug(req: Request, res: Response, next: NextFunction) {
  try {
    const { slug } = req.params;

    const tag = await prisma.tag.findUnique({
      where: { slug },
      include: {
        _count: {
          select: { posts: true },
        },
      },
    });

    if (!tag) {
      throw createError('標籤不存在', 404);
    }

    res.json({
      success: true,
      data: tag,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * 建立標籤
 * POST /api/tags
 */
export async function createTag(req: Request, res: Response, next: NextFunction) {
  try {
    const { name, slug: customSlug, color } = req.body;

    // 檢查名稱是否已存在
    const existing = await prisma.tag.findUnique({
      where: { name },
    });

    if (existing) {
      throw createError('此標籤名稱已存在', 400);
    }

    // 生成 slug
    const baseSlug = customSlug || generateSlug(name);
    const slug = await ensureUniqueSlug(baseSlug, async (s) => {
      const existing = await prisma.tag.findUnique({ where: { slug: s } });
      return !!existing;
    });

    const tag = await prisma.tag.create({
      data: {
        name,
        slug,
        color: color || '#D4A373',
      },
    });

    // 記錄活動
    await prisma.activityLog.create({
      data: {
        userId: req.user!.id,
        action: 'CREATE_TAG',
        details: { tagId: tag.id, name },
        ipAddress: req.ip,
        userAgent: req.headers['user-agent'],
      },
    });

    res.status(201).json({
      success: true,
      data: tag,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * 更新標籤
 * PATCH /api/tags/:id
 */
export async function updateTag(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const { name, slug: customSlug, color } = req.body;

    const tag = await prisma.tag.findUnique({
      where: { id },
    });

    if (!tag) {
      throw createError('標籤不存在', 404);
    }

    // 檢查名稱是否已存在
    if (name && name !== tag.name) {
      const existing = await prisma.tag.findUnique({
        where: { name },
      });
      if (existing) {
        throw createError('此標籤名稱已存在', 400);
      }
    }

    // 處理 slug
    let slug = tag.slug;
    if (customSlug && customSlug !== tag.slug) {
      const existing = await prisma.tag.findUnique({ where: { slug: customSlug } });
      if (existing && existing.id !== id) {
        throw createError('此 slug 已被使用', 400);
      }
      slug = customSlug;
    }

    const updated = await prisma.tag.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(slug !== tag.slug && { slug }),
        ...(color !== undefined && { color }),
      },
    });

    // 記錄活動
    await prisma.activityLog.create({
      data: {
        userId: req.user!.id,
        action: 'UPDATE_TAG',
        details: { tagId: id },
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
 * 刪除標籤
 * DELETE /api/tags/:id
 */
export async function deleteTag(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;

    const tag = await prisma.tag.findUnique({
      where: { id },
    });

    if (!tag) {
      throw createError('標籤不存在', 404);
    }

    // 先刪除關聯
    await prisma.postTag.deleteMany({
      where: { tagId: id },
    });

    // 刪除標籤
    await prisma.tag.delete({ where: { id } });

    // 記錄活動
    await prisma.activityLog.create({
      data: {
        userId: req.user!.id,
        action: 'DELETE_TAG',
        details: { tagId: id, name: tag.name },
        ipAddress: req.ip,
        userAgent: req.headers['user-agent'],
      },
    });

    res.json({
      success: true,
      message: '標籤已刪除',
    });
  } catch (error) {
    next(error);
  }
}
