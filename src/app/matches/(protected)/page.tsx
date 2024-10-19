import { MatchTableSkeleton } from '@/app/matches/_components/match-table-skeleton';
import { validateRequest } from '@/lib/auth';
import { getMatches } from '@/lib/database/queries';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import MatchTable from '../_components/match-table';

export default async function MatchesPage() {
  const { user } = await validateRequest();
  if (!user) return redirect('/login');
  return (
    <Suspense fallback={<MatchTableSkeleton />}>
      <MatchTable matchesPromise={getMatches(user.id)} />
    </Suspense>
  );
}
