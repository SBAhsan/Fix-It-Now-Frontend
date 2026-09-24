"use server";
import { api } from "@/lib/api";
import { revalidatePath } from "next/cache";

export async function updateTechnicianProfile(payload: {
  bio?: string;
  skills?: string[];
  city?: string;
  experienceYears?: number;
}) {
  const res = await api("/api/technician/profile", { method: "PATCH", body: JSON.stringify(payload) });
  if (res.success) revalidatePath("/technician-dashboard/profile");
  return res;
}