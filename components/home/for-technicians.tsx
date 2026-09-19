import { Button } from "@/components/ui/button";
import Link from "next/link";
import { User } from "@/lib/types";

const ForTechnicians = ({ user }: { user: User | null }) => {
  const isTechnician = user?.role === "TECHNICIAN";
  const showRegisterCta = !user;

  return (
    <section id="technicians" className="mx-auto max-w-6xl px-6 py-8">
      <div className="grid items-center gap-10 rounded-3xl bg-slate-900 p-10 text-slate-50 md:grid-cols-2 md:p-14">
        <div>
          <p className="mb-3 text-xs font-medium text-cyan-300">
            FOR TECHNICIANS
          </p>
          <h2 className="mb-4 text-3xl font-bold">
            Your skills, your schedule, your ticket queue.
          </h2>
          <p className="mb-6 max-w-md text-slate-400">
            Build a profile, set the areas and hours you work, and let job
            requests come to you.
          </p>
          {isTechnician ? (
            <Button
              className="bg-coral hover:bg-coral/90"
              render={
                <Link href="/technician-dashboard">Go to your dashboard</Link>
              }
              nativeButton={false}
            />
          ) : showRegisterCta ? (
            <Button
              className="bg-coral hover:bg-coral/90"
              render={
                <Link href="/register?role=technician">
                  Create technician profile
                </Link>
              }
              nativeButton={false}
            />
          ) : null}
        </div>

        <dl className="space-y-4">
          <Stat label="Avg. rating across technicians" value="4.8" />
          <Stat label="Median time to first booking" value="2 days" />
          <Stat label="Categories covered" value="12" />
        </dl>
      </div>
    </section>
  );
};

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between border-b border-slate-700 pb-3">
      <dt className="text-xs text-slate-400">{label}</dt>
      <dd className="font-mono text-xl font-bold">{value}</dd>
    </div>
  );
}

export default ForTechnicians;
