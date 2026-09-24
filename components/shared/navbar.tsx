"use client";

import Link from "next/link";
import Image from "next/image";
import { Bell, LayoutDashboard, LogOut, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "@/lib/types";
import { getDashboardPath } from "@/lib/getDashboardPath";
import { logoutActions } from "@/app/(auth)/_actions/authActions";
import navLogo from "../../public/fix-it-now-logo.jpg";

const PUBLIC_NAV = [
  { label: "How it works", href: "/#how" },
  { label: "For technicians", href: "/#technicians" },
  { label: "Reviews", href: "/#reviews" },
];

const ROLE_NAV: Record<string, { label: string; href: string }[]> = {
  ADMIN: [
    { label: "Users", href: "/admin-dashboard/users" },
    { label: "Categories", href: "/admin-dashboard/categories" },
    { label: "Services", href: "/admin-dashboard/services" },
    { label: "Technicians", href: "/admin-dashboard/technician-moderation" },
  ],
  TECHNICIAN: [
    { label: "My services", href: "/technician-dashboard/services" },
    { label: "Bookings", href: "/technician-dashboard/bookings" },
    { label: "Availability", href: "/technician-dashboard/availability" },
  ],
  CUSTOMER: [
    { label: "Browse services", href: "/services" },
    { label: "My bookings", href: "/dashboard/bookings" },
    { label: "My reviews", href: "/dashboard/reviews" },
  ],
};

const NavBar = ({ user }: { user: User | null }) => {
  const navLinks = user ? (ROLE_NAV[user.role] ?? []) : PUBLIC_NAV;

  const initials = user?.name?.split(" ").map((p) => p[0]).join("").toUpperCase();

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="h-2 w-2 rounded-full bg-coral" />
          <Image
            src={navLogo}
            alt="fix-it-now-logo"
            className="h-8 w-35 bg-white"
          />
        </Link>

        <nav className="hidden gap-8 text-sm text-muted-foreground md:flex">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {user ? (
            <>
              <Button
                variant="outline"
                size="icon"
                aria-label="View notifications"
              >
                <Bell data-icon="inline-start" />
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <Button variant="ghost" className="gap-2 px-2">
                      <span className="flex size-8 items-center justify-center rounded-full bg-primary/15 text-xs font-bold text-primary">
                        {initials}
                      </span>
                      <span className="hidden text-sm font-medium sm:block">
                        {user.name}
                      </span>
                    </Button>
                  }
                />
                <DropdownMenuContent align="end">
                  <DropdownMenuGroup>
                    <DropdownMenuLabel>{user.role}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      render={
                        <Link
                          href={"/my-profile"}
                          className="flex items-center gap-2"
                        >
                          <UserRound className="size-4" aria-hidden="true" />
                          Profile
                        </Link>
                      }
                    />
                    <DropdownMenuItem
                      render={
                        <Link
                          href={getDashboardPath(user.role)}
                          className="flex items-center gap-2"
                        >
                          <LayoutDashboard className="size-4" />
                          Dashboard
                        </Link>
                      }
                    />
                    <DropdownMenuItem
                      variant="destructive"
                      onClick={() => logoutActions()}
                      className="flex items-center gap-2 text-destructive hover:bg-destructive/10"
                    >
                      <LogOut className="size-4" />
                      Sign out
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Button
                variant="ghost"
                render={<Link href="/login">Sign in</Link>}
                nativeButton={false}
              />
              <Button
                render={<Link href="/services">Book a service</Link>}
                nativeButton={false}
              />
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default NavBar;
