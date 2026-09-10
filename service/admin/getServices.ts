"use server";

import { api } from "@/lib/api";
import { AdminService } from "@/lib/types";

export const getServices = async () : Promise<AdminService[]> => {
  const res = await api("/api/admin/services", {
   cache: "no-store" 
  });
  if (!res.success) return [];
  return res.data;
}