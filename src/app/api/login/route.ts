import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { User } from "@/models/models";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "changeme";

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    const users = db.collection<User>("users");

    const user = await users.findOne({ username });

    if (!user) {
      return NextResponse.json({ error: "Invalid username" }, { status: 401 });
    }

    const valid = await bcrypt.compare(password, user.passwordHash);

    if (!valid) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    // Create JWT
    const token = jwt.sign(
      {
        userId: user._id,
        username: user.username,
        name: user.name,
        role: user.role,
      },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Set cookie
    const res = NextResponse.json({
      message: "Login successful",
      user: { username: user.username, name: user.name, role: user.role },
    });
    res.cookies.set("token", token, {
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      maxAge: 60 * 60 * 24,
    });
    return res;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
