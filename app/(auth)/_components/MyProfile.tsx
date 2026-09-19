"use client";

import {
  CalendarDays,
  CheckCircle2,
  Mail,
  Phone,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { User } from "@/lib/types";

function getInitials(name: string) {
  return name
    .trim()
    .split(/\\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export function MyProfile({
  profile
}: {
  profile : User | null;
}) {
  return (
    <section
      aria-labelledby="my-profile-heading"
      className="flex flex-col gap-6"
    >
      <Card className="overflow-hidden border-border/70 shadow-sm">
        <div className="h-24 bg-primary/10" aria-hidden="true" />
        <CardHeader className="-mt-12 flex flex-col gap-4 px-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex items-end gap-4">
            <div
              className="flex size-24 shrink-0 items-center justify-center rounded-2xl border-4 border-card bg-primary text-2xl font-semibold text-primary-foreground shadow-sm"
              aria-hidden="true"
            >
              {getInitials(profile!.name)}
            </div>
            <div className="pb-1">
              <CardTitle id="my-profile-heading" className="text-2xl">
                {profile!.name}
              </CardTitle>
              <CardDescription className="mt-1">
                {profile?.role === "ADMIN" ? "Admin Profile" : profile?.role === "CUSTOMER" ? "Customer Profile" : profile?.role === "TECHNICIAN" && "Technician Profile"}
              </CardDescription>
            </div>
          </div>
          <Badge
            variant={profile!.status === "ACTIVE" ? "default" : "secondary"}
            className="w-fit"
          >
            <CheckCircle2 data-icon="inline-start" aria-hidden="true" />
            {profile!.status}
          </Badge>
        </CardHeader>
        <CardContent className="grid gap-4 px-6 pb-6 pt-2 sm:grid-cols-2">
          <ProfileDetail
            icon={Mail}
            label="Email address"
            value={profile!.email}
          />
          <ProfileDetail
            icon={Phone}
            label="Phone number"
            value={profile!.phone}
          />
          <ProfileDetail
            icon={ShieldCheck}
            label="Account role"
            value={profile!.role}
          />
          <ProfileDetail
            icon={CalendarDays}
            label="Member since"
            value={profile!.createdAt}
          />
        </CardContent>
      </Card>

      <Card className="border-border/70 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <UserRound className="size-5 text-primary" aria-hidden="true" />
            Account information
          </CardTitle>
          <CardDescription>
            Your account details and latest profile update.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <ProfileDetail
            label="User ID"
            value="Available securely in your account"
          />
          <ProfileDetail
            label="Last updated"
            value={profile!.updatedAt ?? "Not available"}
          />
        </CardContent>
      </Card>
    </section>
  );
}

function ProfileDetail({
  icon: Icon,
  label,
  value,
}: {
  icon?: typeof Mail;
  label: string;
  value: string;
}) {
  return (
    <div className="flex min-w-0 items-start gap-3 rounded-xl border border-border/70 bg-muted/20 p-4">
      {Icon ? (
        <Icon
          className="mt-0.5 size-4 shrink-0 text-primary"
          aria-hidden="true"
        />
      ) : null}
      <div className="min-w-0">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {label}
        </p>
        <p className="mt-1 truncate text-sm font-medium text-foreground">
          {value}
        </p>
      </div>
    </div>
  );
}

export default MyProfile;
