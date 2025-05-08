import { getAuthStatus } from "@/lib/authMiddleware";
import Product from "@/models/product.model";
import Store from "@/models/store.model";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import Review from "@/models/review.model";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = await params.id;
    const update = await req.json();

    const { isAuthenticated, user: userdata } = await getAuthStatus();
    if (!isAuthenticated) {
      return {
        success: false,
        error: "User not authenticated",
      };
    }
    const user = await User.findById(userdata?._id);
    if (!user) {
      return {
        success: false,
        error: "User not found",
      };
    }

    const product = await Product.findById(id.toString());
    if (!product) {
      return NextResponse.json({ success: false, error: "Product not found" });
    }
    if (user.role !== "admin") {
      return NextResponse.json({ success: false, error: "Access Denied" });
    }

    const updateFields = {
      price: update.price && update.price.length ? update.price : product.price,
      status:
        update.status && update.status.trim() ? update.status : product.status,
      description:
        update.description && update.description.trim()
          ? update.description
          : product.description,
      colors:
        update.colors && update.colors.length ? update.colors : product.colors,
      size: update.size && update.size.length ? update.size : product.size,
      GWS: update.GWS && update.GWS.trim() ? update.GWS : product.GWS,
      stock: update.stock != 0 ? update.stock : product.stock,
    };

    await Product.findByIdAndUpdate(id, updateFields, {
      new: true,
      runValidators: false,
    });

    return NextResponse.json({
      success: true,
      message: "Product updated successfully",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      error: "Internal Server Error",
    });
  }
}
export async function DELETE({ params }: { params: { id: string } }) {
  try {
    const { isAuthenticated, user: userdata } = await getAuthStatus();
    if (!isAuthenticated) {
      return {
        success: false,
        error: "User not authenticated",
      };
    }
    const user = await User.findById(userdata?._id);
    if (!user) {
      return {
        success: false,
        error: "User not found",
      };
    }
    const id = await params.id;
    if (!id)
      return NextResponse.json({ success: false, error: "ID not found" });
    const product = await Product.findById(id.toString());
    if (!product) {
      return NextResponse.json({ success: false, error: "Product not found" });
    }
    const store = await Store.findById(product.store);
    if (!store) {
      return NextResponse.json({ success: false, error: "Store not found" });
    }
    if (user.role !== "admin") {
      return NextResponse.json({ success: false, error: "Access Denied" });
    }

    const publicIds = product?.image?.map((url) =>
      url ? url.split("/").pop()?.split(".")[0] : undefined
    );
    await Promise.all(
      publicIds
        ?.filter((publicId): publicId is string => !!publicId)
        .map((publicId) => cloudinary.uploader.destroy(publicId))
    );

    await Product.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      error: "Internal Server Error",
    });
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = await params.id;
    const { reply } = await req.json();
    const review = await Review.findById(id);
    if (!review)
      return NextResponse.json({ success: false, error: "Review not found" });
    review.reply = reply;
    await review.save();
    return NextResponse.json(review);
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      error: "Internal Server Error",
    });
  }
}
