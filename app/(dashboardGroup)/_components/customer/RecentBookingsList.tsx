import { CalendarDays, ChevronRight, Clock3 } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CustomerBooking } from "@/lib/types";

const statusVariants: Record<
  CustomerBooking["status"],
  "default" | "secondary" | "outline" | "destructive"
> = {
  PENDING: "secondary",
  ACCEPTED: "default",
  DECLINED: "destructive",
  IN_PROGRESS: "default",
  COMPLETED: "outline",
  CANCELLED: "destructive",
};

export function RecentBookingsList( {bookings} : {bookings : CustomerBooking[]}) {
  return (
    <Card className="border-border/70 bg-card shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between gap-4 border-b border-border/60 px-5 py-4">
        <div>
          <CardTitle className="text-base">Recent bookings</CardTitle>
          <p className="mt-1 text-sm text-muted-foreground">
            Track your upcoming and completed services.
          </p>
        </div>
        <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
          {bookings.length} total
        </span>
      </CardHeader>
      <CardContent className="p-0">
        {bookings.length === 0 ? (
          <div className="px-5 py-10 text-sm text-muted-foreground flex justify-center items-center">
            <p>No bookings to show yet.</p>
          </div>
        ) : (
          <ul className="divide-y divide-border/60">
            {bookings.slice(0, 5).map((booking) => (
              <li key={booking.id}>
                <Link
                  href={`/dashboard/bookings/${booking.id}`}
                  className="flex w-full items-start gap-4 px-5 py-4 text-left transition-colors hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
                  aria-label={`View booking ${booking.id}`}
                >
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <CalendarDays aria-hidden="true" className="size-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-medium text-foreground">
                        {booking.bookingItems
                          .map((item) => item.service.title)
                          .join(", ")}
                      </h3>
                      <Badge variant={statusVariants[booking.status]}>
                        {booking.status}
                      </Badge>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {booking.technician.user.name}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1.5">
                        <Clock3 aria-hidden="true" className="size-3.5" />
                        {new Date(booking.scheduledDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <ChevronRight
                    aria-hidden="true"
                    className="mt-2 size-4 shrink-0 text-muted-foreground"
                  />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}

export default RecentBookingsList;
