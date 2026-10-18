"use client";

import { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/toast";
import { TechnicianBooking } from "@/lib/types";
import { getMyBookings } from "@/service/technician/getMyBookings";
import { updateBookingStatus } from "@/service/technician/updateBookingStatus";

export function NotificationBell() {
  const [pending, setPending] = useState<TechnicianBooking[]>([]);
  const [busyId, setBusyId] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const loadPending = async () => {
      const bookings = await getMyBookings();
      if (!cancelled) {
        setPending(bookings.filter((b) => b.status === "PENDING"));
      }
    };

    loadPending();
    const interval = setInterval(loadPending, 20000);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  async function respond(id: string, accept: boolean) {
    setBusyId(id);
    const res = await updateBookingStatus(id, accept ? "ACCEPTED" : "DECLINED");
    if (!res.success)
      toast.add({
        type: "error",
        title: res.message ?? "Something went wrong",
      });
    setPending((prev) => prev.filter((b) => b.id !== id));
    setBusyId(null);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="outline"
            size="icon"
            className="relative"
            aria-label="Notifications"
          />
        }
      >
        <Bell data-icon="inline-start" />
        {pending.length > 0 && (
          <span className="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground">
            {pending.length}
          </span>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        {pending.length === 0 ? (
          <p className="p-4 text-center text-sm text-muted-foreground">
            No new requests right now.
          </p>
        ) : (
          pending.map((booking) => (
            <div key={booking.id} className="border-b p-3 last:border-0">
              <p className="font-medium">
                {booking.bookingItems.map((i) => i.service.title).join(", ")}
              </p>
              <p className="text-sm text-muted-foreground">
                {booking.customer.name}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {new Date(booking.scheduledDate).toLocaleDateString()} ·{" "}
                {booking.workAddress}
              </p>
              <div className="mt-3 flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  disabled={busyId === booking.id}
                  onClick={() => respond(booking.id, false)}
                >
                  Decline
                </Button>
                <Button
                  size="sm"
                  disabled={busyId === booking.id}
                  onClick={() => respond(booking.id, true)}
                >
                  Accept
                </Button>
              </div>
            </div>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
