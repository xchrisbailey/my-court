'use client';

import { useToast } from '@/hooks/use-toast';
import { useSession } from '@/lib/auth/context';
import { redirect } from 'next/navigation';
import React from 'react';

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { toast } = useToast();

  const session = useSession();
  if (!session.user) {
    setTimeout(() => {
      toast({
        variant: 'destructive',
        title: 'Unauthorized',
        description: 'You must be logged in to view this page, please login',
      });
    });
    redirect('/login');
  }

  return <>{children}</>;
}
