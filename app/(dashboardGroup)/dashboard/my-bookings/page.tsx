import React from 'react';
import MyBookingsTable from '../../_components/customer/MyBookingsTable';
import { getMyBookings } from '@/service/customer/getMyBookings';

const MyBookingsTablePage = async () => {

    const bookings = await getMyBookings();

    return (
        <div>
            <MyBookingsTable bookings={bookings} />
        </div>
    );
};

export default MyBookingsTablePage;