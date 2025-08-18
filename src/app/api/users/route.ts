import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { User } from "@/models/models";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export interface JWTPayload {
  userId: string;
  username: string;
  name: string;
  role: "admin" | "user";
}

const JWT_SECRET = process.env.JWT_SECRET || "changeme";
const client = await clientPromise;
const db = client.db(process.env.MONGODB_DB);
const users = db.collection<User>("users");

// Get all users (without password hashes)
export async function GET() {
  //authorization checking
  // const token = req.cookies.get("token")?.value;
  // if (!token) {
  //   return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  // }
  // let payload: JWTPayload;
  // try {
  //   payload = jwt.verify(token, JWT_SECRET) as JWTPayload;
  //   if (payload.role !== "admin") {
  //     return NextResponse.json({ error: "Not authorized" }, { status: 403 });
  //   }
  // } catch {
  //   return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  // }
  // finding all users
  try {
    const users = await db
      .collection("users")
      .find({})
      .project({ passwordHash: 0 })
      .toArray();

    return NextResponse.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}

// Create a new user
export async function POST(req: NextRequest) {
  //authorization checking
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
  // creating new user
  const { username, name, password } = await req.json();
  if (!username || !name || !password) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

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
    role: "user",
  };
  await users.insertOne(newUser);
  return NextResponse.json({ message: "User created" }, { status: 201 });
}
