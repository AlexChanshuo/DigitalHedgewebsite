import { Request, Response } from 'express';
import { prisma } from '../config/database';
import RSS from 'rss';

const SITE_URL = 'https://digitalhedge.ai';

export async function generateSitemap(req: Request, res: Response) {
    try {
        const posts = await prisma.post.findMany({
            where: { status: 'PUBLISHED' },
            select: { slug: true, updatedAt: true },
            orderBy: { updatedAt: 'desc' },
        });

        let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE_URL}</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${SITE_URL}/blog</loc>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${SITE_URL}/voice-of-choice</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${SITE_URL}/voice-survey</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${SITE_URL}/sales-ai</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
`;

        posts.forEach(post => {
            sitemap += `  <url>
    <loc>${SITE_URL}/blog/${post.slug}</loc>
    <lastmod>${post.updatedAt.toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>
`;
        });

        sitemap += '</urlset>';

        res.header('Content-Type', 'application/xml');
        res.send(sitemap);
    } catch (error) {
        console.error('Sitemap generation error:', error);
        res.status(500).send('Error generating sitemap');
    }
}

export async function generateRSS(req: Request, res: Response) {
    try {
        const posts = await prisma.post.findMany({
            where: { status: 'PUBLISHED' },
            include: {
                author: { select: { name: true, email: true } },
                category: { select: { name: true } },
            },
            orderBy: { publishedAt: 'desc' },
            take: 20,
        });

        const feed = new RSS({
            title: "Digital Hedge - AI 技術部落格",
            description: "探索 AI 語音技術、生成式 AI 應用與數位轉型策略",
            feed_url: `${SITE_URL}/api/seo/rss`,
            site_url: SITE_URL,
            image_url: `${SITE_URL}/icon.png`,
            language: 'zh-TW',
            pubDate: new Date(),
            ttl: 60,
        });

        posts.forEach(post => {
            feed.item({
                title: post.title,
                description: post.excerpt || post.content.substring(0, 150) + '...',
                url: `${SITE_URL}/blog/${post.slug}`,
                guid: post.id,
                author: post.author.name || 'Digital Hedge Team',
                date: post.publishedAt || new Date(),
                categories: [post.category.name],
            });
        });

        res.header('Content-Type', 'application/xml');
        res.send(feed.xml());
    } catch (error) {
        console.error('RSS generation error:', error);
        res.status(500).send('Error generating RSS feed');
    }
}
