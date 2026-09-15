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
  password: string;
  phone: string;
  role: UserRole;
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

// export type AdminBookingRow = {
//   id: string;
//   customer: string;
//   service: string;
//   technician: string;
//   status: string;
// };

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