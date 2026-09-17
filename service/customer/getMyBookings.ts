"use server";
import { api } from "@/lib/api";
import { CustomerBooking } from "@/lib/types";

export async function getMyBookings(): Promise<CustomerBooking[]> {
  const res = await api("/api/bookings/me", { cache: "no-store" });
  return res.success ? res.data : [];
}
