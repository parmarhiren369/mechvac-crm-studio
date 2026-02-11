import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

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

export default async function handler(request: Request): Promise<Response> {
  if (request.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  if (!supabaseUrl || !serviceRoleKey) {
    return new Response("Missing server configuration", { status: 500 });
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const results: { table: string; error?: string }[] = [];

  for (const table of tablesToClear) {
    const { error } = await supabase.from(table).delete().neq("id", 0);
    if (error) {
      results.push({ table, error: error.message });
    } else {
      results.push({ table });
    }
  }

  return new Response(JSON.stringify({ results }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
