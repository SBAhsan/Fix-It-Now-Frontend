import { api } from "@/lib/api";
import { TechnicianSlot } from "@/lib/types";

export async function getAllSlots() : Promise<TechnicianSlot[]> {
    const res = await api("/api/technician/availability", {
        cache: "no-store"
    });

    if(!res.success) return [];

    return res.data;
}