import clientPromise from "@/lib/mongodb";
import { JwtPayload } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";

const JWT_SECRET = process.env.JWT_SECRET || "changeme";
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

// export async function PUT(
//   req: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   //authorization checking
//   const token = req.cookies.get("token")?.value;
//   if (!token) {
//     return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
//   }
//   let payload: JwtPayload;
//   try {
//     payload = jwt.verify(token, JWT_SECRET) as JwtPayload;
//     if (payload.role !== "admin") {
//       return NextResponse.json({ error: "Not authorized" }, { status: 403 });
//     }
//   } catch {
//     return NextResponse.json({ error: "Invalid token" }, { status: 401 });
//   }
//   // put req
//   try {
//     const productId = params.id;
//     const updateProducts = await req.json();

//     const result = await db
//       .collection("products")
//       .updateOne({ _id: new ObjectId(productId) }, { $set: updateProducts });

//     return NextResponse.json(result);
//   } catch (error) {
//     return NextResponse.json(
//       { error: "Failed to update product" },
//       { status: 500 }
//     );
//   }
// }
