import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatCurrency = (
  amount: number,
  currency: string = "USD",
  locale: string = "en-US"
): string => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(amount);
};

export const formatDate = (
  date: Date | string,
  options: Intl.DateTimeFormatOptions = { 
    year: "numeric", 
    month: "short", 
    day: "numeric" 
  }
): string => {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("en-US", options).format(dateObj);
};

export function calculateDaysLeft(targetDate: Date | string): number {
  const target = typeof targetDate === "string" ? new Date(targetDate) : targetDate;
  const now = new Date();
  
  // Reset time to start of day for accurate day calculation
  target.setHours(0, 0, 0, 0);
  now.setHours(0, 0, 0, 0);
  
  const differenceMs = target.getTime() - now.getTime();
  return Math.ceil(differenceMs / (1000 * 60 * 60 * 24));
}

export function calculateTripDuration(startDate: Date | string, endDate: Date | string): number {
  const start = typeof startDate === "string" ? new Date(startDate) : startDate;
  const end = typeof endDate === "string" ? new Date(endDate) : endDate;
  
  // Reset time to start of day for accurate day calculation
  start.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);
  
  const differenceMs = end.getTime() - start.getTime();
  return Math.round(differenceMs / (1000 * 60 * 60 * 24)) + 1; // +1 to include both start and end days
}

export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 9);
};
