"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle, Trash2 } from "lucide-react";
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
import { deleteTechnicianProfile } from "@/service/technician/deleteProfile";
import { toast } from "@/components/ui/toast";

export default function DeleteTechnicianProfileDialog() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleConfirm() {
    startTransition(async () => {
      const res = await deleteTechnicianProfile();
      if (res.success) router.push("/login");
      else
        toast.add({
          type: "error",
          title: res.message ?? "Failed to delete profile",
        });
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button
        variant="outline"
        className="text-destructive hover:bg-destructive/10"
        onClick={() => setOpen(true)}
      >
        <Trash2 data-icon="inline-start" />
        Delete profile
      </Button>
      <DialogContent>
        <DialogHeader>
          <div
            className="mb-2 flex size-10 items-center justify-center rounded-full bg-destructive/10 text-destructive"
            aria-hidden="true"
          >
            <AlertTriangle />
          </div>
          <DialogTitle>Delete technician profile?</DialogTitle>
          <DialogDescription>
            This removes your technician profile and its availability
            information. This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose
            render={<Button variant="outline">Keep profile</Button>}
          />
          <Button
            variant="destructive"
            disabled={isPending}
            onClick={handleConfirm}
          >
            <Trash2 data-icon="inline-start" />
            {isPending ? "Deleting..." : "Delete profile"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
