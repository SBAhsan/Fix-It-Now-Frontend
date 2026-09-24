import type { ReactNode } from "react";
import { AdminSidebar } from "./_components/admin/AdminSidebar";
import { getMe } from "@/service/getMe";
import TechnicianSidebar from "./_components/technician/TechnicianSidebar";
import CustomerSidebar from "./_components/customer/CustomerSidebar";
import NavBar from "@/components/shared/navbar";

export default async function DashboardGroupLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await getMe();

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <NavBar user={user} />

      <div className="flex min-w-0 flex-1">
        {user?.role === "ADMIN" && <AdminSidebar user={user} />}
        {user?.role === "TECHNICIAN" && <TechnicianSidebar />}
        {user?.role === "CUSTOMER" && <CustomerSidebar user={user} />}

        <div className="flex min-w-0 flex-1 flex-col">
          {/* {user?.role === "TECHNICIAN" && <TechnicianMobileNav />} */}
          <main className="flex-1 overflow-y-auto px-6 md:px-10">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
