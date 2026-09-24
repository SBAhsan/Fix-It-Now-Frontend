"use server";

import { api } from "@/lib/api";
import { TechnicianBookingStatus } from "@/lib/types";
import { revalidatePath } from "next/cache";

export async function updateBookingStatus(id: string, status: TechnicianBookingStatus) {
  const res = await api(`/api/technician/bookings/${id}`, { method: "PATCH", body: JSON.stringify({ status }) });
  if (res.success) revalidatePath("/technician-dashboard/bookings");
  return res;
}