import mongoose, { Document, Model, Schema } from "mongoose";

interface GridCatItem {
  label: string;
  imgSrc: string;
}

interface GridCategory {
  index: number;
  title: string;
  items: GridCatItem[];
  link: string;
}

export interface IEcommerce extends Document {
  carousel: string[];
  rightBanner: string;
  gridCat: GridCategory[];
  categories: string[];
  subCategories: string[];
  sections: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

const ecommerceSchema: Schema<IEcommerce> = new Schema<IEcommerce>(
  {
    carousel: { type: [String], default: [] },
    rightBanner: { type: String, default: "" },
    gridCat: [
      {
        index: { type: Number, required: true },
        title: { type: String, required: true },
        items: [
          {
            label: { type: String, required: true },
            imgSrc: { type: String, required: true },
          },
        ],
        link: { type: String, default: "" },
      },
    ],
    categories: { type: [String], default: [] },
    subCategories: { type: [String], default: [] },
    sections: { type: [String], default: [] },
  },
  { timestamps: true }
);

const Ecommerce: Model<IEcommerce> = mongoose.models.Ecommerce || mongoose.model<IEcommerce>("Ecommerce", ecommerceSchema);

export default Ecommerce;
