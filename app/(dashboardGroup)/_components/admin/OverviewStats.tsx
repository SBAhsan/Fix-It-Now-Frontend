"use server";

import { AdminOverviewStats } from "@/lib/types";
import { StatCard } from "../StatCard";
import { CalendarCheck, DollarSign, Users } from "lucide-react";

export async function OverviewStats({ stats }: { stats: AdminOverviewStats }) {

    console.log("The stats are: ", stats);

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      <StatCard label="Total users" value={String(stats.totalUsers)} icon={Users} />
      <StatCard label="Total bookings" value={String(stats.totalBookings)} icon={CalendarCheck} />
      <StatCard label="Total revenue" value={`$ ${stats.totalRevenue.toLocaleString()}`} icon={DollarSign} />
    </div>
  );
}