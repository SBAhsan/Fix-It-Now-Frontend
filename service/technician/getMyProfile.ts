"use server";
import { api } from "@/lib/api";

export async function getMyTechnicianProfile() {
  const res = await api("/api/technician/profile", { cache: "no-store" });
  
  return res.success ? res.data : null;
}