import { CustomerBooking } from "@/lib/types";

export function computeCustomerStats(bookings: CustomerBooking[]) {
  const upcomingBookings = bookings.filter((b) =>
    ["PENDING", "ACCEPTED", "IN_PROGRESS"].includes(b.status),
  ).length;

  const completedServices = bookings.filter(
    (b) => b.status === "COMPLETED",
  ).length;

  const totalSpent = bookings
    .filter((b) => b.status === "COMPLETED")
    .reduce((sum, b) => sum + Number(b.totalAmount), 0);

  const ratedBookings = bookings.filter((b) => b.review);
  const averageRating = ratedBookings.length
    ? (
        ratedBookings.reduce((sum, b) => sum + (b.review?.rating ?? 0), 0) /
        ratedBookings.length
      ).toFixed(1)
    : "—";

  return {
    upcomingBookings,
    totalSpent: `$${totalSpent.toFixed(2)}`,
    completedServices,
    averageRating,
  };
}
