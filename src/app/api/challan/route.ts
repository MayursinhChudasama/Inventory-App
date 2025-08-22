import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);

    const data = await db.collection("challans").find({}).toArray();

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ success: false, message: "Database error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export async function POST(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);

    const data = await request.json();
    console.log("data", data);

    const errors: string[] = [];
    const productsWithMissingFields = data.products.filter(
      (product: any) => !product.brand || !product.model || !product.qty
    );

    if (!data.createdAt) {
      errors.push("Please select a date.");
    }
    if (!data.category || data.category == "Default") {
      errors.push("Please select a category.");
    }
    if (!data.source || data.source == "Default") {
      errors.push(
        `Please select a ${data.type === "inward" ? "Supplier" : "Buyer"}`
      );
    }
    if (!data.challan_no) {
      errors.push("Please enter a challan number.");
    }
    if (data.products.length === 0) {
      errors.push("Please add at least one product.");
    }
    if (productsWithMissingFields.length > 0) {
      errors.push("Please fill all fields of the products.");
    }

    if (errors.length > 0) {
      return new Response(
        JSON.stringify({ success: true, message: errors[0] }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
    const result = await db.collection("challans").insertOne(data);

    return new Response(
      JSON.stringify({ success: true, message: "Inward entry posted" }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ success: false, message: "Database error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
