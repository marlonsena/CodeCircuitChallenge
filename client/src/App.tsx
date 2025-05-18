import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/Dashboard";
import Header from "@/components/layout/Header";
import MobileNav from "@/components/layout/MobileNav";

function Router() {
  return (
    <Switch>
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
