/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { api } from "@/lib/api";
import { AdminOverviewStats } from "@/lib/types";

export async function getOverviewStats(): Promise<AdminOverviewStats> {
  const [usersRes, bookingsRes, paymentsRes] = await Promise.all([
    api("/api/admin/users", { cache: "no-store" }),
    api("/api/admin/bookings", { cache: "no-store" }),
    api("/api/payments", { cache: "no-store" }),
  ]);

  console.log("Users response from get overview stats: ", usersRes);
  console.log("Payments response from get overview stats: ", paymentsRes);

  const totalUsers = usersRes.success ? usersRes.data.length : 0;
  const totalBookings = bookingsRes.success ? bookingsRes.data.length : 0;

  const payments = paymentsRes.success ? paymentsRes.data : [];
  const totalRevenue = payments
    .filter((p: any) => p.status === "COMPLETED")
    .reduce((sum: number, p: any) => sum + Number(p.amount), 0);

  return { totalUsers, totalBookings, totalRevenue };
}
