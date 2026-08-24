import { api } from "@/lib/api";
import { User } from "@/lib/types";
import { cookies } from "next/headers";

export const getMe = async () : Promise<User | null> => {

    const cookie = await cookies();

    const token = cookie.get("accessToken")?.value;

    if(!token) return null;

    const res = await api("/auth/me", {
        cache: "no-store",
        headers:{
            "Authorization": `Bearer ${token}`
        }
    })

    if(!res.success) return null;

    return res.data.user;
}