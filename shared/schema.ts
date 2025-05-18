import { pgTable, text, serial, integer, boolean, timestamp, json, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  preferences: jsonb("preferences").$type<{
    theme: 'light' | 'dark' | 'system';
    currency: string;
    language: string;
  }>(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const trips = pgTable("trips", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  title: text("title").notNull(),
  description: text("description"),
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date").notNull(),
  destination: text("destination").notNull(),
  coverImage: text("cover_image"),
  budget: integer("budget"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const destinations = pgTable("destinations", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  country: text("country").notNull(),
  region: text("region").notNull(),
  emoji: text("emoji"),
  description: text("description"),
  image: text("image"),
  tags: text("tags").array(),
  rating: integer("rating"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const itineraryItems = pgTable("itinerary_items", {
  id: serial("id").primaryKey(),
  tripId: integer("trip_id").references(() => trips.id),
  title: text("title").notNull(),
  day: integer("day").notNull(),
  startTime: timestamp("start_time"),
  endTime: timestamp("end_time"),
  location: text("location"),
  notes: text("notes"),
  type: text("type"),
  order: integer("order"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const packingItems = pgTable("packing_items", {
  id: serial("id").primaryKey(),
  tripId: integer("trip_id").references(() => trips.id),
  name: text("name").notNull(),
  category: text("category").notNull(),
  quantity: integer("quantity").default(1),
  isPacked: boolean("is_packed").default(false),
  isEssential: boolean("is_essential").default(false),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const expenses = pgTable("expenses", {
  id: serial("id").primaryKey(),
  tripId: integer("trip_id").references(() => trips.id),
  amount: integer("amount").notNull(),
  description: text("description"),
  category: text("category"),
  date: timestamp("date").defaultNow(),
  currency: text("currency").default("USD"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Insert types and schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  preferences: true,
});

export const insertTripSchema = createInsertSchema(trips).omit({
  id: true,
  createdAt: true,
});

export const insertDestinationSchema = createInsertSchema(destinations).omit({
  id: true,
  createdAt: true,
});

export const insertItineraryItemSchema = createInsertSchema(itineraryItems).omit({
  id: true,
  createdAt: true,
});

export const insertPackingItemSchema = createInsertSchema(packingItems).omit({
  id: true,
  createdAt: true,
});

export const insertExpenseSchema = createInsertSchema(expenses).omit({
  id: true,
  createdAt: true,
});

// Types
export type User = typeof users.$inferSelect;
export type Trip = typeof trips.$inferSelect;
export type Destination = typeof destinations.$inferSelect;
export type ItineraryItem = typeof itineraryItems.$inferSelect;
export type PackingItem = typeof packingItems.$inferSelect;
export type Expense = typeof expenses.$inferSelect;

export type InsertUser = z.infer<typeof insertUserSchema>;
export type InsertTrip = z.infer<typeof insertTripSchema>;
export type InsertDestination = z.infer<typeof insertDestinationSchema>;
export type InsertItineraryItem = z.infer<typeof insertItineraryItemSchema>;
export type InsertPackingItem = z.infer<typeof insertPackingItemSchema>;
export type InsertExpense = z.infer<typeof insertExpenseSchema>;
