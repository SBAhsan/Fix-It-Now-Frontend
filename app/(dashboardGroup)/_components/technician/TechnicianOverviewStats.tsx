"use client";

import { CalendarClock, Clock3, Star } from "lucide-react";
import { StatCard } from "../StatCard";

type TechnicianBooking = {
  status: string;
  scheduledAt?: string | Date;
};

type TechnicianReview = {
  rating: number;
};

type TechnicianOverviewStatsProps = {
  bookings?: TechnicianBooking[];
  reviews?: TechnicianReview[];
};

const upcomingStatuses = new Set(["PENDING", "ACCEPTED", "IN_PROGRESS"]);

function isUpcomingBooking(booking: TechnicianBooking) {
  if (!upcomingStatuses.has(booking.status)) return false;
  if (!booking.scheduledAt) return true;

  const scheduledAt = new Date(booking.scheduledAt);
  return !Number.isNaN(scheduledAt.getTime()) && scheduledAt >= new Date();
}

export default function TechnicianOverviewStats({
  bookings = [],
  reviews = [],
}: TechnicianOverviewStatsProps) {
  const upcomingJobs = bookings.filter(isUpcomingBooking).length;
  const pendingRequests = bookings.filter(
    (booking) => booking.status === "PENDING",
  ).length;
  const averageRating = reviews.length
    ? reviews.reduce((total, review) => total + review.rating, 0) /
      reviews.length
    : 0;

  return (
    <section
      aria-labelledby="technician-overview-stats"
      className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
    >
      <h2 id="technician-overview-stats" className="sr-only">
        Technician overview statistics
      </h2>
      <StatCard
        label="Upcoming jobs"
        value={String(upcomingJobs)}
        trend="Live count"
        trendDirection="up"
        icon={CalendarClock}
        helperText="Accepted and in-progress bookings"
      />
      <StatCard
        label="Pending requests"
        value={String(pendingRequests)}
        trend={pendingRequests ? "Needs review" : "All clear"}
        trendDirection={pendingRequests ? "down" : "up"}
        icon={Clock3}
        helperText="Customer requests awaiting response"
      />
      <StatCard
        label="Average rating"
        value={averageRating ? averageRating.toFixed(1) : "—"}
        trend={
          reviews.length
            ? `${reviews.length} review${reviews.length === 1 ? "" : "s"}`
            : "No reviews yet"
        }
        trendDirection="up"
        icon={Star}
        helperText="Calculated from your reviews"
      />
    </section>
  );
}

export type {
  TechnicianBooking,
  TechnicianReview,
  TechnicianOverviewStatsProps,
};
