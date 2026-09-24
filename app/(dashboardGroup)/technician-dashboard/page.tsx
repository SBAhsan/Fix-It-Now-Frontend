import { getMyBookings } from "@/service/technician/getMyBookings";
import { getMyReviews } from "@/service/technician/getReviews";
import TechnicianOverviewStats from "../_components/technician/TechnicianOverviewStats";
import RecentBookingsPreview from "../_components/technician/RecentBookingsPreview";

export default async function TechnicianOverviewPage() {
  const [bookings, reviews] = await Promise.all([getMyBookings(), getMyReviews()]);

  return (
    <div className="flex flex-col gap-6 p-4 md:p-8 overflow-y-auto">
      <TechnicianOverviewStats bookings={bookings} reviews={reviews} />
      <RecentBookingsPreview bookings={bookings} />
    </div>
  );
}