import { Home, CheckSquare, Calendar, Map, DollarSign } from "lucide-react";

// Use plain <a> for in-page hash navigation instead of router Link
// import { Link } from "wouter";

export default function MobileNav() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-dark-surface shadow-lg z-50">
      <div className="flex justify-around">
        <a href="#trip-dashboard" className="py-3 px-4 flex flex-col items-center space-y-1">
          <Home className="w-6 h-6" />
          <span className="text-xs">Home</span>
        </a>
        <a href="#packing-list" className="py-3 px-4 flex flex-col items-center space-y-1">
          <CheckSquare className="w-6 h-6" />
          <span className="text-xs">Packing</span>
        </a>
        <a href="#itinerary" className="py-3 px-4 flex flex-col items-center space-y-1">
          <Calendar className="w-6 h-6" />
          <span className="text-xs">Itinerary</span>
        </a>
        <a href="#destinations" className="py-3 px-4 flex flex-col items-center space-y-1">
          <Map className="w-6 h-6" />
          <span className="text-xs">Explore</span>
        </a>
        <a href="#budget" className="py-3 px-4 flex flex-col items-center space-y-1">
          <DollarSign className="w-6 h-6" />
          <span className="text-xs">Budget</span>
        </a>
      </div>
    </div>
  );
}
