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

export async function getAllTriangles() {
  const response = await fetch(`${API_BASE_URL}/api/triangles`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch triangles.");
  }

  return data;
}

export async function updateTriangle(id, sides) {
  const response = await fetch(`${API_BASE_URL}/api/triangles/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(sides)
  });

  const data = await response.json();

  if (!response.ok) {
    const detailMessage = Array.isArray(data.details) ? data.details.join(" ") : data.message;
    throw new Error(detailMessage || "Failed to update triangle.");
  }

  return data;
}

export async function deleteTriangle(id) {
  const response = await fetch(`${API_BASE_URL}/api/triangles/${id}`, {
    method: "DELETE"
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message || "Failed to delete triangle.");
  }

  return true;
}

