import { useState } from "react";
import { activities as initialActivities } from "@/data/mockData";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useDragAndDrop } from "@/hooks/useDragAndDrop";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, MessageSquare } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface Activity {
  id: string;
  title: string;
  day: number;
  startTime: string;
  endTime: string;
  location: string;
  type: 'transport' | 'accommodation' | 'sightseeing' | 'food' | 'activity';
  notes?: string;
}

export default function Itinerary() {
  const [activities, setActivities] = useLocalStorage<Activity[]>("itinerary-activities", initialActivities);
  
  // Group activities by day
  const groupedActivities = activities.reduce((acc, activity) => {
    const day = activity.day;
    if (!acc[day]) {
      acc[day] = [];
    }
    acc[day].push(activity);
    return acc;
  }, {} as Record<number, Activity[]>);
  
  const days = Object.keys(groupedActivities).map(Number);
  
  // Function to reorder activities within a day
  const reorderActivities = (dayNumber: number, newDayActivities: Activity[]) => {
    const updatedActivities = [...activities];
    
    // Remove all activities for this day
    const filteredActivities = updatedActivities.filter(a => a.day !== dayNumber);
    
    // Add the reordered activities
    const result = [...filteredActivities, ...newDayActivities];
    
    // Update the state
    setActivities(result);
  };
  
  // Generate drag and drop handlers for each day
  const dayDragHandlers: Record<number, ReturnType<typeof useDragAndDrop<Activity>>> = {};
  
  days.forEach(day => {
    dayDragHandlers[day] = useDragAndDrop({
      items: groupedActivities[day],
      onReorder: (items) => reorderActivities(day, items),
      idField: 'id'
    });
  });
  
  // Function to get day label
  const getDayLabel = (day: number) => {
    const labels: Record<number, string> = {
      1: "Arrival",
      2: "Exploring",
      3: "Adventure",
    };
    return labels[day] || `Day ${day}`;
  };
  
  // Calculate date from start date and day number
  const getDateForDay = (day: number) => {
    const startDate = new Date('2023-06-18');
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + day - 1);
    return date;
  };
  
  // Format time from ISO string to readable time
  const formatTime = (timeString: string) => {
    const date = new Date(timeString);
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  };
  
  // Get bg color for activity type
  const getActivityTypeClass = (type: Activity['type']) => {
    const classes: Record<Activity['type'], string> = {
      'transport': 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200',
      'accommodation': 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200',
      'sightseeing': 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200',
      'food': 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200',
      'activity': 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200'
    };
    return classes[type];
  };

  return (
    <section id="itinerary" className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Interactive Itinerary</h2>
        <Button className="bg-primary text-white px-4 py-2 rounded-lg">
          <Plus className="w-5 h-5 mr-1" />
          Add Activity
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {days.map(day => (
          <Card key={day} className="bg-white dark:bg-dark-surface rounded-xl shadow-sm">
            <CardHeader className="p-4 border-b border-gray-200 dark:border-dark-700 flex justify-between items-center">
              <div>
                <CardTitle className="font-semibold">Day {day} - {formatDate(getDateForDay(day), { month: 'long', day: 'numeric' })}</CardTitle>
                <p className="text-sm text-gray-600 dark:text-gray-300">{getDayLabel(day)}</p>
              </div>
              <span className={`text-xs ${
                day === 1 ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200' : 
                day === 2 ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200' : 
                'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200'
              } px-2 py-1 rounded-full`}>
                {getDayLabel(day)}
              </span>
            </CardHeader>
            
            <CardContent className="p-4 space-y-3">
              {groupedActivities[day]?.map(activity => {
                const { handleDragStart, handleDragEnd, handleDragOver, handleDrop, handleDragEnter, handleDragLeave, draggedOverItemId } = dayDragHandlers[day];
                
                return (
                  <div 
                    key={activity.id}
                    className={`p-3 bg-gray-50 dark:bg-dark-card rounded-lg border border-gray-200 dark:border-dark-600 draggable ${
                      draggedOverItemId === activity.id ? 'border-primary-500 bg-primary-50 dark:bg-dark-700' : ''
                    }`}
                    draggable={true}
                    onDragStart={(e) => handleDragStart(e, activity)}
                    onDragEnd={handleDragEnd}
                    onDragOver={handleDragOver}
                    onDragEnter={(e) => handleDragEnter(e, activity.id)}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleDrop(e, activity.id)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className={`${getActivityTypeClass(activity.type)} text-xs font-medium py-1 px-2 rounded`}>
                        {formatTime(activity.startTime)} - {formatTime(activity.endTime)}
                      </span>
                      <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                        </svg>
                      </button>
                    </div>
                    <h4 className="font-medium mb-1">{activity.title}</h4>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 mr-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                      </svg>
                      <span>{activity.location}</span>
                    </div>
                  </div>
                );
              })}
              
              <Button variant="ghost" className="w-full py-2 border border-dashed border-gray-300 dark:border-dark-600 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-700 flex items-center justify-center">
                <Plus className="w-4 h-4 mr-1" />
                <span>Add Activity</span>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="mt-4 text-sm text-gray-600 dark:text-gray-300 flex items-center">
        <MessageSquare className="w-5 h-5 mr-2 text-primary" />
        <span>Tip: Drag and drop activities to rearrange your daily schedule.</span>
      </div>
    </section>
  );
}
