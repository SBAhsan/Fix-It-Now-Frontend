"use client";

import { Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { User } from "@/lib/types";
import { useRouter } from "next/navigation";

export function AdminTopbar({ user, title }: { user: User, title: string }) {

  const router = useRouter();

  return (
    <div className="">
        <header className="flex min-h-20 items-center justify-between gap-4 border-b border-border bg-background px-4 pl-18 sm:px-6 sm:pl-18 md:pl-8">
      <div className="min-w-0">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
          {user.role && `${user.role} Dashboard`}
        </p>
        <h1 className="mt-1 truncate text-xl font-semibold tracking-tight">
          {title}
        </h1>
      </div>
      <div className="flex items-center gap-2 sm:gap-3">
        <label className="relative hidden w-52 items-center md:flex lg:w-64">
          <Search
            className="pointer-events-none absolute left-3 size-4 text-muted-foreground"
            aria-hidden="true"
          />
          <span className="sr-only">Search dashboard</span>
          <input
            type="search"
            placeholder="Search dashboard"
            className="h-10 w-full rounded-lg border border-border bg-muted/30 pl-9 pr-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </label>
        <Button
          variant="outline"
          size="icon"
          className="relative shrink-0"
          aria-label="View notifications"
        >
          <Bell data-icon="inline-start" />
          <span
            className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-primary"
            aria-hidden="true"
          />
        </Button>
        <button
          type="button"
          onClick={() => router.push("/my-profile")}
          className="flex items-center gap-2 rounded-lg p-1.5 text-left transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="Open Alex Morgan profile"
        >
          <span className="flex size-9 items-center justify-center rounded-full bg-primary/15 text-xs font-bold text-primary">
            {user?.name
                    .split(" ")
                    .map((part: string) => part[0])
                    .join("")
                    .toUpperCase()}
          </span>
          <span className="hidden text-sm font-medium lg:block">
            {user.name}
          </span>
        </button>
      </div>
    </header>
    </div>
  );
}
