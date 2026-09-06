"use client";

import { useMemo, useState } from "react";
import {
  MoreHorizontal,
  Search,
  ShieldCheck,
  UserRound,
  Wrench,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AdminUser } from "@/lib/types";
import { EditUserDialog } from "./EditUserStatus";
import { updateUserStatus } from "@/service/admin/updateUserStatus";

const roleIcons = {
  ADMIN: ShieldCheck,
  TECHNICIAN: Wrench,
  CUSTOMER: UserRound,
};

export function UserTable({ users }: { users: AdminUser[] }) {
  const [query, setQuery] = useState("");
  const [role, setRole] = useState("All");
  const [editingUser, setEditingUser] = useState<AdminUser | null>(null);
  const filteredUsers = useMemo(
    () =>
      users.filter((user) => {
        const matchesQuery = `${user.name} ${user.email}`
          .toLowerCase()
          .includes(query.toLowerCase());
        return matchesQuery && (role === "All" || user.role === role);
      }),
    [query, role],
  );

  return (
    <section
      className="rounded-xl border border-border/70 bg-card p-5 shadow-sm"
      aria-labelledby="users-heading"
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2
            id="users-heading"
            className="text-lg font-semibold tracking-tight"
          >
            All users
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage customers, technicians, and admin access.
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <div className="relative">
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search users..."
              aria-label="Search users"
              className="pl-9 sm:w-64"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger render={<Button variant="outline" />}>
              Role: {role}
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter by role</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {(["All", "Admin", "Technician", "Customer"] as const).map(
                (option) => (
                  <DropdownMenuItem
                    key={option}
                    onSelect={() => setRole(option)}
                  >
                    {option}
                  </DropdownMenuItem>
                ),
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="mt-5 overflow-x-auto">
        <Table>
          <caption className="sr-only">All Fix It Now users</caption>
          <TableHeader>
            <TableRow className="bg-muted/40 hover:bg-muted/40">
              <TableHead>User</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => {
              const RoleIcon = roleIcons[user.role];
              return (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <RoleIcon aria-hidden="true" className="size-4" />
                      </div>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{user.role}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        user.status === "ACTIVE" ? "secondary" : "outline"
                      }
                    >
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {/* {user.joined} */}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        render={
                          <Button
                            variant="ghost"
                            size="icon"
                            aria-label={`Actions for ${user.name}`}
                          />
                        }
                      >
                        <MoreHorizontal />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View profile</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => {
                          console.log("Edit Status clicked for:", user.name);
                          setEditingUser(user)}}>
                          Edit Status
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        {filteredUsers.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted-foreground">
            No users match your search.
          </p>
        ) : null}
      </div>
      {editingUser && (
        <EditUserDialog
          user={editingUser}
          open={!!editingUser}
          onOpenChange={(open) => !open && setEditingUser(null)}
        />
      )}
    </section>
  );
}
