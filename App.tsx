import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import VoiceOfChoice from './pages/VoiceOfChoice';
import VoiceSurvey from './pages/VoiceSurvey';
import SalesAI from './pages/SalesAI';
import Login from './pages/Login';
import Admin from './pages/Admin';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BackgroundEffects from './components/BackgroundEffects';
import ConstructionOverlay from './components/ConstructionOverlay';

export type Page = 'home' | 'voice-of-choice' | 'voice-survey' | 'sales-ai' | 'login' | 'admin';

const AppContent: React.FC = () => {
  const { isAuthenticated, isLoading, logout } = useAuth();
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [showConstruction, setShowConstruction] = useState(false);

  // Check URL on mount for direct navigation
  useEffect(() => {
    const path = window.location.pathname;
    if (path === '/login') {
      setCurrentPage('login');
    } else if (path === '/admin' || path.startsWith('/admin/')) {
      setCurrentPage('admin');
    }
  }, []);

  // Update URL when page changes
  useEffect(() => {
    let path = '/';
    if (currentPage === 'login') path = '/login';
    else if (currentPage === 'admin') path = '/admin';
    else if (currentPage === 'voice-of-choice') path = '/voice-of-choice';
    else if (currentPage === 'voice-survey') path = '/voice-survey';
    else if (currentPage === 'sales-ai') path = '/sales-ai';
    
    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path);
    }
  }, [currentPage]);

  // Handle browser back/forward
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path === '/login') setCurrentPage('login');
      else if (path === '/admin' || path.startsWith('/admin/')) setCurrentPage('admin');
      else if (path === '/voice-of-choice') setCurrentPage('voice-of-choice');
      else if (path === '/voice-survey') setCurrentPage('voice-survey');
      else if (path === '/sales-ai') setCurrentPage('sales-ai');
      else setCurrentPage('home');
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  // Redirect to login if accessing admin without auth
  useEffect(() => {
    if (!isLoading && currentPage === 'admin' && !isAuthenticated) {
      setCurrentPage('login');
    }
  }, [isLoading, isAuthenticated, currentPage]);

  // Show loading while checking auth
  if (isLoading && (currentPage === 'admin' || currentPage === 'login')) {
    return (
      <div className="min-h-screen bg-[#FAF9F6] flex items-center justify-center">
        <div className="text-[#2C2420]/50">載入中...</div>
      </div>
    );
  }

  // Login page
  if (currentPage === 'login') {
    return (
      <Login
        onSuccess={() => setCurrentPage('admin')}
        onBack={() => setCurrentPage('home')}
      />
    );
  }

  // Admin page
  if (currentPage === 'admin') {
    if (!isAuthenticated) {
      setCurrentPage('login');
      return null;
    }
    return (
      <Admin
        onLogout={async () => {
          await logout();
          setCurrentPage('home');
        }}
        onBackToSite={() => setCurrentPage('home')}
      />
    );
  }

  // Public pages
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

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;
