// src/controllers/postController.ts
import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/database';
import { createError } from '../middlewares/errorMiddleware';
import { generateSlug, ensureUniqueSlug } from '../utils/slug';
import { PostStatus, Tag, PostTag } from '@prisma/client';

// Type for post tags with included tag
interface PostTagWithTag extends PostTag {
  tag: Tag;
}

// Whitelist of allowed sort fields to prevent SQL injection (SEC-03)
const ALLOWED_SORT_FIELDS = ['publishedAt', 'createdAt', 'title', 'viewCount'] as const;
type SortField = typeof ALLOWED_SORT_FIELDS[number];

/**
 * 取得所有文章 (公開)
 * GET /api/posts
 */
export async function getAllPosts(req: Request, res: Response, next: NextFunction) {
  try {
    const {
      page = 1,
      limit = 10,
      status,
      categoryId,
      tagId,
      search,
      sortBy = 'publishedAt',
      sortOrder = 'desc',
    } = req.query;

    // Validate sortBy against whitelist (SEC-03)
    const validatedSortBy: SortField = ALLOWED_SORT_FIELDS.includes(sortBy as SortField)
      ? (sortBy as SortField)
      : 'publishedAt';
    const validatedSortOrder = sortOrder === 'asc' ? 'asc' : 'desc';

    const where: any = {};

    // 如果是公開請求，只顯示已發布的
    if (!req.user || !['MASTER', 'ADMIN', 'EDITOR'].includes(req.user.role)) {
      where.status = PostStatus.PUBLISHED;
      where.publishedAt = { lte: new Date() };
    } else if (status) {
      where.status = status;
    }

    if (categoryId) {
      where.categoryId = categoryId;
    }

    if (tagId) {
      where.tags = {
        some: { tagId: tagId as string },
      };
    }

    if (search) {
      where.OR = [
        { title: { contains: search as string, mode: 'insensitive' } },
        { excerpt: { contains: search as string, mode: 'insensitive' } },
        { content: { contains: search as string, mode: 'insensitive' } },
      ];
    }

    const [posts, total] = await Promise.all([
      prisma.post.findMany({
        where,
        select: {
          id: true,
          title: true,
          slug: true,
          excerpt: true,
          coverImage: true,
          status: true,
          publishedAt: true,
          viewCount: true,
          createdAt: true,
          author: {
            select: {
              id: true,
              name: true,
              avatar: true,
            },
          },
          category: {
            select: {
              id: true,
              name: true,
              slug: true,
            },
          },
          tags: {
            select: {
              tag: {
                select: {
                  id: true,
                  name: true,
                  slug: true,
                  color: true,
                },
              },
            },
          },
        },
        skip: (Number(page) - 1) * Number(limit),
        take: Number(limit),
        orderBy: { [validatedSortBy]: validatedSortOrder },
      }),
      prisma.post.count({ where }),
    ]);

    // 格式化 tags
    const formattedPosts = posts.map((post) => ({
      ...post,
      tags: post.tags.map((t: { tag: { id: string; name: string; slug: string; color: string | null } }) => t.tag),
    }));

    res.json({
      success: true,
      data: {
        posts: formattedPosts,
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
 * 取得單一文章
 * GET /api/posts/:slug
 */
export async function getPostBySlug(req: Request, res: Response, next: NextFunction) {
  try {
    const { slug } = req.params;
    const isAdmin = req.user && ['MASTER', 'ADMIN', 'EDITOR'].includes(req.user.role);

    const post = await prisma.post.findUnique({
      where: { slug },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
        tags: {
          select: {
            tag: {
              select: {
                id: true,
                name: true,
                slug: true,
                color: true,
              },
            },
          },
        },
      },
    });

    if (!post) {
      throw createError('文章不存在', 404);
    }

    // 非管理員只能看已發布的文章
    if (!isAdmin && (post.status !== PostStatus.PUBLISHED || !post.publishedAt || post.publishedAt > new Date())) {
      throw createError('文章不存在', 404);
    }

    // 增加瀏覽次數 (只對公開訪客)
    if (!isAdmin) {
      await prisma.post.update({
        where: { id: post.id },
        data: { viewCount: { increment: 1 } },
      });
    }

    res.json({
      success: true,
      data: {
        ...post,
        tags: post.tags.map((t: { tag: { id: string; name: string; slug: string; color: string | null } }) => t.tag),
      },
    });
  } catch (error) {
    next(error);
  }
}

/**
 * 建立文章
 * POST /api/posts
 */
export async function createPost(req: Request, res: Response, next: NextFunction) {
  try {
    const {
      title,
      slug: customSlug,
      excerpt,
      content,
      coverImage,
      status,
      publishedAt,
      scheduledAt,
      categoryId,
      tagIds,
      metaTitle,
      metaDescription,
      metaKeywords,
    } = req.body;

    // 驗證分類存在
    const category = await prisma.category.findUnique({
      where: { id: categoryId },
    });

    if (!category) {
      throw createError('分類不存在', 400);
    }

    // 生成 slug
    const baseSlug = customSlug || generateSlug(title);
    const slug = await ensureUniqueSlug(baseSlug, async (s: string) => {
      const existing = await prisma.post.findUnique({ where: { slug: s } });
      return !!existing;
    });

    // 處理發布時間
    let finalPublishedAt = null;
    if (status === PostStatus.PUBLISHED) {
      finalPublishedAt = publishedAt ? new Date(publishedAt) : new Date();
    }

    // 建立文章
    const post = await prisma.post.create({
      data: {
        title,
        slug,
        excerpt,
        content,
        coverImage,
        status: status || PostStatus.DRAFT,
        publishedAt: finalPublishedAt,
        scheduledAt: scheduledAt ? new Date(scheduledAt) : null,
        categoryId,
        authorId: req.user!.id,
        metaTitle: metaTitle || title,
        metaDescription: metaDescription || excerpt,
        metaKeywords,
        // 生成 JSON-LD structured data
        structuredData: generateStructuredData({
          title,
          excerpt,
          coverImage,
          publishedAt: finalPublishedAt,
          authorName: req.user!.email,
        }),
        tags: tagIds?.length
          ? {
              create: tagIds.map((tagId: string) => ({
                tag: { connect: { id: tagId } },
              })),
            }
          : undefined,
      },
      include: {
        author: {
          select: { id: true, name: true },
        },
        category: {
          select: { id: true, name: true, slug: true },
        },
        tags: {
          select: {
            tag: { select: { id: true, name: true, slug: true } },
          },
        },
      },
    });

    // 記錄活動
    await prisma.activityLog.create({
      data: {
        userId: req.user!.id,
        action: 'CREATE_POST',
        details: { postId: post.id, title },
        ipAddress: req.ip,
        userAgent: req.headers['user-agent'],
      },
    });

    res.status(201).json({
      success: true,
      data: {
        ...post,
        tags: post.tags.map((t: { tag: { id: string; name: string; slug: string } }) => t.tag),
      },
    });
  } catch (error) {
    next(error);
  }
}

/**
 * 更新文章
 * PATCH /api/posts/:id
 */
export async function updatePost(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const {
      title,
      slug: customSlug,
      excerpt,
      content,
      coverImage,
      status,
      publishedAt,
      scheduledAt,
      categoryId,
      tagIds,
      metaTitle,
      metaDescription,
      metaKeywords,
    } = req.body;

    const post = await prisma.post.findUnique({
      where: { id },
    });

    if (!post) {
      throw createError('文章不存在', 404);
    }

    // 檢查權限
    if (
      req.user!.role !== 'MASTER' &&
      req.user!.role !== 'ADMIN' &&
      post.authorId !== req.user!.id
    ) {
      throw createError('您沒有權限修改此文章', 403);
    }

    // 處理 slug
    let slug = post.slug;
    if (customSlug && customSlug !== post.slug) {
      const existing = await prisma.post.findUnique({ where: { slug: customSlug } });
      if (existing && existing.id !== id) {
        throw createError('此 slug 已被使用', 400);
      }
      slug = customSlug;
    } else if (title && title !== post.title && !customSlug) {
      const baseSlug = generateSlug(title);
      slug = await ensureUniqueSlug(baseSlug, async (s: string) => {
        const existing = await prisma.post.findUnique({ where: { slug: s } });
        return existing !== null && existing.id !== id;
      });
    }

    // 處理發布時間
    let finalPublishedAt = post.publishedAt;
    if (status === PostStatus.PUBLISHED && !post.publishedAt) {
      finalPublishedAt = publishedAt ? new Date(publishedAt) : new Date();
    }

    // 更新 tags
    if (tagIds !== undefined) {
      await prisma.postTag.deleteMany({ where: { postId: id } });
    }

    const updated = await prisma.post.update({
      where: { id },
      data: {
        ...(title && { title }),
        ...(slug !== post.slug && { slug }),
        ...(excerpt !== undefined && { excerpt }),
        ...(content && { content }),
        ...(coverImage !== undefined && { coverImage }),
        ...(status && { status }),
        ...(finalPublishedAt !== post.publishedAt && { publishedAt: finalPublishedAt }),
        ...(scheduledAt !== undefined && { scheduledAt: scheduledAt ? new Date(scheduledAt) : null }),
        ...(categoryId && { categoryId }),
        ...(metaTitle !== undefined && { metaTitle }),
        ...(metaDescription !== undefined && { metaDescription }),
        ...(metaKeywords !== undefined && { metaKeywords }),
        ...(tagIds?.length && {
          tags: {
            create: tagIds.map((tagId: string) => ({
              tag: { connect: { id: tagId } },
            })),
          },
        }),
      },
      include: {
        author: {
          select: { id: true, name: true },
        },
        category: {
          select: { id: true, name: true, slug: true },
        },
        tags: {
          select: {
            tag: { select: { id: true, name: true, slug: true } },
          },
        },
      },
    });

    // 記錄活動
    await prisma.activityLog.create({
      data: {
        userId: req.user!.id,
        action: 'UPDATE_POST',
        details: { postId: id },
        ipAddress: req.ip,
        userAgent: req.headers['user-agent'],
      },
    });

    res.json({
      success: true,
      data: {
        ...updated,
        tags: updated.tags.map((t: { tag: { id: string; name: string; slug: string } }) => t.tag),
      },
    });
  } catch (error) {
    next(error);
  }
}

/**
 * 刪除文章
 * DELETE /api/posts/:id
 */
export async function deletePost(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;

    const post = await prisma.post.findUnique({
      where: { id },
    });

    if (!post) {
      throw createError('文章不存在', 404);
    }

    // 檢查權限
    if (
      req.user!.role !== 'MASTER' &&
      req.user!.role !== 'ADMIN' &&
      post.authorId !== req.user!.id
    ) {
      throw createError('您沒有權限刪除此文章', 403);
    }

    await prisma.post.delete({ where: { id } });

    // 記錄活動
    await prisma.activityLog.create({
      data: {
        userId: req.user!.id,
        action: 'DELETE_POST',
        details: { postId: id, title: post.title },
        ipAddress: req.ip,
        userAgent: req.headers['user-agent'],
      },
    });

    res.json({
      success: true,
      message: '文章已刪除',
    });
  } catch (error) {
    next(error);
  }
}

/**
 * 生成 JSON-LD Structured Data
 */
function generateStructuredData(data: {
  title: string;
  excerpt?: string;
  coverImage?: string;
  publishedAt?: Date | null;
  authorName: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: data.title,
    description: data.excerpt || '',
    image: data.coverImage || '',
    datePublished: data.publishedAt?.toISOString() || '',
    author: {
      '@type': 'Organization',
      name: 'Digital Hedge',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Digital Hedge',
      logo: {
        '@type': 'ImageObject',
        url: 'https://digitalhedge.ai/icon.png',
      },
    },
  };
}
