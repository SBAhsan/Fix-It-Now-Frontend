import { getAllUsers } from "@/service/admin/getUsers";
import TechnicianModeration from "../../_components/admin/TechnicianModeration";

const AdminTechnicianModerationPage = async () => {
  const users = await getAllUsers();
  const technicians = users.filter((u) => u.role === "TECHNICIAN");

  return <div className="pt-6">
    <TechnicianModeration technicians={technicians} />
  </div>
};

export default AdminTechnicianModerationPage;
