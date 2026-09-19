export type PublicService = {
  id: string;
  title: string;
  description: string | null;
  price: string;
  isActive: boolean;
  category: { id: string; name: string };
  technician: {
    id: string;
    city: string;
    avgRating: string;
    user: { name: string };
  };
};


export type RegisterState = {
  success: boolean;
  message: string;
};

export type LoginState = {
  success: boolean;
  message?: string;
};

export type UserRole = "CUSTOMER" | "TECHNICIAN" | "ADMIN";
export type UserStatus = "ACTIVE" | "BANNED" | "UNBANNED";

export type User = {
  name: string;
  email: string;
  phone: string;
  role: UserRole
  status: UserStatus
  createdAt: string;
  updatedAt?: string;
};

export type AdminUser = {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
};

// export type AdminProfileUser = {
//   id: string;
//   name: string;
//   email: string;
//   role: UserRole;
//   status: UserStatus;
//   joined: string;
// };

export type Category = {
  id: string;
  name: string;
  description: string | null;
  isActive: boolean;
  createdAt: string;
};

export type AdminService = {
  id: string;
  title: string;
  price: string;
  isActive: boolean;
  category: { name: string };
  technician: { user: { name: string } };
};

export type AdminOverviewStats = {
  totalUsers: number;
  totalBookings: number;
  totalRevenue: number;
};

export type AdminBookingRow = {
  id: string;
  customer: string;
  service: string;
  technician: string;
  status: string;
  createdAt: string;
};

export type MonthlyBookingCount = { month: string; bookings: number };

export type CreateCategory = {
  name: string;
  description: string;
  isActive: boolean;
};


export type AdminTechnicianProfile = {
  id: string;
  bio: string | null;
  skills: string[];
  experienceYears: number;
  city: string;
  avgRating: string;
  totalReviews: number;
  user: {
    id: string;
    name: string;
    email: string;
    phone: string;
    status: UserStatus;
    createdAt: string;
  };
  services: {
    id: string;
    title: string;
    price: string;
    isActive: boolean;
  }[];
};

// customer
export type CustomerUser = {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
};

export type ServiceDetail = {
  id: string;
  title: string;
  description: string | null;
  price: string;
  isActive: boolean;
  category: { id: string; name: string };
  technician: {
    id: string;
    bio: string | null;
    city: string;
    avgRating: string;
    totalReviews: number;
    experienceYears: number;
    user: { name: string };
    availabilitySlots: {
      id: string;
      slotDate: string;
      slotTime: string;
      isBooked: boolean;
    }[];
  };
};

export type BookingStatus = "PENDING" | "ACCEPTED" | "DECLINED" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED"

export type CreateBookingPayload = {
  technicianId: string;
  serviceIds: string[];
  slotId: string;
  scheduledDate: string;
  scheduledTime: string;
  workAddress: string;
}

export type CustomerBooking = {
  id: string;
  status: BookingStatus;
  totalAmount: string;
  scheduledDate: string;
  technician: { user: { name: string } };
  bookingItems: { service: { title: string } }[];
  payment: { status: string } | null;
  review: { rating: number } | null;
};

export type PaymentStatus = "PENDING" | "COMPLETED" | "FAILED" | "REFUNDED";

export type CustomerPayment = {
  id: string;
  transactionId: string;
  amount: string; // Decimal → string over JSON
  method: string | null;
  provider: "Stripe" | "SSLcommerz";
  status: PaymentStatus;
  paidAt: string;
  booking: {
    id: string;
    scheduledDate: string;
    workAddress: string;
    status: string;
  };
};

export type CustomerReview = {
  id: string;
  service: string;
  technician: string;
  rating: number;
  comment: string;
  createdAt: string;
};