
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import VoiceOfChoice from './pages/VoiceOfChoice';
import VoiceSurvey from './pages/VoiceSurvey';
import SalesAI from './pages/SalesAI';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BackgroundEffects from './components/BackgroundEffects';
import ConstructionOverlay from './components/ConstructionOverlay';

export type Page = 'home' | 'voice-of-choice' | 'voice-survey' | 'sales-ai';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [showConstruction, setShowConstruction] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case 'voice-of-choice': return <VoiceOfChoice onBack={() => setCurrentPage('home')} />;
      case 'sales-ai': return <SalesAI onBack={() => setCurrentPage('home')} />;
      case 'voice-survey': return <VoiceSurvey onBack={() => setCurrentPage('home')} />;
      default: return <Home onNavigate={setCurrentPage} onOpenDemo={() => setShowConstruction(true)} />;
    }
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden text-[#2C2420] bg-[#FAF9F6] selection:bg-[#D4A373] selection:text-white">
      <BackgroundEffects />
      <Navbar 
        isScrolled={isScrolled} 
        currentPage={currentPage} 
        onNavigate={setCurrentPage}
        onOpenConsulting={() => setShowConstruction(true)}
      />
      
      <main className="transition-opacity duration-500 pt-20">
        {renderPage()}
        {currentPage === 'home' && <Contact onOpenChat={() => setShowConstruction(true)} />}
      </main>
      
      <Footer />

      {showConstruction && (
        <ConstructionOverlay onClose={() => setShowConstruction(false)} />
      )}
    </div>
  );
};

export default App;
