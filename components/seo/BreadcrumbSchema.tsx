import React from 'react';

interface BreadcrumbItem {
  name: string;
  url?: string; // Omit for current page (last item)
}

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[];
}

const SITE_URL = 'https://digitalhedge.ai';

const BreadcrumbSchema: React.FC<BreadcrumbSchemaProps> = ({ items }) => {
  // BreadcrumbList requires at least 2 items
  if (items.length < 2) return null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      // Include "item" URL for all except the last item (current page)
      ...(item.url && { "item": `${SITE_URL}${item.url}` })
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};

export default BreadcrumbSchema;
