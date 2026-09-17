"use server";
import { api } from "@/lib/api";
import { CustomerPayment } from "@/lib/types";

export async function getMyPayments(): Promise<CustomerPayment[]> {
  const res = await api("/api/payments/", { cache: "no-store" });
  return res.success ? res.data : [];
}
