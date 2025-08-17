import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { User } from "@/models/models";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "changeme";

export interface JWTPayload {
  userId: string;
  username: string;
  name: string;
  role: "admin" | "user";
}

export async function POST(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }
  let payload: JWTPayload;
  try {
    payload = jwt.verify(token, JWT_SECRET) as JWTPayload;
    if (payload.role !== "admin") {
      return NextResponse.json({ error: "Not authorized" }, { status: 403 });
    }
  } catch {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
  const { username, name, password, role } = await req.json();
  if (!username || !name || !password || !role) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);
  const users = db.collection<User>("users");
  const existing = await users.findOne({ $or: [{ username }, { name }] });
  if (existing) {
    return NextResponse.json({ error: "User already exists" }, { status: 409 });
  }
  const passwordHash = await bcrypt.hash(password, 10);
  const newUser: User = {
    username,
    name,
    passwordHash,
    createdAt: new Date().toISOString(),
    role,
  };
  await users.insertOne(newUser);
  return NextResponse.json({ message: "User created" }, { status: 201 });
}
