import { Switch, Route, useLocation } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/Dashboard";
import Header from "@/components/layout/Header";
import MobileNav from "@/components/layout/MobileNav";
import { useEffect, useState } from "react";

// Use a base path hook for GitHub Pages
const useHashBasedLocation = () => {
  // Get the base URL from the import.meta.env if in production
  const base = import.meta.env.BASE_URL || "/";
  
  // Remove trailing slash if it exists and it's not just "/"
  const basePath = base.endsWith("/") && base !== "/" 
    ? base.slice(0, -1) 
    : base;
    
  const [location, setLocation] = useState(
    window.location.hash ? window.location.hash.replace("#", "") : "/"
  );

  useEffect(() => {
    // Handle hash changes
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      setLocation(hash || "/");
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // The setter function that changes hash
  const navigate = (to) => {
    window.location.hash = to;
  };

  return [location, navigate];
};

function Router() {
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
