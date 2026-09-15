"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Wrench, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AdminTechnicianProfile } from "@/lib/types";
import { deleteTechnician } from "@/service/admin/deleteTechnician";
import { toast } from "@/components/ui/toast";

export function AdminTechnicianProfileCard({
  technician,
}: {
  technician: AdminTechnicianProfile;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    startTransition(async () => {
      const res = await deleteTechnician(technician.id);
      if (res?.success) {
        router.push("/admin-dashboard/users");
      } else {
        toast.add({
          type: "error",
          title: res?.message ?? "Failed to remove technician",
        });
      }
    });
  }

  return (
    <div className="rounded-xl border border-border/70 bg-card p-6 shadow-sm">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex size-11 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Wrench aria-hidden="true" className="size-5" />
        </div>
        <div>
          <h1 className="text-lg font-semibold">{technician.user.name}</h1>
          <p className="text-sm text-muted-foreground">{technician.city}</p>
        </div>
      </div>

      <div className="mb-6 grid gap-4 rounded-lg border border-border/70 bg-muted/20 p-4 sm:grid-cols-2">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Email
          </p>
          <p className="mt-1 text-sm">{technician.user.email}</p>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Phone
          </p>
          <p className="mt-1 text-sm">{technician.user.phone}</p>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Rating
          </p>
          <p className="mt-1 flex items-center gap-1 text-sm">
            <Star className="size-3.5 fill-amber-400 text-amber-400" />
            {technician.avgRating} ({technician.totalReviews} reviews)
          </p>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Experience
          </p>
          <p className="mt-1 text-sm">{technician.experienceYears} years</p>
        </div>
        <div className="sm:col-span-2">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Skills
          </p>
          <div className="mt-1 flex flex-wrap gap-1.5">
            {technician.skills.map((skill) => (
              <Badge key={skill} variant="outline">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
        {technician.bio && (
          <div className="sm:col-span-2">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Bio
            </p>
            <p className="mt-1 text-sm">{technician.bio}</p>
          </div>
        )}
      </div>

      <div className="mb-6">
        <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Services ({technician.services.length})
        </p>
        <div className="space-y-2">
          {technician.services.map((s) => (
            <div
              key={s.id}
              className="flex items-center justify-between rounded-lg border border-border/70 p-3 text-sm"
            >
              <span>{s.title}</span>
              <div className="flex items-center gap-2">
                <span className="font-mono">${s.price}</span>
                <Badge variant={s.isActive ? "default" : "outline"}>
                  {s.isActive ? "Active" : "Inactive"}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Button variant="destructive" disabled={isPending} onClick={handleDelete}>
        {isPending ? "Removing..." : "Remove technician profile"}
      </Button>
    </div>
  );
}
