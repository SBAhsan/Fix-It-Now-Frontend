"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Wrench } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PublicService } from "@/lib/types";

export default function ServiceOversight({
  services,
}: {
  services: PublicService[];
}) {
  const [search, setSearch] = useState("");

  const filtered = services.filter((s) =>
    `${s.title} ${s.category.name} ${s.technician.user.name}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  return (
    <Card className="border-border/70 bg-card shadow-sm">
      <CardHeader className="gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <CardTitle>Services</CardTitle>
          <CardDescription>
            Everything technicians are offering right now.
          </CardDescription>
        </div>
        <div className="relative sm:w-64">
          <Search
            className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search service, category or technician"
            className="pl-9"
          />
        </div>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center gap-3 rounded-lg border border-dashed p-10 text-center">
            <Wrench className="size-8 text-primary" aria-hidden="true" />
            <p className="font-medium">No services found</p>
            <p className="text-sm text-muted-foreground">
              Try a different search.
            </p>
          </div>
        ) : (
          <Table className="min-w-[720px]">
            <TableHeader>
              <TableRow>
                <TableHead>Service</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Technician</TableHead>
                <TableHead>City</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((service) => (
                <TableRow key={service.id}>
                  <TableCell className="font-medium">{service.title}</TableCell>
                  <TableCell>{service.category.name}</TableCell>
                  <TableCell className="whitespace-nowrap">
                    {service.technician.user.name}
                  </TableCell>
                  <TableCell>{service.technician.city}</TableCell>
                  <TableCell className="font-medium">
                    ${Number(service.price).toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <Badge variant={service.isActive ? "default" : "secondary"}>
                      {service.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      size="sm"
                      variant="ghost"
                      render={
                        <Link href={`/services/${service.id}`}>View</Link>
                      }
                      nativeButton={false}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
