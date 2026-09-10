"use server";

import { api } from "@/lib/api";

export async function getSingleUser(userId: string) {
    const res = await api(`/api/admin/users/${userId}`, {
        cache: "no-store"
    });

    // console.log("Res Data: ", res.data);

    if(!res.success) return [];

    return res.data;
}