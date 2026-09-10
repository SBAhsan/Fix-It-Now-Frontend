"use server";

import { api } from "@/lib/api";

export async function getSingleTechnician(technicianId: string) {
    const res = await api(`/api/admin/technician/${technicianId}`, {
        cache: "no-store"
    });

    // console.log("Res Data: ", res.data);

    if(!res.success) return [];

    return res.data;
}