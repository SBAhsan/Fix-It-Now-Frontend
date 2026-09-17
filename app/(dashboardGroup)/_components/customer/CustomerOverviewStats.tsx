import { CalendarDays, CreditCard, Star, Wrench } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export type CustomerOverviewStatsProps = {
  upcomingBookings?: number;
  totalSpent?: string;
  completedServices?: number;
  averageRating?: string;
};

export function CustomerOverviewStats({
  upcomingBookings,
  totalSpent,
  completedServices,
  averageRating,
}: CustomerOverviewStatsProps) {
  const stats = [
    {
      label: "Upcoming bookings",
      value: String(upcomingBookings),
      helper: "Scheduled services",
      icon: CalendarDays,
    },
    {
      label: "Total spent",
      value: totalSpent,
      helper: "Across all services",
      icon: CreditCard,
    },
    {
      label: "Completed services",
      value: String(completedServices),
      helper: "Services received",
      icon: Wrench,
    },
    {
      label: "Average rating",
      value: averageRating,
      helper: "Your service ratings",
      icon: Star,
    },
  ];

  return (
    <section
      aria-labelledby="customer-overview-stats"
      className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4"
    >
      <h2 id="customer-overview-stats" className="sr-only">
        Customer overview statistics
      </h2>
      {stats.map(({ label, value, helper, icon: Icon }) => (
        <Card key={label} className="border-border/70 bg-card shadow-sm">
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Icon aria-hidden="true" className="size-5" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-xs font-medium text-muted-foreground">
                {label}
              </p>
              <p className="mt-0.5 text-xl font-semibold tracking-tight text-foreground">
                {value ? `${value}` : '0'}
              </p>
              <p className="truncate text-xs text-muted-foreground">{helper}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </section>
  );
}

export default CustomerOverviewStats;
