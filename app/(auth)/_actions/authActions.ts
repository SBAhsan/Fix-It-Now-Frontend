"use server";

import { api } from "@/lib/api";
import { verifyToken } from "@/lib/jwt";
import { LoginState, RegisterState, User } from "@/lib/types";
import { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type DecodedTokenPayload = {
  success: boolean;
  data: User;
};

const setAuthCookies = async ({
  accessToken,
  refreshToken,
}: {
  accessToken: string;
  refreshToken: string;
}) => {
  const cookie = await cookies();

  cookie.set("accessToken", accessToken, {
    httpOnly: true,
    maxAge: 60 * 60 * 24,
    sameSite: "lax",
  });

  cookie.set("refreshToken", refreshToken, {
    httpOnly: true,
    maxAge: 60 * 60 * 24,
    sameSite: "lax",
  });

  const verifiedAccessToken = verifyToken(
    accessToken,
    process.env.JWT_ACCESS_SECRET as string,
  ) as JwtPayload;

  return verifiedAccessToken;
};

export const registerActions = async (
  prevState: RegisterState,
  formData: FormData,
) => {
  const email = formData.get("email");
  const password = formData.get("password");

  const res = await api("/api/auth/register", {
    method: "POST",
    body: JSON.stringify({
      name: formData.get("name"),
      email,
      password,
      phone: formData.get("phone"),
      role: formData.get("role"),
    }),
  });

  if (!res.success) {
    return {
      success: false,
      message: "Registration failed",
    };
  }

  const login = await api("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const user = (await setAuthCookies(login.data)) as DecodedTokenPayload;
  const role = user.data.role;

  console.log("Type of role value: ", typeof role);

  if (role === "ADMIN") {
    redirect("/admin-dashboard");
  } else if (role === "TECHNICIAN") {
    redirect("/technician-dashboard");
  } else if (role === "CUSTOMER") {
    redirect("/dashboard");
  } else {
    return {
      success: false,
      message: "Unknown user role",
    };
  }
};

export const loginActions = async (
  prevState: LoginState,
  formData: FormData,
) => {
  const res = await api("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({
      email: formData.get("email"),
      password: formData.get("password"),
    }),
  });

  console.log("Response: ", res);

  if (!res.success) {
    return {
      success: false,
      message: res.message,
    };
  }

  const user = (await setAuthCookies(res.data)) as DecodedTokenPayload;
  const role = user.data.role;

  console.log("The role of current user is: ", role);
  console.log("Type of role value: ", typeof role);

  if (role === "ADMIN") {
    redirect("/admin-dashboard");
  } else if (role === "TECHNICIAN") {
    redirect("/technician-dashboard");
  } else if (role === "CUSTOMER") {
    redirect("/dashboard");
  } else {
    return {
      success: false,
      message: "Unknown user role",
    };
  }
};

export const logoutActions = async () => {
  const cookie = await cookies();

  cookie.delete("accessToken");

  cookie.delete("refreshToken");

  redirect("/login");
};
