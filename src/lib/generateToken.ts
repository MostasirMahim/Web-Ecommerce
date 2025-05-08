import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const jwtSecret = process.env.JWT_SECRET || "";
export const generateToken = (id: string, res: NextResponse) => {
  if (!jwtSecret) return;
  const token = jwt.sign({ id }, jwtSecret, {
    expiresIn: "15d",
  });

  res.cookies.set("webEcotoken", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });
};
