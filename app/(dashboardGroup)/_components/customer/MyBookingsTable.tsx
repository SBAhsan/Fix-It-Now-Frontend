/* eslint-disable react-hooks/immutability */
"use client";

import { CalendarDays, CreditCard, MapPin, Star, XCircle } from "lucide-react";
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
import { BookingStatus, CustomerBooking } from "@/lib/types";
import { createPayment } from "@/service/customer/createPayment";
import { toast } from "@/components/ui/toast";
import { useState } from "react";
import { ReviewDialog } from "./ReviewDialog";

export type MyBookingsTableProps = {
  bookings?: CustomerBooking[];
  onCancel?: (booking: CustomerBooking) => void;
};

const statusLabels: Record<BookingStatus, string> = {
  PENDING: "Pending",
  ACCEPTED: "Accepted",
  DECLINED: "Declined",
  IN_PROGRESS: "In progress",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
};

const statusVariants: Record<
  BookingStatus,
  "default" | "secondary" | "outline" | "destructive"
> = {
  PENDING: "secondary",
  ACCEPTED: "default",
  DECLINED: "destructive",
  IN_PROGRESS: "default",
  COMPLETED: "outline",
  CANCELLED: "destructive",
};

export function MyBookingsTable({
  bookings,
  onCancel,
}: MyBookingsTableProps) {

  const [reviewing, setReviewing] = useState<CustomerBooking | null>(null);

  async function handlePay(booking: CustomerBooking) {
    const res = await createPayment(booking.id);
    if (res.success && res.data?.url) {
      window.location.href = res.data.url;
    } else {
      toast.add({ type: "error", title: res.message ?? "Payment failed" });
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>My Bookings</CardTitle>
        <CardDescription>
          Manage your service appointments and payments.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {bookings?.length === 0 ? (
          <div className="flex flex-col items-center gap-3 rounded-lg border border-dashed p-10 text-center">
            <CalendarDays className="size-8 text-primary" aria-hidden="true" />
            <p className="font-medium">No bookings yet</p>
            <p className="text-sm text-muted-foreground">
              Your service bookings will appear here.
            </p>
          </div>
        ) : (
          <Table>
            <caption className="sr-only">Your service bookings</caption>
            <TableHeader>
              <TableRow>
                <TableHead>Service</TableHead>
                <TableHead>Technician</TableHead>
                <TableHead>Schedule</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings?.map((booking) => {
                const canPay =
                  booking.status === "ACCEPTED" &&
                  booking.payment?.status !== "COMPLETED";
                const canCancel = ["PENDING", "ACCEPTED"].includes(
                  booking.status,
                );
                const canReview =
                  booking.status === "COMPLETED" && !booking.review?.rating;

                return (
                  <TableRow key={booking.id}>
                    <TableCell>
                      <div className="min-w-44">
                        {/* <p className="font-medium">{booking.bookingItems}</p> */}
                        <p className="mt-1 inline-flex items-center gap-1 text-xs text-muted-foreground">
                          <MapPin className="size-3" aria-hidden="true" />
                          {/* {booking.location} */}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      {booking.technician.user.name}
                    </TableCell>
                    <TableCell className="whitespace-nowrap text-muted-foreground">
                      {new Date(booking.scheduledDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Badge variant={statusVariants[booking.status]}>
                        {statusLabels[booking.status]}
                      </Badge>
                    </TableCell>
                    <TableCell className="whitespace-nowrap font-medium">
                      ${Number(booking.totalAmount).toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-end gap-2">
                        {canPay ? (
                          <Button size="sm" onClick={() => handlePay(booking)}>
                            <CreditCard data-icon="inline-start" />
                            Pay
                          </Button>
                        ) : null}
                        {canCancel ? (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => onCancel?.(booking)}
                          >
                            <XCircle data-icon="inline-start" />
                            Cancel
                          </Button>
                        ) : null}
                        {canReview ? (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setReviewing(booking)}
                          >
                            <Star data-icon="inline-start" />
                            Review
                          </Button>
                        ) : null}
                        {!canPay && !canCancel && !canReview ? (
                          <span className="text-xs text-muted-foreground">
                            No actions
                          </span>
                        ) : null}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
        <ReviewDialog booking={reviewing} onClose={() => setReviewing(null)} />
      </CardContent>
    </Card>
  );
}

export default MyBookingsTable;
