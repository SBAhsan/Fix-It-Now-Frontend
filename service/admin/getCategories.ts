import { api } from "@/lib/api";

export const getCategories = async () => {
  const res = await api("/api/admin/categories", {
   cache: "no-store" 
  });
  if (!res.success) return [];
  return res.data;
}