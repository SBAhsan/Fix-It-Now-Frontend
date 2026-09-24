"use client";

import { useState, useTransition, type FormEvent } from "react";
import { Plus, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { createService } from "@/service/technician/createService";
import { Category } from "@/lib/types";
import { toast } from "@/components/ui/toast";

export default function TechnicianServiceForm({
  categories,
}: {
  categories: Category[];
}) {
  const [categoryId, setCategoryId] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const res = await createService({
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        price: Number(formData.get("price")),
        categoryId,
        isActive,
      });

      if (!res.success)
        {toast.add({
          type: "error",
          title: res.message ?? "Failed to create service",
        });}
      else {
        toast.add({
          type: "success",
          title: res.message ?? "Service created successfully!",
        });
        (e.target as HTMLFormElement).reset();
      }
    });
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start gap-3">
          <div
            className="rounded-xl bg-primary/10 p-2.5 text-primary"
            aria-hidden="true"
          >
            <Wrench />
          </div>
          <div>
            <CardTitle>Create a new service</CardTitle>
            <CardDescription>
              Add a service customers can book from your profile.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <div className="grid gap-5 md:grid-cols-2">
            <Input
              name="title"
              placeholder="e.g. Kitchen faucet repair"
              required
            />
            <Select value={categoryId} onValueChange={(value) => setCategoryId(value ?? "")}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((c) => (
                  <SelectItem key={c.id} value={c.name}>
                    {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-5 md:grid-cols-[1fr_180px]">
            <Textarea
              name="description"
              placeholder="Describe what this service includes..."
              rows={4}
            />
            <Input
              name="price"
              type="number"
              min="0"
              step="0.01"
              placeholder="85.00"
              required
            />
          </div>
          <div className="flex items-center justify-between rounded-xl border p-4">
            <div>
              <p className="text-sm font-medium">Make service active</p>
              <p className="text-xs text-muted-foreground">
                Active services are visible to customers.
              </p>
            </div>
            <Switch checked={isActive} onCheckedChange={setIsActive} />
          </div>
          <Button
            type="submit"
            disabled={isPending || !categoryId}
            className="self-end"
          >
            <Plus data-icon="inline-start" />
            {isPending ? "Creating..." : "Create service"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
