"use server";

import { api } from "@/lib/api";

export async function getSingleUser(userId: string) {
    const res = await api(`/api/admin/users/${userId}`, {
        cache: "no-store"
    });

    if(!res.success) return null;

    return res.data;
}