import mongoose, { Schema, Document, Model } from "mongoose";

interface CartItem {
  item: mongoose.Types.ObjectId;
  color: string;
  sellPrice: number;
  size: string;
  quantity: number;
}

export interface IUser extends Document {
  name: string;
  number: string;
  altNumber: string;
  email: string;
  password: string;
  role: "user" | "admin" | "guest";
  cart: CartItem[];
  wishlist: mongoose.Types.ObjectId[];
  address: string[];
  buylist: mongoose.Types.ObjectId[];
  orders: mongoose.Types.ObjectId[];
  reviews: mongoose.Types.ObjectId[];
  store: mongoose.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, default: "" },
    number: { type: String, required: true, unique: true },
    altNumber: { type: String, default: "" },
    email: { type: String, unique: true, default: "" },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["guest", "user", "admin"],
      default: "guest",
    },
    cart: [
      {
        item: { type: Schema.Types.ObjectId, ref: "Product", required: true },
        color: { type: String, required: true },
        sellPrice: { type: Number, required: true },
        size: { type: String, required: true },
        quantity: { type: Number, required: true },
      },
    ],
    wishlist: [{ type: Schema.Types.ObjectId, ref: "Product", default: [] }],
    address: [{ type: String, default: [] }],
    buylist: [{ type: Schema.Types.ObjectId, ref: "Product", default: [] }],
    orders: [{ type: Schema.Types.ObjectId, ref: "Order", default: [] }],
    reviews: [{ type: Schema.Types.ObjectId, ref: "Review", default: [] }],
    store: { type: Schema.Types.ObjectId, ref: "Store", default: ""},
  },
  { timestamps: true }
);

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", userSchema);
export default User;
