import { BriefcaseBusiness, CircleCheck, Clock3, Users } from "lucide-react";

import AdminServicePlaceHolder from "../_components/admin/AdminServicePlaceHolder";
import { AdminStatCard } from "../_components/admin/AdminStatCard";
import { GreetingHeading } from "@/components/shared/GreetingHeading";
import { getMe } from "@/service/getMe";

const stats = [
  {
    label: "Total service requests",
    value: "248",
    trend: "+12.5%",
    icon: BriefcaseBusiness,
  },
  { label: "Active technicians", value: "36", trend: "+8.2%", icon: Users },
  {
    label: "Completed this month",
    value: "184",
    trend: "+16.8%",
    icon: CircleCheck,
  },
  {
    label: "Awaiting assignment",
    value: "24",
    trend: "-4.6%",
    trendDirection: "down" as const,
    icon: Clock3,
  },
];

export default async function AdminDashboardPage() {

    const user = await getMe();
    const userName = user?.name as string;

  return (
    <>
      <main className="flex-1 bg-muted/30 p-4 md:p-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-8">
          <section
            aria-labelledby="overview-heading"
            className="flex flex-col gap-1"
          >
            <h2
              id="overview-heading"
              className="text-2xl font-semibold tracking-tight text-foreground"
            >
              <GreetingHeading name={userName} />
            </h2>
            <p className="text-sm text-muted-foreground">
              Here&apos;s what&apos;s happening across Fix It Now today.
            </p>
          </section>
          <section
            aria-label="Dashboard statistics"
            className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
          >
            {stats.map((stat) => (
              <AdminStatCard key={stat.label} {...stat} />
            ))}
          </section>
          <AdminServicePlaceHolder />
        </div>
      </main>
    </>
  );
}
