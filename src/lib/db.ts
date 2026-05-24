import { neon } from "@neondatabase/serverless";
import { drizzle, type NeonHttpDatabase } from "drizzle-orm/neon-http";
import * as schema from "./schema";

let _db: NeonHttpDatabase<typeof schema> | null = null;

export function getDb() {
  if (!_db) {
    const url = process.env.DATABASE_URL;
    if (!url) {
      throw new Error(
        "DATABASE_URL is not set. Add it to your .env.local file."
      );
    }
    const sql = neon(url);
    _db = drizzle(sql, { schema });
  }
  return _db;
}

/** @deprecated Use getDb() for lazy initialization. This getter throws at import time if DATABASE_URL is missing. */
export const db = new Proxy({} as NeonHttpDatabase<typeof schema>, {
  get(_, prop) {
    return (getDb() as unknown as Record<string | symbol, unknown>)[prop];
  },
});
