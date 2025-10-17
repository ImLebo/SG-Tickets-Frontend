const API_BASE = "http://127.0.0.1:8000";

async function request(path: string, method = "GET", body?: any) {
  const res = await fetch(API_BASE + path, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export const apiGet = (path: string) => request(path, "GET");
export const apiPost = (path: string, body: any) => request(path, "POST", body);
export const apiPut = (path: string, body: any) => request(path, "PUT", body);
export const apiDelete = (path: string) => request(path, "DELETE");
