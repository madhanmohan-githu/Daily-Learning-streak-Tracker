import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data.json');

export interface AppData {
  studyDates: string[]; // Keep dates in format YYYY-MM-DD for easier parsing, but display can be formatted later
}

// Ensure the db exists
export const initDB = (): AppData => {
  if (!fs.existsSync(dataFilePath)) {
    const defaultData: AppData = { studyDates: [] };
    fs.writeFileSync(dataFilePath, JSON.stringify(defaultData, null, 2));
    return defaultData;
  }
  return JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));
};

const readDB = (): AppData => {
  return initDB();
};

const writeDB = (data: AppData): void => {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
};

export const getHistory = (): string[] => {
  const db = readDB();
  return db.studyDates;
};

export const addStudyDate = (date: string): boolean => {
  const db = readDB();
  if (db.studyDates.includes(date)) {
    return false; // Already studied on this date
  }
  db.studyDates.push(date);
  // Optional: keep it sorted (descending strings is easy for YYYY-MM-DD)
  db.studyDates.sort().reverse();
  writeDB(db);
  return true;
};
