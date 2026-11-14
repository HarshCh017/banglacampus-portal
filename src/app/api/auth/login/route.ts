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

    // Patch v1.1 §P3: Student accounts are disabled.
    if (role === 'student') {
      return NextResponse.json(
        {
          success: false,
          message: 'Student accounts are disabled. College shortlists and comparisons are preserved locally in your browser.',
        },
        { status: 403 }
      );
    }

    // Role Authorization: Strictly disallow client-controlled privilege escalation.
    // Authentication is restricted strictly to authorized staff via server-side allowlists.
    const adminEmails = (process.env.ADMIN_EMAILS || '')
      .split(',')
      .map((e) => e.trim().toLowerCase())
      .filter(Boolean);
    const counsellorEmails = (process.env.COUNSELLOR_EMAILS || '')
      .split(',')
      .map((e) => e.trim().toLowerCase())
      .filter(Boolean);

    const isAuthorized = adminEmails.includes(cleanEmail) || counsellorEmails.includes(cleanEmail);

    if (!isAuthorized) {
      return NextResponse.json(
        {
          success: false,
          message: 'Access restricted: Staff authentication is restricted to pre-authorized administrator and counsellor emails.',
        },
        { status: 403 }
      );
    }

    const assignedRole: UserSession['role'] = adminEmails.includes(cleanEmail) ? 'admin' : 'counsellor';

    const session: UserSession = {
      id: `usr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      email: cleanEmail,
      name: cleanName,
      role: assignedRole,
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
