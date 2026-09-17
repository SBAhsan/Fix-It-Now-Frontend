import { api } from "@/lib/api";
import { CustomerReview } from "@/lib/types";

export async function getMyReviews() : Promise<CustomerReview[]>{
    const res = await api("/api/reviews/me", {
        cache: "no-store"
    });

    if(!res.success) return [];

    return res.data;
}