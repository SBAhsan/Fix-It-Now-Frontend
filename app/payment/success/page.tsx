import { api } from "@/lib/api";
import Link from "next/link";

export default async function PaymentSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ bookingId?: string }>;
}) {
  const { bookingId } = await searchParams;

  const res = bookingId
    ? await api("/api/payments/confirm", {
        method: "POST",
        body: JSON.stringify({ bookingId }),
      })
    : null;

  if (!res?.success) {
    return (
      <>
        <p className="p-10 text-center">
          Couldn&apos;t confirm payment: {res?.message ?? "missing bookingId"}
        </p>
        <Link href={"/dashboard/my-bookings"}></Link>
      </>
    );
  }

  return (
    <>
      <p className="p-10 text-center">
        Payment successful. Your booking is now in progress.
      </p>
      <Link href={"/dashboard/my-bookings"}></Link>
    </>
  );
}
