import React from 'react';
import { AdminCategoryTable } from '../../_components/admin/AdminCategoryTable';
import { getCategories } from '@/service/admin/getCategories';

const AdminCategoriesPage = async () => {

    const allCategories = await getCategories();
    return (
        <div>
            <AdminCategoryTable allCategories={allCategories} />
        </div>
    );
};

export default AdminCategoriesPage;