import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type AdminStatCardProps = {
  label: string;
  value: string;
  // trend: string;
  icon: LucideIcon;
  trendDirection?: "up" | "down";
  helperText?: string;
};

export function AdminStatCard({
  label,
  value,
  icon: Icon,
}: AdminStatCardProps) {

  return (
    <Card className="border-border/70 bg-card shadow-sm transition-shadow hover:shadow-md">
      <CardContent className="flex items-start justify-between gap-4 p-5">
        <div className="flex min-w-0 flex-col gap-3">
          <p className="truncate text-sm font-medium text-muted-foreground">
            {label}
          </p>
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <p className="text-2xl font-semibold tracking-tight text-foreground">
              {value}
            </p>
          </div>
          {/* <p className="text-xs text-muted-foreground">{helperText}</p> */}
        </div>
        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Icon aria-hidden="true" className="size-5" />
        </div>
      </CardContent>
    </Card>
  );
}

export type { AdminStatCardProps };
