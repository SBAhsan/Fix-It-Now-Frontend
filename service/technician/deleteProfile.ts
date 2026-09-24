"use server";
import { api } from "@/lib/api";

export async function deleteTechnicianProfile() {
  return api("/api/technician/", { method: "DELETE" });
}