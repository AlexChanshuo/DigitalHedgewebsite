// src/services/aiContentService.ts
import { prisma } from '../config/database';
import { config } from '../config';

const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

interface GeneratedContent {
    title: string;
    content: string;
    excerpt: string;
}

/**
 * Generate unique blog content from fetched articles using GPT
 * Combines and restructures content to avoid duplication
 */
export async function generateBlogContent(
    fetchedContentIds: string[]
): Promise<GeneratedContent | null> {
    const items = await prisma.fetchedContent.findMany({
        where: { id: { in: fetchedContentIds } },
        include: { source: true },
    });

    if (items.length === 0) return null;

    // Combine content from multiple sources
    const sourceContents = items.map(item => ({
        title: item.originalTitle,
        content: item.originalContent.substring(0, 2000), // Limit for tokens
        source: item.source.name,
    }));

    const prompt = buildPrompt(sourceContents);

    try {
        const response = await fetch(OPENAI_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${config.openai.apiKey}`,
            },
            body: JSON.stringify({
                model: 'gpt-4o-mini',
                messages: [
                    {
                        role: 'system',
                        content: `你是 Digital Hedge 的 AI 技術編輯。你的任務是將多篇 AI 相關新聞/文章整合成一篇原創的繁體中文部落格文章。

要求：
1. 使用繁體中文撰寫
2. 內容必須是原創的，不能直接複製原文
3. 將多個來源的資訊整合並重新組織
4. 加入專業分析和見解
5. 使用適合 SEO 的標題和結構
6. 文章風格要專業但易讀
7. 必須產生 Markdown 格式
8. 文章長度約 800-1200 字`,
                    },
                    {
                        role: 'user',
                        content: prompt,
                    },
                ],
                temperature: 0.7,
                max_tokens: 2000,
            }),
        });

        if (!response.ok) {
            console.error('OpenAI API error:', response.status);
            return null;
        }

        const data = await response.json();
        const generatedText = (data as any).choices?.[0]?.message?.content;

        if (!generatedText) return null;

        return parseGeneratedContent(generatedText);
    } catch (error) {
        console.error('Error generating content:', error);
        return null;
    }
}

function buildPrompt(sources: { title: string; content: string; source: string }[]): string {
    let prompt = '請根據以下 AI 相關新聞/文章，撰寫一篇原創的繁體中文部落格文章：\n\n';

    for (const source of sources) {
        prompt += `【來源：${source.source}】\n`;
        prompt += `標題：${source.title}\n`;
        prompt += `內容：${source.content}\n\n`;
    }

    prompt += `
請按以下格式輸出：
---
標題：[SEO 友善的繁體中文標題]
摘要：[100-150 字的摘要]
---
[Markdown 格式的文章內容，包含適當的標題層級和段落]
`;

    return prompt;
}

function parseGeneratedContent(text: string): GeneratedContent {
    let title = '';
    let excerpt = '';
    let content = '';

    // Extract title
    const titleMatch = text.match(/標題[：:]\s*([^\n]+)/);
    if (titleMatch) {
        title = titleMatch[1].trim();
    }

    // Extract excerpt
    const excerptMatch = text.match(/摘要[：:]\s*([^\n]+(?:\n(?!---)[^\n]+)*)/);
    if (excerptMatch) {
        excerpt = excerptMatch[1].trim();
    }

    // Extract content (everything after the second ---)
    const contentMatch = text.match(/---[\s\S]*?---\s*([\s\S]+)/);
    if (contentMatch) {
        content = contentMatch[1].trim();
    } else {
        // Fallback: use everything after excerpt
        const parts = text.split('---');
        if (parts.length >= 2) {
            content = parts[parts.length - 1].trim();
        } else {
            content = text;
        }
    }

    // Fallback title
    if (!title) {
        const firstLine = content.split('\n')[0];
        title = firstLine.replace(/^#+\s*/, '').trim() || 'AI 產業最新動態';
    }

    // Fallback excerpt
    if (!excerpt) {
        excerpt = content.substring(0, 150).replace(/\n/g, ' ') + '...';
    }

    return { title, content, excerpt };
}

/**
 * Process a single fetched content item with AI
 */
export async function processFetchedContent(contentId: string): Promise<boolean> {
    const item = await prisma.fetchedContent.findUnique({
        where: { id: contentId },
        include: { source: true },
    });

    if (!item) return false;

    // Update status to processing
    await prisma.fetchedContent.update({
        where: { id: contentId },
        data: { status: 'PROCESSING' },
    });

    const generated = await generateBlogContent([contentId]);

    if (!generated) {
        await prisma.fetchedContent.update({
            where: { id: contentId },
            data: { status: 'PENDING' },
        });
        return false;
    }

    await prisma.fetchedContent.update({
        where: { id: contentId },
        data: {
            generatedTitle: generated.title,
            generatedContent: generated.content,
            generatedExcerpt: generated.excerpt,
            status: 'APPROVED',
            processedAt: new Date(),
        },
    });

    return true;
}

/**
 * Process multiple items and combine them into one article
 */
export async function processAndCombineContent(contentIds: string[]): Promise<string | null> {
    // Update all to processing
    await prisma.fetchedContent.updateMany({
        where: { id: { in: contentIds } },
        data: { status: 'PROCESSING' },
    });

    const generated = await generateBlogContent(contentIds);

    if (!generated) {
        await prisma.fetchedContent.updateMany({
            where: { id: { in: contentIds } },
            data: { status: 'PENDING' },
        });
        return null;
    }

    // Store generated content in the first item
    const primaryId = contentIds[0];
    await prisma.fetchedContent.update({
        where: { id: primaryId },
        data: {
            generatedTitle: generated.title,
            generatedContent: generated.content,
            generatedExcerpt: generated.excerpt,
            status: 'APPROVED',
            processedAt: new Date(),
        },
    });

    // Mark others as processed but linked
    for (const id of contentIds.slice(1)) {
        await prisma.fetchedContent.update({
            where: { id },
            data: {
                status: 'PUBLISHED', // Mark as used
                processedAt: new Date(),
            },
        });
    }

    return primaryId;
}
