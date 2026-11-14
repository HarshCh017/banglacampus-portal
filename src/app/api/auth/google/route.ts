import { NextRequest, NextResponse } from 'next/server';
import { getGoogleOAuthUrl } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const { url, isConfigured } = getGoogleOAuthUrl(siteUrl);

  if (!isConfigured) {
    // If Google Client ID is placeholder, redirect to login with informative query
    return NextResponse.redirect(
      new URL('/login?notice=google_oauth_pending_client_id', req.url)
    );
  }

  return NextResponse.redirect(url);
}
