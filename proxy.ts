import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { Role } from './lib/types';
import { decodeToken } from './lib/jwt';


const AUTH_ROUTES = ["/login", "/register"];

const ROLE_BASED_ROUTES : Record<string, Role[]> = {
    "/dashboard": ["ADMIN", "TECHNICIAN", "CUSTOMER"],
    "/admin": ["ADMIN"],
    "/technician": ["TECHNICIAN"],
    "/customer": ["CUSTOMER"]
}

const matches = (pathName: string, route: string) => pathName === route || pathName.startsWith(`${route}/`);

export function proxy(request: NextRequest) {

    const goTo = (path: string) => NextResponse.redirect(new URL(path, request.url));

    const { pathname } = request.nextUrl;

    const token = request.cookies.get("accessToken")?.value;
    const role = token ? decodeToken(token)?.role : undefined;
    
    // const role = decodeToken(request.cookies.get("accessToken")!.value)?.role;

    if(AUTH_ROUTES.includes(pathname)){
        return role ? goTo("/dashboard") : NextResponse.next();
    }

    const allowedRoles = Object.entries(ROLE_BASED_ROUTES).find(([route]) => matches(pathname, route))?.[1];

    if(!allowedRoles) return NextResponse.next();

    if(!role) return goTo("/login");

    if(!allowedRoles.includes(role)) return goTo("/");
}
 
 
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}