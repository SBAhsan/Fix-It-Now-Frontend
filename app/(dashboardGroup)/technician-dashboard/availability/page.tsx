import React from 'react';
import SlotCalendar from '../../_components/technician/SlotCalender';
import SlotList from '../../_components/technician/SlotList';
import { getAllSlots } from '@/service/technician/getAllSlots';

const TechnicianAvailabilityPage = async () => {

    const slots = await getAllSlots();

    return (
        <div className='space-y-6 py-6 px-5 overflow-y-auto'>
            <SlotCalendar />
            <SlotList slots={slots} />
        </div>
    );
};

export default TechnicianAvailabilityPage;