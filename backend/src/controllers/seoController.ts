import { Request, Response } from 'express';
import { prisma } from '../config/database';
import { Feed } from 'feed';

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

        const feed = new Feed({
            title: "Digital Hedge - AI 技術部落格",
            description: "探索 AI 語音技術、生成式 AI 應用與數位轉型策略",
            id: SITE_URL,
            link: SITE_URL,
            language: "zh-TW",
            image: `${SITE_URL}/icon.png`,
            favicon: `${SITE_URL}/favicon.ico`,
            copyright: `All rights reserved ${new Date().getFullYear()}, Digital Hedge`,
            updated: posts.length > 0 ? posts[0].publishedAt || new Date() : new Date(),
            generator: "Digital Hedge Feed Generator",
            feedLinks: {
                rss: `${SITE_URL}/api/seo/rss`,
                atom: `${SITE_URL}/api/seo/atom`,
            },
            author: {
                name: "Digital Hedge",
                email: "contact@digitalhedge.ai",
                link: SITE_URL,
            },
        });

        posts.forEach(post => {
            feed.addItem({
                title: post.title,
                id: `${SITE_URL}/blog/${post.slug}`,
                link: `${SITE_URL}/blog/${post.slug}`,
                description: post.excerpt || post.content.substring(0, 150) + '...',
                content: post.content, // Ideally render markdown to HTML here if possible, but raw is okay for now or use excerpt
                author: [
                    {
                        name: post.author.name || 'Digital Hedge Team',
                        email: post.author.email,
                    },
                ],
                date: post.publishedAt || new Date(),
                image: post.coverImage || undefined,
                category: [{ name: post.category.name }],
            });
        });

        res.header('Content-Type', 'application/xml');
        res.send(feed.rss2());
    } catch (error) {
        console.error('RSS generation error:', error);
        res.status(500).send('Error generating RSS feed');
    }
}
