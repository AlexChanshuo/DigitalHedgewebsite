// src/controllers/contactController.ts
import { Request, Response, NextFunction } from 'express';
import { sendContactNotification } from '../services/emailService';
import { contactSchema } from '../validators/contact.schema';

export async function submitContact(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const validatedData = contactSchema.parse(req.body);

        const { name, email, message } = validatedData;

        // Send email notification to the designated email
        const emailSent = await sendContactNotification({
            name,
            email,
            message,
        });

        if (!emailSent) {
            return res.status(500).json({
                success: false,
                message: '郵件發送失敗，請稍後再試',
            });
        }

        res.status(200).json({
            success: true,
            message: '感謝您的訊息，我們會盡快與您聯繫！',
        });
    } catch (error) {
        next(error);
    }
}
