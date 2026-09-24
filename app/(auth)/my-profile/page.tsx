import React from 'react';
import { getMe } from '@/service/getMe';
import MyProfile from '../_components/MyProfile';
import NavBar from '@/components/shared/navbar';

const MyProfilePage = async () => {

    const profile = await getMe();

    return (
        <div className='mx-40 space-y-3'>
            <NavBar user={profile} />
            <MyProfile profile={profile} />
        </div>
    );
};

export default MyProfilePage;