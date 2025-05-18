export interface Trip {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  destination: string;
  coverImage: string;
  totalBudget: number;
  currency: string;
}

export interface Activity {
  id: string;
  title: string;
  day: number;
  startTime: string;
  endTime: string;
  location: string;
  type: 'transport' | 'accommodation' | 'sightseeing' | 'food' | 'activity';
  notes?: string;
}

export interface PackingItem {
  id: string;
  name: string;
  category: 'essentials' | 'clothing' | 'toiletries' | 'electronics' | 'documents';
  quantity: number;
  isPacked: boolean;
  isEssential: boolean;
}

export interface Destination {
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

export interface Expense {
  id: string;
  amount: number;
  description: string;
  category: 'accommodation' | 'food' | 'transportation' | 'activities' | 'shopping' | 'other';
  date: string;
  location?: string;
}

export interface CurrencyRate {
  code: string;
  name: string;
  symbol: string;
  rate: number; // relative to USD
}

// Mock current trip data
export const currentTrip: Trip = {
  id: 't1',
  title: 'Bali Paradise',
  description: 'Exploring the beautiful island of Bali',
  startDate: '2023-06-18',
  endDate: '2023-06-25',
  destination: 'Bali, Indonesia',
  coverImage: 'https://images.unsplash.com/photo-1604999333679-b86d54738315',
  totalBudget: 2500,
  currency: 'USD'
};

// Mock itinerary data
export const activities: Activity[] = [
  {
    id: 'a1',
    title: 'Airport Pickup',
    day: 1,
    startTime: '2023-06-18T09:00:00',
    endTime: '2023-06-18T10:30:00',
    location: 'Ngurah Rai International Airport',
    type: 'transport'
  },
  {
    id: 'a2',
    title: 'Check-in at Villa',
    day: 1,
    startTime: '2023-06-18T11:00:00',
    endTime: '2023-06-18T12:00:00',
    location: 'Ubud Luxury Villa',
    type: 'accommodation'
  },
  {
    id: 'a3',
    title: 'Lunch',
    day: 1,
    startTime: '2023-06-18T13:00:00',
    endTime: '2023-06-18T14:30:00',
    location: 'Local restaurant near villa',
    type: 'food'
  },
  {
    id: 'a4',
    title: 'Rest & Relaxation',
    day: 1,
    startTime: '2023-06-18T15:00:00',
    endTime: '2023-06-18T18:00:00',
    location: 'Villa pool and amenities',
    type: 'activity'
  },
  {
    id: 'a5',
    title: 'Breakfast at Villa',
    day: 2,
    startTime: '2023-06-19T08:00:00',
    endTime: '2023-06-19T09:00:00',
    location: 'Villa dining area',
    type: 'food'
  },
  {
    id: 'a6',
    title: 'Ubud Market',
    day: 2,
    startTime: '2023-06-19T10:00:00',
    endTime: '2023-06-19T12:00:00',
    location: 'Ubud Traditional Market',
    type: 'sightseeing',
    notes: 'Shopping and cultural exploration'
  },
  {
    id: 'a7',
    title: 'Lunch',
    day: 2,
    startTime: '2023-06-19T13:00:00',
    endTime: '2023-06-19T14:30:00',
    location: 'Warung Biah Biah',
    type: 'food'
  },
  {
    id: 'a8',
    title: 'Tegalalang Rice Terrace',
    day: 2,
    startTime: '2023-06-19T15:00:00',
    endTime: '2023-06-19T17:30:00',
    location: 'Tegalalang',
    type: 'sightseeing',
    notes: 'Scenic views and photos'
  },
  {
    id: 'a9',
    title: 'Early Breakfast',
    day: 3,
    startTime: '2023-06-20T07:00:00',
    endTime: '2023-06-20T08:00:00',
    location: 'Hotel Restaurant',
    type: 'food'
  },
  {
    id: 'a10',
    title: 'Mount Batur Hiking',
    day: 3,
    startTime: '2023-06-20T09:00:00',
    endTime: '2023-06-20T15:00:00',
    location: 'Mount Batur',
    type: 'activity',
    notes: 'Guided volcano trek'
  },
  {
    id: 'a11',
    title: 'Hot Springs Relaxation',
    day: 3,
    startTime: '2023-06-20T17:00:00',
    endTime: '2023-06-20T19:00:00',
    location: 'Toya Bungkah Hot Springs',
    type: 'activity'
  }
];

// Mock packing list data
export const packingItems: PackingItem[] = [
  { id: 'p1', name: 'Passport', category: 'essentials', quantity: 1, isPacked: true, isEssential: true },
  { id: 'p2', name: 'Credit Cards', category: 'essentials', quantity: 2, isPacked: true, isEssential: true },
  { id: 'p3', name: 'Travel Insurance Documents', category: 'essentials', quantity: 1, isPacked: true, isEssential: true },
  { id: 'p4', name: 'Emergency Contacts', category: 'essentials', quantity: 1, isPacked: false, isEssential: true },
  { id: 'p5', name: 'Cash (USD)', category: 'essentials', quantity: 1, isPacked: true, isEssential: true },
  { id: 'p6', name: 'Travel Adapter', category: 'essentials', quantity: 1, isPacked: true, isEssential: true },
  { id: 'p7', name: 'T-shirts', category: 'clothing', quantity: 7, isPacked: true, isEssential: false },
  { id: 'p8', name: 'Shorts', category: 'clothing', quantity: 4, isPacked: true, isEssential: false },
  { id: 'p9', name: 'Swimwear', category: 'clothing', quantity: 2, isPacked: false, isEssential: false },
  { id: 'p10', name: 'Light Jacket', category: 'clothing', quantity: 1, isPacked: false, isEssential: false },
  { id: 'p11', name: 'Toothbrush & Toothpaste', category: 'toiletries', quantity: 1, isPacked: true, isEssential: true },
  { id: 'p12', name: 'Shampoo & Conditioner', category: 'toiletries', quantity: 1, isPacked: true, isEssential: false },
  { id: 'p13', name: 'Sunscreen', category: 'toiletries', quantity: 1, isPacked: false, isEssential: true },
  { id: 'p14', name: 'Phone & Charger', category: 'electronics', quantity: 1, isPacked: true, isEssential: true },
  { id: 'p15', name: 'Camera', category: 'electronics', quantity: 1, isPacked: true, isEssential: false },
  { id: 'p16', name: 'Power Bank', category: 'electronics', quantity: 1, isPacked: false, isEssential: false },
  { id: 'p17', name: 'Flight Tickets', category: 'documents', quantity: 1, isPacked: true, isEssential: true },
  { id: 'p18', name: 'Hotel Reservations', category: 'documents', quantity: 1, isPacked: true, isEssential: true },
  { id: 'p19', name: 'Visa Documents', category: 'documents', quantity: 1, isPacked: false, isEssential: true },
  { id: 'p20', name: 'Vaccination Card', category: 'documents', quantity: 1, isPacked: false, isEssential: true }
];

// Mock destination data
export const destinations: Destination[] = [
  {
    id: 'd1',
    name: 'Bali',
    country: 'Indonesia',
    region: 'Asia',
    emoji: '🇮🇩',
    description: 'Stunning beaches, rice terraces, and vibrant culture make Bali a paradise for travelers.',
    image: 'https://images.unsplash.com/photo-1604999333679-b86d54738315',
    tags: ['🏖️ Beach', '🛕 Culture'],
    bestTime: 'Apr-Oct'
  },
  {
    id: 'd2',
    name: 'Paris',
    country: 'France',
    region: 'Europe',
    emoji: '🇫🇷',
    description: 'The city of lights offers world-class cuisine, art, and iconic landmarks.',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34',
    tags: ['🍷 Culinary', '🏛️ History'],
    bestTime: 'Apr-Jun, Sep-Oct'
  },
  {
    id: 'd3',
    name: 'New York City',
    country: 'USA',
    region: 'Americas',
    emoji: '🇺🇸',
    description: 'The city that never sleeps offers world-class entertainment, dining, and iconic landmarks.',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9',
    tags: ['🏙️ Urban', '🛍️ Shopping'],
    bestTime: 'Apr-Jun, Sep-Nov'
  },
  {
    id: 'd4',
    name: 'Cape Town',
    country: 'South Africa',
    region: 'Africa',
    emoji: '🇿🇦',
    description: 'Stunning coastal views, vibrant culture, and incredible wildlife experiences.',
    image: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99',
    tags: ['🏞️ Nature', '🦓 Wildlife'],
    bestTime: 'Nov-Mar'
  },
  {
    id: 'd5',
    name: 'Sydney',
    country: 'Australia',
    region: 'Oceania',
    emoji: '🇦🇺',
    description: 'Iconic harbors, beautiful beaches, and a vibrant urban culture.',
    image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9',
    tags: ['🏄 Surfing', '🏙️ Urban'],
    bestTime: 'Oct-Apr'
  },
  {
    id: 'd6',
    name: 'Tokyo',
    country: 'Japan',
    region: 'Asia',
    emoji: '🇯🇵',
    description: 'A fascinating blend of ultramodern and traditional, from neon-lit skyscrapers to historic temples.',
    image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26',
    tags: ['🏯 Culture', '🍣 Culinary'],
    bestTime: 'Mar-May, Sep-Nov'
  }
];

// Mock expenses data
export const expenses: Expense[] = [
  {
    id: 'e1',
    amount: 450,
    description: 'Hotel Reservation',
    category: 'accommodation',
    date: '2023-05-12'
  },
  {
    id: 'e2',
    amount: 380,
    description: 'Flight Tickets',
    category: 'transportation',
    date: '2023-05-10'
  },
  {
    id: 'e3',
    amount: 65,
    description: 'Beach Restaurant',
    category: 'food',
    date: '2023-05-15'
  },
  {
    id: 'e4',
    amount: 45,
    description: 'Airport Transfer',
    category: 'transportation',
    date: '2023-05-15'
  },
  {
    id: 'e5',
    amount: 20,
    description: 'Temple Entrance Fee',
    category: 'activities',
    date: '2023-05-16'
  },
  {
    id: 'e6',
    amount: 55,
    description: 'Souvenir Shopping',
    category: 'shopping',
    date: '2023-05-17'
  }
];

// Mock currency rates
export const currencyRates: CurrencyRate[] = [
  { code: 'USD', name: 'US Dollar', symbol: '$', rate: 1 },
  { code: 'EUR', name: 'Euro', symbol: '€', rate: 0.91 },
  { code: 'GBP', name: 'British Pound', symbol: '£', rate: 0.78 },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥', rate: 153.31 },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', rate: 1.52 },
  { code: 'IDR', name: 'Indonesian Rupiah', symbol: 'Rp', rate: 15345 }
];

