"use server";

import { api } from "@/lib/api";
import { revalidatePath } from "next/cache";

export async function updateCategoryStatus(id: string, isActive: boolean) {
  const res = await api(`/api/admin/categories/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ isActive }),
  });

  if (res.success) revalidatePath("/admin-dashboard/categories");
  return res;
}