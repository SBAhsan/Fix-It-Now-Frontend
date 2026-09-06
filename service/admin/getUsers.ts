import { api } from "@/lib/api";
import { AdminUser } from "@/lib/types";

export async function getAllUsers() : Promise<AdminUser[]> {
    const res = await api("/api/admin/users", {
        cache: "no-store"
    });

    // console.log("Res Data: ", res.data);

    if(!res.success) return [];

    return res.data;
}