import { api } from "@/lib/api";
import { CreateBookingPayload } from "@/lib/types";

export async function createBooking(bookingInfo : CreateBookingPayload){
    const res = await api("/api/bookings/", {
        method: "POST",
        body: JSON.stringify({
            bookingInfo
        })
    });

    return res;
}