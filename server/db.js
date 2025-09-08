import sqlite3 from "sqlite3";
import { open } from "sqlite";

let dbInstance = null;

export async function initDB() {
  if (dbInstance) return dbInstance;
  const filename = process.env.DB_PATH || ":memory:";
  dbInstance = await open({ filename, driver: sqlite3.Database });

  await dbInstance.exec(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT DEFAULT '',
      price REAL DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  return dbInstance;
}

export function getDB() {
  if (!dbInstance) throw new Error("DB not initialized. Call initDB() first.");
  return dbInstance;
}


