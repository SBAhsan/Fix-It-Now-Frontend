"use client";

import { MessageSquareQuote, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CustomerReview } from "@/lib/types";


function ReviewStars({ rating }: { rating: number }) {
  return (
    <div
      className="flex items-center gap-1"
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          className={
            index < rating
              ? "size-4 fill-primary text-primary"
              : "size-4 text-muted-foreground/30"
          }
          aria-hidden="true"
        />
      ))}
      <span className="ml-1 text-sm font-semibold">{rating}.0</span>
    </div>
  );
}

export function MyReviewsList({
  reviews
}: { reviews : CustomerReview[]}) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div>
            <CardTitle>My Reviews</CardTitle>
            <CardDescription>
              Reviews you have shared about your completed services.
            </CardDescription>
          </div>
          <Badge variant="secondary">
            {reviews.length} {reviews.length === 1 ? "review" : "reviews"}
          </Badge>
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
            <p className="text-sm text-muted-foreground">
              Your reviews will appear here after you complete a service.
            </p>
          </div>
        ) : (
          <div className="flex flex-col divide-y">
            {reviews.map((review) => (
              <article
                key={review.id}
                className="flex flex-col gap-4 py-5 first:pt-0 last:pb-0 sm:flex-row sm:items-start sm:justify-between"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                    <h3 className="font-semibold">{review.service}</h3>
                    <Badge variant="outline">Completed</Badge>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Technician: {review.technician}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-foreground/80">
                    &ldquo;{review.comment}&rdquo;
                  </p>
                </div>
                <div className="shrink-0 sm:text-right">
                  <ReviewStars rating={review.rating} />
                  <p className="mt-2 text-xs text-muted-foreground">
                    {review.createdAt}
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default MyReviewsList;
