// src/validators/auth.schema.ts
import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('請輸入有效的電子郵件'),
  password: z.string().min(1, '請輸入密碼'),
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, '請輸入目前密碼'),
  newPassword: z
    .string()
    .min(8, '密碼至少需要 8 個字元')
    .regex(/[A-Z]/, '密碼需包含至少一個大寫字母')
    .regex(/[a-z]/, '密碼需包含至少一個小寫字母')
    .regex(/[0-9]/, '密碼需包含至少一個數字'),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: '兩次輸入的密碼不一致',
  path: ['confirmPassword'],
});

export const forgotPasswordSchema = z.object({
  email: z.string().email('請輸入有效的電子郵件'),
});

export const resetPasswordSchema = z.object({
  token: z.string().min(1, '重設令牌無效'),
  newPassword: z
    .string()
    .min(8, '密碼至少需要 8 個字元')
    .regex(/[A-Z]/, '密碼需包含至少一個大寫字母')
    .regex(/[a-z]/, '密碼需包含至少一個小寫字母')
    .regex(/[0-9]/, '密碼需包含至少一個數字'),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: '兩次輸入的密碼不一致',
  path: ['confirmPassword'],
});

export type LoginInput = z.infer<typeof loginSchema>;
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
