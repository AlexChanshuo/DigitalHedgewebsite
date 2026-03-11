// src/services/telegramService.ts
import config from '../config';

/**
 * Send a message to Telegram
 * Requires TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID in environment
 */
export async function sendTelegramNotification(message: string): Promise<boolean> {
    const botToken = config.telegramBotToken;
    const chatId = config.telegramChatId;

    if (!botToken || !chatId) {
        console.log('[Telegram] Bot token or chat ID not configured, skipping notification');
        return false;
    }

    try {
        const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
        
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: chatId,
                text: message,
                parse_mode: 'HTML',
            }),
        });

        const result = await response.json();
        
        if (!result.ok) {
            console.error('[Telegram] Failed to send message:', result);
            return false;
        }

        console.log('[Telegram] Message sent successfully');
        return true;
    } catch (error) {
        console.error('[Telegram] Error sending message:', error);
        return false;
    }
}

/**
 * Format contact form submission for Telegram notification
 */
export function formatContactNotification(data: {
    name: string;
    email: string;
    message: string;
}): string {
    const timestamp = new Date().toLocaleString('zh-TW', { 
        timeZone: 'Asia/Taipei',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    });

    return `🔔 <b>新聯絡表單！</b>

📅 ${timestamp}

👤 <b>姓名：</b>${escapeHtml(data.name)}
📧 <b>Email：</b>${escapeHtml(data.email)}

💬 <b>訊息：</b>
${escapeHtml(data.message)}

---
來自 Pain Point 官網`;
}

function escapeHtml(text: string): string {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}
