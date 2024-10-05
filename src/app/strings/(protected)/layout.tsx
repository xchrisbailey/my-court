'use client';

import { useSession } from '@/lib/auth/context';
import { redirect } from 'next/navigation';
import React from 'react';
import { toast } from 'sonner';

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = useSession();
  if (!session.user) {
    toast('You must be logged in to view this page, please login');
    redirect('/login');
  }

  return <>{children}</>;
}
