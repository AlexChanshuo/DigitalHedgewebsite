// src/validators/contact.schema.ts
import { z } from 'zod';

export const contactSchema = z.object({
    name: z
        .string()
        .min(1, '請輸入您的姓名')
        .max(100, '姓名不能超過 100 字'),
    email: z
        .string()
        .email('請輸入有效的電子郵件'),
    message: z
        .string()
        .min(10, '訊息至少需要 10 個字')
        .max(2000, '訊息不能超過 2000 字'),
});

export type ContactInput = z.infer<typeof contactSchema>;
