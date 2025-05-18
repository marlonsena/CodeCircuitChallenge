import { Home, CheckSquare, Calendar, Map, DollarSign } from "lucide-react";
import { Link } from "wouter";

export default function MobileNav() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-dark-surface shadow-lg z-50">
      <div className="flex justify-around">
        <Link href="#trip-dashboard" className="py-3 px-4 flex flex-col items-center space-y-1">
          <Home className="w-6 h-6" />
          <span className="text-xs">Home</span>
        </Link>
        <Link href="#packing-list" className="py-3 px-4 flex flex-col items-center space-y-1">
          <CheckSquare className="w-6 h-6" />
          <span className="text-xs">Packing</span>
        </Link>
        <Link href="#itinerary" className="py-3 px-4 flex flex-col items-center space-y-1">
          <Calendar className="w-6 h-6" />
          <span className="text-xs">Itinerary</span>
        </Link>
        <Link href="#destinations" className="py-3 px-4 flex flex-col items-center space-y-1">
          <Map className="w-6 h-6" />
          <span className="text-xs">Explore</span>
        </Link>
        <Link href="#budget" className="py-3 px-4 flex flex-col items-center space-y-1">
          <DollarSign className="w-6 h-6" />
          <span className="text-xs">Budget</span>
        </Link>
      </div>
    </div>
  );
}
