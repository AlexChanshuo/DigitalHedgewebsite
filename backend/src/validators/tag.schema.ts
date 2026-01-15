// src/validators/tag.schema.ts
import { z } from 'zod';

export const createTagSchema = z.object({
  name: z.string().min(1, '請輸入標籤名稱').max(30, '標籤名稱最多 30 字'),
  slug: z.string().optional(), // 自動生成
  color: z.string().regex(/^#[0-9A-Fa-f]{6}$/, '請輸入有效的 HEX 顏色碼').optional(),
});

export const updateTagSchema = z.object({
  name: z.string().min(1, '請輸入標籤名稱').max(30, '標籤名稱最多 30 字').optional(),
  slug: z.string().optional(),
  color: z.string().regex(/^#[0-9A-Fa-f]{6}$/, '請輸入有效的 HEX 顏色碼').optional().nullable(),
});

export type CreateTagInput = z.infer<typeof createTagSchema>;
export type UpdateTagInput = z.infer<typeof updateTagSchema>;
