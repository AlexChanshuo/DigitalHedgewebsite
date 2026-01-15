// src/validators/post.schema.ts
import { z } from 'zod';
import { PostStatus } from '@prisma/client';

export const createPostSchema = z.object({
  title: z.string().min(1, '請輸入標題').max(200, '標題最多 200 字'),
  slug: z.string().optional(), // 自動生成
  excerpt: z.string().max(500, '摘要最多 500 字').optional(),
  content: z.string().min(1, '請輸入內容'),
  coverImage: z.string().url('請輸入有效的圖片網址').optional().nullable(),
  status: z.nativeEnum(PostStatus).optional().default(PostStatus.DRAFT),
  publishedAt: z.string().datetime().optional().nullable(),
  scheduledAt: z.string().datetime().optional().nullable(),
  categoryId: z.string().min(1, '請選擇分類'),
  tagIds: z.array(z.string()).optional().default([]),
  metaTitle: z.string().max(70, 'Meta 標題最多 70 字').optional(),
  metaDescription: z.string().max(160, 'Meta 描述最多 160 字').optional(),
  metaKeywords: z.string().max(200, '關鍵字最多 200 字').optional(),
});

export const updatePostSchema = z.object({
  title: z.string().min(1, '請輸入標題').max(200, '標題最多 200 字').optional(),
  slug: z.string().optional(),
  excerpt: z.string().max(500, '摘要最多 500 字').optional().nullable(),
  content: z.string().min(1, '請輸入內容').optional(),
  coverImage: z.string().url('請輸入有效的圖片網址').optional().nullable(),
  status: z.nativeEnum(PostStatus).optional(),
  publishedAt: z.string().datetime().optional().nullable(),
  scheduledAt: z.string().datetime().optional().nullable(),
  categoryId: z.string().optional(),
  tagIds: z.array(z.string()).optional(),
  metaTitle: z.string().max(70, 'Meta 標題最多 70 字').optional().nullable(),
  metaDescription: z.string().max(160, 'Meta 描述最多 160 字').optional().nullable(),
  metaKeywords: z.string().max(200, '關鍵字最多 200 字').optional().nullable(),
});

export const listPostsSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  status: z.nativeEnum(PostStatus).optional(),
  categoryId: z.string().optional(),
  tagId: z.string().optional(),
  search: z.string().optional(),
  sortBy: z.enum(['createdAt', 'publishedAt', 'viewCount', 'title']).default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
});

export type CreatePostInput = z.infer<typeof createPostSchema>;
export type UpdatePostInput = z.infer<typeof updatePostSchema>;
export type ListPostsInput = z.infer<typeof listPostsSchema>;
