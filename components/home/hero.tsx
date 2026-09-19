import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ServiceTicket } from "./service-ticket";
import CategoryChips from "./category-chips";
import { Category, User } from "@/lib/types";

const Hero = ({
  categories,
  user,
}: {
  categories: Category[];
  user: User | null;
}) => {
  const bookHref = user ? "/services" : "/register";
  const showTechnicianCta = !user || user.role !== "TECHNICIAN";

  return (
    <section className="mx-auto grid items-center gap-14 px-6 py-20 md:grid-cols-2">
      <div>
        <p className="mb-5 inline-block rounded-full bg-cyan-50 px-3 py-1 font-mono text-xs text-cyan-700">
          ● live in Chattogram
        </p>
        <h1 className="mb-5 text-4xl font-bold leading-tight tracking-tight md:text-5xl">
          Something&apos;s broken.
          <br />
          Open a <span className="text-cyan-500">ticket</span>, not a search
          tab.
        </h1>
        <p className="mb-8 max-w-md text-muted-foreground">
          Tell us what&apos;s wrong, we match you with a vetted technician
          nearby, and you track the job start to finish.
        </p>

        <div className="mb-8 flex gap-3">
          <Button
            size="lg"
            render={<Link href={bookHref}>Book a technician</Link>}
            nativeButton={false}
          />
          {showTechnicianCta && (
            <Button
              size="lg"
              variant="outline"
              render={
                <Link href="/register?role=technician">List your skills</Link>
              }
              nativeButton={false}
            />
          )}
        </div>

        <CategoryChips categories={categories} />
      </div>

      <ServiceTicket />
    </section>
  );
};

export default Hero;
