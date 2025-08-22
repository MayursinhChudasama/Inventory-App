import { NextResponse, NextRequest } from "next/server";
import { ObjectId } from "mongodb";

import clientPromise from "@/lib/mongodb";
import jwt from "jsonwebtoken";

import { inwardEntry } from "@/models/models";
import { JWTPayload } from "../../users/route";

const JWT_SECRET = process.env.JWT_SECRET || "changeme";
const client = await clientPromise;
const db = client.db(process.env.MONGODB_DB);

// PUT /api/challan/[id]
// Update Challan
export async function PUT(request: Request) {
  //authorization checking
  const token = request.headers
    .get("cookie")
    ?.split("; ")
    .find((c) => c.startsWith("token="))
    ?.split("=")[1];
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

  // updating a ChallanDATA
  try {
    const updateData: inwardEntry = await request.json();
    const challanId = updateData._id;
    // Validate Challan ID
    if (!ObjectId.isValid(challanId!)) {
      return NextResponse.json(
        { error: "Invalid Challan ID" },
        { status: 400 }
      );
    }

    // Check if Challan exists
    const existingChallan = await db.collection("challans").findOne({
      _id: new ObjectId(challanId),
    });

    if (!existingChallan) {
      return NextResponse.json({ error: "Challan not found" }, { status: 404 });
    }

    // Update Challan
    const payload = JSON.parse(JSON.stringify(updateData));
    delete payload._id;
    const result = await db
      .collection("challans")
      .updateOne({ _id: new ObjectId(challanId) }, { $set: payload });

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Challan no found" }, { status: 404 });
    }

    // Get updated Challan
    const updatedChallan = await db
      .collection("challans")
      .findOne({ _id: new ObjectId(challanId) });

    return NextResponse.json(updatedChallan);
  } catch (error) {
    console.error("Error updating Challan:", error);
    return NextResponse.json(
      { error: "Failed to update Challan" },
      { status: 500 }
    );
  }
}

// DELETE /api/challan/[id]
// Delete a Challan
export async function DELETE(request: Request) {
  try {
    const urlParts = request.url.split("/");
    const challanId = urlParts[urlParts.length - 1];

    // Validate Challan ID
    if (!ObjectId.isValid(challanId)) {
      return NextResponse.json(
        { error: "Invalid Challan ID" },
        { status: 400 }
      );
    }
    // Check if Challan exists
    const existingChallan = await db.collection("challans").findOne({
      _id: new ObjectId(challanId),
    });

    if (!existingChallan) {
      return NextResponse.json({ error: "Challan not found" }, { status: 404 });
    }
    // Delete Challan
    const result = await db.collection("challans").deleteOne({
      _id: new ObjectId(challanId),
    });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Challan not found" }, { status: 404 });
    }

    return new Response(null, { status: 204 });
  } catch (error) {
    console.error("Error deleting Challan:", error);
    return NextResponse.json(
      { error: "Failed to delete Challan" },
      { status: 500 }
    );
  }
}
