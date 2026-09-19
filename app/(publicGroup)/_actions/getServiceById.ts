"use server";
import { api } from "@/lib/api";
import { ServiceDetail } from "@/lib/types";

export async function getServiceById(id: string): Promise<ServiceDetail | null> {
  const res = await api(`/api/services/${id}`, { cache: "no-store" });
  return res.success ? res.data : null;
}