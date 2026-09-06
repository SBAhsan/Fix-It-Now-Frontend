"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserStatus } from "@/lib/types";
import { updateUserStatus } from "@/service/admin/updateUserStatus";
import { toast } from "@/components/ui/toast";
import { useRouter } from "next/navigation";

export type EditableUser = {
  id: string;
  name: string;
  status: UserStatus;
};

export function EditUserDialog({
  user,
  open,
  onOpenChange,
}: {
  user: EditableUser;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [status, setStatus] = useState<UserStatus>(user.status);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    startTransition(async () => {
      const res = await updateUserStatus(user.id, status);
      if (res.success) {
        onOpenChange(false);
      } else {
        toast.add({ type: "error", title: res.message ?? "Failed to update status" });
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Update account status</DialogTitle>
          <DialogDescription>
            Change the account status for {user.name}.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor={`status-${user.id}`} className="text-sm font-medium">
              Status
            </label>
            <Select value={status} onValueChange={(value) => setStatus(value as UserStatus)}>
              <SelectTrigger id={`status-${user.id}`} className="w-full" aria-label="User status">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ACTIVE">Active</SelectItem>
                <SelectItem value="BANNED">Banned</SelectItem>
                <SelectItem value="UNBANNED">Unbanned</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}