"use server";

import { api } from "@/lib/api";
import { TechnicianSlot } from "@/lib/types";
import { revalidatePath } from "next/cache";

export async function createSlot(payload: { slotDate: string; slotTime: string; isBooked: boolean }) {
  const res = await api("/api/technician/availability", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  if (res.success) revalidatePath("/technician-dashboard/availability");
  return res;
}