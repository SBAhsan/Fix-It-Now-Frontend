import { getMe } from '@/service/getMe';

const DashboardPage = async () => {

    const user = await getMe();

    return (
        <div>
            {JSON.stringify(user)}
        </div>
    );
};

export default DashboardPage;