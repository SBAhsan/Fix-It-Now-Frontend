"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

export function AdminCategoryDialog() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(true);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button>
          <Plus data-icon="inline-start" />
          Add category
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Create service category</DialogTitle>
          <DialogDescription>
            Add a category for the services your technicians provide.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="category-name" className="text-sm font-medium">
              Category name
            </label>
            <Input
              id="category-name"
              name="name"
              placeholder="e.g. Plumbing"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="category-description"
              className="text-sm font-medium"
            >
              Description
            </label>
            <Textarea
              id="category-description"
              name="description"
              placeholder="Describe the services covered by this category"
              rows={4}
              required
            />
          </div>
          <div className="flex items-center justify-between rounded-lg border border-border/70 p-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="category-active" className="text-sm font-medium">
                Active category
              </label>
              <p className="text-xs text-muted-foreground">
                Make this category available for new bookings.
              </p>
            </div>
            <Switch
              id="category-active"
              checked={active}
              onCheckedChange={setActive}
              aria-label="Active category"
            />
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Create category</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
