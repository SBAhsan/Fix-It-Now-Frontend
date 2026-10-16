import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { api } from "@/lib/api";
import { getServices } from "@/app/(publicGroup)/_actions/getServices";

type TicketService = {
  id: string;
  title: string;
  price: string;
  createdAt: string;
  category: { name: string };
  technician: {
    city: string;
    experienceYears: number;
    user: { name: string };
  };
};

export async function ServiceTicket() {
  const services = await getServices()
  const service = services[0];

  if (!service) return null;

  const techName = service.technician.user.name;
  const initials = techName
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const listed = new Date(service.createdAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
  });

  return (
    <div className="relative overflow-hidden rounded-2xl bg-slate-900 p-6 text-slate-50 shadow-2xl">
      <div className="mb-4 flex items-start justify-between border-b border-dashed border-slate-700 pb-4">
        <div>
          <p className="text-xs text-slate-400">SERVICE TICKET</p>
          <p className="font-mono text-xs text-slate-500">
            #FIN-{service.id.slice(0, 5).toUpperCase()}
          </p>
        </div>
        <Badge className="bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/20">AVAILABLE</Badge>
      </div>

      <p className="mb-1 text-lg font-semibold">{service.title}</p>
      <p className="mb-6 text-sm text-slate-400">
        Listed {listed} · {service.technician.city}
      </p>

      <dl className="space-y-3 text-sm">
        <Row label="Technician">
          <span className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarFallback className="text-[10px]">{initials}</AvatarFallback>
            </Avatar>
            {techName}
          </span>
        </Row>
        <Row label="Category"><span>{service.category.name}</span></Row>
        <Row label="Experience">
          <span className="font-mono">{service.technician.experienceYears} yrs</span>
        </Row>
        <Row label="Rate"><span className="font-mono">$ {Number(service.price)}</span></Row>
      </dl>
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between border-b border-slate-800 pb-3 last:border-0">
      <dt className="text-slate-400">{label}</dt>
      <dd>{children}</dd>
    </div>
  );
}