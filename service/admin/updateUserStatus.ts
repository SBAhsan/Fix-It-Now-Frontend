"use server"

import { api } from "@/lib/api";
import { UserStatus } from "@/lib/types";
import { revalidatePath } from "next/cache";

export async function updateUserStatus (userId: string, status: UserStatus) {

    console.log("Updating user: ", userId, "to status", status);

    const res = await api(`/api/admin/users/${userId}`, {
        method: "PATCH",
        body: JSON.stringify({
            status
        })
    });

    console.log("Response after update: ", res);

    if(res.success) revalidatePath("/admin-dashboard/users");

    return res;
}