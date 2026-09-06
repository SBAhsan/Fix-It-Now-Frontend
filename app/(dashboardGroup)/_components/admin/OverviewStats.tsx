"use server";

import { AdminOverviewStats } from "@/lib/types";
import { AdminStatCard } from "./AdminStatCard";
import { CalendarCheck, DollarSign, Users } from "lucide-react";

export async function OverviewStats({ stats }: { stats: AdminOverviewStats }) {

    console.log("The stats are: ", stats);

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      <AdminStatCard label="Total users" value={String(stats.totalUsers)} icon={Users} />
      <AdminStatCard label="Total bookings" value={String(stats.totalBookings)} icon={CalendarCheck} />
      <AdminStatCard label="Total revenue" value={`$ ${stats.totalRevenue.toLocaleString()}`} icon={DollarSign} />
    </div>
  );
}