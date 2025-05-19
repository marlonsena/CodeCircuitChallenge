import { Switch, Route, useLocation } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/Dashboard";
import Header from "@/components/layout/Header";
import MobileNav from "@/components/layout/MobileNav";
import { useEffect, useState } from "react";

// Use a base path hook for GitHub Pages that handles both routes and in-page anchors
const useHashBasedLocation = () => {
  // Get the base URL from the import.meta.env if in production
  const base = import.meta.env.BASE_URL || "/";
  
  // Remove trailing slash if it exists and it's not just "/"
  const basePath = base.endsWith("/") && base !== "/" 
    ? base.slice(0, -1) 
    : base;
  
  // Function to determine if hash is an in-page navigation
  const isInPageNavigation = (hash: string): boolean => {
    // List of known in-page section IDs
    const inPageSections = [
      "trip-dashboard", 
      "packing-list", 
      "itinerary", 
      "destinations", 
      "budget"
    ];
    return inPageSections.some(section => hash === section);
  };
    
  const [location, setLocation] = useState(() => {
    const hash = window.location.hash.replace("#", "");
    // If it's an in-page navigation, default to "/" for the router
    return (hash && !isInPageNavigation(hash)) ? hash : "/";
  });

  useEffect(() => {
    // Handle hash changes
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      // Only update router location for non-in-page navigation
      if (!isInPageNavigation(hash)) {
        setLocation(hash || "/");
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // The setter function that changes hash
  const navigate = (to: string) => {
    window.location.hash = to;
  };

  return [location, navigate];
};

function Router() {
  // Use our custom hook for hash-based navigation
  const [location] = useHashBasedLocation();
  
  // Scroll to section if hash matches an in-page section
  useEffect(() => {
    const handleInPageNavigation = () => {
      const hash = window.location.hash;
      if (hash && hash.length > 1) {
        const sectionId = hash.substring(1);
        const section = document.getElementById(sectionId);
        if (section) {
          // Smooth scroll to the section
          section.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };
    
    // Set a small timeout to ensure the DOM is fully loaded
    const timer = setTimeout(handleInPageNavigation, 100);
    
    // Listen for hash changes to handle navigation
    window.addEventListener('hashchange', handleInPageNavigation);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('hashchange', handleInPageNavigation);
    };
  }, []);

  return (
    <Switch hook={useHashBasedLocation}>
      <Route path="/" component={Dashboard} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-background">
        <Header />
        <main className="container mx-auto px-4 py-4 pb-20 md:pb-8">
          <Router />
        </main>
        <MobileNav />
        <Toaster />
      </div>
    </TooltipProvider>
  );
}

export default App;
