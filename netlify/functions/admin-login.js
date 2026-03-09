exports.handler = async (event) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json",
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "" };
  }

  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  const { username, password } = JSON.parse(event.body);

  if (username === "Admin" && password === "chicken1") {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true, adminKey: process.env.ADMIN_KEY }),
    };
  }

  return {
    statusCode: 401,
    headers,
    body: JSON.stringify({ success: false, error: "Invalid credentials" }),
  };
};
