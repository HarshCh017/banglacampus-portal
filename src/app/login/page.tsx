import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getServerSession } from '@/lib/auth';
import { LoginView } from './LoginView';

export const metadata: Metadata = {
  title: 'Staff & Counsellor Portal Sign In | BengalCampus',
  description:
    'Authorized administrative console sign in for verified BengalCampus admission research staff and desk counsellors.',
  alternates: {
    canonical: 'https://bengalcampus.in/login',
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default async function LoginPage() {
  const session = await getServerSession();

  if (session) {
    if (session.role === 'counsellor' || session.role === 'admin') {
      redirect('/admin');
    }
    redirect('/dashboard');
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Suspense fallback={<div className="w-full max-w-md p-8 bg-white rounded-3xl shadow-xl text-center text-xs text-slate-500">Loading sign in...</div>}>
        <LoginView />
      </Suspense>
    </div>
  );
}
