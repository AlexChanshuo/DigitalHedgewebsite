// src/services/rssParserService.ts
import { prisma } from '../config/database';

interface RSSItem {
    title: string;
    link: string;
    content: string;
    excerpt?: string;
    pubDate?: Date;
}

interface RSSFeed {
    title: string;
    items: RSSItem[];
}

/**
 * Parse RSS/Atom feed from URL
 */
export async function parseRSSFeed(url: string): Promise<RSSFeed | null> {
    try {
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'Digital Hedge AI Bot/1.0',
                'Accept': 'application/rss+xml, application/atom+xml, application/xml, text/xml',
            },
        });

        if (!response.ok) {
            console.error(`Failed to fetch RSS feed: ${response.status}`);
            return null;
        }

        const text = await response.text();
        return parseXML(text);
    } catch (error) {
        console.error('Error fetching RSS feed:', error);
        return null;
    }
}

/**
 * Simple XML parser for RSS/Atom feeds
 */
function parseXML(xml: string): RSSFeed {
    const items: RSSItem[] = [];
    let feedTitle = '';

    // Extract feed title
    const titleMatch = xml.match(/<title[^>]*>([^<]+)<\/title>/);
    if (titleMatch) {
        feedTitle = decodeHTMLEntities(titleMatch[1]);
    }

    // Try RSS 2.0 format first
    const rssItems = xml.match(/<item>([\s\S]*?)<\/item>/g);
    if (rssItems) {
        for (const item of rssItems) {
            const parsed = parseRSSItem(item);
            if (parsed) items.push(parsed);
        }
    }

    // Try Atom format
    const atomEntries = xml.match(/<entry>([\s\S]*?)<\/entry>/g);
    if (atomEntries && items.length === 0) {
        for (const entry of atomEntries) {
            const parsed = parseAtomEntry(entry);
            if (parsed) items.push(parsed);
        }
    }

    return { title: feedTitle, items };
}

function parseRSSItem(item: string): RSSItem | null {
    const title = extractTag(item, 'title');
    const link = extractTag(item, 'link') || extractTag(item, 'guid');
    const content = extractTag(item, 'content:encoded') ||
        extractTag(item, 'description') || '';
    const excerpt = extractTag(item, 'description');
    const pubDateStr = extractTag(item, 'pubDate');

    if (!title || !link) return null;

    return {
        title: decodeHTMLEntities(title),
        link: link.trim(),
        content: stripHTML(decodeHTMLEntities(content)),
        excerpt: excerpt ? stripHTML(decodeHTMLEntities(excerpt)).substring(0, 300) : undefined,
        pubDate: pubDateStr ? new Date(pubDateStr) : undefined,
    };
}

function parseAtomEntry(entry: string): RSSItem | null {
    const title = extractTag(entry, 'title');
    const linkMatch = entry.match(/<link[^>]*href=["']([^"']+)["'][^>]*\/?>/) ||
        entry.match(/<link[^>]*>([^<]+)<\/link>/);
    const link = linkMatch ? linkMatch[1] : null;
    const content = extractTag(entry, 'content') ||
        extractTag(entry, 'summary') || '';
    const excerpt = extractTag(entry, 'summary');
    const pubDateStr = extractTag(entry, 'published') || extractTag(entry, 'updated');

    if (!title || !link) return null;

    return {
        title: decodeHTMLEntities(title),
        link: link.trim(),
        content: stripHTML(decodeHTMLEntities(content)),
        excerpt: excerpt ? stripHTML(decodeHTMLEntities(excerpt)).substring(0, 300) : undefined,
        pubDate: pubDateStr ? new Date(pubDateStr) : undefined,
    };
}

function extractTag(xml: string, tag: string): string | null {
    // Handle CDATA
    const cdataMatch = xml.match(new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>`, 'i'));
    if (cdataMatch) return cdataMatch[1];

    // Handle regular content
    const match = xml.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'i'));
    return match ? match[1] : null;
}

function decodeHTMLEntities(text: string): string {
    return text
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&nbsp;/g, ' ');
}

function stripHTML(html: string): string {
    return html
        .replace(/<[^>]+>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}

/**
 * Fetch content from all active sources
 */
export async function fetchAllActiveSources(): Promise<{
    fetched: number;
    newItems: number;
    errors: number;
}> {
    const sources = await prisma.contentSource.findMany({
        where: { isActive: true },
    });

    let fetched = 0;
    let newItems = 0;
    let errors = 0;

    for (const source of sources) {
        if (source.type !== 'RSS') continue; // Only RSS for now

        try {
            const feed = await parseRSSFeed(source.url);
            if (!feed) {
                errors++;
                continue;
            }

            fetched++;

            for (const item of feed.items.slice(0, 10)) { // Limit to 10 items per source
                // Check if already exists
                const existing = await prisma.fetchedContent.findUnique({
                    where: { originalUrl: item.link },
                });

                if (!existing) {
                    await prisma.fetchedContent.create({
                        data: {
                            sourceId: source.id,
                            originalUrl: item.link,
                            originalTitle: item.title,
                            originalContent: item.content,
                            originalExcerpt: item.excerpt,
                            publishedAt: item.pubDate,
                            status: 'PENDING',
                        },
                    });
                    newItems++;
                }
            }

            // Update last fetched time
            await prisma.contentSource.update({
                where: { id: source.id },
                data: { lastFetched: new Date() },
            });
        } catch (error) {
            console.error(`Error fetching source ${source.name}:`, error);
            errors++;
        }
    }

    return { fetched, newItems, errors };
}
