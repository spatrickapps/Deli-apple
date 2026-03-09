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

  // GET - fetch all orders
  if (event.httpMethod === "GET") {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(200);

    if (error) return { statusCode: 500, headers, body: JSON.stringify({ error: error.message }) };
    return { statusCode: 200, headers, body: JSON.stringify(data) };
  }

  // POST - save a new order
  if (event.httpMethod === "POST") {
    const body = JSON.parse(event.body);
    const { userName, items, totalItems } = body;

    if (!userName || !items) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: "Missing fields" }) };
    }

    const { data, error } = await supabase
      .from("orders")
      .insert([{ user_name: userName, items: items, total_items: totalItems }])
      .select()
      .single();

    if (error) return { statusCode: 500, headers, body: JSON.stringify({ error: error.message }) };
    return { statusCode: 200, headers, body: JSON.stringify(data) };
  }

  // DELETE - admin only, delete one order by id
  if (event.httpMethod === "DELETE") {
    const body = JSON.parse(event.body);
    const { id, adminKey } = body;

    if (adminKey !== process.env.ADMIN_KEY) {
      return { statusCode: 403, headers, body: JSON.stringify({ error: "Unauthorized" }) };
    }

    const { error } = await supabase.from("orders").delete().eq("id", id);
    if (error) return { statusCode: 500, headers, body: JSON.stringify({ error: error.message }) };
    return { statusCode: 200, headers, body: JSON.stringify({ success: true }) };
  }

  return { statusCode: 405, headers, body: JSON.stringify({ error: "Method not allowed" }) };
};
