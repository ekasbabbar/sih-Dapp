const API_BASE = "/api";

export async function fetchJson(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export function getProducts() {
  return fetchJson("/products");
}

export function createProduct(body) {
  return fetchJson("/products", { method: "POST", body: JSON.stringify(body) });
}


