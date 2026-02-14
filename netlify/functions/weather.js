const OPENWEATHER_BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

const buildResponse = (statusCode, body) => {
  return {
    statusCode,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "GET,OPTIONS",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };
};

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "GET,OPTIONS",
      },
      body: "",
    };
  }

  if (event.httpMethod !== "GET") {
    return buildResponse(405, { error: "Method not allowed" });
  }

  const { lat, lon } = event.queryStringParameters || {};
  if (!lat || !lon) {
    return buildResponse(400, { error: "Missing required query params: lat, lon" });
  }

  const apiKey = process.env.OPENWEATHER_API_KEY;
  if (!apiKey) {
    return buildResponse(500, { error: "Server misconfigured: missing API key" });
  }

  const url = new URL(OPENWEATHER_BASE_URL);
  url.searchParams.set("lat", lat);
  url.searchParams.set("lon", lon);
  url.searchParams.set("units", "imperial");
  url.searchParams.set("appid", apiKey);

  try {
    const response = await fetch(url.toString());
    if (!response.ok) {
      const text = await response.text();
      return buildResponse(502, {
        error: "Weather request failed",
        status: response.status,
        details: text || null,
      });
    }

    const data = await response.json();
    return buildResponse(200, data);
  } catch (error) {
    return buildResponse(502, { error: "Weather request failed" });
  }
};
