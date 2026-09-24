"use server";
import { api } from "@/lib/api";
export async function createTechnicianProfile(payload: {
  bio: string;
  skills: string[];
  city: string;
  experienceYears: number;
}) {
  return api("/api/technician/create-profile", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
