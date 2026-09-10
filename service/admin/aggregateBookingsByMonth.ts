import { AdminBookingRow, MonthlyBookingCount } from "@/lib/types";



export function aggregateBookingsByMonth(bookings: AdminBookingRow[]): MonthlyBookingCount[] {
  const counts: Record<string, number> = {};

  bookings.forEach((b) => {
    const date = new Date(b.createdAt); // needs a real date field — see #3 below
    const month = date.toLocaleString("default", { month: "short" });
    counts[month] = (counts[month] ?? 0) + 1;
  });

  return Object.entries(counts).map(([month, bookings]) => ({ month, bookings }));
}