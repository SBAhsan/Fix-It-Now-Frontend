import React from 'react';
import MyReviewsList from '../../_components/customer/MyReviewsList';
import { getMyReviews } from '@/service/customer/getMyReviews';

const MyReviewsPage = async () => {

    const reviews = await getMyReviews();

    return (
        <div className='pt-8'>
            <MyReviewsList reviews={reviews} />
        </div>
    );
};

export default MyReviewsPage;