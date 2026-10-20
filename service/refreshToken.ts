import { api } from "@/lib/api";
import { cookies } from "next/headers";

export const getNewAccessToken = async () => {

    const cookieStore = await cookies();

    const refreshToken = cookieStore.get("refreshToken")?.value;

    if(!refreshToken) return null;

    const res = await api("/api/auth/me", {
        method: "POST",
        cache: "no-cache",
        headers:{
            Cookies: `refreshToken=${refreshToken}`
        }
    })

    if(res.success) return res.data;
}