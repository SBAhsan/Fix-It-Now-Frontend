import { getMyBookings } from "@/service/customer/getMyBookings";
import CustomerOverviewStats from "../_components/customer/CustomerOverviewStats";
import { computeCustomerStats } from "@/service/customer/computeCustomerStats";
import RecentBookingsList from "../_components/customer/RecentBookingsList";
import BookNewServiceCard from "../_components/customer/BookNewServiceCard";
import RecentPaymentsList from "../_components/customer/RecentPaymentsList";
import { getMyPayments } from "@/service/customer/getMyPayments";

const CustomerDashboardPage = async () => {
  const bookings = await getMyBookings();
  const customerStats = computeCustomerStats(bookings);
  const payments = await getMyPayments();

  return (
    <div className="px-8 py-6 space-y-6">
      <BookNewServiceCard />
      <CustomerOverviewStats {...customerStats} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <RecentBookingsList bookings={bookings} />
        <RecentPaymentsList payments={payments} />
      </div>
    </div>
  );
};

export default CustomerDashboardPage;
