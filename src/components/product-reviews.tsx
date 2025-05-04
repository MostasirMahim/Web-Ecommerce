"use client"

import { useState } from "react"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import ProductReviewForm from "@/components/product-review-form"

// Sample reviews data
const sampleReviews = [
  {
    id: 1,
    name: "John D.",
    rating: 5,
    date: "2 months ago",
    title: "Excellent product, highly recommended!",
    comment:
      "This product exceeded my expectations. The quality is outstanding and it works perfectly. I would definitely buy it again.",
    verified: true,
  },
  {
    id: 2,
    name: "Sarah M.",
    rating: 4,
    date: "3 weeks ago",
    title: "Great value for money",
    comment:
      "Good quality product. Shipping was fast. Would have given 5 stars but the color is slightly different than shown in the pictures.",
    verified: true,
  },
  {
    id: 3,
    name: "Michael T.",
    rating: 5,
    date: "1 month ago",
    title: "Perfect fit and great material",
    comment:
      "Perfect fit and great material. Will definitely buy from this store again! The customer service was also excellent when I had questions.",
    verified: false,
  },
]

interface ProductReviewsProps {
  productId: string
  productName: string
  rating: number
  reviewCount: number
}

export default function ProductReviews({ productId, productName, rating, reviewCount }: ProductReviewsProps) {
  const [reviews, setReviews] = useState(sampleReviews)
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [sortBy, setSortBy] = useState("newest")

  // Calculate rating distribution
  const ratingCounts = {
    5: reviews.filter((review) => review.rating === 5).length,
    4: reviews.filter((review) => review.rating === 4).length,
    3: reviews.filter((review) => review.rating === 3).length,
    2: reviews.filter((review) => review.rating === 2).length,
    1: reviews.filter((review) => review.rating === 1).length,
  }

  // Sort reviews
  const sortedReviews = [...reviews].sort((a, b) => {
    if (sortBy === "highest") return b.rating - a.rating
    if (sortBy === "lowest") return a.rating - b.rating
    // Default: newest
    return b.id - a.id
  })

  const handleReviewSuccess = () => {
    setShowReviewForm(false)
    // In a real app, you would fetch the updated reviews
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-6 sm:flex-row">
        {/* Rating Summary */}
        <div className="sm:w-1/3">
          <Card className="p-4 text-center">
            <div className="text-5xl font-bold">{rating.toFixed(1)}</div>
            <div className="mt-2 flex justify-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-5 w-5 ${
                    star <= Math.round(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <div className="mt-2 text-sm text-muted-foreground">Based on {reviewCount} reviews</div>

            <div className="mt-4 space-y-2">
              {[5, 4, 3, 2, 1].map((star) => (
                <div key={star} className="flex items-center gap-2">
                  <div className="flex w-20 items-center justify-end">
                    <span>{star}</span>
                    <Star className="ml-1 h-4 w-4 fill-yellow-400 text-yellow-400" />
                  </div>
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-200">
                    <div
                      className="h-full rounded-full bg-yellow-400"
                      style={{
                        width: `${reviewCount > 0 ? (ratingCounts[star] / reviewCount) * 100 : 0}%`,
                      }}
                    ></div>
                  </div>
                  <div className="w-10 text-xs text-muted-foreground">{ratingCounts[star]}</div>
                </div>
              ))}
            </div>

            <Button className="mt-4 w-full" onClick={() => setShowReviewForm(!showReviewForm)}>
              {showReviewForm ? "Cancel" : "Write a Review"}
            </Button>
          </Card>
        </div>

        {/* Reviews List */}
        <div className="flex-1 space-y-4">
          {showReviewForm ? (
            <ProductReviewForm productId={productId} productName={productName} onSuccess={handleReviewSuccess} />
          ) : (
            <>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Customer Reviews</h3>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Sort by:</span>
                  <select
                    className="rounded-md border border-input bg-background px-2 py-1 text-sm"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="newest">Newest</option>
                    <option value="highest">Highest Rating</option>
                    <option value="lowest">Lowest Rating</option>
                  </select>
                </div>
              </div>

              {sortedReviews.length === 0 ? (
                <div className="rounded-lg border border-dashed p-6 text-center">
                  <p className="text-muted-foreground">No reviews yet. Be the first to review this product!</p>
                  <Button className="mt-4" onClick={() => setShowReviewForm(true)}>
                    Write a Review
                  </Button>
                </div>
              ) : (
                sortedReviews.map((review) => (
                  <Card key={review.id} className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{review.title}</h4>
                        <div className="mt-1 flex items-center gap-2">
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`h-4 w-4 ${
                                  star <= review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          {review.verified && (
                            <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-800">
                              Verified Purchase
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">{review.date}</div>
                    </div>
                    <p className="mt-2 text-sm">{review.comment}</p>
                    <div className="mt-3 text-sm text-muted-foreground">By {review.name}</div>
                  </Card>
                ))
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
