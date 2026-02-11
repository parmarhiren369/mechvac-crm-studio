import { supabase } from "@/lib/supabase";

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
  const results: { table: string; error?: string }[] = [];

  for (const table of tablesToClear) {
    const { error } = await supabase.from(table).delete().neq("id", 0);
    if (error) {
      results.push({ table, error: error.message });
    } else {
      results.push({ table });
    }
  }

  return results;
}
