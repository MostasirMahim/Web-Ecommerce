import mongoose, { Document, Model, Schema } from "mongoose";

interface IOrderProduct {
  item: mongoose.Types.ObjectId;
  quantity: number;
  color: string;
  size: string;
  sellPrice: number;
}

export interface IOrder extends Document {
  products: IOrderProduct[];
  customer: mongoose.Types.ObjectId;
  shippingAddress: string;
  amount: number;
  delivaryCharge: number;
  status: "pending" | "dispatched" | "shipped" | "delivered" | "cancelled";
  COD: boolean;
  delivaryDate: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const orderSchema: Schema<IOrder> = new Schema<IOrder>(
  {
    products: [
      {
        item: { type: Schema.Types.ObjectId, ref: "Product", required: true },
        quantity: { type: Number, default: 1 },
        color: { type: String, required: true },
        size: { type: String, required: true },
        sellPrice: { type: Number, required: true },
      },
    ],
    customer: { type: Schema.Types.ObjectId, ref: "User", required: true },
    shippingAddress: { type: String, required: true },
    amount: { type: Number, required: true },
    delivaryCharge: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "dispatched", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
    COD: { type: Boolean, default: true, required: true },
    delivaryDate: { type: String, required: true },
  },
  { timestamps: true }
);

const Order: Model<IOrder> =
  mongoose.models.Order || mongoose.model<IOrder>("Order", orderSchema);

export default Order;
