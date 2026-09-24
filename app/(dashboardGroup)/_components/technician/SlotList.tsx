"use client";

import { useState, useTransition } from "react";
import { format } from "date-fns";
import { Clock3 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TechnicianSlot } from "@/lib/types";
import { updateSlot } from "@/service/technician/updateSlot";
import { toast } from "@/components/ui/toast";

export default function SlotList({ slots }: { slots: TechnicianSlot[] }) {
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function toggleBooked(slot: TechnicianSlot) {
    setPendingId(slot.id);
    startTransition(async () => {
      const res = await updateSlot(slot.id, { isBooked: !slot.isBooked });
      if (!res.success)
        toast.add({
          type: "error",
          title: res.message ?? "Failed to update slot",
        });
      setPendingId(null);
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Existing availability</CardTitle>
        <CardDescription>
          Manage the appointment windows customers can book.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {slots.length === 0 ? (
          <p className="rounded-lg border border-dashed px-4 py-8 text-center text-sm text-muted-foreground">
            No availability slots yet.
          </p>
        ) : (
          slots.map((slot) => (
            <div
              key={slot.id}
              className="flex flex-col gap-3 rounded-xl border border-border/70 p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-primary/10 p-2 text-primary">
                  <Clock3 aria-hidden="true" />
                </div>
                <div>
                  <p className="font-medium">
                    {format(new Date(slot.slotDate), "EEEE, MMM d, yyyy")}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {format(new Date(slot.slotTime), "p")}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={slot.isBooked ? "default" : "secondary"}>
                  {slot.isBooked ? "Booked" : "Open"}
                </Badge>
                <Button
                  size="sm"
                  variant="outline"
                  disabled={isPending && pendingId === slot.id}
                  onClick={() => toggleBooked(slot)}
                >
                  {slot.isBooked ? "Mark open" : "Mark booked"}
                </Button>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
