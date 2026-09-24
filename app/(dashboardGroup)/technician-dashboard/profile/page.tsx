import { getMyTechnicianProfile } from "@/service/technician/getMyProfile";
import TechnicianProfileForm from "../../_components/technician/TechnicianProfileForm";
import DeleteTechnicianProfileDialog from "../../_components/technician/DeleteTechnicianProfileDialog";
import TechnicianProfileView from "../../_components/technician/TechnicianProfileView";

export default async function TechnicianProfilePage() {
  const profile = await getMyTechnicianProfile();
   console.log("Technician profile fetched:", profile);

  if (!profile) {
    return (
      <div className="p-4 md:p-8">
        <TechnicianProfileForm />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 p-4 md:p-8">
      <TechnicianProfileView profile={profile} />
      <DeleteTechnicianProfileDialog />
    </div>
  );
}