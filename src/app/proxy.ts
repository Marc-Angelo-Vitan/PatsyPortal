// proxy.ts (renamed from middleware.ts)
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Allow access to auth pages
  if (path.startsWith('/auth')) {
    return NextResponse.next();
  }
  
  // Protect all main routes (you can add auth check here later)
  if (path.startsWith('/main')) {
    // For now, just allow access
    return NextResponse.next();
  }
  
  // Redirect root to login
  if (path === '/') {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};