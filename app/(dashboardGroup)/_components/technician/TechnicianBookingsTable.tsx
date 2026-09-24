"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { CalendarDays, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TechnicianBooking, TechnicianBookingStatus } from "@/lib/types";
import { updateBookingStatus } from "@/service/technician/updateBookingStatus";
import { toast } from "@/components/ui/toast";

const statusVariants: Record<
  TechnicianBookingStatus,
  "default" | "secondary" | "outline" | "destructive"
> = {
  PENDING: "secondary",
  ACCEPTED: "default",
  DECLINED: "destructive",
  IN_PROGRESS: "default",
  COMPLETED: "outline",
  CANCELLED: "destructive",
};

function nextAction(
  status: TechnicianBookingStatus,
): { label: string; next: TechnicianBookingStatus } | null {
  if (status === "ACCEPTED") return { label: "Start job", next: "IN_PROGRESS" };
  if (status === "IN_PROGRESS") return { label: "Complete", next: "COMPLETED" };
  return null;
}

export default function TechnicianBookingsTable({
  bookings,
}: {
  bookings: TechnicianBooking[];
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleUpdate(id: string, status: TechnicianBookingStatus) {
    startTransition(async () => {
      const res = await updateBookingStatus(id, status);
      if (!res.success)
        toast.add({
          type: "error",
          title: res.message ?? "Failed to update booking",
        });
    });
  }

  return (
    <Card className="border-border/70 bg-card shadow-sm">
      <CardHeader>
        <CardTitle>All bookings</CardTitle>
        <CardDescription>
          Review customer requests and track each service appointment.
        </CardDescription>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        {bookings.length === 0 ? (
          <div className="flex flex-col items-center gap-3 rounded-lg border border-dashed p-10 text-center">
            <CalendarDays className="size-8 text-primary" aria-hidden="true" />
            <p className="font-medium">No bookings yet</p>
            <p className="text-sm text-muted-foreground">
              New customer requests will appear here.
            </p>
          </div>
        ) : (
          <Table className="min-w-[760px]">
            <TableHeader>
              <TableRow>
                <TableHead>Booking</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Schedule</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings.map((booking) => {
                const action = nextAction(booking.status);
                return (
                  <TableRow key={booking.id}>
                    <TableCell>
                      <p className="font-medium">
                        {booking.bookingItems
                          .map((i) => i.service.title)
                          .join(", ")}
                      </p>
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      {booking.customer.name}
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      {new Date(booking.scheduledDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="whitespace-nowrap text-muted-foreground">
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin className="size-3.5" aria-hidden="true" />
                        {booking.workAddress}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge variant={statusVariants[booking.status]}>
                        {booking.status.replace("_", " ")}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      {booking.status === "PENDING" ? (
                        <div className="flex justify-end gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            disabled={isPending}
                            onClick={() => handleUpdate(booking.id, "DECLINED")}
                          >
                            Decline
                          </Button>
                          <Button
                            size="sm"
                            disabled={isPending}
                            onClick={() => handleUpdate(booking.id, "ACCEPTED")}
                          >
                            Accept
                          </Button>
                        </div>
                      ) : action ? (
                        <Button
                          size="sm"
                          variant="outline"
                          disabled={isPending}
                          onClick={() => handleUpdate(booking.id, action.next)}
                        >
                          {action.label}
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() =>
                            router.push(
                              `/technician-dashboard/bookings/${booking.id}`,
                            )
                          }
                        >
                          Details
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
