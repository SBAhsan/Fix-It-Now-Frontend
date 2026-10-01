"use server";
import { api } from "@/lib/api";
import { TechnicianService } from "@/lib/types";

export async function getMyServices(): Promise<TechnicianService[]> {
  const res = await api("/api/technician/services", { cache: "no-store" });

  console.log("Res containing services: ", res);

  return res.success ? res.data : [];
}