import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import Dashboard from '@/pages/Dashboard';
import Header from '@/components/layout/Header';
import MobileNav from '@/components/layout/MobileNav';
import { useEffect } from 'react';

// Scroll to in-page sections based on hash changes
function useScrollToHash() {
  useEffect(() => {
    const scrollToSection = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        const section = document.getElementById(hash);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };
    // On load
    scrollToSection();
    // On hash change
    window.addEventListener('hashchange', scrollToSection);
    return () => window.removeEventListener('hashchange', scrollToSection);
  }, []);
}

function App() {
  useScrollToHash();
  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-background">
        <Header />
        <main className="container mx-auto px-4 py-4 pb-20 md:pb-8">
          <Dashboard />
        </main>
        <MobileNav />
        <Toaster />
      </div>
    </TooltipProvider>
  );
}

export default App;
