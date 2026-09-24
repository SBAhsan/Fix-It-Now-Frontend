"use server";

import { api } from "@/lib/api";
import { TechnicianBooking } from "@/lib/types";

export async function getBookingById(id: string): Promise<TechnicianBooking | null> {
  const res = await api(`/api/technician/bookings/${id}`, { cache: "no-store" });
  return res.success ? res.data : null;
}
