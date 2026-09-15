"use client";

import { ShieldCheck, UserRound, Wrench } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AdminUser, UserRole } from "@/lib/types";
import { useTransition } from "react";
import { deleteTechnician } from "@/service/admin/deleteTechnician";
import { toast } from "@/components/ui/toast";
import Link from "next/link";
import { useRouter } from "next/navigation";

const roleIcons = {
  ADMIN: ShieldCheck,
  TECHNICIAN: Wrench,
  CUSTOMER: UserRound,
};

export default function AdminUserProfile({
  userProfile,
  currentRole = "ADMIN",
  open,
  onOpenChange,
}: {
  userProfile: AdminUser;
  currentRole?: UserRole;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const router = useRouter();

  if (currentRole !== "ADMIN") return null;

  const RoleIcon = roleIcons[userProfile.role];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md lg:max-w-max">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-full bg-primary/10 text-primary">
              <RoleIcon aria-hidden="true" className="size-5" />
            </div>
            <div>
              <DialogTitle>{userProfile.name}</DialogTitle>
              <DialogDescription>{userProfile.role}</DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <div className="grid gap-8 rounded-lg border border-border/70 bg-muted/20 p-4 md:grid-cols-2">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              User ID
            </p>
            <p className="mt-1 font-mono text-sm">{userProfile.id}</p>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Joined
            </p>
            <p className="mt-1 text-sm">
              {new Date(userProfile.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div className="sm:col-span-2">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Email
            </p>
            <p className="mt-1 text-sm">{userProfile.email}</p>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Role
            </p>
            <div className="mt-1">
              <Badge variant="outline">{userProfile.role}</Badge>
            </div>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Status
            </p>
            <div className="mt-1">
              <Badge
                variant={
                  userProfile.status === "ACTIVE" ? "default" : "outline"
                }
              >
                {userProfile.status}
              </Badge>
            </div>
          </div>
        </div>
        <DialogFooter>
          {userProfile.role === "TECHNICIAN" && (
            <Button
              variant="default"
              onClick={() =>
                router.push(`/admin-dashboard/technicians/${userProfile.id}`)
              }
            >
              Go to technician profile
            </Button>
          )}
          <DialogClose
            render={
              <Button variant="outline" type="button">
                Close
              </Button>
            }
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
