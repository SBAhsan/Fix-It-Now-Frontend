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

type NavItem = { label: string; icon: typeof LayoutDashboard; badge?: string };

const mainItems: NavItem[] = [
  { label: "Overview", icon: LayoutDashboard },
  { label: "User management", icon: Users },
  { label: "Category management", icon: Tag },
];

const serviceItems: NavItem[] = [
  { label: "Service oversight", icon: ClipboardList, badge: "12" },
  { label: "Technician moderation", icon: ShieldCheck },
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
  return (
    <div className="flex flex-col gap-2">
      <p className="px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-sidebar-foreground/45">
        {label}
      </p>
      <nav aria-label={label} className="flex flex-col gap-1">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.label;
          return (
            <button
              key={item.label}
              type="button"
              onClick={() => onSelect(item.label)}
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
                <span
                  className={cn(
                    "rounded-full px-1.5 py-0.5 text-[10px] font-bold",
                    isActive
                      ? "bg-sidebar-primary-foreground/15"
                      : "bg-sidebar-accent text-sidebar-foreground/60",
                  )}
                >
                  {item.badge}
                </span>
              ) : null}
            </button>
          );
        })}
      </nav>
    </div>
  );
}

export function AdminSidebar() {
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
            AM
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">Alex Morgan</p>
            <p className="truncate text-xs text-sidebar-foreground/50">
              Administrator
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

export function ServicePlaceholder() {
  return (
    <div className="flex flex-col gap-6 p-6 md:p-8">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-sidebar-primary">
          Good morning, Alex
        </p>
        <h2 className="text-3xl font-semibold tracking-tight text-balance">
          Keep every job moving.
        </h2>
        <p className="max-w-xl text-sm leading-6 text-muted-foreground">
          Your admin workspace for coordinating customers, technicians, and the
          services that connect them.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-border bg-card p-5">
          <p className="text-sm text-muted-foreground">Active requests</p>
          <p className="mt-3 text-3xl font-semibold">24</p>
          <p className="mt-2 text-xs text-sidebar-primary">+8% this week</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-5">
          <p className="text-sm text-muted-foreground">Technicians online</p>
          <p className="mt-3 text-3xl font-semibold">18</p>
          <p className="mt-2 text-xs text-muted-foreground">
            Across 4 service areas
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-5">
          <p className="text-sm text-muted-foreground">Open moderation</p>
          <p className="mt-3 text-3xl font-semibold">07</p>
          <p className="mt-2 text-xs text-destructive">Needs your attention</p>
        </div>
      </div>
      <div className="rounded-xl border border-dashed border-border bg-card/60 p-8 text-center">
        <FolderKanban
          className="mx-auto size-8 text-sidebar-primary"
          aria-hidden="true"
        />
        <h3 className="mt-4 font-semibold">
          Overview modules are ready to grow
        </h3>
        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
          This space will become your command center. We can add live requests,
          performance trends, and moderation queues one component at a time.
        </p>
      </div>
    </div>
  );
}
