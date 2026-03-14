import { getHistory } from '@/lib/db';

export function calculateStreak(dates: string[]): {
  currentStreak: number;
  totalDays: number;
  lastStudyDate: string | null;
} {
  if (dates.length === 0) {
    return { currentStreak: 0, totalDays: 0, lastStudyDate: null };
  }

  // Sort dates descending (newest first)
  const sortedDates = [...dates].sort().reverse();
  
  const totalDays = sortedDates.length;
  const lastStudyDate = sortedDates[0];

  let currentStreak = 0;
  
  // Create a base date for today without time
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Check if we studied today or yesterday as starting point
  const lastDateStr = sortedDates[0];
  const lastDate = new Date(lastDateStr);
  lastDate.setHours(0, 0, 0, 0);

  const diffTime = Math.abs(today.getTime() - lastDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  // If last study date is more than 1 day ago, the current streak is 0
  if (diffDays > 1) {
    return { currentStreak: 0, totalDays, lastStudyDate };
  }

  currentStreak = 1;

  for (let i = 0; i < sortedDates.length - 1; i++) {
    const current = new Date(sortedDates[i]);
    const prev = new Date(sortedDates[i + 1]);
    
    current.setHours(0, 0, 0, 0);
    prev.setHours(0, 0, 0, 0);

    const diff = Math.floor((current.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24));

    if (diff === 1) {
      currentStreak++;
    } else {
      break;
    }
  }

  return { currentStreak, totalDays, lastStudyDate };
}
