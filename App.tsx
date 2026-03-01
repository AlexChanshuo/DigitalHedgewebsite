import React, { useState, useEffect, useRef, useCallback } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import VoiceAI from './pages/VoiceAI';
import AgenticWorkforce from './pages/AgenticWorkforce';
import AgenticImpact from './pages/AgenticImpact';
import Team from './pages/Team';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Login from './pages/Login';
import Admin from './pages/Admin';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BackgroundEffects from './components/BackgroundEffects';
import ConstructionOverlay from './components/ConstructionOverlay';
import RetellVoiceAgent, { RetellVoiceAgentHandle } from './components/voice/RetellVoiceAgent';

export type Page = 'home' | 'voice-ai' | 'agentic-workforce' | 'agentic-impact' | 'team' | 'privacy' | 'terms' | 'blog' | 'blog-post' | 'login' | 'admin';

const AppContent: React.FC = () => {
  const { isAuthenticated, isLoading, logout } = useAuth();
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [currentBlogSlug, setCurrentBlogSlug] = useState<string>('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [showConstruction, setShowConstruction] = useState(false);

  // Ref to RetellVoiceAgent for programmatic triggering
  const voiceAgentRef = useRef<RetellVoiceAgentHandle>(null);

  // Handler to open voice chat from anywhere in the app
  const openVoiceChat = useCallback(() => {
    voiceAgentRef.current?.openVoiceChat();
  }, []);

  // Check URL on mount for direct navigation
  useEffect(() => {
    const path = window.location.pathname;
    if (path === '/login') {
      setCurrentPage('login');
    } else if (path === '/admin' || path.startsWith('/admin/')) {
      setCurrentPage('admin');
    } else if (path === '/blog' || path.startsWith('/blog/category/') || path.startsWith('/blog/tag/')) {
      setCurrentPage('blog');
    } else if (path.startsWith('/blog/')) {
      // Only treat as blog post if not a filter URL
      const slug = path.replace('/blog/', '');
      if (!slug.startsWith('category/') && !slug.startsWith('tag/')) {
        setCurrentBlogSlug(slug);
        setCurrentPage('blog-post');
      }
    } else if (path === '/voice-ai') {
      setCurrentPage('voice-ai');
    } else if (path === '/agentic-workforce') {
      setCurrentPage('agentic-workforce');
    } else if (path === '/agentic-impact') {
      setCurrentPage('agentic-impact');
    } else if (path === '/team') {
      setCurrentPage('team');
    } else if (path === '/privacy') {
      setCurrentPage('privacy');
    } else if (path === '/terms') {
      setCurrentPage('terms');
    }
  }, []);

  // Update URL when page changes
  useEffect(() => {
    let path = '/';
    if (currentPage === 'login') path = '/login';
    else if (currentPage === 'admin') path = '/admin';
    else if (currentPage === 'blog') {
      // Don't override path if it's a filter URL - Blog component manages its own URL
      if (!window.location.pathname.startsWith('/blog/category/') &&
          !window.location.pathname.startsWith('/blog/tag/') &&
          window.location.pathname !== '/blog') {
        path = '/blog';
      } else {
        path = window.location.pathname + window.location.search;
      }
    }
    else if (currentPage === 'blog-post') path = `/blog/${currentBlogSlug}`;
    else if (currentPage === 'voice-ai') path = '/voice-ai';
    else if (currentPage === 'agentic-workforce') path = '/agentic-workforce';
    else if (currentPage === 'agentic-impact') path = '/agentic-impact';
    else if (currentPage === 'team') path = '/team';
    else if (currentPage === 'privacy') path = '/privacy';
    else if (currentPage === 'terms') path = '/terms';

    if (window.location.pathname !== path && !path.includes(window.location.pathname)) {
      window.history.pushState({}, '', path);
    }
  }, [currentPage, currentBlogSlug]);

  // Handle browser back/forward
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path === '/login') setCurrentPage('login');
      else if (path === '/admin' || path.startsWith('/admin/')) setCurrentPage('admin');
      else if (path === '/blog' || path.startsWith('/blog/category/') || path.startsWith('/blog/tag/')) {
        setCurrentPage('blog');
      }
      else if (path.startsWith('/blog/')) {
        const slug = path.replace('/blog/', '');
        if (!slug.startsWith('category/') && !slug.startsWith('tag/')) {
          setCurrentBlogSlug(slug);
          setCurrentPage('blog-post');
        } else {
          setCurrentPage('blog');
        }
      }
      else if (path === '/voice-ai') setCurrentPage('voice-ai');
      else if (path === '/agentic-workforce') setCurrentPage('agentic-workforce');
      else if (path === '/agentic-impact') setCurrentPage('agentic-impact');
      else if (path === '/team') setCurrentPage('team');
      else if (path === '/privacy') setCurrentPage('privacy');
      else if (path === '/terms') setCurrentPage('terms');
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

  // Navigate to blog post
  function navigateToBlogPost(slug: string) {
    setCurrentBlogSlug(slug);
    setCurrentPage('blog-post');
  }

  // Navigate to blog with category filter
  function navigateToCategory(categorySlug: string) {
    window.history.pushState({}, '', `/blog/category/${encodeURIComponent(categorySlug)}`);
    setCurrentPage('blog');
  }

  // Navigate to blog with tag filter
  function navigateToTag(tagSlug: string) {
    window.history.pushState({}, '', `/blog/tag/${encodeURIComponent(tagSlug)}`);
    setCurrentPage('blog');
  }

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
      <>
        <Login
          onSuccess={() => setCurrentPage('admin')}
          onBack={() => setCurrentPage('home')}
        />
        <RetellVoiceAgent ref={voiceAgentRef} />
      </>
    );
  }

  // Admin page
  if (currentPage === 'admin') {
    if (!isAuthenticated) {
      setCurrentPage('login');
      return null;
    }
    return (
      <>
        <Admin
          onLogout={async () => {
            await logout();
            setCurrentPage('home');
          }}
          onBackToSite={() => setCurrentPage('home')}
        />
        <RetellVoiceAgent ref={voiceAgentRef} />
      </>
    );
  }

  // Blog post page (no navbar/footer for cleaner reading)
  if (currentPage === 'blog-post') {
    return (
      <div className="relative min-h-screen overflow-x-hidden text-[#2C2420] bg-[#FAF9F6] selection:bg-[#D4A373] selection:text-white">
        <BackgroundEffects />
        <Navbar
          isScrolled={isScrolled}
          currentPage={currentPage}
          onNavigate={setCurrentPage}
          onOpenConsulting={openVoiceChat}
        />
        <main className="transition-opacity duration-500">
          <BlogPost
            slug={currentBlogSlug}
            onBack={() => setCurrentPage('blog')}
            onNavigateToBlog={() => setCurrentPage('blog')}
            onNavigateToCategory={navigateToCategory}
            onNavigateToTag={navigateToTag}
          />
        </main>
        <Footer />
        {showConstruction && (
          <ConstructionOverlay onClose={() => setShowConstruction(false)} />
        )}
        <RetellVoiceAgent ref={voiceAgentRef} />
      </div>
    );
  }

  // Blog list page
  if (currentPage === 'blog') {
    return (
      <div className="relative min-h-screen overflow-x-hidden text-[#2C2420] bg-[#FAF9F6] selection:bg-[#D4A373] selection:text-white">
        <BackgroundEffects />
        <Navbar
          isScrolled={isScrolled}
          currentPage={currentPage}
          onNavigate={setCurrentPage}
          onOpenConsulting={openVoiceChat}
        />
        <main className="transition-opacity duration-500">
          <Blog
            onNavigateToPost={navigateToBlogPost}
            onBack={() => setCurrentPage('home')}
          />
        </main>
        <Footer />
        {showConstruction && (
          <ConstructionOverlay onClose={() => setShowConstruction(false)} />
        )}
        <RetellVoiceAgent ref={voiceAgentRef} />
      </div>
    );
  }

  // Public pages
  const renderPage = () => {
    switch (currentPage) {
      case 'voice-ai': return <VoiceAI onBack={() => setCurrentPage('home')} onOpenDemo={openVoiceChat} />;
      case 'agentic-workforce': return <AgenticWorkforce onBack={() => setCurrentPage('home')} onOpenDemo={openVoiceChat} />;
      case 'agentic-impact': return <AgenticImpact onBack={() => setCurrentPage('home')} onOpenDemo={openVoiceChat} />;
      case 'team': return <Team onBack={() => setCurrentPage('home')} />;
      case 'privacy': return <Privacy onBack={() => setCurrentPage('home')} />;
      case 'terms': return <Terms onBack={() => setCurrentPage('home')} />;
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
        onOpenConsulting={openVoiceChat}
      />

      <main className="transition-opacity duration-500 pt-20">
        {renderPage()}
        {currentPage === 'home' && <Contact onOpenChat={openVoiceChat} />}
      </main>

      <Footer />

      {showConstruction && (
        <ConstructionOverlay onClose={() => setShowConstruction(false)} />
      )}

      {/* Voice Agent - site-wide */}
      <RetellVoiceAgent ref={voiceAgentRef} />
    </div>
  );
};

import { HelmetProvider } from 'react-helmet-async';

// ... (previous code)

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </HelmetProvider>
  );
};

export default App;
