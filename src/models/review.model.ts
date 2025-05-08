import mongoose, { Document, Model, Schema } from "mongoose";

export interface IReview extends Document {
  customer: mongoose.Types.ObjectId;
  product: mongoose.Types.ObjectId;
  images: string[];
  ratting: string;
  review: string;
  reply: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const reviewSchema: Schema<IReview> = new Schema<IReview>(
  {
    customer: { type: Schema.Types.ObjectId, ref: "User", required: true },
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    images: [{ type: String, default: [] }],
    ratting: { type: String, required: true },
    review: { type: String, required: true },
    reply: { type: String, default: "" },
  },
  { timestamps: true }
);

const Review: Model<IReview> = mongoose.models.Review || mongoose.model<IReview>("Review", reviewSchema);

export default Review;
