"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/toast";
import { createReview } from "@/service/customer/createReview";
import { CustomerBooking } from "@/lib/types";

export function ReviewDialog({
  booking,
  onClose,
}: {
  booking: CustomerBooking | null;
  onClose: () => void;
}) {
  const router = useRouter();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isPending, startTransition] = useTransition();

  function handleSubmit() {
    if (!booking || rating === 0) return;

    startTransition(async () => {
      const res = await createReview({
        bookingId: booking.id,
        rating,
        comment: comment || undefined,
      });

      if (res.success) {
        toast.add({ type: "success", title: "Review submitted" });
        setRating(0);
        setComment("");
        onClose();
        router.refresh();
      } else {
        toast.add({ type: "error", title: res.message ?? "Failed to submit review" });
      }
    });
  }

  return (
    <Dialog open={!!booking} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rate your technician</DialogTitle>
        </DialogHeader>

        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((n) => (
            <button key={n} type="button" onClick={() => setRating(n)}>
              <Star
                className={`size-7 ${n <= rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`}
              />
            </button>
          ))}
        </div>

        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write a comment (optional)"
          className="min-h-24 w-full rounded-md border bg-transparent p-3 text-sm"
        />

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={rating === 0 || isPending}>
            {isPending ? "Submitting..." : "Submit review"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}