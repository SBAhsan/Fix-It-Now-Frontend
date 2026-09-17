"use client";

import Link from "next/link";
import { CheckCircle2, CreditCard, XCircle, RotateCcw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CustomerPayment, PaymentStatus } from "@/lib/types";

const statusVariants: Record<
  PaymentStatus,
  "default" | "secondary" | "outline" | "destructive"
> = {
  COMPLETED: "default",
  PENDING: "secondary",
  FAILED: "destructive",
  REFUNDED: "outline",
};

const statusIcons: Record<PaymentStatus, typeof CheckCircle2> = {
  COMPLETED: CheckCircle2,
  PENDING: CreditCard,
  FAILED: XCircle,
  REFUNDED: RotateCcw,
};

export function RecentPaymentsList({
  payments,
}: {
  payments: CustomerPayment[];
}) {
  return (
    <Card className="border-border/70 bg-card shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between gap-4 border-b border-border/60 px-5 py-4">
        <div>
          <CardTitle className="text-base">Recent payments</CardTitle>
          <p className="mt-1 text-sm text-muted-foreground">
            Review your latest service transactions.
          </p>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {payments.length === 0 ? (
          <div className="px-5 py-10 text-center text-sm text-muted-foreground">
            No payments to show yet.
          </div>
        ) : (
          <ul className="divide-y divide-border/60">
            {payments.map((payment) => {
              const StatusIcon = statusIcons[payment.status];
              return (
                <li key={payment.id}>
                  <Link
                    href={`/dashboard/payments/${payment.id}`}
                    className="flex w-full items-start gap-4 px-5 py-4 text-left transition-colors hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
                    aria-label={`View payment ${payment.id}`}
                  >
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <StatusIcon aria-hidden="true" className="size-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="truncate font-medium text-foreground">
                          {payment.booking.workAddress}
                        </h3>
                        <Badge variant={statusVariants[payment.status]}>
                          {payment.status}
                        </Badge>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {new Date(payment.paidAt).toLocaleDateString()} ·{" "}
                        {payment.transactionId}
                      </p>
                      {payment.method ? (
                        <p className="mt-1 text-xs text-muted-foreground">
                          {payment.method}
                        </p>
                      ) : null}
                    </div>
                    <p className="shrink-0 text-sm font-semibold text-foreground">
                      ${Number(payment.amount).toFixed(2)}
                    </p>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}

export default RecentPaymentsList;
