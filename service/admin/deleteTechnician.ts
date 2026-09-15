"use server";

import { api } from "@/lib/api";

export async function deleteTechnician(technicianId: string) {
    const res = await api(`/api/admin/technician/${technicianId}`, {
        method: "DELETE"
    });

    // console.log("Res Data: ", res.data);

    if(!res.success) return null;

    return res;
}