import { NextResponse } from 'next/server';
import { getHistory } from '@/lib/db';
import { calculateStreak } from '@/lib/streakLogic';

export const dynamic = 'force-dynamic';


export async function GET() {
  try {
    const history = await getHistory();
    const stats = calculateStreak(history);
    
    // Format the date properly if it exists
    let lastStudyDateDisplay = null;
    if (stats.lastStudyDate) {
      const date = new Date(stats.lastStudyDate);
      // Need to adjust for timezone artifact of new Date('YYYY-MM-DD')
      const offset = date.getTimezoneOffset()
      const offsetDate = new Date(date.getTime() + (offset*60*1000))
      
      const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
      lastStudyDateDisplay = offsetDate.toLocaleDateString('en-US', options);
    }

    return NextResponse.json({
      currentStreak: stats.currentStreak,
      totalDays: stats.totalDays,
      lastStudyDate: lastStudyDateDisplay
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to get streak stats" }, { status: 500 });
  }
}
