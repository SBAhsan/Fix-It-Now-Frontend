import { Suspense } from "react";
import { getServices } from "../_actions/getServices";
import { ServiceFilters } from "../_components/services/service-filters";
import { ServiceCard } from "../_components/services/service-card";
import NavBar from "@/components/shared/navbar";
import { getMe } from "@/service/getMe";

export default async function ServicesPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) {
  const params = await searchParams;
  const services = await getServices(params);
  const user = await getMe();

  return (
    <div className="mx-40 px-6">
      <NavBar user={user} />
      <div className="py-10">
        <h1 className="mb-6 text-2xl font-bold">Available services</h1>
      <Suspense><ServiceFilters /></Suspense>
      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.length === 0 ? (
          <p className="col-span-full py-16 text-center text-muted-foreground">No services found.</p>
        ) : (
          services.map((s) => <ServiceCard key={s.id} service={s} />)
        )}
      </div>
      </div>
    </div>
  );
}