"use server";

import { api } from "@/lib/api";
import { LoginState, RegisterState } from "@/lib/types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

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
};

export const RegisterActions = async (
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

  await setAuthCookies(login.data);

  redirect("/dashboard");
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

  if (!res.success) {
    return {
      success: false,
      message: res.message,
    };
  }

  await setAuthCookies(res.data);

  redirect("/dashboard");
};

export const LogoutActions = async () => {
  const cookie = await cookies();

  cookie.delete("accessToken");

  cookie.delete("refreshToken");

  redirect("/login");
};
