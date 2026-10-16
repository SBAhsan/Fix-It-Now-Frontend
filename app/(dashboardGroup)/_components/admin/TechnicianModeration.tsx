"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "@/components/ui/toast";
import { AdminUser } from "@/lib/types";
import { setUserStatus } from "@/service/admin/setUserStatus";

type Technician = {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  isBanned: boolean;
};

export default function TechnicianModeration({
  technicians,
}: {
  technicians: AdminUser[];
}) {
  const router = useRouter();
  const [busyId, setBusyId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function toggleBan(tech: AdminUser) {
    const banned = tech.status === "BANNED";
    setBusyId(tech.id);
    startTransition(async () => {
      const res = await setUserStatus(tech.id, banned ? "UNBANNED" : "BANNED");
      if (res.success) {
        toast.add({
          type: "success",
          title: banned ? "Technician unbanned" : "Technician banned",
        });
        router.refresh();
      } else {
        toast.add({
          type: "error",
          title: res.message ?? "Something went wrong",
        });
      }
      setBusyId(null);
    });
  }

  return (
    <Card className="border-border/70 bg-card shadow-sm">
      <CardHeader>
        <CardTitle>Technicians</CardTitle>
        <CardDescription>
          Review technician accounts and ban anyone who breaks the rules.
        </CardDescription>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        {technicians.length === 0 ? (
          <div className="flex flex-col items-center gap-3 rounded-lg border border-dashed p-10 text-center">
            <Users className="size-8 text-primary" aria-hidden="true" />
            <p className="font-medium">No technicians yet</p>
            <p className="text-sm text-muted-foreground">
              New technician accounts will show up here.
            </p>
          </div>
        ) : (
          <Table className="min-w-[680px]">
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {technicians.map((tech) => (
                <TableRow key={tech.id}>
                  <TableCell className="font-medium">{tech.name}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {tech.email}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {tech.phone ?? "—"}
                  </TableCell>
                  <TableCell>
                    <Badge variant={tech.status === "BANNED" ? "destructive" : "default"}>
                      {tech.status === "BANNED" ? "Banned" : "Active"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        render={
                          <Link
                            href={`/admin-dashboard/technicians/${tech.id}`}
                          >
                            Profile
                          </Link>
                        }
                        nativeButton={false}
                      />
                      <Button
                        size="sm"
                        variant="outline"
                        disabled={isPending && busyId === tech.id}
                        onClick={() => toggleBan(tech)}
                      >
                        {tech.status === "BANNED" ? "Unban" : "Ban"}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
