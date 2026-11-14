'use client';

import React from 'react';

interface BlurInProps {
  children: React.ReactNode;
  className?: string;
  duration?: number;
  delay?: number;
}

export function BlurIn({
  children,
  className = '',
}: BlurInProps) {
  return (
    <div className={`animate-blur-in ${className}`}>
      {children}
    </div>
  );
}

