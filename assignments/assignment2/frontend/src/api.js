const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

export async function classifyTriangle(sides) {
  const response = await fetch(`${API_BASE_URL}/api/triangles/classify`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(sides)
  });

  const data = await response.json();

  if (!response.ok) {
    const detailMessage = Array.isArray(data.details) ? data.details.join(" ") : data.message;
    throw new Error(detailMessage || "Request failed.");
  }

  return data;
}
