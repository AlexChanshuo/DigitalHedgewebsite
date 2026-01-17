// src/services/autoPostService.ts
import { prisma } from '../config/database';
import { generateBlogContent } from './aiContentService';
import { generateSlug } from '../utils/slug';

/**
 * Publish approved content as a blog post
 */
export async function publishFetchedContent(
    fetchedContentId: string,
    authorId: string,
    categoryId: string
): Promise<string | null> {
    const item = await prisma.fetchedContent.findUnique({
        where: { id: fetchedContentId },
    });

    if (!item || !item.generatedContent) {
        console.error('Content not found or not processed');
        return null;
    }

    const title = item.generatedTitle || item.originalTitle;
    const slug = generateSlug(title);

    try {
        const post = await prisma.post.create({
            data: {
                title,
                slug,
                excerpt: item.generatedExcerpt || item.originalExcerpt,
                content: item.generatedContent,
                status: 'PUBLISHED',
                publishedAt: new Date(),
                authorId,
                categoryId,
                // Add SEO structured data
                structuredData: {
                    '@context': 'https://schema.org',
                    '@type': 'BlogPosting',
                    headline: title,
                    description: item.generatedExcerpt,
                    datePublished: new Date().toISOString(),
                    author: {
                        '@type': 'Organization',
                        name: 'Digital Hedge',
                    },
                },
            },
        });

        // Update fetched content status
        await prisma.fetchedContent.update({
            where: { id: fetchedContentId },
            data: {
                status: 'PUBLISHED',
                postId: post.id,
            },
        });

        return post.id;
    } catch (error: any) {
        // Handle duplicate slug
        if (error.code === 'P2002') {
            const newSlug = `${slug}-${Date.now()}`;
            const post = await prisma.post.create({
                data: {
                    title,
                    slug: newSlug,
                    excerpt: item.generatedExcerpt || item.originalExcerpt,
                    content: item.generatedContent,
                    status: 'PUBLISHED',
                    publishedAt: new Date(),
                    authorId,
                    categoryId,
                },
            });

            await prisma.fetchedContent.update({
                where: { id: fetchedContentId },
                data: {
                    status: 'PUBLISHED',
                    postId: post.id,
                },
            });

            return post.id;
        }
        console.error('Error publishing content:', error);
        return null;
    }
}

/**
 * Auto-publish content based on settings
 * Called by cron job
 */
export async function runAutoPublish(): Promise<{
    published: number;
    errors: number;
}> {
    // Get app settings
    let settings = await prisma.appSettings.findUnique({
        where: { id: 'app_settings' },
    });

    if (!settings) {
        // Create default settings
        settings = await prisma.appSettings.create({
            data: { id: 'app_settings' },
        });
    }

    if (!settings.autoPublish) {
        console.log('Auto-publish is disabled');
        return { published: 0, errors: 0 };
    }

    const authorId = settings.defaultAuthorId;
    const categoryId = settings.defaultCategoryId;

    if (!authorId || !categoryId) {
        console.error('Default author or category not set');
        return { published: 0, errors: 0 };
    }

    // Get approved content ready to publish
    const approvedContent = await prisma.fetchedContent.findMany({
        where: { status: 'APPROVED' },
        orderBy: { processedAt: 'asc' },
        take: settings.postsPerDay,
    });

    let published = 0;
    let errors = 0;

    for (const content of approvedContent) {
        const postId = await publishFetchedContent(content.id, authorId, categoryId);
        if (postId) {
            published++;
            console.log(`Published: ${content.generatedTitle}`);
        } else {
            errors++;
        }
    }

    return { published, errors };
}

/**
 * Process pending content with AI
 */
export async function processPendingContent(limit: number = 5): Promise<{
    processed: number;
    errors: number;
}> {
    const pendingItems = await prisma.fetchedContent.findMany({
        where: { status: 'PENDING' },
        orderBy: { fetchedAt: 'asc' },
        take: limit,
    });

    let processed = 0;
    let errors = 0;

    for (const item of pendingItems) {
        await prisma.fetchedContent.update({
            where: { id: item.id },
            data: { status: 'PROCESSING' },
        });

        const generated = await generateBlogContent([item.id]);

        if (generated) {
            await prisma.fetchedContent.update({
                where: { id: item.id },
                data: {
                    generatedTitle: generated.title,
                    generatedContent: generated.content,
                    generatedExcerpt: generated.excerpt,
                    status: 'APPROVED',
                    processedAt: new Date(),
                },
            });
            processed++;
        } else {
            await prisma.fetchedContent.update({
                where: { id: item.id },
                data: { status: 'PENDING' },
            });
            errors++;
        }
    }

    return { processed, errors };
}