// Weather data for various days
export const weatherData = [
  { day: 'Mon', temp: 30, icon: 'sun' },
  { day: 'Tue', temp: 31, icon: 'sun' },
  { day: 'Wed', temp: 28, icon: 'cloud' },
  { day: 'Thu', temp: 27, icon: 'wind' },
  { day: 'Fri', temp: 29, icon: 'sun' }
];

// Categories for expenses
export const expenseCategories = [
  { id: 'accommodation', name: 'Accommodation', icon: 'home', color: 'bg-blue-500' },
  { id: 'food', name: 'Food', icon: 'utensils', color: 'bg-green-500' },
  { id: 'transportation', name: 'Transportation', icon: 'car', color: 'bg-yellow-500' },
  { id: 'activities', name: 'Activities', icon: 'hiking', color: 'bg-purple-500' },
  { id: 'shopping', name: 'Shopping', icon: 'shopping-bag', color: 'bg-pink-500' },
  { id: 'other', name: 'Other', icon: 'ellipsis-h', color: 'bg-gray-500' }
];

// Calculated stats
export const getPackingStats = () => {
  const total = packingItems.length;
  const packed = packingItems.filter(item => item.isPacked).length;
  const progress = Math.round((packed / total) * 100);
  
  return {
    total,
    packed,
    progress,
    remaining: total - packed
  };
};

export const getBudgetStats = () => {
  const totalBudget = currentTrip.totalBudget;
  const spent = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const remaining = totalBudget - spent;
  const progress = Math.round((spent / totalBudget) * 100);
  
  return {
    totalBudget,
    spent,
    remaining,
    progress
  };
};

export const getExpensesByCategory = () => {
  const result: Record<string, number> = {};
  
  expenses.forEach(expense => {
    if (result[expense.category]) {
      result[expense.category] += expense.amount;
    } else {
      result[expense.category] = expense.amount;
    }
  });
  
  return result;
};
