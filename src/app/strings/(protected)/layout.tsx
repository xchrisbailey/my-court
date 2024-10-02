'use client';

import { useSession } from '@/lib/auth/context';
import { redirect } from 'next/navigation';
import React from 'react';

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = useSession();
  if (!session.user) redirect('/login');

  return <>{children}</>;
}
