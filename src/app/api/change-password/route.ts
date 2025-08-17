import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

import { User } from "@/models/models";
import { JWTPayload } from "../create-user/route";

const JWT_SECRET = process.env.JWT_SECRET || "changeme";

export async function POST(req: NextRequest) {
  const { oldPassword, newPassword, username } = await req.json();
  const token = req.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }
  let payload: JWTPayload;
  try {
    payload = jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);
  const users = db.collection<User>("users");

  let user: User | null = null;
  if (payload.role === "admin" && username) {
    user = await users.findOne({ username });
    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 404 });
  } else {
    user = await users.findOne({ username: payload.username });
    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    // Check old password for non-admins
    const valid = await bcrypt.compare(oldPassword, user.passwordHash);
    if (!valid)
      return NextResponse.json(
        { error: "Old password incorrect" },
        { status: 401 }
      );
  }
  const passwordHash = await bcrypt.hash(newPassword, 10);
  await users.updateOne(
    { username: user.username },
    { $set: { passwordHash } }
  );
  return NextResponse.json({ message: "Password changed" });
}
