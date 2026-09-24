"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CalendarClock,
  CircleHelp,
  ClipboardList,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  Star,
  ToolCase,
  Wrench,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { logoutActions } from "@/app/(auth)/_actions/authActions";

const items = [
  { href: "/technician-dashboard", label: "Overview", icon: LayoutDashboard },
  {
    href: "/technician-dashboard/bookings",
    label: "Bookings",
    icon: ClipboardList,
  },
  {
    href: "/technician-dashboard/availability",
    label: "Availability",
    icon: CalendarClock,
  },
  {
    href: "/technician-dashboard/my-services",
    label: "My services",
    icon: Wrench,
  },
  { href: "/technician-dashboard/my-reviews", label: "Reviews", icon: Star },
  { href: "/technician-dashboard/profile", label: "Technician Profile", icon: ToolCase },
];

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function TechnicianSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className="fixed left-4 top-4 z-40 border-sidebar-border bg-sidebar md:hidden"
        onClick={() => setOpen(true)}
        aria-label="Open technician navigation"
      >
        <Menu data-icon="inline-start" />
      </Button>
      {open && (
        <button
          type="button"
          aria-label="Close technician navigation"
          className="fixed inset-0 z-40 bg-foreground/20 md:hidden"
          onClick={close}
        />
      )}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex h-screen w-72 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-transform md:sticky md:top-0 md:z-auto md:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-end p-3 md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={close}
            aria-label="Close technician navigation"
          >
            <X data-icon="inline-start" />
          </Button>
        </div>
        <nav
          aria-label="Technician navigation"
          className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-6"
        >
          <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-sidebar-foreground/45">
            My workspace
          </p>
          {items.map(({ href, label, icon: Icon }) => {
            const active = isActive(pathname, href);
            return (
              <Link
                key={href}
                href={href}
                onClick={close}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex min-h-10 items-center gap-3 rounded-lg px-3 text-left text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring",
                  active
                    ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                )}
              >
                <Icon className="size-4 shrink-0" aria-hidden="true" />
                <span className="flex-1 truncate">{label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="shrink-0 border-t border-sidebar-border p-3">
          <button
            type="button"
            className="flex min-h-10 items-center gap-3 rounded-lg px-3 text-sm font-medium text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          >
            <Settings className="size-4" aria-hidden="true" />
            Settings
          </button>
          <button
            type="button"
            className="flex min-h-10 items-center gap-3 rounded-lg px-3 text-sm font-medium text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          >
            <CircleHelp className="size-4" aria-hidden="true" />
            Help center
          </button>
          <button
            type="button"
            onClick={() => logoutActions()}
            className="mt-1 flex min-h-10 items-center gap-3 rounded-lg px-3 text-sm font-medium text-destructive hover:bg-destructive/10"
          >
            <LogOut className="size-4" aria-hidden="true" />
            Sign out
          </button>
        </div>
      </aside>
    </>
  );
}

export default TechnicianSidebar;
