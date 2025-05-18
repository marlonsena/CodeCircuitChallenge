import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { currentTrip, activities, weatherData, getPackingStats, getBudgetStats } from "@/data/mockData";
import { formatDate, formatCurrency, calculateDaysLeft } from "@/lib/utils";
import { 
  Sun, 
  Cloud, 
  Wind, 
  MapPin, 
  DollarSign, 
  Package, 
  BarChart, 
  Calendar,
  ChevronRight,
  Home,
  Briefcase
} from "lucide-react";
import CountdownTimer from "@/components/CountdownTimer";
import PackingList from "@/components/PackingList";
import Itinerary from "@/components/Itinerary";
import DestinationExplorer from "@/components/DestinationExplorer";
import CurrencyConverter from "@/components/CurrencyConverter";
import BudgetTracker from "@/components/BudgetTracker";

export default function Dashboard() {
  const [todayActivities, setTodayActivities] = useState(activities.filter(a => a.day === 1));
  const packingStats = getPackingStats();
  const budgetStats = getBudgetStats();

  // Weather icon component selection
  const getWeatherIcon = (iconType: string) => {
    switch (iconType) {
      case 'sun':
        return <Sun className="w-6 h-6 mx-auto text-accent" />;
      case 'cloud':
        return <Cloud className="w-6 h-6 mx-auto" />;
      case 'wind':
        return <Wind className="w-6 h-6 mx-auto text-gray-500" />;
      default:
        return <Sun className="w-6 h-6 mx-auto text-accent" />;
    }
  };

  return (
    <>
      {/* Trip Dashboard Overview */}
      <section id="trip-dashboard" className="mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Trip Overview Card */}
          <Card className="bg-white dark:bg-dark-surface rounded-xl shadow-sm">
            <CardContent className="p-5">
              <div className="h-32 rounded-lg mb-4 overflow-hidden">
                <img 
                  src={currentTrip.coverImage} 
                  alt={currentTrip.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <h2 className="text-xl font-semibold mb-1">{currentTrip.title}</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {formatDate(currentTrip.startDate)} - {formatDate(currentTrip.endDate)}
              </p>
              
              <div className="flex items-center justify-between text-sm mb-5">
                <div className="flex items-center space-x-1">
                  <MapPin className="w-4 h-4 text-secondary" />
                  <span>{currentTrip.destination}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <DollarSign className="w-4 h-4 text-accent" />
                  <span>{formatCurrency(currentTrip.totalBudget)} budget</span>
                </div>
              </div>
              
              <div className="flex justify-between mb-2 text-sm">
                <span className="font-medium">Trip Preparation</span>
                <span>{packingStats.progress}% complete</span>
              </div>
              <div className="w-full h-2 bg-gray-200 dark:bg-dark-card rounded-full overflow-hidden">
                <div 
                  className="bg-primary h-full rounded-full transition-width duration-500" 
                  style={{ width: `${packingStats.progress}%` }}
                ></div>
              </div>
            </CardContent>
          </Card>
          
          {/* Countdown Card */}
          <CountdownTimer targetDate={currentTrip.startDate} />
          
          {/* Weather Card */}
          <Card className="bg-white dark:bg-dark-surface rounded-xl shadow-sm">
            <CardContent className="p-5">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-lg font-semibold">Weather in Bali</h2>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {formatDate(currentTrip.startDate)} - {formatDate(currentTrip.endDate)}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold">29°C</div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">Partly Cloudy</p>
                </div>
              </div>
              
              <div className="grid grid-cols-5 gap-2">
                {weatherData.map((day, i) => (
                  <div key={i} className="text-center">
                    <p className="text-xs mb-1">{day.day}</p>
                    {getWeatherIcon(day.icon)}
                    <p className="text-xs mt-1">{day.temp}°</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Overview Widgets */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <Card className="bg-white dark:bg-dark-surface rounded-xl shadow-sm">
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Packing Progress</h3>
                  <p className="text-xl font-semibold mt-1">{packingStats.packed}/{packingStats.total} items</p>
                </div>
                <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg">
                  <Package className="w-5 h-5 text-primary" />
                </div>
              </div>
              <Progress 
                value={packingStats.progress} 
                className="w-full h-1.5 bg-gray-200 dark:bg-dark-card rounded-full mt-3" 
              />
            </CardContent>
          </Card>
          
          <Card className="bg-white dark:bg-dark-surface rounded-xl shadow-sm">
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Budget Spent</h3>
                  <p className="text-xl font-semibold mt-1">
                    {formatCurrency(budgetStats.spent)} / {formatCurrency(budgetStats.totalBudget)}
                  </p>
                </div>
                <div className="bg-amber-100 dark:bg-amber-900/30 p-2 rounded-lg">
                  <DollarSign className="w-5 h-5 text-accent" />
                </div>
              </div>
              <Progress 
                value={budgetStats.progress} 
                className="w-full h-1.5 bg-gray-200 dark:bg-dark-card rounded-full mt-3"
              />
            </CardContent>
          </Card>
          
          <Card className="bg-white dark:bg-dark-surface rounded-xl shadow-sm">
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Activities Planned</h3>
                  <p className="text-xl font-semibold mt-1">{activities.length} activities</p>
                </div>
                <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-lg">
                  <Calendar className="w-5 h-5 text-secondary" />
                </div>
              </div>
              <div className="flex justify-between mt-3 text-sm">
                <span>Confirmed: {activities.length - 3}</span>
                <span>Pending: 3</span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white dark:bg-dark-surface rounded-xl shadow-sm">
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Local Currency</h3>
                  <p className="text-xl font-semibold mt-1">IDR to USD</p>
                </div>
                <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-lg">
                  <BarChart className="w-5 h-5 text-purple-500" />
                </div>
              </div>
              <div className="mt-3 text-sm flex justify-between">
                <span>1 USD = 15,500 IDR</span>
                <a href="#currency" className="text-primary">Convert →</a>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Today's Itinerary Preview */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Today's Itinerary</h2>
          <Card className="bg-white dark:bg-dark-surface rounded-xl shadow-sm">
            <CardContent className="p-5">
              <div className="flex items-start space-x-4 mb-4">
                <div className="bg-primary/10 dark:bg-primary/20 rounded-lg p-2 text-primary">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-medium">Exploring Ubud</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Visit local markets, temples, and rice terraces</p>
                </div>
              </div>
              
              <div className="space-y-3">
                {todayActivities.map(activity => (
                  <div key={activity.id} className="flex items-center space-x-4">
                    <div className="text-gray-500 dark:text-gray-400 text-sm w-20">
                      {new Date(activity.startTime).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                    </div>
                    <div className="flex-1 p-3 bg-gray-50 dark:bg-dark-card rounded-lg">
                      <p className="font-medium">{activity.title}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{activity.location}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <a href="#itinerary" className="mt-5 text-primary text-sm flex justify-end items-center">
                View full itinerary
                <ChevronRight className="w-4 h-4 ml-1" />
              </a>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Include other feature components */}
      <PackingList />
      <Itinerary />
      <DestinationExplorer />
      <BudgetTracker />
      <CurrencyConverter />
    </>
  );
}
