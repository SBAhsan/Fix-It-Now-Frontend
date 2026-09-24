"use server";
import { api } from "@/lib/api";
import { TechnicianReview } from "@/lib/types";

export async function getMyReviews(): Promise<TechnicianReview[]> {
  const res = await api("/api/technician/reviews", { cache: "no-store" });
  return res.success ? res.data : [];
}