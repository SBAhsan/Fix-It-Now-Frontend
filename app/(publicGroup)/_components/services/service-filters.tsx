"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";

export function ServiceFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  function updateParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    value ? params.set(key, value) : params.delete(key);
    router.push(`/services?${params.toString()}`);
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <Input
        placeholder="Search services..."
        defaultValue={searchParams.get("searchTerm") ?? ""}
        onChange={(e) => updateParam("searchTerm", e.target.value)}
        className="sm:max-w-xs"
      />
      <Input
        placeholder="Location"
        defaultValue={searchParams.get("location") ?? ""}
        onChange={(e) => updateParam("location", e.target.value)}
        className="sm:max-w-40"
      />
      <Select
        onValueChange={(v) => updateParam("rating", v as string)}
        defaultValue={searchParams.get("rating") ?? ""}
      >
        <SelectTrigger className="sm:max-w-40">
          <SelectValue placeholder="Min rating" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="3">3+ stars</SelectItem>
          <SelectItem value="4">4+ stars</SelectItem>
          <SelectItem value="4.5">4.5+ stars</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
