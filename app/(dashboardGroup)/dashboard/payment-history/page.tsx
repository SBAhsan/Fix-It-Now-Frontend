import React from 'react';
import CustomerPaymentHistory from '../../_components/customer/CustomerPaymentHistory';
import { getMyPayments } from '@/service/customer/getMyPayments';

const CustomerPaymentHistoryPage = async () => {

    const payments = await getMyPayments();

    return (
        <div className='pt-6'>
            <CustomerPaymentHistory payments={payments} />
        </div>
    );
};

export default CustomerPaymentHistoryPage;