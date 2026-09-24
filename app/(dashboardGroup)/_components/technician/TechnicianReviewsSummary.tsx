"use client";

import { Star, MessageSquareQuote } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TechnicianReview } from "@/lib/types";

function ReviewStars({ rating }: { rating: number }) {
  return (
    <div
      className="flex items-center gap-1"
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={
            i < rating
              ? "size-4 fill-primary text-primary"
              : "size-4 text-muted-foreground/30"
          }
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

export function TechnicianReviewsSummary({
  reviews,
}: {
  reviews: TechnicianReview[];
}) {
  const avgRating = reviews.length
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0;
  const counts = [0, 0, 0, 0, 0];
  reviews.forEach((r) => {
    if (r.rating >= 1 && r.rating <= 5) counts[r.rating - 1]++;
  });
  const maxCount = Math.max(...counts, 1);

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">
              Average rating
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold">{avgRating.toFixed(1)}</span>
              <ReviewStars rating={Math.round(avgRating)} />
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              From {reviews.length} reviews
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total reviews</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{reviews.length}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-base">Feedback summary</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {[5, 4, 3, 2, 1].map((stars) => (
              <div key={stars} className="flex items-center gap-3">
                <span className="w-12 text-sm font-medium text-muted-foreground">
                  {stars} star
                </span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{
                      width: `${(counts[stars - 1] / maxCount) * 100}%`,
                    }}
                  />
                </div>
                <span className="w-8 text-right text-sm text-muted-foreground">
                  {counts[stars - 1]}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-start justify-between gap-4">
              <div>
                <CardTitle className="text-base">Recent reviews</CardTitle>
                <CardDescription>
                  Feedback from customers about your services
                </CardDescription>
              </div>
              <Badge variant="outline">{reviews.length}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            {reviews.length === 0 ? (
              <div className="flex flex-col items-center gap-3 rounded-lg border border-dashed p-10 text-center">
                <MessageSquareQuote
                  className="size-8 text-primary"
                  aria-hidden="true"
                />
                <p className="font-medium">No reviews yet</p>
              </div>
            ) : (
              <div className="flex flex-col divide-y">
                {reviews.slice(0, 5).map((review) => (
                  <article
                    key={review.id}
                    className="flex flex-col gap-3 py-4 first:pt-0 last:pb-0"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <h3 className="truncate font-medium">
                          {review.booking.customer.name}
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          {review.booking.bookingItems
                            .map((i) => i.service.title)
                            .join(", ")}
                        </p>
                      </div>
                      <ReviewStars rating={review.rating} />
                    </div>
                    {review.comment && (
                      <p className="text-sm text-muted-foreground">
                        &ldquo;{review.comment}&rdquo;
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </p>
                  </article>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
