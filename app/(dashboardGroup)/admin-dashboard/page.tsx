import { BriefcaseBusiness, CalendarCheck, CircleCheck, Clock3, Users } from "lucide-react";

import { AdminStatCard } from "../_components/admin/AdminStatCard";
import { GreetingHeading } from "@/components/shared/GreetingHeading";
import { getMe } from "@/service/getMe";
import { DataTable, DataTableColumn } from "../_components/DataTable";
import { Badge } from "@/components/ui/badge";
import { getOverviewStats } from "@/service/admin/getOverviewStats";
import { OverviewStats } from "../_components/admin/OverviewStats";

type RequestRow = { id: string; customer: string; service: string; technician: string; status: string }

const requests: RequestRow[] = [
  { id: 'FIN-1048', customer: 'Maya Patel', service: 'Electrical repair', technician: 'Unassigned', status: 'Needs assignment' },
  { id: 'FIN-1047', customer: 'Jordan Lee', service: 'AC maintenance', technician: 'Chris Morgan', status: 'In progress' },
  { id: 'FIN-1046', customer: 'Noah Williams', service: 'Plumbing', technician: 'Avery Smith', status: 'Completed' },
]

const requestColumns: DataTableColumn<RequestRow>[] = [
  { key: 'id', header: 'Request ID', className: 'font-mono text-xs' },
  { key: 'customer', header: 'Customer', className: 'font-medium' },
  { key: 'service', header: 'Service' },
  { key: 'technician', header: 'Technician' },
  { key: 'status', header: 'Status', render: (row) => <Badge variant={row.status === 'Completed' ? 'secondary' : row.status === 'In progress' ? 'default' : 'outline'}>{row.status}</Badge> },
]

export default async function AdminDashboardPage() {

    const user = await getMe();
    const userName = user?.name as string;

    const stats = await getOverviewStats();

  return (
    <>
      <main className="flex-1 bg-muted/30 p-4 md:p-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-8">
          <section
            aria-labelledby="overview-heading"
            className="flex flex-col gap-1"
          >
            <h2
              id="overview-heading"
              className="text-2xl font-semibold tracking-tight text-foreground"
            >
              <GreetingHeading name={userName} />
            </h2>
            <p className="text-sm text-muted-foreground">
              Here&apos;s what&apos;s happening across Fix It Now today.
            </p>
          </section>
          <section
            aria-label="Dashboard statistics"
            // className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
          >
            <OverviewStats stats={stats} />
          </section>
          <DataTable columns={requestColumns} rows={requests} getRowKey={(row) => row.id} caption="Recent service requests" />
        </div>
      </main>
    </>
  );
}
