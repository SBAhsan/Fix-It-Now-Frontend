import { api } from "@/lib/api";
import { PublicService } from "@/lib/types";

export async function getServices(searchParams?: Record<string, string>): Promise<PublicService[]> {
  const query = searchParams ? `?${new URLSearchParams(searchParams).toString()}` : "";
  const res = await api(`/api/services${query}`, { cache: "no-store" });
  return res.success ? res.data : [];
}