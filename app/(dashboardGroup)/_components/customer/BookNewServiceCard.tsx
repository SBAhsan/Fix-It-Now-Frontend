import Link from "next/link";
import { ArrowRight, CalendarPlus, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// export type BookNewServiceCardProps = {
//   href?: string;
//   title?: string;
//   description?: string;
// };

export function BookNewServiceCard() {
  return (
    <Card className="overflow-hidden border-primary/20 bg-primary text-primary-foreground shadow-sm">
      <CardContent className="relative flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
        <div
          aria-hidden="true"
          className="absolute -right-8 -top-10 size-40 rounded-full bg-primary-foreground/10"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-16 right-24 size-32 rounded-full border border-primary-foreground/10"
        />

        <div className="relative flex items-start gap-4">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary-foreground/15">
            <CalendarPlus aria-hidden="true" className="size-6" />
          </div>
          <div>
            <div className="mb-1 flex items-center gap-2 text-sm font-medium text-primary-foreground/80">
              <Sparkles aria-hidden="true" className="size-4" />
              Need a hand?
            </div>
            <h2 className="text-xl font-semibold tracking-tight">Book a new service</h2>
            <p className="mt-1 max-w-xl text-sm leading-6 text-primary-foreground/80">
              Find a trusted technician and get your next repair or maintenance request scheduled.
            </p>
          </div>
        </div>

        <Button
          render={<Link href="/services" />}
          variant="secondary"
          className="relative shrink-0 gap-2 self-start text-primary sm:self-center"
        >
          Browse services
          <ArrowRight aria-hidden="true" data-icon="inline-end" />
        </Button>
      </CardContent>
    </Card>
  );
}

export default BookNewServiceCard;
