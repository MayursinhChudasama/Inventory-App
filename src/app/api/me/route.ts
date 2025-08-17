import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "changeme";

interface JWTPayload {
  userId: string;
  username: string;
  name: string;
  role: "admin" | "user";
}

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }
  try {
    const payload = jwt.verify(token, JWT_SECRET) as JWTPayload;
    return NextResponse.json({
      user: {
        userId: payload.userId,
        username: payload.username,
        name: payload.name,
        role: payload.role,
      },
    });
  } catch {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}
