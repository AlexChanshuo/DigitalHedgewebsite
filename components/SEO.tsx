import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
    type?: 'website' | 'article';
    publishedTime?: string;
    author?: string;
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
    children,
}) => {
    const siteTitle = 'Digital Hedge - AI 語音與數位轉型';
    const siteDescription = 'Digital Hedge 專注於 AI 語音技術、生成式 AI 應用與數位轉型策略，為企業提供最前沿的 AI 解決方案。';
    const siteUrl = 'https://digitalhedge.ai';
    const defaultImage = `${siteUrl}/og-image.jpg`;

    const metaTitle = title ? `${title} | Digital Hedge` : siteTitle;
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
            <meta property="og:site_name" content="Digital Hedge" />

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

            {children}
        </Helmet>
    );
};

export default SEO;
