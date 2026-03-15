import Database from "better-sqlite3";
import path from "path";

const dbPath =
  process.env.DATABASE_URL ||
  (process.env.NODE_ENV === "production"
    ? path.join("/tmp", "data.db")
    : path.join(process.cwd(), "data.db"));

let db: Database.Database | null = null;

function getDb() {
  if (!db) {
    db = new Database(dbPath);

    db.prepare(`
      CREATE TABLE IF NOT EXISTS study_dates (
        date TEXT PRIMARY KEY
      )
    `).run();
  }

  return db;
}

export const getHistory = async (): Promise<string[]> => {
  const database = getDb();

  const rows = database
    .prepare("SELECT date FROM study_dates ORDER BY date DESC")
    .all() as { date: string }[];

  return rows.map((row) => row.date);
};

export const addStudyDate = async (date: string): Promise<boolean> => {
  const database = getDb();

  try {
    const result = database
      .prepare("INSERT OR IGNORE INTO study_dates (date) VALUES (?)")
      .run(date);

    return result.changes > 0;
  } catch (error) {
    console.error("Error inserting study date:", error);
    return false;
  }
};