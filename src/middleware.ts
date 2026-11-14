import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Domain canonicalization (www vs apex) is handled directly at Vercel's Edge Router
  // in Vercel Project Settings > Domains to prevent conflicting redirect loops (ERR_TOO_MANY_REDIRECTS).
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
