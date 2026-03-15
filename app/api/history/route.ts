import { NextResponse } from 'next/server';
import { getHistory } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const history = await getHistory();
    
    // Format dates to e.g., "14 March 2026"
    const formattedHistory = history.map(dateStr => {
      const date = new Date(dateStr);
      const offset = date.getTimezoneOffset()
      const offsetDate = new Date(date.getTime() + (offset*60*1000))
      const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
      return offsetDate.toLocaleDateString('en-US', options);
    });

    return NextResponse.json(formattedHistory, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to get history" }, { status: 500 });
  }
}
