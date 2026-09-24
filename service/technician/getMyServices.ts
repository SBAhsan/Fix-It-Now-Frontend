"use server";
import { api } from "@/lib/api";
import { TechnicianService } from "@/lib/types";

export async function getMyServices(): Promise<TechnicianService[]> {
  const res = await api("/api/technician/services", { cache: "no-store" });
  return res.success ? res.data : [];
}