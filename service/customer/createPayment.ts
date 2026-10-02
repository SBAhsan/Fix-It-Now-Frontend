"use server";

import { api } from "@/lib/api";

export async function createPayment(bookingId: string) {
  return api("/api/payments/create", {
    method: "POST",
    body: JSON.stringify({ bookingId, provider: "Stripe" }),
  });
}