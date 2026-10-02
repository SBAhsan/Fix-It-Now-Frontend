"use server";

import { api } from "@/lib/api";

export async function createReview(payload: {
  bookingId: string;
  rating: number;
  comment?: string;
}) {
  return api("/api/reviews", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
