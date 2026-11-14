import { NextRequest, NextResponse } from 'next/server';
import { getServerSession, setSessionCookie } from '@/lib/auth';

export async function POST(req: NextRequest) {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ success: false, message: 'Please log in to save colleges' }, { status: 401 });
  }

  const { collegeSlug } = await req.json();
  if (!collegeSlug) {
    return NextResponse.json({ success: false, message: 'College slug is required' }, { status: 400 });
  }

  const currentBookmarks = session.bookmarkedColleges || [];
  let updatedBookmarks: string[];

  if (currentBookmarks.includes(collegeSlug)) {
    updatedBookmarks = currentBookmarks.filter((slug) => slug !== collegeSlug);
  } else {
    updatedBookmarks = [...currentBookmarks, collegeSlug];
  }

  const updatedSession = {
    ...session,
    bookmarkedColleges: updatedBookmarks,
  };

  await setSessionCookie(updatedSession);

  return NextResponse.json({
    success: true,
    bookmarked: updatedBookmarks.includes(collegeSlug),
    bookmarkedColleges: updatedBookmarks,
  });
}
