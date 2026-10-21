"use server";

import { api } from "@/lib/api";
import { CustomerPayment } from "@/lib/types";

export async function getPaymentById(
  id: string,
): Promise<CustomerPayment | null> {
  const res = await api(`/api/payments/${id}`, { cache: "no-store" });
  return res.success ? res.data : null;
}
