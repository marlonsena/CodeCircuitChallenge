import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { destinations as initialDestinations } from "@/data/mockData";
import { Search, Heart } from "lucide-react";

interface Destination {
  id: string;
  name: string;
  country: string;
  region: string;
  emoji: string;
  description: string;
  image: string;
  tags: string[];
  bestTime: string;
}

export default function DestinationExplorer() {
  const [destinations, setDestinations] = useState<Destination[]>(initialDestinations);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [favorites, setFavorites] = useState<string[]>([]);
  
  // Filter destinations based on search term and region
  const filteredDestinations = destinations.filter(destination => {
    const matchesSearch = destination.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          destination.country.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion = selectedRegion === 'all' || destination.region.toLowerCase() === selectedRegion.toLowerCase();
    
    return matchesSearch && matchesRegion;
  });
  
  // Toggle destination as favorite
  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(fav => fav !== id) 
        : [...prev, id]
    );
  };
  
  // Get UI class for region filter
  const getRegionClass = (region: string) => {
    return region === selectedRegion
      ? "active bg-primary text-white" 
      : "bg-gray-100 text-gray-700 dark:bg-dark-surface dark:text-gray-300";
  };

  return (
    <section id="destinations" className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Explore Destinations</h2>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <input 
              type="text" 
              id="destination-search" 
              placeholder="Search destinations..." 
              className="pl-9 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-dark-card focus:outline-none focus:ring-2 focus:ring-primary dark:text-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="w-5 h-5 text-gray-400 absolute left-2 top-2.5" />
          </div>
        </div>
      </div>
      
      {/* Region filters */}
      <div className="flex overflow-x-auto pb-2 mb-6 space-x-2 -mx-1 px-1">
        <button 
          onClick={() => setSelectedRegion('all')}
          className={`region-filter ${getRegionClass('all')} px-4 py-2 rounded-lg whitespace-nowrap`}
        >
          All Regions
        </button>
        <button 
          onClick={() => setSelectedRegion('asia')}
          className={`region-filter ${getRegionClass('asia')} px-4 py-2 rounded-lg whitespace-nowrap`}
          data-region="asia"
        >
          Asia 🌏
        </button>
        <button 
          onClick={() => setSelectedRegion('europe')}
          className={`region-filter ${getRegionClass('europe')} px-4 py-2 rounded-lg whitespace-nowrap`}
          data-region="europe"
        >
          Europe 🏰
        </button>
        <button 
          onClick={() => setSelectedRegion('americas')}
          className={`region-filter ${getRegionClass('americas')} px-4 py-2 rounded-lg whitespace-nowrap`}
          data-region="americas"
        >
          Americas 🌎
        </button>
        <button 
          onClick={() => setSelectedRegion('africa')}
          className={`region-filter ${getRegionClass('africa')} px-4 py-2 rounded-lg whitespace-nowrap`}
          data-region="africa"
        >
          Africa 🦁
        </button>
        <button 
          onClick={() => setSelectedRegion('oceania')}
          className={`region-filter ${getRegionClass('oceania')} px-4 py-2 rounded-lg whitespace-nowrap`}
          data-region="oceania"
        >
          Oceania 🏝️
        </button>
      </div>
      
      {/* Destination cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDestinations.map(destination => (
          <Card 
            key={destination.id}
            className="destination-card bg-white dark:bg-dark-surface rounded-xl shadow-sm overflow-hidden"
            data-region={destination.region.toLowerCase()}
          >
            <div className="h-48 overflow-hidden">
              <img 
                src={destination.image} 
                alt={`${destination.name}, ${destination.country}`} 
                className="w-full h-full object-cover"
              />
            </div>
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-lg">{destination.name}, {destination.country}</h3>
                <div className="text-2xl">{destination.emoji}</div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{destination.description}</p>
              <div className="flex justify-between items-center">
                <div className="flex flex-wrap gap-2">
                  {destination.tags.map((tag, index) => (
                    <span key={index} className="text-xs px-2 py-1 bg-gray-100 dark:bg-dark-card rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => toggleFavorite(destination.id)}
                  className={favorites.includes(destination.id) ? "text-red-500" : "text-gray-400 hover:text-primary"}
                >
                  <Heart className="w-6 h-6" fill={favorites.includes(destination.id) ? "currentColor" : "none"} />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
