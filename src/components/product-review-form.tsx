"use client"

import { useState } from "react"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

interface ProductReviewFormProps {
  productId: string
  productName: string
  onSuccess?: () => void
}

export default function ProductReviewForm({ productId, productName, onSuccess }: ProductReviewFormProps) {
  const { toast } = useToast()
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [reviewTitle, setReviewTitle] = useState("")
  const [reviewContent, setReviewContent] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()

    if (rating === 0) {
      toast({
        title: "Rating required",
        description: "Please select a rating before submitting your review.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Review submitted",
        description: "Thank you for your feedback! Your review has been submitted successfully.",
      })

      // Reset form
      setRating(0)
      setReviewTitle("")
      setReviewContent("")
      setName("")
      setEmail("")
      setIsSubmitting(false)

      if (onSuccess) {
        onSuccess()
      }
    }, 1000)
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Write a Review</h3>
      <p className="text-sm text-muted-foreground">
        Share your thoughts on {productName} to help other customers make their decision.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label>Your Rating</Label>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className="p-1"
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setRating(star)}
              >
                <Star
                  className={`h-6 w-6 ${
                    (hoverRating ? star <= hoverRating : star <= rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="review-title">Review Title</Label>
          <Input
            id="review-title"
            placeholder="Summarize your experience"
            value={reviewTitle}
            onChange={(e) => setReviewTitle(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="review-content">Your Review</Label>
          <Textarea
            id="review-content"
            placeholder="What did you like or dislike about this product?"
            rows={4}
            value={reviewContent}
            onChange={(e) => setReviewContent(e.target.value)}
            required
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="review-name">Your Name</Label>
            <Input
              id="review-name"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="review-email">Your Email</Label>
            <Input
              id="review-email"
              type="email"
              placeholder="john.doe@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <p className="text-xs text-muted-foreground">Your email will not be published</p>
          </div>
        </div>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit Review"}
        </Button>
      </form>
    </div>
  )
}
