import Link from "next/link";

export default function PaymentSuccessPage() {
  return <div className="flex flex-col items-center justify-center">
  <p className="p-10 text-center">Payment successful. Check your bookings.</p>
  <Link href={"/dashboard/my-bookings"} className="text-cyan-500">Go to bookings</Link>
  </div>
}