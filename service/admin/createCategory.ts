"use server"

import { api } from "@/lib/api";
import { revalidatePath } from "next/cache";

export async function createCategory(formData: FormData) {

  console.log("Raw isActive value:", formData.get("isActive"));

  const name = formData.get("name");
    const description = formData.get("description");
    const isActive = formData.get("isActive") === "on";

    const res = await api("/api/admin/categories", {
      method: "POST",
      body: JSON.stringify({
        name,
        description,
        isActive,
      }),
    });

    if (res.success) revalidatePath("/admin-dashboard/categories");

    return res;
}
