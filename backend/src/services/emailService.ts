// src/services/emailService.ts
import { Resend } from 'resend';
import { config } from '../config';

const resend = new Resend(config.email.apiKey);

export async function sendPasswordResetEmail(
  to: string,
  resetToken: string
): Promise<boolean> {
  const resetUrl = `${config.frontendUrl}/reset-password?token=${resetToken}`;
  
  try {
    await resend.emails.send({
      from: config.email.from,
      to,
      subject: '【Digital Hedge】密碼重設請求',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: 'Microsoft JhengHei', sans-serif; line-height: 1.6; color: #2C2420; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { text-align: center; padding: 20px 0; border-bottom: 2px solid #D4A373; }
            .logo { font-size: 24px; font-weight: bold; color: #2C2420; }
            .content { padding: 30px 0; }
            .button { display: inline-block; padding: 14px 28px; background: #D4A373; color: #fff !important; text-decoration: none; border-radius: 8px; font-weight: bold; }
            .footer { text-align: center; padding: 20px 0; border-top: 1px solid #E0E0E0; color: #888; font-size: 12px; }
            .warning { background: #FFF3E0; padding: 15px; border-radius: 8px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">DIGITAL HEDGE</div>
            </div>
            <div class="content">
              <h2>密碼重設請求</h2>
              <p>您好，</p>
              <p>我們收到了您的密碼重設請求。請點擊下方按鈕重設您的密碼：</p>
              <p style="text-align: center; margin: 30px 0;">
                <a href="${resetUrl}" class="button">重設密碼</a>
              </p>
              <div class="warning">
                <strong>⚠️ 安全提醒：</strong>
                <ul>
                  <li>此連結將於 1 小時後失效</li>
                  <li>如果您沒有請求重設密碼，請忽略此郵件</li>
                  <li>請勿將此連結分享給他人</li>
                </ul>
              </div>
              <p>如果按鈕無法點擊，請複製以下連結到瀏覽器：</p>
              <p style="word-break: break-all; color: #666; font-size: 12px;">${resetUrl}</p>
            </div>
            <div class="footer">
              <p>© ${new Date().getFullYear()} Digital Hedge Co., Ltd.</p>
              <p>此為系統自動發送郵件，請勿直接回覆</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });
    return true;
  } catch (error) {
    console.error('Email sending failed:', error);
    return false;
  }
}

export async function sendWelcomeEmail(
  to: string,
  name: string
): Promise<boolean> {
  try {
    await resend.emails.send({
      from: config.email.from,
      to,
      subject: '【Digital Hedge】歡迎加入',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: 'Microsoft JhengHei', sans-serif; line-height: 1.6; color: #2C2420; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { text-align: center; padding: 20px 0; border-bottom: 2px solid #D4A373; }
            .logo { font-size: 24px; font-weight: bold; color: #2C2420; }
            .content { padding: 30px 0; }
            .button { display: inline-block; padding: 14px 28px; background: #D4A373; color: #fff !important; text-decoration: none; border-radius: 8px; font-weight: bold; }
            .footer { text-align: center; padding: 20px 0; border-top: 1px solid #E0E0E0; color: #888; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">DIGITAL HEDGE</div>
            </div>
            <div class="content">
              <h2>歡迎加入 Digital Hedge！</h2>
              <p>親愛的 ${name}，</p>
              <p>感謝您加入 Digital Hedge。您的帳號已成功建立。</p>
              <p style="text-align: center; margin: 30px 0;">
                <a href="${config.frontendUrl}/login" class="button">立即登入</a>
              </p>
            </div>
            <div class="footer">
              <p>© ${new Date().getFullYear()} Digital Hedge Co., Ltd.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });
    return true;
  } catch (error) {
    console.error('Email sending failed:', error);
    return false;
  }
}
