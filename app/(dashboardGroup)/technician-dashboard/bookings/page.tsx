import React from 'react';
import TechnicianBookingsTable from '../../_components/technician/TechnicianBookingsTable';
import { getMyBookings } from '@/service/technician/getMyBookings';

const TechnicianBookingsPage = async () => {

    const bookings = await getMyBookings();

    return (
        <div className='space-y-6 py-6 px-5 overflow-y-auto'>
            <TechnicianBookingsTable bookings={bookings} />
        </div>
    );
};

export default TechnicianBookingsPage;