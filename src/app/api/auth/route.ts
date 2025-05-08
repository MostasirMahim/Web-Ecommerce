import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/models/user.model";
import { generateToken } from "@/lib/generateToken";
import mongodbConnect from "@/lib/connect_Database";
import { getAuthStatus } from "@/lib/authMiddleware";

export async function GET() {
  try {
    const { isAuthenticated, user } = await getAuthStatus();
    if (!isAuthenticated) {
      return NextResponse.json({ user: { role: "guest" } }, { status: 200 });
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await mongodbConnect();
    const { number, password } = await req.json();

    if (!number || !password) {
      return NextResponse.json(
        { error: "Please fill all the fields" },
        { status: 400 }
      );
    }

    const isNumberExist = await User.findOne({ number });
    if (isNumberExist) {
      return NextResponse.json(
        { message: "Number already registered" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newuser: any = new User({ number, password: hashedPassword });
    await newuser.save();

    const response = NextResponse.json(
      { message: "User created successfully" },
      { status: 201 }
    );

    generateToken(newuser?._id.toString() as string, response);

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function Patch(req: NextRequest) {
  try {
    await mongodbConnect();
    const { number, password } = await req.json();
    if (!number || !password) {
      return NextResponse.json(
        { error: "Please fill all the fields" },
        { status: 400 }
      );
    }
    const user: any = await User.findOne({ number });
    if (!user) {
      return NextResponse.json({ error: "No User Found" }, { status: 400 });
    }

    const correct = await bcrypt.compare(password, user.password);

    if (!correct) {
      return NextResponse.json(
        { error: "Invalid Phone Number or Password" },
        { status: 400 }
      );
    }
    const response = NextResponse.json(
      { message: "Login successful" },
      { status: 200 }
    );
    generateToken(user._id.toString(), response);

    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  try {
    const res = NextResponse.json(
      { message: "Logout successfully" },
      { status: 200 }
    );
    res.cookies.set("webEcotoken", "", {
      expires: new Date(0),
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });
    return res;
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
