// collection - entries

//1. inward challan entry
async function inward_entries() {
  const res = await fetch("./DUMMY_ENTRIES.json");
  const data = await res.json();
  return data;
}

const inward_entry_data = await inward_entries();
console.log("inward_entries", inward_entry_data);

export const DUMMY_OPENING_STOCK = [];
