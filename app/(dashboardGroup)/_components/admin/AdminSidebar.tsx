"use client";

import { useState } from "react";
import {
  Bell,
  ChevronDown,
  CircleHelp,
  ClipboardList,
  FolderKanban,
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
import logo from "../../../../public/fix-it-now-logo.jpg"
import Image from "next/image";
import { User } from "@/lib/types";
import { usePathname } from "next/navigation";
import Link from "next/link";

type NavItem = { label: string; icon: typeof LayoutDashboard; badge?: string; href: string };

const mainItems: NavItem[] = [
  { label: "Overview", icon: LayoutDashboard, href: "/admin-dashboard" },
  { label: "User management", icon: Users, href: "/admin-dashboard/users" },
  { label: "Category management", icon: Tag, href: "/admin-dashboard/categories" },
];

const serviceItems: NavItem[] = [
  { label: "Service oversight", icon: ClipboardList, href: "/admin-dashboard/services", badge: "12" },
  { label: "Technician moderation", icon: ShieldCheck, href: "/admin-dashboard/technicians" },
];

function NavSection({
  label,
  items,
  active,
  onSelect,
}: {
  label: string;
  items: NavItem[];
  active: string;
  onSelect: (label: string) => void;
}) {

  const pathName = usePathname();

  return (
    <div className="flex flex-col gap-2">
      <p className="px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-sidebar-foreground/45">
        {label}
      </p>
      <nav aria-label={label} className="flex flex-col gap-1">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = pathName === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "group flex min-h-10 items-center gap-3 rounded-lg px-3 text-left text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring",
                isActive
                  ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
              )}
            >
              <Icon className="size-4 shrink-0" aria-hidden="true" />
              <span className="flex-1 truncate">{item.label}</span>
              {item.badge ? (
                <span className={cn(/* ... */)}>{item.badge}</span>
              ) : null}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

export function AdminSidebar({user} : {user : User}) {

  const [active, setActive] = useState("Overview");
  const [open, setOpen] = useState(false);

  const select = (label: string) => {
    setActive(label);
    setOpen(false);
  };

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
      {open ? (
        <button
          type="button"
          aria-label="Close admin navigation"
          className="fixed inset-0 z-40 bg-foreground/20 md:hidden"
          onClick={() => setOpen(false)}
        />
      ) : null}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-transform md:static md:z-auto md:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-20 items-center justify-between border-b border-sidebar-border px-5">
          <div className="flex items-center gap-3">
            {/* <div className="flex size-10 items-center justify-center rounded-xl bg-sidebar-primary text-sidebar-primary-foreground">
              <Wrench className="size-5" aria-hidden="true" />
            </div> */}
            <div>
              <Image src={logo} alt="fix-it-now-logo" className="h-8 w-35 bg-white"/>
              <p className="text-[11px] text-sidebar-foreground/50">
                Operations console
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setOpen(false)}
            aria-label="Close admin navigation"
          >
            <X data-icon="inline-start" />
          </Button>
        </div>
        <div className="flex items-center gap-3 border-b border-sidebar-border px-5 py-5">
          <div className="flex size-10 items-center justify-center rounded-full bg-sidebar-primary/15 text-sm font-bold text-sidebar-primary">
            {user?.name
                    .split(" ")
                    .map((part: string) => part[0])
                    .join("")
                    .toUpperCase()}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">{user?.name}</p>
            <p className="truncate text-xs text-sidebar-foreground/50">
              {user?.role}
            </p>
          </div>
          <ChevronDown
            className="size-4 text-sidebar-foreground/40"
            aria-hidden="true"
          />
        </div>
        <div className="flex flex-1 flex-col gap-7 overflow-y-auto px-3 py-6">
          <NavSection
            label="Workspace"
            items={mainItems}
            active={active}
            onSelect={select}
          />
          <NavSection
            label="Service operations"
            items={serviceItems}
            active={active}
            onSelect={select}
          />
        </div>
        <div className="flex flex-col gap-1 border-t border-sidebar-border p-3">
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


