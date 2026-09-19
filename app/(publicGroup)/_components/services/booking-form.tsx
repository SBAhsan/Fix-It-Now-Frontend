"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ServiceSlotPicker } from "./service-slot-picker";
import { createBooking } from "@/service/customer/createBooking";
import { toast } from "@/components/ui/toast";
import { ServiceDetail, User } from "@/lib/types";

export function BookingForm({
  service,
  user,
}: {
  service: ServiceDetail;
  user: User | null;
}) {
  const router = useRouter();
  const [selectedSlot, setSelectedSlot] = useState<{
    id: string;
    slotDate: string;
    slotTime: string;
  } | null>(null);
  const [address, setAddress] = useState("");
  const [isPending, startTransition] = useTransition();

  function handleBook() {
    if (!selectedSlot || !address) return;

    startTransition(async () => {
      const res = await createBooking({
        technicianId: service.technician.id,
        serviceIds: [service.id],
        slotId: selectedSlot.id,
        scheduledDate: selectedSlot.slotDate,
        scheduledTime: selectedSlot.slotTime,
        workAddress: address,
      });

      if (res.success) {
        router.push("/dashboard/bookings");
      } else {
        toast.add({
          type: "error",
          title: res.message ?? "Failed to create booking",
        });
      }
    });
  }

  return (
    <div className="rounded-xl border p-5">
      <h3 className="mb-4 font-medium">Pick a time slot</h3>
      <ServiceSlotPicker
        slots={service.technician.availabilitySlots}
        selectedSlotId={selectedSlot?.id ?? null}
        onSelect={setSelectedSlot}
      />

      <div className="mt-5">
        <label htmlFor="address" className="mb-2 block text-sm font-medium">
          Service address
        </label>
        <Input
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Where should the technician come?"
        />
      </div>

      {user ? (
        <Button
          className="mt-5 w-full"
          disabled={!selectedSlot || !address || isPending}
          onClick={handleBook}
        >
          {isPending ? "Booking..." : "Request booking"}
        </Button>
      ) : (
        <Button
          className="mt-5 w-full"
          disabled={!selectedSlot || !address || isPending}
          onClick={() => router.push("/login")}
        >
          Request booking
        </Button>
      )}
    </div>
  );
}
