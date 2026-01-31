
import React from 'react';
import Hero from '../components/Hero';
import SEO from '../components/SEO';
import Vision from '../components/Vision';
import ProductPillars from '../components/ProductPillars';
import ServiceValue from '../components/ServiceValue';
import { Page } from '../App';

interface HomeProps {
  onNavigate: (page: Page) => void;
  onOpenDemo: () => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate, onOpenDemo }) => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Pain Point Technologies 痛點科技",
    "url": "https://painpoint.tech",
    "logo": "https://painpoint.tech/icon.png",
    "sameAs": [
      "https://twitter.com/painpointtech",
      "https://linkedin.com/company/painpointtech"
    ],
    "description": "痛點科技 (Pain Point Technologies) 專注於 AI 語音技術、生成式 AI 應用與數位轉型策略，為企業提供最前沿的 AI 解決方案。"
  };

  return (
    <>
      <SEO />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Hero onOpenDemo={onOpenDemo} />
      <Vision />
      <ProductPillars onNavigate={onNavigate} />
      <ServiceValue />
    </>
  );
};

export default Home;
