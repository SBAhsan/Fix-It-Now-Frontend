"use server";
import { api } from "@/lib/api";
import { revalidatePath } from "next/cache";
import { TechnicianSlot } from "@/lib/types";

export async function getAvailability(): Promise<TechnicianSlot[]> {
  const res = await api("/api/technician/availability", { cache: "no-store" });
  return res.success ? res.data : [];
}




