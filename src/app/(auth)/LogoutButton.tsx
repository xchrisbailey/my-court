'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { logout } from './actions';

export function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await logout();
    router.push('/');
  }

  return (
    <form action={handleLogout}>
      <Button>logout</Button>
    </form>
  );
}
