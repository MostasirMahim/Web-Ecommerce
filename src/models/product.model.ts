import mongoose, { Document, Model, Schema } from "mongoose";

interface IPrice {
  size: string;
  sellPrice: number;
  discount: number;
}

interface IColor {
  name: string;
  code: string;
}

interface IOrderItem {
  order: mongoose.Types.ObjectId;
  quantity: number;
}

export interface IProduct extends Document {
  name: string;
  description: string;
  price: IPrice[];
  image: string[];
  colors: IColor[];
  size: string[];
  category: string;
  subCategory: string;
  brand: string;
  material: string;
  store: mongoose.Types.ObjectId;
  GWS: string;
  stock: number;
  status: "active" | "archived" | "outofstock";
  reviews: mongoose.Types.ObjectId[];
  sold: number;
  avgRatting: number;
  addtocart: mongoose.Types.ObjectId[];
  orders: IOrderItem[];
  wishlisted: mongoose.Types.ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
}

const productSchema: Schema<IProduct> = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: [
      {
        size: { type: String, required: true },
        sellPrice: { type: Number, required: true },
        discount: { type: Number, required: true },
      },
    ],
    image: [{ type: String, default: "" }],
    colors: [
      {
        name: { type: String, required: true },
        code: { type: String, required: true },
      },
    ],
    size: [{ type: String, required: true }],
    category: { type: String, required: true },
    subCategory: { type: String, required: true },
    brand: { type: String, required: true },
    material: { type: String, required: true },
    GWS: { type: String, required: true },
    stock: { type: Number, required: true },
    status: {
      type: String,
      enum: ["active", "archived", "outofstock"],
      default: "active",
    },
    reviews: [{ type: Schema.Types.ObjectId, ref: "Review", default: [] }],
    sold: { type: Number, default: 0 },
    avgRatting: { type: Number, default: 0 },
    addtocart: [{ type: Schema.Types.ObjectId, ref: "User", default: [] }],
    orders: [
      {
        order: { type: Schema.Types.ObjectId, ref: "Order", required: true },
        quantity: { type: Number, default: 1 },
      },
    ],
    wishlisted: [{ type: Schema.Types.ObjectId, ref: "User", default: [] }],
  },
  { timestamps: true }
);

const Product: Model<IProduct> =
  mongoose.models.Product || mongoose.model<IProduct>("Product", productSchema);

export default Product;
