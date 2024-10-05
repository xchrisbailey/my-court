import { validateRequest } from '@/lib/auth';
import { getMatches } from '@/lib/database/queries';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import MatchTable from './match-table';

export default async function MatchesPage() {
  const { user } = await validateRequest();
  if (!user) return redirect('/login');
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MatchTable matchesPromise={getMatches(user.id)} />
    </Suspense>
  );
}
