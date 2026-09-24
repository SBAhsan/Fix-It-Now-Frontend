"use client";

import Link from "next/link";
import { ArrowRight, CalendarDays, Clock3, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TechnicianBooking, TechnicianBookingStatus } from "@/lib/types";

const statusVariants: Record<
  TechnicianBookingStatus,
  "default" | "secondary" | "outline" | "destructive"
> = {
  PENDING: "secondary",
  ACCEPTED: "default",
  DECLINED: "destructive",
  IN_PROGRESS: "default",
  COMPLETED: "outline",
  CANCELLED: "destructive",
};

export default function RecentBookingsPreview({
  bookings,
  limit = 3,
}: {
  bookings: TechnicianBooking[];
  limit?: number;
}) {
  const visible = bookings.slice(0, limit);

  return (
    <Card className="border-border/70 bg-card shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between gap-4 border-b border-border/60 px-5 py-4">
        <div>
          <CardTitle className="text-base">Recent bookings</CardTitle>
          <p className="mt-1 text-sm text-muted-foreground">
            Stay on top of your latest jobs.
          </p>
        </div>
        <Link
          href="/technician-dashboard/bookings"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
        >
          View all
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </CardHeader>
      <CardContent className="p-0">
        {visible.length === 0 ? (
          <div className="px-5 py-10 text-center text-sm text-muted-foreground">
            No bookings to show yet.
          </div>
        ) : (
          <ul className="divide-y divide-border/60">
            {visible.map((booking) => (
              <li key={booking.id} className="flex items-start gap-4 px-5 py-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <CalendarDays className="size-5" aria-hidden="true" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-medium text-foreground">
                      {booking.bookingItems
                        .map((i) => i.service.title)
                        .join(", ")}
                    </p>
                    <Badge variant={statusVariants[booking.status]}>
                      {booking.status.replace("_", " ")}
                    </Badge>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {booking.customer.name}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5">
                      <Clock3 className="size-3.5" aria-hidden="true" />
                      {new Date(booking.scheduledDate).toLocaleDateString()}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="size-3.5" aria-hidden="true" />
                      {booking.workAddress}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
