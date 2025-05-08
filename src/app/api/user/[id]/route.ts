import User from "@/models/user.model";
import { NextResponse } from "next/server";

export async function GET (
  { params }: { params: { id: string } }
) {
  try {
    const user = await User.findById(params.id.toString()).select("-password");
    if(!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};


