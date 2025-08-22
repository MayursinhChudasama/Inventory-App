import { NextResponse, NextRequest } from "next/server";
import { ObjectId } from "mongodb";
import { hash } from "bcryptjs";
import clientPromise from "@/lib/mongodb";
import jwt from "jsonwebtoken";

import { JWTPayload } from "../route";
import { UpdateUser } from "@/models/models";

const JWT_SECRET = process.env.JWT_SECRET || "changeme";
const client = await clientPromise;
const db = client.db(process.env.MONGODB_DB);

// PATCH /api/users/[id]
// Update a user
export async function PATCH(req: Request) {
  //authorization checking
  const token = req.headers
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
  // updating a userDATA

  try {
    const updateData: UpdateUser = await req.json();
    console.log("updateData->>", updateData);
    const userId = updateData.id!;
    // Validate user ID
    if (!ObjectId.isValid(userId)) {
      return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
    }

    // Check if user exists
    const existingUser = await db.collection("users").findOne({
      _id: new ObjectId(userId),
    });

    if (!existingUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Prepare update object
    const updateObj: UpdateUser = JSON.parse(JSON.stringify(updateData));
    delete updateObj.id;

    // Hash new password if provided
    if (updateData.passwordHash) {
      updateObj.passwordHash = await hash(updateData.passwordHash, 10);
    }
    console.log("updateObj->>", updateObj);

    // Update user
    const result = await db
      .collection("users")
      .updateOne({ _id: new ObjectId(userId) }, { $set: updateObj });

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Get updated user
    const updatedUser = await db.collection("users").findOne(
      { _id: new ObjectId(userId) },
      { projection: { password: 0 } } // Exclude password
    );

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
}

// DELETE /api/users/[id]
// Delete a user
export async function DELETE(request: Request) {
  try {
    const urlParts = request.url.split("/");
    const userId = urlParts[urlParts.length - 1];

    // Validate user ID
    if (!ObjectId.isValid(userId)) {
      return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
    }

    // Delete user
    const result = await db.collection("users").deleteOne({
      _id: new ObjectId(userId),
    });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return new Response(null, { status: 204 });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      { error: "Failed to delete user" },
      { status: 500 }
    );
  }
}
