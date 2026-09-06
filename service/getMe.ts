import { api } from "@/lib/api";
import { verifyToken } from "@/lib/jwt";
import { User } from "@/lib/types";
import { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";

export const getMe = async () : Promise<User | null> => {

    const cookieStore = await cookies();

    const accessToken = cookieStore.get("accessToken")?.value;

    // console.log("access token: ", accessToken);

    if(!accessToken) return null;

    const res = await api("/api/auth/me", {
        cache: "no-cache",
        headers:{
            Authorization: `Bearer ${accessToken}`
        }
    })

    // console.log("The response is: ", res);

    if(res.success) return res.data;

    const verifiedAccessToken = verifyToken(
        accessToken as string,
        process.env.JWT_ACCESS_SECRET as string,
      ) as JwtPayload;

    return verifiedAccessToken as User;
}