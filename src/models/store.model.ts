import mongoose, { Document, Model, Schema } from "mongoose";

export interface IStore extends Document {
  products: mongoose.Types.ObjectId[];
  owner: mongoose.Types.ObjectId;
  reviews: mongoose.Types.ObjectId[];
  orders: mongoose.Types.ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
}

const storeSchema: Schema<IStore> = new Schema<IStore>(
  {
    products: [{ type: Schema.Types.ObjectId, ref: "Product", default: [] }],
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
    reviews: [{ type: Schema.Types.ObjectId, ref: "Review", default: [] }],
    orders: [{ type: Schema.Types.ObjectId, ref: "Order", default: [] }],
  },
  { timestamps: true }
);

const Store: Model<IStore> = mongoose.models.Store || mongoose.model<IStore>("Store", storeSchema);

export default Store;
