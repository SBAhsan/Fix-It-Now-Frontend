"use server";

import { api } from "@/lib/api";

export async function getTechnicianProfile(userId: string) {
  const res = await api(`/api/admin/technician/${userId}`, { cache: "no-store" });
  if (!res.success) return null;
  return res.data;
}