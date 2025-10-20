const API_URL = "http://127.0.0.1:8000";

async function request(method: string, endpoint: string, data?: any, token?: string) {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  // 🟢 Si hay token, lo agrega automáticamente
  const authToken = token || localStorage.getItem("token");
  if (authToken) headers["Authorization"] = `Bearer ${authToken}`;

  const res = await fetch(`${API_URL}${endpoint}`, {
    method,
    headers,
    body: data ? JSON.stringify(data) : undefined,
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(error);
  }

  return res.json();
}

export const apiGet = (endpoint: string, token?: string) => request("GET", endpoint, undefined, token);
export const apiPost = (endpoint: string, data: any, token?: string) => request("POST", endpoint, data, token);
export const apiPut = (endpoint: string, data: any, token?: string) => request("PUT", endpoint, data, token);
export const apiDelete = (endpoint: string, token?: string) => request("DELETE", endpoint, undefined, token);
