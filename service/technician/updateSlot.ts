"use server";

import { api } from "@/lib/api";
import { revalidatePath } from "next/cache";

export async function updateSlot(
  id: string,
  payload: { slotDate?: string; slotTime?: string; isBooked?: boolean },
) {
  const res = await api("/api/technician/availability", {
    method: "PUT",
    body: JSON.stringify({ id, ...payload }),
  });
  if (res.success) revalidatePath("/technician-dashboard/availability");
  return res;
}