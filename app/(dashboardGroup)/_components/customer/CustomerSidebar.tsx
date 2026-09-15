"use client";

import { useState } from "react";
import { User } from "@/lib/types";
import {
  CalendarCheck,
  CircleHelp,
  Home,
  LogOut,
  Menu,
  MessageCircle,
  Settings,
  Star,
  UserRound,
  Wrench,
  X,
} from "lucide-react";
import logo from "../../../../public/fix-it-now-logo.jpg"
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";

const items = [
  { label: "Dashboard", icon: Home },
  { label: "My bookings", icon: CalendarCheck, badge: "2" },
  { label: "Messages", icon: MessageCircle },
  { label: "My reviews", icon: Star },
];

export function CustomerSidebar({user} : {user : User}) {
  const [active, setActive] = useState("Dashboard");
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
        aria-label="Open customer navigation"
      >
        <Menu data-icon="inline-start" />
      </Button>
      {open ? (
        <button
          type="button"
          aria-label="Close customer navigation"
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
            <div>
              <Image src={logo} alt="fix-it-now-logo" className="h-8 w-35 bg-white"/>
              <p className="text-[11px] text-sidebar-foreground/50">
                Customer workspace
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setOpen(false)}
            aria-label="Close customer navigation"
          >
            <X data-icon="inline-start" />
          </Button>
        </div>
        <nav
          aria-label="Customer navigation"
          className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-6"
        >
          <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-sidebar-foreground/45">
            My workspace
          </p>
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.label;
            return (
              <button
                key={item.label}
                type="button"
                onClick={() => select(item.label)}
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
        <div className="flex flex-col gap-1 border-t border-sidebar-border p-3">
          <button
            type="button"
            className="flex min-h-10 items-center gap-3 rounded-lg px-3 text-sm font-medium text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          >
            <UserRound className="size-4" aria-hidden="true" />
            Profile
          </button>
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

export default CustomerSidebar;
