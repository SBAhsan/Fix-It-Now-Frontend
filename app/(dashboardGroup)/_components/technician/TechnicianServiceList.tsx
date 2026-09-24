"use client";

import {
  BriefcaseBusiness,
  CheckCircle2,
  CircleOff,
  DollarSign,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TechnicianService } from "@/lib/types";

export default function TechnicianServiceList({
  services,
}: {
  services: TechnicianService[];
}) {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <CardTitle>Services you provide</CardTitle>
            <CardDescription>
              Manage the services customers can request from you.
            </CardDescription>
          </div>
          <Badge variant="outline">
            {services.length} {services.length === 1 ? "service" : "services"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {services.length === 0 ? (
          <div className="rounded-xl border border-dashed px-4 py-10 text-center">
            <BriefcaseBusiness
              className="mx-auto mb-3 text-muted-foreground"
              aria-hidden="true"
            />
            <p className="font-medium">No services yet</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Create a service so customers know what you offer.
            </p>
          </div>
        ) : (
          services.map((service) => (
            <div
              key={service.id}
              className="flex flex-col gap-4 rounded-xl border border-border/70 p-4 sm:flex-row sm:items-start sm:justify-between"
            >
              <div className="flex min-w-0 gap-3">
                <div
                  className="rounded-lg bg-primary/10 p-2 text-primary"
                  aria-hidden="true"
                >
                  <BriefcaseBusiness />
                </div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-medium">{service.title}</h3>
                    <Badge variant={service.isActive ? "default" : "secondary"}>
                      {service.isActive ? "Active" : "Paused"}
                    </Badge>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {service.category.name}
                  </p>
                  {service.description && (
                    <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                      {service.description}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <p className="flex items-center gap-1 font-medium">
                  <DollarSign
                    className="size-4 text-primary"
                    aria-hidden="true"
                  />
                  {service.price}
                </p>
                {service.isActive ? (
                  <CheckCircle2
                    className="size-4 text-primary"
                    aria-hidden="true"
                  />
                ) : (
                  <CircleOff
                    className="size-4 text-muted-foreground"
                    aria-hidden="true"
                  />
                )}
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
