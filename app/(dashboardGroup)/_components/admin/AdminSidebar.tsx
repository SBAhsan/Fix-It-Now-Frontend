"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CircleHelp,
  ClipboardList,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  ShieldCheck,
  Tag,
  Users,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { User } from "@/lib/types";
import { logoutActions } from "@/app/(auth)/_actions/authActions";

type NavItem = { label: string; icon: typeof LayoutDashboard; href: string };

const mainItems: NavItem[] = [
  { label: "Overview", icon: LayoutDashboard, href: "/admin-dashboard" },
  { label: "User management", icon: Users, href: "/admin-dashboard/users" },
  {
    label: "Category management",
    icon: Tag,
    href: "/admin-dashboard/categories",
  },
];

const serviceItems: NavItem[] = [
  {
    label: "Service oversight",
    icon: ClipboardList,
    href: "/admin-dashboard/services",
  },
  {
    label: "Technician moderation",
    icon: ShieldCheck,
    href: "/admin-dashboard/technicians",
  },
];

function NavSection({
  label,
  items,
  pathname,
  onNavigate,
}: {
  label: string;
  items: NavItem[];
  pathname: string;
  onNavigate: () => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <p className="px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-sidebar-foreground/45">
        {label}
      </p>
      <nav aria-label={label} className="flex flex-col gap-1">
        {items.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex min-h-10 items-center gap-3 rounded-lg px-3 text-left text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring",
                active
                  ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
              )}
            >
              <Icon className="size-4 shrink-0" aria-hidden="true" />
              <span className="flex-1 truncate">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

export function AdminSidebar({ user }: { user: User }) {
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
        aria-label="Open admin navigation"
      >
        <Menu data-icon="inline-start" />
      </Button>
      {open && (
        <button
          type="button"
          aria-label="Close admin navigation"
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
            aria-label="Close admin navigation"
          >
            <X data-icon="inline-start" />
          </Button>
        </div>
        <div className="flex flex-1 flex-col gap-7 overflow-y-auto px-3 py-6">
          <NavSection
            label="Workspace"
            items={mainItems}
            pathname={pathname}
            onNavigate={close}
          />
          <NavSection
            label="Service operations"
            items={serviceItems}
            pathname={pathname}
            onNavigate={close}
          />
        </div>
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
