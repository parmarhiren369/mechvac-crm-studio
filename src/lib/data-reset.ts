const tablesToClear = [
  "calendar_events",
  "clients",
  "contacts",
  "enquiries",
  "inventory",
  "inventory_items",
  "inventory_list",
  "leads",
  "meetings",
  "notes",
  "notifications",
  "orders",
  "products",
  "projects",
  "quotations",
  "reminders",
  "services",
  "spares",
  "tasks",
  "vendors",
];

export const getTablesToClear = () => [...tablesToClear];

export async function clearAllData() {
  const response = await fetch("/api/clear-data", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || "Failed to clear data");
  }

  const payload = await response.json();
  return payload.results as { table: string; error?: string }[];
}
