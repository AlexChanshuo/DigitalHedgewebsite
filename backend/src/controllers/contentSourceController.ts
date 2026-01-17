// src/controllers/contentSourceController.ts
import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/database';
import { fetchAllActiveSources } from '../services/rssParserService';
import { processPendingContent, runAutoPublish, publishFetchedContent } from '../services/autoPostService';

// ==========================================
// Content Sources CRUD
// ==========================================

export async function getContentSources(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const sources = await prisma.contentSource.findMany({
            orderBy: { createdAt: 'desc' },
            include: {
                _count: { select: { fetchedItems: true } },
            },
        });

        res.json({
            success: true,
            data: sources,
        });
    } catch (error) {
        next(error);
    }
}

export async function createContentSource(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const { name, url, type, language, fetchInterval } = req.body;

        const source = await prisma.contentSource.create({
            data: {
                name,
                url,
                type: type || 'RSS',
                language: language || 'zh-TW',
                fetchInterval: fetchInterval || 60,
            },
        });

        res.status(201).json({
            success: true,
            data: source,
            message: '來源建立成功',
        });
    } catch (error) {
        next(error);
    }
}

export async function updateContentSource(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const { id } = req.params;
        const { name, url, type, language, fetchInterval, isActive } = req.body;

        const source = await prisma.contentSource.update({
            where: { id },
            data: {
                ...(name && { name }),
                ...(url && { url }),
                ...(type && { type }),
                ...(language && { language }),
                ...(fetchInterval && { fetchInterval }),
                ...(typeof isActive === 'boolean' && { isActive }),
            },
        });

        res.json({
            success: true,
            data: source,
            message: '來源更新成功',
        });
    } catch (error) {
        next(error);
    }
}

export async function deleteContentSource(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const { id } = req.params;

        await prisma.contentSource.delete({
            where: { id },
        });

        res.json({
            success: true,
            message: '來源刪除成功',
        });
    } catch (error) {
        next(error);
    }
}

// ==========================================
// Fetched Content Management
// ==========================================

export async function getFetchedContent(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const { status, page = '1', limit = '20' } = req.query;

        const where = status ? { status: status as any } : {};
        const skip = (parseInt(page as string) - 1) * parseInt(limit as string);

        const [items, total] = await Promise.all([
            prisma.fetchedContent.findMany({
                where,
                orderBy: { fetchedAt: 'desc' },
                skip,
                take: parseInt(limit as string),
                include: {
                    source: { select: { name: true } },
                },
            }),
            prisma.fetchedContent.count({ where }),
        ]);

        res.json({
            success: true,
            data: {
                items,
                pagination: {
                    page: parseInt(page as string),
                    limit: parseInt(limit as string),
                    total,
                    totalPages: Math.ceil(total / parseInt(limit as string)),
                },
            },
        });
    } catch (error) {
        next(error);
    }
}

export async function updateFetchedContentStatus(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const item = await prisma.fetchedContent.update({
            where: { id },
            data: { status },
        });

        res.json({
            success: true,
            data: item,
            message: '狀態更新成功',
        });
    } catch (error) {
        next(error);
    }
}

// ==========================================
// Actions
// ==========================================

export async function triggerFetch(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const result = await fetchAllActiveSources();

        res.json({
            success: true,
            data: result,
            message: `已抓取 ${result.fetched} 個來源，新增 ${result.newItems} 篇內容`,
        });
    } catch (error) {
        next(error);
    }
}

export async function triggerProcess(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const { limit = 5 } = req.body;
        const result = await processPendingContent(limit);

        res.json({
            success: true,
            data: result,
            message: `已處理 ${result.processed} 篇內容`,
        });
    } catch (error) {
        next(error);
    }
}

export async function triggerPublish(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const { contentId, authorId, categoryId } = req.body;

        const postId = await publishFetchedContent(contentId, authorId, categoryId);

        if (postId) {
            res.json({
                success: true,
                data: { postId },
                message: '文章發布成功',
            });
        } else {
            res.status(400).json({
                success: false,
                message: '發布失敗，請確認內容已處理完成',
            });
        }
    } catch (error) {
        next(error);
    }
}

export async function triggerAutoPublish(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const result = await runAutoPublish();

        res.json({
            success: true,
            data: result,
            message: `自動發布完成：${result.published} 篇成功，${result.errors} 篇失敗`,
        });
    } catch (error) {
        next(error);
    }
}

// ==========================================
// App Settings
// ==========================================

export async function getAppSettings(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        let settings = await prisma.appSettings.findUnique({
            where: { id: 'app_settings' },
        });

        if (!settings) {
            settings = await prisma.appSettings.create({
                data: { id: 'app_settings' },
            });
        }

        res.json({
            success: true,
            data: settings,
        });
    } catch (error) {
        next(error);
    }
}

export async function updateAppSettings(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const { autoPublish, autoPublishHour, postsPerDay, defaultCategoryId, defaultAuthorId } = req.body;

        const settings = await prisma.appSettings.upsert({
            where: { id: 'app_settings' },
            update: {
                ...(typeof autoPublish === 'boolean' && { autoPublish }),
                ...(autoPublishHour !== undefined && { autoPublishHour }),
                ...(postsPerDay !== undefined && { postsPerDay }),
                ...(defaultCategoryId !== undefined && { defaultCategoryId }),
                ...(defaultAuthorId !== undefined && { defaultAuthorId }),
            },
            create: {
                id: 'app_settings',
                autoPublish: autoPublish ?? false,
                autoPublishHour: autoPublishHour ?? 9,
                postsPerDay: postsPerDay ?? 2,
                defaultCategoryId,
                defaultAuthorId,
            },
        });

        res.json({
            success: true,
            data: settings,
            message: '設定更新成功',
        });
    } catch (error) {
        next(error);
    }
}
