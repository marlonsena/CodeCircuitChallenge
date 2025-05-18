import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { packingItems as initialPackingItems, getPackingStats } from "@/data/mockData";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Star, Shirt, ShowerHead, Smartphone, FileText, Plus, LightbulbIcon } from "lucide-react";

interface PackingItem {
  id: string;
  name: string;
  category: 'essentials' | 'clothing' | 'toiletries' | 'electronics' | 'documents';
  quantity: number;
  isPacked: boolean;
  isEssential: boolean;
}

export default function PackingList() {
  const [packingItems, setPackingItems] = useLocalStorage<PackingItem[]>("packing-items", initialPackingItems);
  const [activeCategory, setActiveCategory] = useState<string>("essentials");
  
  const stats = getPackingStats();
  
  const handleToggleItem = (id: string) => {
    setPackingItems(
      packingItems.map((item) =>
        item.id === id ? { ...item, isPacked: !item.isPacked } : item
      )
    );
  };
  
  const filteredItems = packingItems.filter(
    (item) => item.category === activeCategory
  );
  
  // Icons for each category
  const categoryIcons = {
    essentials: <Star className="w-5 h-5 mr-2" />,
    clothing: <Shirt className="w-5 h-5 mr-2" />,
    toiletries: <ShowerHead className="w-5 h-5 mr-2" />,
    electronics: <Smartphone className="w-5 h-5 mr-2" />,
    documents: <FileText className="w-5 h-5 mr-2" />
  };

  return (
    <section id="packing-list" className="mb-12">
      <div className="flex flex-wrap items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Packing List</h2>
        <div className="flex items-center space-x-2 text-sm">
          <div id="packing-progress-text" className="text-gray-600 dark:text-gray-300">
            {stats.packed}/{stats.total} items packed ({stats.progress}%)
          </div>
        </div>
      </div>
      
      <Card className="bg-white dark:bg-dark-surface rounded-xl shadow-sm mb-4">
        <CardContent className="p-5">
          <div className="w-full bg-gray-200 dark:bg-dark-card h-2 rounded-full mb-6">
            <div 
              id="packing-progress-bar" 
              className="bg-primary h-full rounded-full transition-all duration-500" 
              style={{ width: `${stats.progress}%` }}
            ></div>
          </div>
          
          <Tabs defaultValue="essentials" onValueChange={setActiveCategory}>
            <TabsList className="flex overflow-x-auto pb-2 mb-4 space-x-2 -mx-1 px-1 bg-transparent">
              <TabsTrigger 
                value="essentials" 
                className="bg-gray-100 text-gray-700 dark:bg-dark-surface dark:text-gray-300 px-4 py-2 rounded-lg whitespace-nowrap flex items-center data-[state=active]:bg-primary data-[state=active]:text-white"
              >
                <Star className="w-5 h-5 mr-2" />
                Essentials
              </TabsTrigger>
              
              <TabsTrigger 
                value="clothing" 
                className="bg-gray-100 text-gray-700 dark:bg-dark-surface dark:text-gray-300 px-4 py-2 rounded-lg whitespace-nowrap flex items-center data-[state=active]:bg-primary data-[state=active]:text-white"
              >
                <Shirt className="w-5 h-5 mr-2" />
                Clothing
              </TabsTrigger>
              
              <TabsTrigger 
                value="toiletries" 
                className="bg-gray-100 text-gray-700 dark:bg-dark-surface dark:text-gray-300 px-4 py-2 rounded-lg whitespace-nowrap flex items-center data-[state=active]:bg-primary data-[state=active]:text-white"
              >
                <ShowerHead className="w-5 h-5 mr-2" />
                Toiletries
              </TabsTrigger>
              
              <TabsTrigger 
                value="electronics" 
                className="bg-gray-100 text-gray-700 dark:bg-dark-surface dark:text-gray-300 px-4 py-2 rounded-lg whitespace-nowrap flex items-center data-[state=active]:bg-primary data-[state=active]:text-white"
              >
                <Smartphone className="w-5 h-5 mr-2" />
                Electronics
              </TabsTrigger>
              
              <TabsTrigger 
                value="documents" 
                className="bg-gray-100 text-gray-700 dark:bg-dark-surface dark:text-gray-300 px-4 py-2 rounded-lg whitespace-nowrap flex items-center data-[state=active]:bg-primary data-[state=active]:text-white"
              >
                <FileText className="w-5 h-5 mr-2" />
                Documents
              </TabsTrigger>
            </TabsList>
            
            {Object.keys(categoryIcons).map((category) => (
              <TabsContent key={category} value={category} className="space-y-2">
                {filteredItems.map((item) => (
                  <div 
                    key={item.id}
                    className={`packing-item p-3 rounded-lg flex items-center justify-between transition-colors ${
                      item.isPacked 
                        ? "bg-green-50 dark:bg-green-900/20" 
                        : "bg-white dark:bg-dark-card"
                    }`}
                  >
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        id={`item-${item.id}`}
                        checked={item.isPacked}
                        onChange={() => handleToggleItem(item.id)}
                        className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <label htmlFor={`item-${item.id}`} className="ml-3 text-gray-700 dark:text-gray-200">
                        {item.name}
                      </label>
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{item.quantity}x</div>
                  </div>
                ))}
                
                <div className="mt-4">
                  <Button variant="ghost" size="sm" className="text-primary flex items-center text-sm">
                    <Plus className="w-4 h-4 mr-1" />
                    Add Item
                  </Button>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
      
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 flex items-start space-x-3">
        <LightbulbIcon className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
        <div>
          <h3 className="font-medium text-gray-800 dark:text-white mb-1">Weather-based suggestions</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">Bali will be hot and occasionally rainy during your stay. Don't forget to pack:</p>
          <ul className="text-sm text-gray-600 dark:text-gray-300 mt-2 space-y-1">
            <li className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 mr-2 text-primary">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Light, breathable clothing
            </li>
            <li className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 mr-2 text-primary">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Rain jacket or small umbrella
            </li>
            <li className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 mr-2 text-primary">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Insect repellent
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
