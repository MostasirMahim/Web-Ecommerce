import mongoose, { Document, Model, Schema } from "mongoose";

export interface IStore extends Document {
  name: string;
  username: string;
  logo: string;
  carousel: string[];
  products: mongoose.Types.ObjectId[];
  owner: mongoose.Types.ObjectId;
  contacts: {
    email: string;
    phone: string;
    address?: string;
  };
  reviews: mongoose.Types.ObjectId[];
  orders: mongoose.Types.ObjectId[];
  wallet: {
    amount: number;
    revenue: number;
    deduction: number;
    withdraw: number;
    currentBalance: number;
  };
  transactions: mongoose.Types.ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
}

const storeSchema: Schema<IStore> = new Schema<IStore>(
  {
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    logo: { type: String, default: "" },
    carousel: [{ type: String, default: "" }],
    products: [{ type: Schema.Types.ObjectId, ref: "Product", default: [] }],
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
    contacts: {
      email: { type: String, required: true },
      phone: { type: String, required: true },
      address: { type: String },
    },
    reviews: [{ type: Schema.Types.ObjectId, ref: "Review", default: [] }],
    orders: [{ type: Schema.Types.ObjectId, ref: "Order", default: [] }],
    wallet: {
      amount: { type: Number, default: 0 },
      revenue: { type: Number, default: 0 },
      deduction: { type: Number, default: 0 },
      withdraw: { type: Number, default: 0 },
      currentBalance: { type: Number, default: 0 },
    },
    transactions: [{ type: Schema.Types.ObjectId, ref: "Transaction", default: [] }],
  },
  { timestamps: true }
);

const Store: Model<IStore> = mongoose.models.Store || mongoose.model<IStore>("Store", storeSchema);

export default Store;
