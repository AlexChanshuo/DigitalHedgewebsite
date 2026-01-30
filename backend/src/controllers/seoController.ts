import { Request, Response } from 'express';
import { prisma } from '../config/database';
import { Feed } from 'feed';

const SITE_URL = 'https://painpoint.tech';

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
  <url>
    <loc>${SITE_URL}/cognitive-hedge</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${SITE_URL}/industry-voice</loc>
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
      title: "痛點科技 Pain Point Technologies - AI 技術部落格",
      description: "探索 AI 語音技術、生成式 AI 應用與數位轉型策略",
      id: `${SITE_URL}/`,
      link: `${SITE_URL}/`,
      language: "zh-TW",
      image: `${SITE_URL}/icon.png`,
      favicon: `${SITE_URL}/favicon.ico`,
      copyright: `All rights reserved ${new Date().getFullYear()}, Pain Point Technologies 痛點科技`,
      updated: new Date(),
      generator: "Pain Point Technologies Feed",
      feedLinks: {
        rss2: `${SITE_URL}/api/seo/rss`
      },
      author: {
        name: "Alex Ma",
        email: "alexma@goldenraintree.tw",
        link: SITE_URL
      }
    });

    posts.forEach(post => {
      feed.addItem({
        title: post.title,
        id: post.slug,
        link: `${SITE_URL}/blog/${post.slug}`,
        description: post.excerpt || post.content.substring(0, 150) + '...',
        content: post.content,
        author: [
          {
            name: post.author.name || 'Pain Point Technologies Team',
            email: post.author.email || undefined,
            link: SITE_URL
          }
        ],
        date: post.publishedAt || new Date(),
        image: `${SITE_URL}/icon.png`, // Optional: use post image if available
        category: [{ name: post.category.name }]
      });
    });

    res.header('Content-Type', 'application/xml');
    res.send(feed.rss2());
  } catch (error) {
    console.error('RSS generation error:', error);
    res.status(500).send('Error generating RSS feed');
  }
}
