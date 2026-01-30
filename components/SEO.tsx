import React from 'react';
import { Helmet } from 'react-helmet-async';

interface HreflangConfig {
    enabled: boolean;
    languages?: Array<{
        lang: string;    // e.g., 'zh-TW', 'en'
        url: string;     // Full URL or path
    }>;
}

interface SEOProps {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
    type?: 'website' | 'article';
    publishedTime?: string;
    author?: string;
    hreflang?: HreflangConfig;
    children?: React.ReactNode;
}

const SEO: React.FC<SEOProps> = ({
    title,
    description,
    image,
    url,
    type = 'website',
    publishedTime,
    author,
    hreflang,
    children,
}) => {
    const siteTitle = 'Pain Point Technologies | 痛點科技 - AI 語音與數位轉型';
    const siteDescription = '痛點科技 (Pain Point Technologies) 專注於 AI 語音技術、生成式 AI 應用與數位轉型策略，為企業提供最前沿的 AI 解決方案。';
    const siteUrl = 'https://painpoint.tech';
    const defaultImage = `${siteUrl}/og-image.jpg`;

    const metaTitle = title ? `${title} | 痛點科技` : siteTitle;
    const metaDescription = description || siteDescription;
    const metaImage = image || defaultImage;
    const metaUrl = url ? `${siteUrl}${url}` : siteUrl;

    return (
        <Helmet>
            {/* Basic Meta Tags */}
            <title>{metaTitle}</title>
            <meta name="description" content={metaDescription} />
            <link rel="canonical" href={metaUrl} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:title" content={metaTitle} />
            <meta property="og:description" content={metaDescription} />
            <meta property="og:url" content={metaUrl} />
            <meta property="og:image" content={metaImage} />
            <meta property="og:site_name" content="痛點科技 Pain Point Technologies" />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={metaTitle} />
            <meta name="twitter:description" content={metaDescription} />
            <meta name="twitter:image" content={metaImage} />

            {/* Article Specific */}
            {type === 'article' && publishedTime && (
                <meta property="article:published_time" content={publishedTime} />
            )}
            {type === 'article' && author && (
                <meta property="article:author" content={author} />
            )}

            {/* hreflang tags for bilingual content */}
            {hreflang?.enabled && (
                <>
                    {/* Self-referencing and alternate languages */}
                    {hreflang.languages?.map((lang) => (
                        <link
                            key={lang.lang}
                            rel="alternate"
                            hrefLang={lang.lang}
                            href={lang.url.startsWith('http') ? lang.url : `${siteUrl}${lang.url}`}
                        />
                    ))}
                    {/* x-default fallback - use current URL */}
                    <link
                        rel="alternate"
                        hrefLang="x-default"
                        href={metaUrl}
                    />
                </>
            )}

            {children}
        </Helmet>
    );
};

export default SEO;
