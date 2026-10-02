import MyBookingsTable from '../../_components/customer/MyBookingsTable';
import { getMyBookings } from '@/service/customer/getMyBookings';
import { AutoRefresh } from '@/components/shared/AutoRefresh';

const MyBookingsTablePage = async () => {

    const bookings = await getMyBookings();

    return (
        <div>
            <MyBookingsTable bookings={bookings} />
            {/* <AutoRefresh /> */}
        </div>
    );
};

export default MyBookingsTablePage;