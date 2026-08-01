import pg from "pg";

const { Pool } = pg;

const connectionString = process.env.DATABASE_URL;

let pool: pg.Pool | null = null;

function getPool(): pg.Pool | null {
  if (!connectionString) return null;
  if (!pool) {
    pool = new Pool({
      connectionString,
      ssl: { rejectUnauthorized: false },
    });
  }
  return pool;
}

export const dbEnabled = !!connectionString;

export async function initDb() {
  const p = getPool();
  if (!p) {
    console.warn(
      "[DB] No DATABASE_URL set — running with in-memory data only. Data will reset on every restart/deploy."
    );
    return;
  }
  await p.query(`
    CREATE TABLE IF NOT EXISTS store_state (
      key TEXT PRIMARY KEY,
      value JSONB NOT NULL,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );
  `);
  console.log("[DB] Connected to Postgres and ensured store_state table exists.");
}

export async function loadState<T>(key: string, fallback: T): Promise<T> {
  const p = getPool();
  if (!p) return fallback;

  const result = await p.query("SELECT value FROM store_state WHERE key = $1", [key]);
  if (result.rows.length === 0) {
    await saveState(key, fallback);
    return fallback;
  }
  return result.rows[0].value as T;
}

export async function saveState(key: string, value: unknown): Promise<void> {
  const p = getPool();
  if (!p) return;

  await p.query(
    `INSERT INTO store_state (key, value, updated_at)
     VALUES ($1, $2, now())
     ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = now()`,
    [key, JSON.stringify(value)]
  );
}
