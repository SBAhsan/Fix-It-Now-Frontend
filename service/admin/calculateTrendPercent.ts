import { MonthlyBookingCount } from "@/lib/types";

export function calculateTrendPercent(bookingData: MonthlyBookingCount[]): {
  percent: number;
  direction: "up" | "down";
} {
  if (bookingData.length < 2) return { percent: 0, direction: "up" };

  const current = bookingData[bookingData.length - 1].bookings;
  const previous = bookingData[bookingData.length - 2].bookings;

  if (previous === 0) return { percent: 0, direction: "up" };

  const change = ((current - previous) / previous) * 100;

  return {
    percent: Math.abs(Math.round(change * 10) / 10), // one decimal place
    direction: change >= 0 ? "up" : "down",
  };
}