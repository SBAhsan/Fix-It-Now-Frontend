import { api } from "@/lib/api";
import { TCategory } from "@/lib/types";

export const getCategories = async () : Promise<TCategory[]> => {
  const res = await api<{categories : TCategory[]}>("/api/categories", {
   cache: "no-store" 
  });
  if (!res.success) return [];
  return res.data;
}