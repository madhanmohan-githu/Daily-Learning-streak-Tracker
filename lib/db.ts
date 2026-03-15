import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import path from 'path';

// On Vercel Serverless functions, process.cwd() is read-only.
// We must place the SQLite database in the ephemeral /tmp directory in production.
const dbPath = process.env.DATABASE_URL 
  || (process.env.NODE_ENV === 'production' 
       ? path.join('/tmp', 'data.db') 
       : path.join(process.cwd(), 'data.db'));

let db: Database | null = null;

export async function getDb(): Promise<Database> {
  if (!db) {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database
    });
    
    // Ensure the table exists
    await db.exec(`
      CREATE TABLE IF NOT EXISTS study_dates (
        date TEXT PRIMARY KEY
      )
    `);
  }
  return db;
}

export const getHistory = async (): Promise<string[]> => {
  const database = await getDb();
  // Fetch all dates, ordered descending
  const rows = await database.all('SELECT date FROM study_dates ORDER BY date DESC');
  return rows.map(row => row.date);
};

export const addStudyDate = async (date: string): Promise<boolean> => {
  const database = await getDb();
  
  try {
    // Insert or ignore if it already exists (since date is PRIMARY KEY)
    const result = await database.run(
      'INSERT OR IGNORE INTO study_dates (date) VALUES (?)',
      [date]
    );
    
    // changes will be 1 if inserted, 0 if ignored
    return (result.changes ?? 0) > 0;
  } catch (error) {
    console.error("Error inserting study date:", error);
    return false;
  }
};
