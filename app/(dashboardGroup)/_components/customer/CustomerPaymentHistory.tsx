"use client";

import {
  CreditCard,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CustomerPayment } from "@/lib/types";
import Link from "next/link";
import { Button } from "@/components/ui/button";


const statusVariants: Record<
  CustomerPayment["status"],
  "default" | "secondary" | "outline" | "destructive"
> = {
  PENDING: "secondary",
  COMPLETED: "outline",
  FAILED: "destructive",
  REFUNDED: "outline"
};

export default function CustomerPaymentHistory({
  payments,
}: {
  payments: CustomerPayment[];
}) {

  return (
    <Card>
        <CardHeader>
          <CardTitle>Payment history</CardTitle>
          <CardDescription>Every payment you&apos;ve made for a booking.</CardDescription>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          {payments.length === 0 ? (
            <div className="flex flex-col items-center gap-3 rounded-lg border border-dashed p-10 text-center">
              <CreditCard className="size-8 text-primary" aria-hidden="true" />
              <p className="font-medium">No payments yet</p>
              <p className="text-sm text-muted-foreground">
                Payments show up here after you pay for a booking.
              </p>
            </div>
          ) : (
            <Table className="min-w-[600px]">
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell className="whitespace-nowrap">
                      {payment.status === "COMPLETED"
                        ? new Date(payment.paidAt).toLocaleDateString()
                        : "—"}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {payment.booking.workAddress}
                    </TableCell>
                    <TableCell className="font-medium">
                      ${Number(payment.amount).toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <Badge variant={statusVariants[payment.status]}>
                        {payment.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        size="sm"
                        variant="ghost"
                        render={
                          <Link href={`/dashboard/payment-history/${payment.id}`}>View</Link>
                        }
                        nativeButton={false}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
  );
}

// "use client";

// import { Receipt, Calendar, CreditCard, ArrowUpRight } from "lucide-react";
// import { useRouter } from "next/navigation";
// import { Card } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { CustomerPayment } from "@/lib/types";

// export default function CustomerPaymentHistory({ payments }: { payments: CustomerPayment[] }) {
//   const router = useRouter();

//   const getStatusBadge = (status: CustomerPayment["status"]) => {
//     switch (status) {
//       case "COMPLETED":
//         return (
//           <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-50">
//             Success
//           </Badge>
//         );
//       case "PENDING":
//         return (
//           <Badge
//             variant="outline"
//             className="bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-50"
//           >
//             Pending
//           </Badge>
//         );
//       case "FAILED":
//         return (
//           <Badge
//             variant="destructive"
//             className="bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-50"
//           >
//             Failed
//           </Badge>
//         );
//       default:
//         return <Badge variant="outline">{status}</Badge>;
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6 space-y-6">
//       {/* Page Header */}
//       <div className="flex items-center gap-3 border-b pb-4">
//         <div className="p-2 bg-slate-100 rounded-lg">
//           <Receipt className="h-6 w-6 text-slate-700" />
//         </div>
//         <div>
//           <h1 className="text-2xl font-semibold tracking-tight">
//             Payment History
//           </h1>
//           <p className="text-sm text-muted-foreground">
//             View and manage your receipts and transactions
//           </p>
//         </div>
//       </div>

//       {/* Transactions Container */}
//       <div className="space-y-3">
//         {payments.length === 0 ? (
//           <div className="text-center py-12 text-muted-foreground border border-dashed rounded-lg">
//             No payments found.
//           </div>
//         ) : (
//           payments.map((payment) => {
//             const paymentDate = payment.paidAt
//               ? new Date(payment.paidAt).toLocaleDateString("en-US", {
//                   month: "short",
//                   day: "numeric",
//                   year: "numeric",
//                 })
//               : "N/A";

//             return (
//               <Card
//                 key={payment.id}
//                 onClick={() => router.push(`/customer/payments/${payment.id}`)}
//                 className="overflow-hidden p-4 transition-all hover:shadow-md cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
//               >
//                 {/* Left Column: Service Details & Tech */}
//                 <div className="space-y-1">
//                   <div className="flex items-center gap-2">
//                     {/* 🌟 Dynamic service title derived via the nested booking relation */}
//                     <h3 className="font-medium group-hover:text-cyan-800 transition-colors">
//                       {payment.booking?.service?.title || "Service Appointment"}
//                     </h3>
//                     <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
//                   </div>

//                   {/* 🌟 Safe access to technician name */}
//                   <p className="text-sm text-muted-foreground">
//                     Technician:{" "}
//                     <span className="font-medium text-slate-700">
//                       {payment.booking?.technician?.user?.name || "Assigned Pro"}
//                     </span>
//                   </p>

//                   {/* Sub-Metadata Row */}
//                   <div className="flex items-center gap-3 text-xs text-muted-foreground pt-1">
//                     <div className="flex items-center gap-1">
//                       <Calendar className="h-3.5 w-3.5" />
//                       <span>{paymentDate}</span>
//                     </div>
//                     <div className="flex items-center gap-1">
//                       <CreditCard className="h-3.5 w-3.5" />
//                       <span>{payment.method || payment.provider}</span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Right Column: Amount & Status Badge */}
//                 <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 border-t sm:border-t-0 pt-2 sm:pt-0">
//                   <p className="font-mono text-base font-bold text-slate-900">
//                     \${Number(payment.amount).toFixed(2)}
//                   </p>
//                   <div>{getStatusBadge(payment.status)}</div>
//                 </div>
//               </Card>
//             );
//           })
//         )}
//       </div>
//     </div>
//   );
// }
