'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { UserSession } from '@/lib/auth';

interface AuthContextValue {
  user: UserSession | null;
  isLoading: boolean;
  login: (email: string, name?: string, role?: string) => Promise<boolean>;
  logout: () => Promise<void>;
  toggleBookmark: (collegeSlug: string) => Promise<void>;
  isBookmarked: (collegeSlug: string) => boolean;
  isLoginModalOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Fetch session on initial mount
  const refreshSession = useCallback(async () => {
    try {
      const res = await fetch('/api/auth/session');
      if (res.ok) {
        const data = await res.json();
        setUser(data.user || null);
      }
    } catch {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshSession();
  }, [refreshSession]);

  const login = async (email: string, name?: string, role = 'student'): Promise<boolean> => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, role }),
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        setIsLoginModalOpen(false);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      setUser(null);
    } catch {
      // Ignored
    }
  };

  const toggleBookmark = async (collegeSlug: string) => {
    if (!user) {
      setIsLoginModalOpen(true);
      return;
    }

    try {
      const res = await fetch('/api/auth/bookmark', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ collegeSlug }),
      });
      if (res.ok) {
        const data = await res.json();
        setUser((prev) => (prev ? { ...prev, bookmarkedColleges: data.bookmarkedColleges } : null));
      }
    } catch {
      // Ignored
    }
  };

  const isBookmarked = (collegeSlug: string): boolean => {
    return Boolean(user?.bookmarkedColleges?.includes(collegeSlug));
  };

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        logout,
        toggleBookmark,
        isBookmarked,
        isLoginModalOpen,
        openLoginModal,
        closeLoginModal,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
