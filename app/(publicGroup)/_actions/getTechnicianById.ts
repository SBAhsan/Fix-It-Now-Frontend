"use server";

import { api } from "@/lib/api";
import { PublicTechnician } from "@/lib/types";

export async function getTechnicianById(id: string): Promise<PublicTechnician | null> {
  const res = await api(`/api/technician/${id}`, { cache: "no-store" });
  return res.success ? res.data : null;
}