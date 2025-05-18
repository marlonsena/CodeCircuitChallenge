import { users, trips, destinations, itineraryItems, packingItems, expenses } from "@shared/schema";
import type { 
  User, InsertUser, Trip, InsertTrip, Destination, InsertDestination,
  ItineraryItem, InsertItineraryItem, PackingItem, InsertPackingItem,
  Expense, InsertExpense
} from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Trip operations
  getTrips(userId: number): Promise<Trip[]>;
  getTripById(id: number): Promise<Trip | undefined>;
  createTrip(trip: InsertTrip): Promise<Trip>;
  updateTrip(id: number, trip: Partial<InsertTrip>): Promise<Trip | undefined>;
  deleteTrip(id: number): Promise<boolean>;

  // Destination operations
  getDestinations(): Promise<Destination[]>;
  getDestinationById(id: number): Promise<Destination | undefined>;
  getDestinationsByRegion(region: string): Promise<Destination[]>;
  createDestination(destination: InsertDestination): Promise<Destination>;

  // Itinerary operations
  getItineraryItems(tripId: number): Promise<ItineraryItem[]>;
  createItineraryItem(item: InsertItineraryItem): Promise<ItineraryItem>;
  updateItineraryItem(id: number, item: Partial<InsertItineraryItem>): Promise<ItineraryItem | undefined>;
  deleteItineraryItem(id: number): Promise<boolean>;

  // Packing list operations
  getPackingItems(tripId: number): Promise<PackingItem[]>;
  createPackingItem(item: InsertPackingItem): Promise<PackingItem>;
  updatePackingItem(id: number, item: Partial<InsertPackingItem>): Promise<PackingItem | undefined>;
  deletePackingItem(id: number): Promise<boolean>;

  // Expense operations
  getExpenses(tripId: number): Promise<Expense[]>;
  createExpense(expense: InsertExpense): Promise<Expense>;
  updateExpense(id: number, expense: Partial<InsertExpense>): Promise<Expense | undefined>;
  deleteExpense(id: number): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private trips: Map<number, Trip>;
  private destinations: Map<number, Destination>;
  private itineraryItems: Map<number, ItineraryItem>;
  private packingItems: Map<number, PackingItem>;
  private expenses: Map<number, Expense>;
  
  currentUserId: number;
  currentTripId: number;
  currentDestinationId: number;
  currentItineraryItemId: number;
  currentPackingItemId: number;
  currentExpenseId: number;

  constructor() {
    this.users = new Map();
    this.trips = new Map();
    this.destinations = new Map();
    this.itineraryItems = new Map();
    this.packingItems = new Map();
    this.expenses = new Map();
    
    this.currentUserId = 1;
    this.currentTripId = 1;
    this.currentDestinationId = 1;
    this.currentItineraryItemId = 1;
    this.currentPackingItemId = 1;
    this.currentExpenseId = 1;
    
    // Initialize with sample data
    this.initializeData();
  }

  // Helper method to initialize with sample data
  private initializeData() {
    // Create sample destinations
    const destinations: InsertDestination[] = [
      {
        name: "Bali",
        country: "Indonesia",
        region: "Asia",
        emoji: "🇮🇩",
        description: "Beautiful beaches, lush rice terraces, and vibrant cultural experiences with warm hospitality.",
        image: "https://images.unsplash.com/photo-1604999333679-b86d54738315",
        tags: ["Beach", "Culture", "Nature"],
        rating: 5
      },
      {
        name: "Paris",
        country: "France",
        region: "Europe",
        emoji: "🇫🇷",
        description: "The city of lights offers world-class cuisine, art, and iconic landmarks.",
        image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
        tags: ["City", "Culture", "Food"],
        rating: 5
      },
      // Add more sample destinations
    ];
    
    destinations.forEach(dest => this.createDestination(dest));
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const createdAt = new Date();
    const user: User = { ...insertUser, id, createdAt };
    this.users.set(id, user);
    return user;
  }

  // Trip methods
  async getTrips(userId: number): Promise<Trip[]> {
    return Array.from(this.trips.values()).filter(
      (trip) => trip.userId === userId
    );
  }

  async getTripById(id: number): Promise<Trip | undefined> {
    return this.trips.get(id);
  }

  async createTrip(insertTrip: InsertTrip): Promise<Trip> {
    const id = this.currentTripId++;
    const createdAt = new Date();
    const trip: Trip = { ...insertTrip, id, createdAt };
    this.trips.set(id, trip);
    return trip;
  }

  async updateTrip(id: number, tripData: Partial<InsertTrip>): Promise<Trip | undefined> {
    const existingTrip = this.trips.get(id);
    if (!existingTrip) return undefined;
    
    const updatedTrip = { ...existingTrip, ...tripData };
    this.trips.set(id, updatedTrip);
    return updatedTrip;
  }

  async deleteTrip(id: number): Promise<boolean> {
    return this.trips.delete(id);
  }

  // Destination methods
  async getDestinations(): Promise<Destination[]> {
    return Array.from(this.destinations.values());
  }

  async getDestinationById(id: number): Promise<Destination | undefined> {
    return this.destinations.get(id);
  }

  async getDestinationsByRegion(region: string): Promise<Destination[]> {
    return Array.from(this.destinations.values()).filter(
      (destination) => destination.region.toLowerCase() === region.toLowerCase()
    );
  }

  async createDestination(insertDestination: InsertDestination): Promise<Destination> {
    const id = this.currentDestinationId++;
    const createdAt = new Date();
    const destination: Destination = { ...insertDestination, id, createdAt };
    this.destinations.set(id, destination);
    return destination;
  }

  // Itinerary methods
  async getItineraryItems(tripId: number): Promise<ItineraryItem[]> {
    return Array.from(this.itineraryItems.values())
      .filter(item => item.tripId === tripId)
      .sort((a, b) => {
        if (a.day !== b.day) return a.day - b.day;
        if (a.order !== b.order) return a.order - b.order;
        return 0;
      });
  }

  async createItineraryItem(insertItem: InsertItineraryItem): Promise<ItineraryItem> {
    const id = this.currentItineraryItemId++;
    const createdAt = new Date();
    const item: ItineraryItem = { ...insertItem, id, createdAt };
    this.itineraryItems.set(id, item);
    return item;
  }

  async updateItineraryItem(id: number, itemData: Partial<InsertItineraryItem>): Promise<ItineraryItem | undefined> {
    const existingItem = this.itineraryItems.get(id);
    if (!existingItem) return undefined;
    
    const updatedItem = { ...existingItem, ...itemData };
    this.itineraryItems.set(id, updatedItem);
    return updatedItem;
  }

  async deleteItineraryItem(id: number): Promise<boolean> {
    return this.itineraryItems.delete(id);
  }

  // Packing list methods
  async getPackingItems(tripId: number): Promise<PackingItem[]> {
    return Array.from(this.packingItems.values()).filter(
      (item) => item.tripId === tripId
    );
  }

  async createPackingItem(insertItem: InsertPackingItem): Promise<PackingItem> {
    const id = this.currentPackingItemId++;
    const createdAt = new Date();
    const item: PackingItem = { ...insertItem, id, createdAt };
    this.packingItems.set(id, item);
    return item;
  }

  async updatePackingItem(id: number, itemData: Partial<InsertPackingItem>): Promise<PackingItem | undefined> {
    const existingItem = this.packingItems.get(id);
    if (!existingItem) return undefined;
    
    const updatedItem = { ...existingItem, ...itemData };
    this.packingItems.set(id, updatedItem);
    return updatedItem;
  }

  async deletePackingItem(id: number): Promise<boolean> {
    return this.packingItems.delete(id);
  }

  // Expense methods
  async getExpenses(tripId: number): Promise<Expense[]> {
    return Array.from(this.expenses.values()).filter(
      (expense) => expense.tripId === tripId
    );
  }

  async createExpense(insertExpense: InsertExpense): Promise<Expense> {
    const id = this.currentExpenseId++;
    const createdAt = new Date();
    const expense: Expense = { ...insertExpense, id, createdAt };
    this.expenses.set(id, expense);
    return expense;
  }

  async updateExpense(id: number, expenseData: Partial<InsertExpense>): Promise<Expense | undefined> {
    const existingExpense = this.expenses.get(id);
    if (!existingExpense) return undefined;
    
    const updatedExpense = { ...existingExpense, ...expenseData };
    this.expenses.set(id, updatedExpense);
    return updatedExpense;
  }

  async deleteExpense(id: number): Promise<boolean> {
    return this.expenses.delete(id);
  }
}

export const storage = new MemStorage();
