// src/validators/category.schema.ts
import { z } from 'zod';

export const createCategorySchema = z.object({
  name: z.string().min(1, '請輸入分類名稱').max(50, '分類名稱最多 50 字'),
  slug: z.string().optional(), // 自動生成
  description: z.string().max(200, '描述最多 200 字').optional(),
  order: z.number().int().min(0).default(0),
  metaTitle: z.string().max(70, 'Meta 標題最多 70 字').optional(),
  metaDescription: z.string().max(160, 'Meta 描述最多 160 字').optional(),
});

export const updateCategorySchema = z.object({
  name: z.string().min(1, '請輸入分類名稱').max(50, '分類名稱最多 50 字').optional(),
  slug: z.string().optional(),
  description: z.string().max(200, '描述最多 200 字').optional().nullable(),
  order: z.number().int().min(0).optional(),
  metaTitle: z.string().max(70, 'Meta 標題最多 70 字').optional().nullable(),
  metaDescription: z.string().max(160, 'Meta 描述最多 160 字').optional().nullable(),
});

export type CreateCategoryInput = z.infer<typeof createCategorySchema>;
export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>;
