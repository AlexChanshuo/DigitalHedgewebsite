// src/validators/user.schema.ts
import { z } from 'zod';
import { UserRole, UserStatus } from '@prisma/client';

export const createUserSchema = z.object({
  email: z.string().email('請輸入有效的電子郵件'),
  password: z
    .string()
    .min(8, '密碼至少需要 8 個字元')
    .regex(/[A-Z]/, '密碼需包含至少一個大寫字母')
    .regex(/[a-z]/, '密碼需包含至少一個小寫字母')
    .regex(/[0-9]/, '密碼需包含至少一個數字'),
  name: z.string().min(1, '請輸入名稱').optional(),
  role: z.nativeEnum(UserRole).optional(),
});

export const updateUserSchema = z.object({
  email: z.string().email('請輸入有效的電子郵件').optional(),
  name: z.string().min(1, '請輸入名稱').optional(),
  avatar: z.string().optional().nullable(), // 支援 URL 或 base64 data URL
  bio: z.string().max(200, '簽名最多 200 字').optional().nullable(),
  publicEmail: z.string().email('請輸入有效的電子郵件').optional().nullable(),
  socialLinks: z.object({
    threads: z.string().optional(),
    twitter: z.string().optional(),
    facebook: z.string().optional(),
    linkedin: z.string().optional(),
    website: z.string().optional(),
  }).optional().nullable(),
});

export const updateUserRoleSchema = z.object({
  role: z.nativeEnum(UserRole),
});

export const updateUserStatusSchema = z.object({
  status: z.nativeEnum(UserStatus),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
export type UpdateUserRoleInput = z.infer<typeof updateUserRoleSchema>;
export type UpdateUserStatusInput = z.infer<typeof updateUserStatusSchema>;
