import { getServices } from "@/app/(publicGroup)/_actions/getServices";
import ServiceOversight from "../../_components/admin/ServiceOversight";

export default async function AdminServicesPage() {
  const services = await getServices();

  return (
    <div className="space-y-6 px-5 py-6">
      <ServiceOversight services={services} />
    </div>
  );
}