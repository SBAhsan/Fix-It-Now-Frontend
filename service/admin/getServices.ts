import { api } from "@/lib/api";
import { AdminService } from "@/lib/types";

export const getCategories = async () : Promise<AdminService[]> => {
  const res = await api("/api/admin/services", {
   cache: "no-store" 
  });
  if (!res.success) return [];
  return res.data;
}