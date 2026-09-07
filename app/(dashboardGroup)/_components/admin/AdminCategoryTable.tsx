"use client";

import { useMemo, useState } from "react";
import { MoreHorizontal, Search, Wrench } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type ServiceCategory = {
  name: string;
  description: string;
  isActive: boolean;
};

export function AdminCategoryTable({
  allCategories,
}: {
  allCategories: ServiceCategory[];
}) {
  const [query, setQuery] = useState("");
  const [categories, setCategories] = useState(allCategories);

  const filteredCategories = useMemo(
    () =>
      categories.filter((category) =>
        `${category.name} ${category.description}`
          .toLowerCase()
          .includes(query.toLowerCase()),
      ),
    [categories, query],
  );

  function toggleCategory(name: string) {
    setCategories((current) =>
      current.map((category) =>
        category.name === name
          ? {
              ...category,
              status: category.isActive ? "Inactive" : "Active",
            }
          : category,
      ),
    );
  }

  return (
    <section
      className="rounded-xl border border-border/70 bg-card p-5 shadow-sm"
      aria-labelledby="categories-heading"
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2
            id="categories-heading"
            className="text-lg font-semibold tracking-tight"
          >
            Service categories
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Organize the services technicians provide.
          </p>
        </div>
        <div className="relative">
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search categories..."
            aria-label="Search service categories"
            className="pl-9 sm:w-72"
          />
        </div>
      </div>
      <div className="mt-5 overflow-x-auto">
        <Table>
          <caption className="sr-only">
            Service categories and technician availability
          </caption>
          <TableHeader>
            <TableRow className="bg-muted/40 hover:bg-muted/40">
              <TableHead>Category</TableHead>
              {/* <TableHead>Technicians</TableHead> */}
              <TableHead>Status</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCategories.map((category) => (
              <TableRow key={category.name}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Wrench aria-hidden="true" className="size-4" />
                    </div>
                    <div>
                      <p className="font-medium">{category.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {category.description}
                      </p>
                    </div>
                  </div>
                </TableCell>
                {/* <TableCell className="text-muted-foreground">
                  {category.technicians}
                </TableCell> */}
                <TableCell>
                  <Badge
                    variant={
                      category.isActive === true ? "default" : "destructive"
                    }
                  >
                    {category.isActive ? "Active" : "Inactive"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      render={
                        <Button
                          variant="ghost"
                          size="icon"
                          aria-label={`Actions for ${category.name}`}
                        />
                      }
                    >
                      <MoreHorizontal />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuGroup>
                        <DropdownMenuLabel>{category.name}</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Edit category</DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => toggleCategory(category.name)}
                        >
                          {category.isActive ? "Set inactive" : "Set active"}
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {filteredCategories.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted-foreground">
            No categories match your search.
          </p>
        ) : null}
      </div>
    </section>
  );
}
