import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  const body = await request.json();
  const { username, password } = body;

  if (username === 'user' && password === 'pass') {
    // Set a cookie that expires in 1 day
    const cookieStore = await cookies();
    cookieStore.set('session', 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24, // 1 day
    });

    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
}
