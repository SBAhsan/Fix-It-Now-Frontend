import { api } from "@/lib/api";

export async function getSingleUser(technicianId: string) {
    const res = await api(`/api/admin/users/${technicianId}`, {
        cache: "no-store"
    });

    // console.log("Res Data: ", res.data);

    if(!res.success) return [];

    return res.data;
}