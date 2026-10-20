"use client";

import Link from "next/link";
import { Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { PublicService } from "@/lib/types";
import { useRouter } from "next/navigation";

export function ServiceCard({ service }: { service: PublicService }) {
  const router = useRouter();

  return (
    <Card
      onClick={() => router.push(`/services/${service.id}`)}
      className="overflow-hidden p-4 transition-shadow hover:shadow-md"
    >
      <p className="text-xs text-muted-foreground">{service.category.name}</p>
      <h3 className="mb-1 font-medium">{service.title}</h3>
      <div className="flex items-baseline gap-1">
        <Link
          href={`/technicians/${service.technician.id}`}
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="text-muted-foreground transition-transform duration-300 ease-in-out hover:scale-110 hover:text-cyan-800"
        >
          {service.technician.user.name}
        </Link>
        <p className="mb-2 text-sm text-muted-foreground">
          · {service.technician.city}
        </p>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 text-sm">
          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
          {Number(service.technician.avgRating).toFixed(1)}
        </div>
        <p className="font-mono text-sm font-semibold">${service.price}</p>
      </div>
    </Card>
  );
}
