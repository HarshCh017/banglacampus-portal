import crypto from 'crypto';
import { cookies } from 'next/headers';

export interface UserSession {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  role: 'student' | 'counsellor' | 'admin';
  academicProfile?: {
    class10Percentage?: number;
    class12Percentage?: number;
    wbjeeRank?: number;
    state?: string;
  };
  bookmarkedColleges: string[];
  createdAt: string;
}

const COOKIE_NAME = 'bengalcampus_auth';

/**
 * Retrieves the cryptographic signing secret from environment.
 * Rejects missing or revoked example keys in production.
 */
function getAuthSecret(): string {
  const secret = process.env.AUTH_SECRET;
  if (!secret || secret.trim() === '' || secret.includes('v9bK3x+M7wZ9Y0qJ6XpLt1u8R4FzQ2mK5hN3cT6vY1s=')) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error(
        'FATAL SECURITY CONFIGURATION: AUTH_SECRET is missing, empty, or using the revoked example key. You must configure a secure 32+ character random string in your environment variables.'
      );
    }
    // Ephemeral non-production key for local development & automated test suites
    return 'bengalcampus_local_dev_ephemeral_secret_key_32bytes_min';
  }
  return secret;
}

/**
 * Creates a signed JWT using standard HMAC-SHA256
 * Session default lifetime: 7 days (reduced from 30 days)
 */
export function signJwt(payload: Record<string, any>, expiresInSeconds = 7 * 24 * 3600): string {
  const header = { alg: 'HS256', typ: 'JWT' };
  const exp = Math.floor(Date.now() / 1000) + expiresInSeconds;
  const fullPayload = { ...payload, exp };

  const encode = (obj: any) => Buffer.from(JSON.stringify(obj)).toString('base64url');

  const encodedHeader = encode(header);
  const encodedPayload = encode(fullPayload);

  const signature = crypto
    .createHmac('sha256', getAuthSecret())
    .update(`${encodedHeader}.${encodedPayload}`)
    .digest('base64url');

  return `${encodedHeader}.${encodedPayload}.${signature}`;
}

/**
 * Verifies a signed JWT and checks expiration
 */
export function verifyJwt<T = any>(token: string): T | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    const [headerB64, payloadB64, signature] = parts;

    const expectedSignature = crypto
      .createHmac('sha256', getAuthSecret())
      .update(`${headerB64}.${payloadB64}`)
      .digest('base64url');

    if (signature !== expectedSignature) {
      return null; // Signature mismatch / tampered token
    }

    const payload = JSON.parse(Buffer.from(payloadB64, 'base64url').toString('utf-8'));

    // Check expiration
    if (payload.exp && Math.floor(Date.now() / 1000) > payload.exp) {
      return null; // Token expired
    }

    return payload as T;
  } catch {
    return null;
  }
}

/**
 * Retrieves the current authenticated user session from request cookies (Server-Side)
 */
export async function getServerSession(): Promise<UserSession | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (!token) return null;

    return verifyJwt<UserSession>(token);
  } catch {
    return null;
  }
}

/**
 * Sets the authentication session cookie
 */
export async function setSessionCookie(session: UserSession): Promise<string> {
  const token = signJwt(session);
  try {
    const cookieStore = await cookies();
    cookieStore.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 3600, // 7 days (reduced from 30 days)
    });
  } catch {
    // Running in standalone test environment without Next.js AsyncLocalStorage
  }

  return token;
}

/**
 * Clears the session cookie on logout
 */
export async function clearSessionCookie(): Promise<void> {
  try {
    const cookieStore = await cookies();
    cookieStore.delete(COOKIE_NAME);
  } catch {
    // Running in standalone test environment
  }
}

/**
 * Returns Google OAuth URL with state CSRF parameter
 */
export function getGoogleOAuthUrl(siteUrl: string, stateToken?: string): { url: string; isConfigured: boolean; state: string } {
  const clientId = process.env.GOOGLE_CLIENT_ID || '';
  const redirectUri = `${siteUrl.replace(/\/$/, '')}/api/auth/callback/google`;
  const state = stateToken || crypto.randomBytes(16).toString('hex');

  const isConfigured = Boolean(
    clientId && !clientId.includes('your-client-id') && clientId.includes('.apps.googleusercontent.com')
  );

  const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${encodeURIComponent(
    clientId
  )}&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&response_type=code&scope=openid%20email%20profile&access_type=offline&prompt=consent&state=${encodeURIComponent(
    state
  )}`;

  return { url, isConfigured, state };
}
