"use server";
import { api } from "@/lib/api";
import { revalidatePath } from "next/cache";

export async function createService(payload: {
  title: string;
  description?: string;
  price: number;
  isActive: boolean;
  categoryId: string;
}) {
  const res = await api("/api/services", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  if (res.success) revalidatePath("/technician-dashboard/services");
  return res;
}