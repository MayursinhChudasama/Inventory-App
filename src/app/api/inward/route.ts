import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);

    const data = await db.collection("inward-entries").find({}).toArray();

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

    const result = await db.collection("inward-entries").insertOne(data);

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
