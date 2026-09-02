import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { Role } from "./lib/types";
import { verifyToken } from "./lib/jwt";
import { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";

const AUTH_ROUTES = ["/login", "/register"];

const PUBLIC_ROUTES = ["/"];

// const ADMIN_ROUTES = ["/admin-dashboard"];
// const TECHNICIAN_ROUTES = ["/technician-dashboard"];
// const CUSTOMER_ROUTES = ["/dashboard"];

const ROLE_BASED_ROUTES: Record<string, Role[]> = {
//   "/dashboard": ["ADMIN", "TECHNICIAN", "CUSTOMER"],
  "/admin-dashboard": ["ADMIN"],
  "/technician-dashboard": ["TECHNICIAN"],
  "/dashboard": ["CUSTOMER"],
};

const matches = (pathName: string, route: string) =>
  pathName === route || pathName.startsWith(`${route}/`);

export async function proxy(request: NextRequest) {
  const goTo = (path: string) =>
    NextResponse.redirect(new URL(path, request.url));

  const cookieStore = await cookies();

  const { pathname } = request.nextUrl;

  const accessToken = request.cookies.get("accessToken")?.value;

  const verifiedAccessToken = accessToken ? verifyToken(
    accessToken as string,
    process.env.JWT_ACCESS_SECRET as string,
  ) as JwtPayload : null;

  console.log("The verified token: ", verifiedAccessToken);

  // const role = verifiedAccessToken ? verifiedAccessToken.data!.role : undefined;

  let userRole = null;

  if (!verifiedAccessToken?.success) {
    cookieStore.delete("accessToken");
  }

  if (verifiedAccessToken?.success && verifiedAccessToken.data) {
    userRole = verifiedAccessToken.data.role;
  }

  // const role = decodeToken(request.cookies.get("accessToken")!.value)?.role;

  // if(AUTH_ROUTES.includes(pathname)){
  //     return role ? goTo("/dashboard") : NextResponse.next();
  // }

  const allowedRoles = Object.entries(ROLE_BASED_ROUTES).find(([route]) =>
    matches(pathname, route),
  )?.[1];

  if (!allowedRoles) return NextResponse.next();

  if (!userRole) return goTo("/login");

  if (!allowedRoles.includes(userRole)) return goTo("/");

  if (accessToken && AUTH_ROUTES.includes(pathname)) {
    if (userRole === "CUSTOMER") {
      return goTo("/dashboard");
    } else if (userRole === "ADMIN") {
      return goTo("/admin-dashboard");
    } else if (userRole === "TECHNICIAN") {
      return goTo("/technician-dashboard");
    } 
    // else {
    //   return goTo("/");
    // }
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
