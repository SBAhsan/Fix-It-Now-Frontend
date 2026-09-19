"use client";

import { cn } from "@/lib/utils";

type Slot = {
  id: string;
  slotDate: string;
  slotTime: string;
  isBooked: boolean;
};

export function ServiceSlotPicker({
  slots,
  selectedSlotId,
  onSelect,
}: {
  slots: Slot[];
  selectedSlotId: string | null;
  onSelect: (slot: Slot) => void;
}) {
  const byDate = slots.reduce<Record<string, Slot[]>>((acc, slot) => {
    const date = new Date(slot.slotDate).toLocaleDateString();
    (acc[date] ??= []).push(slot);
    return acc;
  }, {});

  if (slots.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        No available slots right now.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {Object.entries(byDate).map(([date, daySlots]) => (
        <div key={date}>
          <p className="mb-2 text-sm font-medium">{date}</p>
          <div className="flex flex-wrap gap-2">
            {daySlots.map((slot) => (
              <button
                key={slot.id}
                type="button"
                onClick={() => onSelect(slot)}
                className={cn(
                  "rounded-lg border px-3 py-1.5 text-sm transition-colors",
                  selectedSlotId === slot.id
                    ? "border-cyan-500 bg-cyan-50 text-cyan-700"
                    : "border-input hover:border-cyan-500",
                )}
              >
                {new Date(slot.slotTime).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
