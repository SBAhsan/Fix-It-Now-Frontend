import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function ServiceTicket() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-slate-900 p-6 text-slate-50 shadow-2xl">
      <div className="mb-4 flex items-start justify-between border-b border-dashed border-slate-700 pb-4">
        <div>
          <p className="text-xs text-slate-400">SERVICE TICKET</p>
          <p className="font-mono text-xs text-slate-500">#FIN-20486</p>
        </div>
        <Badge className="bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/20">MATCHED</Badge>
      </div>

      <p className="mb-1 text-lg font-semibold">Leaking kitchen faucet</p>
      <p className="mb-6 text-sm text-slate-400">Booked today, 4:20 PM · Panchlaish</p>

      <dl className="space-y-3 text-sm">
        <Row label="Technician">
          <span className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarFallback className="text-[10px]">RH</AvatarFallback>
            </Avatar>
            Rafiq Hossain
          </span>
        </Row>
        <Row label="Category"><span>Plumbing</span></Row>
        <Row label="ETA"><span className="font-mono">38 min</span></Row>
        <Row label="Rate"><span className="font-mono">৳450</span></Row>
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