"use client";

import { AdminBookingRow, MonthlyBookingCount } from "@/lib/types";
import { calculateTrendPercent } from "@/service/admin/calculateTrendPercent";
import { getRecentBookings } from "@/service/admin/getRecentBookings";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// const bookingData = [
//   { month: "Jan", bookings: 96 },
//   { month: "Feb", bookings: 124 },
//   { month: "Mar", bookings: 118 },
//   { month: "Apr", bookings: 156 },
//   { month: "May", bookings: 148 },
//   { month: "Jun", bookings: 184 },
//   { month: "Jul", bookings: 212 },
// ];

export function BookingsChart({
  bookingData,
}: {
  bookingData: MonthlyBookingCount[];
}) {

    const { percent, direction } = calculateTrendPercent(bookingData);

  return (
    <section
      className="rounded-xl border border-border/70 bg-card p-5 shadow-sm"
      aria-labelledby="bookings-trend-heading"
    >
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h2
            id="bookings-trend-heading"
            className="text-lg font-semibold tracking-tight"
          >
            Bookings trend
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Monthly service bookings across the platform.
          </p>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            direction === "up" ? "bg-accent text-accent-foreground" : "bg-destructive/10 text-destructive"
          }`}
        >
          {direction === "up" ? "+" : "-"}{percent}%
        </span>
      </div>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={bookingData}
            margin={{ top: 8, right: 8, left: -20, bottom: 0 }}
          >
            <CartesianGrid
              stroke="hsl(var(--border))"
              strokeDasharray="4 4"
              vertical={false}
            />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
            />
            <Tooltip
              cursor={{ stroke: "hsl(var(--primary))", strokeDasharray: "4 4" }}
              contentStyle={{
                borderRadius: "0.75rem",
                border: "1px solid hsl(var(--border))",
                backgroundColor: "hsl(var(--card))",
                color: "hsl(var(--foreground))",
              }}
            />
            <Line
              type="monotone"
              dataKey="bookings"
              stroke="hsl(var(--primary))"
              strokeWidth={3}
              dot={{ r: 4, fill: "hsl(var(--primary))", strokeWidth: 0 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
