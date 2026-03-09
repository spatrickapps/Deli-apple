const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

exports.handler = async (event) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json",
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "" };
  }

  // GET - fetch disabled items list
  if (event.httpMethod === "GET") {
    const { data, error } = await supabase
      .from("settings")
      .select("value")
      .eq("key", "disabled_items")
      .single();

    if (error && error.code !== "PGRST116") {
      return { statusCode: 500, headers, body: JSON.stringify({ error: error.message }) };
    }

    const disabled = data ? data.value : [];
    return { statusCode: 200, headers, body: JSON.stringify({ disabled }) };
  }

  // POST - update disabled items (admin only)
  if (event.httpMethod === "POST") {
    const body = JSON.parse(event.body);
    const { disabled, adminKey } = body;

    if (adminKey !== process.env.ADMIN_KEY) {
      return { statusCode: 403, headers, body: JSON.stringify({ error: "Unauthorized" }) };
    }

    const { error } = await supabase
      .from("settings")
      .upsert({ key: "disabled_items", value: disabled }, { onConflict: "key" });

    if (error) return { statusCode: 500, headers, body: JSON.stringify({ error: error.message }) };
    return { statusCode: 200, headers, body: JSON.stringify({ success: true }) };
  }

  return { statusCode: 405, headers, body: JSON.stringify({ error: "Method not allowed" }) };
};
