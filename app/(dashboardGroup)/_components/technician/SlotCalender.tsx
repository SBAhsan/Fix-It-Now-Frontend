"use client";

import { useState, useTransition } from "react";
import { CalendarIcon, Clock3 } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { createSlot } from "@/service/technician/createSlot";
import { toast } from "@/components/ui/toast";

export default function SlotCalendar() {
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState("09:00");
  const [isBooked, setIsBooked] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!date) return;

    const [hours, minutes] = time.split(":").map(Number);
    const slotTime = new Date(date);
    slotTime.setHours(hours, minutes, 0, 0);

    startTransition(async () => {
      const res = await createSlot({
        slotDate: date.toISOString(),
        slotTime: slotTime.toISOString(),
        isBooked: isBooked
      });
      if (!res.success)
        toast.add({
          type: "error",
          title: res.message ?? "Failed to create slot",
        });
      else setDate(undefined);
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create availability slot</CardTitle>
        <CardDescription>
          Choose a date and time customers can book.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label htmlFor="slot-date" className="text-sm font-medium">
              Date
            </label>
            <Popover>
              <PopoverTrigger
                render={
                  <Button
                    id="slot-date"
                    type="button"
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground",
                    )}
                  />
                }
              >
                <CalendarIcon data-icon="inline-start" />
                {date ? format(date, "PPP") : "Pick a date"}
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={{ before: new Date() }}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="slot-time" className="text-sm font-medium">
              Time
            </label>
            <div className="relative">
              <Clock3
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              />
              <Input
                id="slot-time"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <Button type="submit" disabled={!date || isPending}>
            {isPending ? "Creating..." : "Create slot"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
