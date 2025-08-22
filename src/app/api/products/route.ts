import clientPromise from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

// const JWT_SECRET = process.env.JWT_SECRET || "changeme";
const client = await clientPromise;
const db = client.db(process.env.MONGODB_DB);

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (!token) {
    console.log("not token");

    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    const products = await db.collection("products").find({}).toArray();

    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
