const API_BASE_URL = "http://127.0.0.1:8000/api";

export async function fetchWithAuth(endpoint, options = {}) {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...(options.headers || {}),
    },
  });

  if (!response.ok) {
    console.error("❌ API error:", response.statusText);
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }

  return await response.json();
}