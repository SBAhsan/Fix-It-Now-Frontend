import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Briefcase, MapPin, Star, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { getServiceById } from "../../_actions/getServiceById";
import { BookingForm } from "../../_components/services/booking-form";
import { getMe } from "@/service/getMe";

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await getMe();
  const service = await getServiceById(id);

  if (!service) notFound();

  const initials = service.technician.user.name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .toUpperCase();

  return (
    <div className="min-h-screen bg-muted/20">
      <div className="mx-auto max-w-6xl px-6 py-8">
        <Link
          href="/services"
          className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to services
        </Link>

        <div className="grid gap-8 md:grid-cols-3">
          {/* Main column */}
          <div className="md:col-span-2">
            <div className="rounded-2xl border bg-card p-6 md:p-8">
              <Badge variant="outline" className="mb-3">
                {service.category.name}
              </Badge>
              <h1 className="mb-2 text-3xl font-bold tracking-tight">{service.title}</h1>

              <div className="mb-6 flex items-baseline gap-2">
                <span className="font-mono text-2xl font-bold text-primary">
                  ${service.price}
                </span>
                <span className="text-sm text-muted-foreground">starting price</span>
              </div>

              {service.description && (
                <>
                  <Separator className="mb-6" />
                  <div>
                    <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                      About this service
                    </h2>
                    <p className="leading-7 text-foreground/90">{service.description}</p>
                  </div>
                </>
              )}
            </div>

            {/* Technician card */}
            <div className="mt-6 rounded-2xl border bg-card p-6 md:p-8">
              <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                About the technician
              </h2>
              <div className="flex items-start gap-4">
                <Avatar className="h-14 w-14">
                  <AvatarFallback className="text-base font-semibold">{initials}</AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-lg font-semibold">{service.technician.user.name}</h3>
                    <Badge variant="secondary" className="gap-1">
                      <ShieldCheck className="h-3 w-3" />
                      Verified
                    </Badge>
                  </div>

                  <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5" />
                      {service.technician.city}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Briefcase className="h-3.5 w-3.5" />
                      {service.technician.experienceYears} years experience
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      {Number(service.technician.avgRating).toFixed(1)} · {service.technician.totalReviews} reviews
                    </span>
                  </div>

                  {service.technician.bio && (
                    <p className="mt-4 text-sm leading-6 text-muted-foreground">
                      {service.technician.bio}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Sticky booking sidebar */}
          <div>
            <div className="sticky top-24">
              <BookingForm service={service} user={user} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}