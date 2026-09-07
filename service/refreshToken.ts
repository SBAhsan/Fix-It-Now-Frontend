import { api } from "@/lib/api";
import { verifyToken } from "@/lib/jwt";
import { User } from "@/lib/types";
import { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";

export const getNewAccessToken = async () => {

    const cookieStore = await cookies();

    const refreshToken = cookieStore.get("refreshToken")?.value;

    // console.log("access token: ", accessToken);

    if(!refreshToken) return null;

    const res = await api("/api/auth/me", {
        method: "POST",
        cache: "no-cache",
        headers:{
            Cookies: `refreshToken=${refreshToken}`
        }
    })

    // console.log("The response is: ", res);

    if(res.success) return res.data;

    // const verifiedAccessToken = verifyToken(
    //     refreshToken as string,
    //     process.env.JWT_REFRESH_SECRET as string,
    //   ) as JwtPayload;

    // return verifiedAccessToken as User;
}