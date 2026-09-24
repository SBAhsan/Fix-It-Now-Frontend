"use server";

import { api } from "@/lib/api";
import { TechnicianBooking } from "@/lib/types";

export async function getMyBookings(): Promise<TechnicianBooking[]> {
  const res = await api("/api/technician/bookings", { cache: "no-store" });
  return res.success ? res.data : [];
}