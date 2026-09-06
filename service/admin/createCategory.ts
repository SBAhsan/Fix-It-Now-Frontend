import { api } from "@/lib/api";

export async function createCategory(formData: FormData) {
  try {
    const name = formData.get("name");
    const description = formData.get("description");
    const isActive = formData.get("isActive");

    const res = await api("/api/admin/categories", {
      method: "POST",
      body: JSON.stringify({
        name,
        description,
        isActive,
      }),
    });

    return res.data;
  } catch (error) {
    return error;
  }
}
