"use server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import User from "@/models/user.model";
import mongodbConnect from "@/lib/connect_Database";

export const getAuthStatus = async () => {
  await mongodbConnect();
  const cookieStore = cookies();
  const token = cookieStore.get("webEcotoken")?.value;

  if (!token) {
    return { isAuthenticated: false, user: null };
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
    if (!decoded?.id) {
      return { isAuthenticated: false, user: null };
    }

    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return { isAuthenticated: false, user: null };
    }

    return { isAuthenticated: true, user };
  } catch {
    return { isAuthenticated: false, user: null };
  }
};
