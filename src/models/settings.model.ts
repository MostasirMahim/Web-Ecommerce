import { create } from "zustand";

import mongoose, { Document, Model, models, Schema } from "mongoose";
export interface ISettings extends Document {
  general: {
    siteName: string;
    siteDescription: string;
    logo: string;
    favicon: string;
    primaryColor: string;
    accentColor: string;
  };
  homepage: {
    heroTitle: string;
    heroSubtitle: string;
    heroImage: string;
    showFeaturedProducts: boolean;
    featuredProductsTitle: string;
    featuredProductIds: string[];
    showNewArrivals: boolean;
    newArrivalsTitle: string;
    showCategories: boolean;
    categoriesTitle: string;
  };
  footer: {
    showNewsletter: boolean;
    newsletterTitle: string;
    newsletterText: string;
    copyrightText: string;
    showSocialLinks: boolean;
    facebook: string;
    twitter: string;
    instagram: string;
  };
  product: {
    showRelatedProducts: boolean;
    relatedProductsTitle: string;
    showReviews: boolean;
    enableRatings: boolean;
  };
  store: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  content: {
    cauroTitle: string;
    cauroSubtitle: string;
    aboutTitle: string;
    aboutContent: string;
    privacyContent: string;
    termsContent: string;
    shippingContent: string;
    returnContent: string;
  };
  owner: {
    name: string;
    email: string;
    phone: string;
    position: string;
  };
  categories: [category: string, subCategories: string[]];
  createdAt?: Date;
  updatedAt?: Date;
}

const settingsSchema = new Schema<ISettings>(
  {
    general: {
      siteName: { type: String, default: "" },
      siteDescription: { type: String, default: "" },
      logo: { type: String, default: "/logo.png" },
      favicon: { type: String, default: "/favicon.ico" },
      primaryColor: { type: String, default: "#0f172a" },
      accentColor: { type: String, default: "#3b82f6" },
    },
    homepage: {
      heroTitle: { type: String, default: "" },
      heroSubtitle: { type: String, default: "" },
      heroImage: { type: String, default: "/hero.jpg" },
      showFeaturedProducts: { type: Boolean, default: true },
      featuredProductsTitle: { type: String, default: "" },
      featuredProductIds: { type: [String], default: [] },
      showNewArrivals: { type: Boolean, default: true },
      newArrivalsTitle: { type: String, default: "New Arrivals" },
      showCategories: { type: Boolean, default: true },
      categoriesTitle: { type: String, default: "" },
    },
    footer: {
      showNewsletter: { type: Boolean, default: true },
      newsletterTitle: { type: String, default: "" },
      newsletterText: { type: String, default: "" },
      copyrightText: { type: String, default: "" },
      showSocialLinks: { type: Boolean, default: true },
      facebook: { type: String, default: "" },
      twitter: { type: String, default: "" },
      instagram: { type: String, default: "" },
    },
    product: {
      showRelatedProducts: { type: Boolean, default: true },
      relatedProductsTitle: { type: String, default: "" },
      showReviews: { type: Boolean, default: true },
      enableRatings: { type: Boolean, default: true },
    },
    store: {
      name: { type: String, default: "" },
      email: { type: String, default: "" },
      phone: { type: String, default: "" },
      address: { type: String, default: "" },
      city: { type: String, default: "" },
      state: { type: String, default: "" },
      zipCode: { type: String, default: "" },
      country: { type: String, default: "" },
    },
    content: {
      cauroTitle: { type: String, default: "" },
      cauroSubtitle: { type: String, default: "" },
      aboutTitle: { type: String, default: "" },
      aboutContent: { type: String, default: "" },
      privacyContent: { type: String, default: "" },
      termsContent: { type: String, default: "" },
      shippingContent: { type: String, default: "" },
      returnContent: { type: String, default: "" },
    },
    owner: {
      name: { type: String, default: "" },
      email: { type: String, default: "" },
      phone: { type: String, default: "" },
      position: { type: String, default: "" },
    },
    categories: {
      type: [
        {
          category: { type: String, default: "" },
          subCategories: { type: [String], default: [] },
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

const Settings =
  mongoose.models?.Settings ||
  mongoose.model<ISettings>("Settings", settingsSchema);
export default Settings;
