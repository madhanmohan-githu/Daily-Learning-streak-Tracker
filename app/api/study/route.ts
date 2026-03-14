import { NextResponse } from 'next/server';
import { addStudyDate } from '@/lib/db';

export async function POST() {
  try {
    const today = new Date();
    // Use local timezone format (YYYY-MM-DD)
    const offset = today.getTimezoneOffset()
    const offsetDate = new Date(today.getTime() - (offset*60*1000))
    const dateStr = offsetDate.toISOString().split('T')[0];
    
    // Add default format display
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
    const displayDate = today.toLocaleDateString('en-US', options);

    const success = addStudyDate(dateStr);

    if (success) {
      return NextResponse.json({
        message: "Study recorded",
        date: displayDate
      }, { status: 201 });
    } else {
      return NextResponse.json({
        message: "You have already marked today.",
        date: displayDate
      }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json({ error: "Failed to record study" }, { status: 500 });
  }
}
