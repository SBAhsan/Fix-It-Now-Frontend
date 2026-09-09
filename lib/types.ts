export type RegisterState = {
    success: boolean,
    message: string
}

export type LoginState = {
    success: boolean,
    message?: string
}

export type UserRole = "CUSTOMER" | "TECHNICIAN" | "ADMIN";
export type UserStatus = "ACTIVE" | "BANNED" | "UNBANNED";

export type User = {
    name: string,
    email: string,
    password: string,
    phone: string,
    role: UserRole
}

export type AdminUser = {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
};

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
};

export type CreateCategory = {
  name: string;
  description: string;
  isActive: boolean;
} 