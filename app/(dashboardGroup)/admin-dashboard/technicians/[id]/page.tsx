import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AdminTechnicianProfileCard } from "@/app/(dashboardGroup)/_components/admin/AdminTechnicianProfileCard";
import { getTechnicianProfile } from "@/service/admin/getTechnicianProfile";

export default async function AdminTechnicianProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const technician = await getTechnicianProfile(id);

  if (!technician) notFound();

  return (
    <div className="mx-auto max-w-3xl p-6">
      <Link
        href="/admin-dashboard/users"
        className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Back to users
      </Link>
      <AdminTechnicianProfileCard technician={technician} />
    </div>
  );
}