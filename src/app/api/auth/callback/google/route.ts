import { NextRequest, NextResponse } from 'next/server';
import { setSessionCookie, UserSession } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');
  const error = searchParams.get('error');

  if (error || !code) {
    return NextResponse.redirect(new URL('/login?error=oauth_denied', req.url));
  }

  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const redirectUri = `${siteUrl.replace(/\/$/, '')}/api/auth/callback/google`;

  try {
    // Exchange code for tokens with Google OAuth
    const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: clientId || '',
        client_secret: clientSecret || '',
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
      }),
    });

    if (!tokenRes.ok) {
      return NextResponse.redirect(new URL('/login?error=token_exchange_failed', req.url));
    }

    const tokens = await tokenRes.json();
    const idToken = tokens.id_token;

    // Decode ID Token payload
    const payloadPart = idToken.split('.')[1];
    const googleUser = JSON.parse(Buffer.from(payloadPart, 'base64url').toString('utf-8'));

    const session: UserSession = {
      id: `google_${googleUser.sub}`,
      email: googleUser.email,
      name: googleUser.name || googleUser.email.split('@')[0],
      avatarUrl: googleUser.picture,
      role: 'student',
      bookmarkedColleges: ['jadavpur-university-engineering', 'iem-kolkata'],
      createdAt: new Date().toISOString(),
    };

    await setSessionCookie(session);
    return NextResponse.redirect(new URL('/dashboard', req.url));
  } catch (err) {
    return NextResponse.redirect(new URL('/login?error=oauth_exception', req.url));
  }
}
