import { notFound } from "next/navigation";
import { AdminTechnicianProfileCard } from "@/app/(dashboardGroup)/_components/admin/AdminTechnicianProfileCard";
import { getTechnicianProfile } from "@/service/admin/getTechnicianProfile";
import { BackButton } from "@/components/shared/BackButton";

export default async function AdminTechnicianProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const technician = await getTechnicianProfile(id);

  if (!technician) notFound();

  return (
    <div className="mx-auto p-6">
      <BackButton />
      <AdminTechnicianProfileCard technician={technician} />
    </div>
  );
}