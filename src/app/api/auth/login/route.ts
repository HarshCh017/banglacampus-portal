import { NextRequest, NextResponse } from 'next/server';
import { setSessionCookie, UserSession } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, name, role = 'student' } = body;

    if (!email || !String(email).includes('@')) {
      return NextResponse.json(
        { success: false, message: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    const cleanEmail = String(email).trim().toLowerCase();
    const cleanName = name ? String(name).trim() : cleanEmail.split('@')[0];

    const session: UserSession = {
      id: `usr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      email: cleanEmail,
      name: cleanName,
      role: role === 'counsellor' || role === 'admin' ? role : 'student',
      avatarUrl: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(cleanName)}`,
      bookmarkedColleges: ['jadavpur-university-engineering', 'iem-kolkata'],
      createdAt: new Date().toISOString(),
    };

    await setSessionCookie(session);

    return NextResponse.json({
      success: true,
      user: session,
      message: `Welcome back, ${session.name}!`,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err?.message || 'Login failed' },
      { status: 500 }
    );
  }
}
