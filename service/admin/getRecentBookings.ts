/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "@/lib/api";
import { AdminBookingRow } from "@/lib/types";

export async function getRecentBookings(): Promise<AdminBookingRow[]> {
  const res = await api("/api/admin/bookings", { cache: "no-store" });
  if (!res.success) return [];

  return res.data.map((b: any) => ({
    id: b.id,
    customer: b.customer?.name ?? "Unknown",
    service: b.bookingItems?.[0]?.service?.title ?? "—",
    technician: b.technician?.user?.name ?? "Unassigned",
    status: b.status,
  }));
}