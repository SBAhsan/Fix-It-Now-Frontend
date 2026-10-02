"use server";

import { api } from "@/lib/api";
import { TechnicianBooking } from "@/lib/types";

export async function getMyBookings(): Promise<TechnicianBooking[]> {
  const res = await api("/api/technician/bookings", { cache: "no-store" });
  console.log("technician bookings:", JSON.stringify(res).slice(0, 500));
  return res.success ? res.data : [];
}