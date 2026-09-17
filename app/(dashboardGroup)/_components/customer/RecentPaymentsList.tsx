"use client";

import { CheckCircle2, CreditCard, ReceiptText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export type PaymentStatus = "Paid" | "Pending" | "Failed" | "Refunded";

export type RecentPayment = {
  id: string;
  service: string;
  date: string;
  amount: string;
  method?: string;
  status: PaymentStatus;
};

export type RecentPaymentsListProps = {
  payments?: RecentPayment[];
  onPaymentClick?: (payment: RecentPayment) => void;
};

const statusVariants: Record<
  PaymentStatus,
  "default" | "secondary" | "outline" | "destructive"
> = {
  Paid: "default",
  Pending: "secondary",
  Failed: "destructive",
  Refunded: "outline",
};

const defaultPayments: RecentPayment[] = [
  {
    id: "PAY-2084",
    service: "Air conditioner repair",
    date: "Jun 18, 2025",
    amount: "$120.00",
    method: "Visa ending in 4242",
    status: "Paid",
  },
  {
    id: "PAY-2071",
    service: "Electrical inspection",
    date: "Jun 11, 2025",
    amount: "$85.00",
    method: "Mastercard ending in 8810",
    status: "Paid",
  },
  {
    id: "PAY-2058",
    service: "Plumbing maintenance",
    date: "Jun 04, 2025",
    amount: "$64.50",
    method: "Visa ending in 4242",
    status: "Refunded",
  },
];

export function RecentPaymentsList({
  payments = defaultPayments,
  onPaymentClick,
}: RecentPaymentsListProps) {
  return (
    <Card className="border-border/70 bg-card shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between gap-4 border-b border-border/60 px-5 py-4">
        <div>
          <CardTitle className="text-base">Recent payments</CardTitle>
          <p className="mt-1 text-sm text-muted-foreground">
            Review your latest service transactions.
          </p>
        </div>
        <ReceiptText aria-hidden="true" className="size-5 text-primary" />
      </CardHeader>
      <CardContent className="p-0">
        {payments.length === 0 ? (
          <div className="px-5 py-10 text-center text-sm text-muted-foreground">
            No payments to show yet.
          </div>
        ) : (
          <ul className="divide-y divide-border/60">
            {payments.map((payment) => {
              const content = (
                <>
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    {payment.status === "Paid" ? (
                      <CheckCircle2 aria-hidden="true" className="size-5" />
                    ) : (
                      <CreditCard aria-hidden="true" className="size-5" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="truncate font-medium text-foreground">
                        {payment.service}
                      </h3>
                      <Badge variant={statusVariants[payment.status]}>
                        {payment.status}
                      </Badge>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {payment.date} · {payment.id}
                    </p>
                    {payment.method ? (
                      <p className="mt-1 text-xs text-muted-foreground">
                        {payment.method}
                      </p>
                    ) : null}
                  </div>
                  <p className="shrink-0 text-sm font-semibold text-foreground">
                    {payment.amount}
                  </p>
                </>
              );

              return (
                <li key={payment.id}>
                  {onPaymentClick ? (
                    <button
                      type="button"
                      onClick={() => onPaymentClick(payment)}
                      className="flex w-full items-start gap-4 px-5 py-4 text-left transition-colors hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
                      aria-label={`View payment ${payment.id} for ${payment.service}`}
                    >
                      {content}
                    </button>
                  ) : (
                    <div className="flex items-start gap-4 px-5 py-4">
                      {content}
                    </div>
                  )}
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
