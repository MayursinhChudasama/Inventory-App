import { inwardEntry } from "@/models/models";

export default async function postInwardEntry(data: inwardEntry) {
  try {
    const response = await fetch("/api/inward", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("Failed to post inward entry");
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("postInwardEntry error", error);
    return null;
  }
}
