import { getAllUsers } from '@/service/admin/getUsers';
import React from 'react';
import { UserTable } from '../../_components/admin/AdminUserTable';

const AdminUsersPage = async () => {

    const users = await getAllUsers();

    return (
        <div className='pt-6'>
            <UserTable users={users} />
        </div>
    );
};

export default AdminUsersPage;