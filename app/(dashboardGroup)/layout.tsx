import type { ReactNode } from "react";
import { AdminSidebar } from "./_components/admin/AdminSidebar";
import { getMe } from "@/service/getMe";
import TechnicianSidebar from "./_components/technician/TechnicianSidebar";
import CustomerSidebar from "./_components/customer/CustomerSidebar";
import { AdminTopbar } from "./_components/admin/AdminTopbar";

export default async function DashboardGroupLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await getMe();
  const userName = user?.name as string;

  console.log("The logged in user is: ", user);

  return (
    <div className="flex min-h-screen bg-background">
      {user?.role === "ADMIN" && <AdminSidebar />}
      {user?.role === "TECHNICIAN" && <TechnicianSidebar />}
      {user?.role === "CUSTOMER" && <CustomerSidebar />}

      <div className="flex min-w-0 flex-1 flex-col">
        {user?.role === "ADMIN" && <AdminTopbar title="Overview" userName={userName}/>}

        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
