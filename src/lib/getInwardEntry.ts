"use server";
export default async function getInwardEntry() {
  try {
    const res = await fetch(`http://localhost:3000/api/inward`);
    if (!res.ok) throw new Error("Failed to fetch all the inward entry");
    const data = await res.json();

    return data;
  } catch (e) {
    console.error("getInwardEntry error", e);
    return null;
  }
}
