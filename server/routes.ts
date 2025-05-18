import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertTripSchema, insertDestinationSchema, insertItineraryItemSchema, 
  insertPackingItemSchema, insertExpenseSchema 
} from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Destinations routes
  app.get("/api/destinations", async (req, res) => {
    try {
      const region = req.query.region as string | undefined;
      let destinations;
      
      if (region) {
        destinations = await storage.getDestinationsByRegion(region);
      } else {
        destinations = await storage.getDestinations();
      }
      
      res.json(destinations);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch destinations" });
    }
  });

  app.get("/api/destinations/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const destination = await storage.getDestinationById(id);
      
      if (!destination) {
        return res.status(404).json({ message: "Destination not found" });
      }
      
      res.json(destination);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch destination" });
    }
  });

  // Trips routes
  app.get("/api/trips", async (req, res) => {
    try {
      // In a real app we would use the authenticated user's ID
      // For demo, just use a hardcoded user ID
      const userId = 1;
      const trips = await storage.getTrips(userId);
      res.json(trips);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch trips" });
    }
  });

  app.get("/api/trips/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const trip = await storage.getTripById(id);
      
      if (!trip) {
        return res.status(404).json({ message: "Trip not found" });
      }
      
      res.json(trip);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch trip" });
    }
  });

  app.post("/api/trips", async (req, res) => {
    try {
      const validatedData = insertTripSchema.parse(req.body);
      const trip = await storage.createTrip(validatedData);
      res.status(201).json(trip);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid trip data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create trip" });
    }
  });

  app.put("/api/trips/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validatedData = insertTripSchema.partial().parse(req.body);
      const trip = await storage.updateTrip(id, validatedData);
      
      if (!trip) {
        return res.status(404).json({ message: "Trip not found" });
      }
      
      res.json(trip);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid trip data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update trip" });
    }
  });

  app.delete("/api/trips/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteTrip(id);
      
      if (!success) {
        return res.status(404).json({ message: "Trip not found" });
      }
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete trip" });
    }
  });

  // Itinerary items routes
  app.get("/api/trips/:tripId/itinerary", async (req, res) => {
    try {
      const tripId = parseInt(req.params.tripId);
      const itineraryItems = await storage.getItineraryItems(tripId);
      res.json(itineraryItems);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch itinerary items" });
    }
  });

  app.post("/api/trips/:tripId/itinerary", async (req, res) => {
    try {
      const tripId = parseInt(req.params.tripId);
      const data = { ...req.body, tripId };
      const validatedData = insertItineraryItemSchema.parse(data);
      const item = await storage.createItineraryItem(validatedData);
      res.status(201).json(item);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid itinerary item data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create itinerary item" });
    }
  });

  app.put("/api/itinerary/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validatedData = insertItineraryItemSchema.partial().parse(req.body);
      const item = await storage.updateItineraryItem(id, validatedData);
      
      if (!item) {
        return res.status(404).json({ message: "Itinerary item not found" });
      }
      
      res.json(item);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid itinerary item data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update itinerary item" });
    }
  });

  app.delete("/api/itinerary/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteItineraryItem(id);
      
      if (!success) {
        return res.status(404).json({ message: "Itinerary item not found" });
      }
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete itinerary item" });
    }
  });

  // Packing items routes
  app.get("/api/trips/:tripId/packing", async (req, res) => {
    try {
      const tripId = parseInt(req.params.tripId);
      const packingItems = await storage.getPackingItems(tripId);
      res.json(packingItems);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch packing items" });
    }
  });

  app.post("/api/trips/:tripId/packing", async (req, res) => {
    try {
      const tripId = parseInt(req.params.tripId);
      const data = { ...req.body, tripId };
      const validatedData = insertPackingItemSchema.parse(data);
      const item = await storage.createPackingItem(validatedData);
      res.status(201).json(item);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid packing item data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create packing item" });
    }
  });

  app.put("/api/packing/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validatedData = insertPackingItemSchema.partial().parse(req.body);
      const item = await storage.updatePackingItem(id, validatedData);
      
      if (!item) {
        return res.status(404).json({ message: "Packing item not found" });
      }
      
      res.json(item);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid packing item data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update packing item" });
    }
  });

  app.delete("/api/packing/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deletePackingItem(id);
      
      if (!success) {
        return res.status(404).json({ message: "Packing item not found" });
      }
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete packing item" });
    }
  });

  // Expenses routes
  app.get("/api/trips/:tripId/expenses", async (req, res) => {
    try {
      const tripId = parseInt(req.params.tripId);
      const expenses = await storage.getExpenses(tripId);
      res.json(expenses);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch expenses" });
    }
  });

  app.post("/api/trips/:tripId/expenses", async (req, res) => {
    try {
      const tripId = parseInt(req.params.tripId);
      const data = { ...req.body, tripId };
      const validatedData = insertExpenseSchema.parse(data);
      const expense = await storage.createExpense(validatedData);
      res.status(201).json(expense);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid expense data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create expense" });
    }
  });

  app.put("/api/expenses/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validatedData = insertExpenseSchema.partial().parse(req.body);
      const expense = await storage.updateExpense(id, validatedData);
      
      if (!expense) {
        return res.status(404).json({ message: "Expense not found" });
      }
      
      res.json(expense);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid expense data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update expense" });
    }
  });

  app.delete("/api/expenses/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteExpense(id);
      
      if (!success) {
        return res.status(404).json({ message: "Expense not found" });
      }
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete expense" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
