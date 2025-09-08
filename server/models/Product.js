import { getDB } from "../db.js";

export async function listProducts() {
  const db = getDB();
  return db.all("SELECT * FROM products ORDER BY created_at DESC");
}

export async function getProduct(id) {
  const db = getDB();
  return db.get("SELECT * FROM products WHERE id = ?", id);
}

export async function createProduct({ name, description = "", price = 0 }) {
  const db = getDB();
  const result = await db.run(
    "INSERT INTO products (name, description, price) VALUES (?, ?, ?)",
    name,
    description,
    price
  );
  return getProduct(result.lastID);
}

export async function updateProduct(id, { name, description, price }) {
  const db = getDB();
  const current = await getProduct(id);
  if (!current) return null;
  await db.run(
    "UPDATE products SET name = ?, description = ?, price = ? WHERE id = ?",
    name ?? current.name,
    description ?? current.description,
    price ?? current.price,
    id
  );
  return getProduct(id);
}

export async function deleteProduct(id) {
  const db = getDB();
  await db.run("DELETE FROM products WHERE id = ?", id);
  return { ok: true };
}


