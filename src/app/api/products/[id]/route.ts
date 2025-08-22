import clientPromise from "@/lib/mongodb";
import { JwtPayload } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";

const JWT_SECRET = process.env.JWT_SECRET || "changeme";
const client = await clientPromise;
const db = client.db(process.env.MONGODB_DB);

export async function PUT(req: Request) {
  // Authorization checking
  const token = req.headers
    .get("cookie")
    ?.split("; ")
    .find((c) => c.startsWith("token="))
    ?.split("=")[1];
  if (!token) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET) as JwtPayload;
    if (payload.role !== "admin") {
      return NextResponse.json({ error: "Not authorized" }, { status: 403 });
    }
  } catch {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
  //update
  try {
    const payload = await req.json();
    const productId = payload.id;
    if (!ObjectId.isValid(productId)) {
      console.error("Invalid product ID:", productId);
      return NextResponse.json(
        { error: "Invalid product ID" },
        { status: 400 }
      );
    }

    let result;
    if (payload.type == "addModel") {
      result = await db
        .collection("products")
        .updateOne({ _id: new ObjectId(productId) }, { $push: payload.body });
    } else if (payload.type == "addBrand") {
      result = await db
        .collection("products")
        .updateOne({ _id: new ObjectId(productId) }, { $set: payload.body });
    }

    if (result?.matchedCount === 0) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Product updated successfully",
      data: result,
    });
  } catch (error) {
    console.error("Update error:", error);
    return NextResponse.json(
      {
        error: "Failed to update product",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  // Authorization checking
  const token = req.headers
    .get("cookie")
    ?.split("; ")
    .find((c) => c.startsWith("token="))
    ?.split("=")[1];
  if (!token) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET) as JwtPayload;
    if (payload.role !== "admin") {
      return NextResponse.json({ error: "Not authorized" }, { status: 403 });
    }
  } catch {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
  //delete
  try {
    const payload = await req.json();
    const productId = payload.id;
    if (!ObjectId.isValid(productId)) {
      console.error("Invalid product ID:", productId);
      return NextResponse.json(
        { error: "Invalid product ID" },
        { status: 400 }
      );
    }
    console.log("payload", payload);

    let result;
    if (payload.type == "deleteModel") {
      result = await db
        .collection("products")
        .updateOne({ _id: new ObjectId(productId) }, { $pull: payload.body });
    } else if (payload.type == "deleteBrand") {
      result = await db
        .collection("products")
        .updateOne({ _id: new ObjectId(productId) }, { $unset: payload.body });
    }

    if (result?.matchedCount === 0) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Product updated successfully",
      data: result,
    });
  } catch (error) {
    console.error("Update error:", error);
    return NextResponse.json(
      {
        error: "Failed to update product",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
