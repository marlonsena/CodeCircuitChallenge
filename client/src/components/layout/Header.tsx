import { useTheme } from "@/components/ThemeProvider";
import { Button } from "@/components/ui/button";
import { Sun, Moon, Search } from "lucide-react";

export default function Header() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="bg-white dark:bg-dark-surface shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="text-primary font-bold text-2xl">Wanderlust</div>
          <div className="hidden md:flex items-center space-x-1 text-sm font-medium bg-gray-100 dark:bg-dark-card rounded-full px-3 py-1">
            <span className="text-accent">Bali Trip</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </div>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#trip-dashboard" className="font-medium hover:text-primary transition-colors">Dashboard</a>
          <a href="#packing-list" className="font-medium hover:text-primary transition-colors">Packing</a>
          <a href="#itinerary" className="font-medium hover:text-primary transition-colors">Itinerary</a>
          <a href="#destinations" className="font-medium hover:text-primary transition-colors">Destinations</a>
          <a href="#budget" className="font-medium hover:text-primary transition-colors">Budget</a>
          <a href="#currency" className="font-medium hover:text-primary transition-colors">Currency</a>
        </nav>
        
        <div className="flex items-center space-x-3">
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full" 
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          
          <Button className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center p-0">
            <span className="font-medium">JD</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
