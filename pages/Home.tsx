
import React from 'react';
import Hero from '../components/Hero';
import Vision from '../components/Vision';
import ProductPillars from '../components/ProductPillars';
import ServiceValue from '../components/ServiceValue';
import { Page } from '../App';

interface HomeProps {
  onNavigate: (page: Page) => void;
  onOpenDemo: () => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate, onOpenDemo }) => {
  return (
    <>
      <Hero onOpenDemo={onOpenDemo} />
      <Vision />
      <ProductPillars onNavigate={onNavigate} />
      <ServiceValue />
    </>
  );
};

export default Home;
