import { getMyReviews } from "@/service/technician/getReviews";
import { TechnicianReviewsSummary } from "../../_components/technician/TechnicianReviewsSummary";


const TechnicianReviewsPage = async () => {

    const reviews = await getMyReviews();

    return (
        <div className="overflow-y-auto">
            <TechnicianReviewsSummary reviews={reviews} />
        </div>
    );
};

export default TechnicianReviewsPage;