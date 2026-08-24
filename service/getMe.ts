import { api } from "@/lib/api";
import { decodeToken } from "@/lib/jwt";
import { User } from "@/lib/types";
import { cookies } from "next/headers";

export const getMe = async () : Promise<User | null> => {

    const cookie = await cookies();

    const token = cookie.get("accessToken")?.value;

    console.log("access token: ", token);

    if(!token) return null;

    const res = await api("/auth/me", {
        cache: "no-store",
        headers:{
            "Authorization": `Bearer ${token}`
        }
    })

    console.log("The response is: ", res);

    if(res.success) return res.data.user;

    return decodeToken(token) as User;
}