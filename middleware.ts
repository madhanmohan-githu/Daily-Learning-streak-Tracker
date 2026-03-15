import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const session = request.cookies.get('session');
  const { pathname } = request.nextUrl;

  // Define public paths that don't require authentication
  const isPublicPath = pathname === '/login' || pathname.startsWith('/api/login');

  if (!session && !isPublicPath) {
    // Redirect to login if trying to access a protected route without session
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (session && pathname === '/login') {
    // Redirect to dashboard if trying to access login page with an active session
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes except login)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api/login|_next/static|_next/image|favicon.ico).*)',
  ],
};
