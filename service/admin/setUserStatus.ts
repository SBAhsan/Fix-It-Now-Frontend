"use server";

import { api } from "@/lib/api";
import { UserStatus } from "@/lib/types";

export async function setUserStatus(userId: string, status: UserStatus) {
  return api(`/api/admin/users/${userId}`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
}