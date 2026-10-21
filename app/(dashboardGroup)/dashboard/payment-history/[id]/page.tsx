import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getPaymentById } from "@/service/customer/getPaymentById";
import { BackButton } from "@/components/shared/BackButton";

export default async function PaymentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const payment = await getPaymentById(id);

  if (!payment) notFound();

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-4 px-5 py-6">
      <BackButton />

      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle>${Number(payment.amount).toFixed(2)}</CardTitle>
          <Badge
            variant={payment.status === "COMPLETED" ? "default" : "secondary"}
          >
            {payment.status}
          </Badge>
        </CardHeader>
        <CardContent>
          <dl className="space-y-3 text-sm">
            <Row label="Paid on">
              {payment.status === "COMPLETED"
                ? new Date(payment.paidAt).toLocaleDateString()
                : "Not paid yet"}
            </Row>
            <Row label="Provider">{payment.provider}</Row>
            <Row label="Booking address">{payment.booking.workAddress}</Row>
            <Row label="Scheduled for">
              {new Date(payment.booking.scheduledDate).toLocaleDateString()}
            </Row>
            <Row label="Booking status">
              {payment.booking.status.replace("_", " ")}
            </Row>
            <Row label="Reference">
              <span className="break-all font-mono text-xs">
                {payment.transactionId}
              </span>
            </Row>
          </dl>
        </CardContent>
      </Card>
    </div>
  );
}

function Row({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-4 border-b pb-3 last:border-0">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="text-right font-medium">{children}</dd>
    </div>
  );
}
