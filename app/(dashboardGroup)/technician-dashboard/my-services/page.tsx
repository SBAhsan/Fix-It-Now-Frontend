import { getCategories } from '@/service/getCategories';
import TechnicianServiceForm from '../../_components/technician/TechnicianServiceForm';
import TechnicianServiceList from '../../_components/technician/TechnicianServiceList';
import { getMyServices } from '@/service/technician/getMyServices';

const TechnicianServicePage = async () => {
    
    const services = await getMyServices();
    const categories = await getCategories();

    return (
        <div className='space-y-6 py-6 px-5 overflow-y-auto'>
            <TechnicianServiceList services={services} />
            <TechnicianServiceForm categories={categories} />
        </div>
    );
};

export default TechnicianServicePage;