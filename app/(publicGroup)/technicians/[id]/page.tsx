import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getTechnicianById } from "../../_actions/getTechnicianById";
import { getServices } from "../../_actions/getServices";
import { getMe } from "@/service/getMe";
import NavBar from "@/components/shared/NavBar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Footer from "@/components/shared/Footer";

export default async function TechnicianPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const user = await getMe();

  const tech = await getTechnicianById(id);
  if (!tech) notFound();

  const allServices = await getServices();
  const services = allServices.filter((s) => s.technician.id === id);
  const name =
    tech.user?.name ?? services[0]?.technician.user.name ?? "Technician";

  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div>
        <NavBar user={user} />
      <div className=" flex flex-col gap-6 px-6 py-10">
        <Card>
          <CardHeader className="flex-row items-center gap-4">
            <Avatar className="size-16">
              <AvatarFallback className="text-lg">{initials}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl">{name}</CardTitle>
              <p className="text-sm text-muted-foreground">
                {tech.city} · {tech.experienceYears} years experience
              </p>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {tech.bio && (
              <p className="text-sm text-muted-foreground">{tech.bio}</p>
            )}
            <div className="flex flex-wrap gap-1.5">
              {tech.skills.map((skill) => (
                <Badge key={skill} variant="outline">
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <h2 className="text-lg font-semibold">Services offered</h2>

        {services.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No services listed yet.
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {services.map((service) => (
              <Card key={service.id}>
                <CardContent className="flex h-full flex-col gap-3 p-5">
                  <div>
                    <p className="font-medium">{service.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {service.category.name} · $
                      {Number(service.price).toFixed(2)}
                    </p>
                  </div>
                  {service.description && (
                    <p className="line-clamp-2 text-sm text-muted-foreground">
                      {service.description}
                    </p>
                  )}
                  <Button
                    className="mt-auto"
                    render={
                      <Link href={`/services/${service.id}`}>Book now</Link>
                    }
                    nativeButton={false}
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
