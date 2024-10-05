import { validateRequest } from '@/lib/auth';
import { getMatchWithRelations } from '@/lib/database/queries';
import { Suspense } from 'react';
import MatchViewCard from '../../_components/match-view-card';

export default async function MatchViewPage({
  params,
}: {
  params: { id: string };
}) {
  const { user } = await validateRequest();
  if (!user) throw new Error('Unauthorized');
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <MatchViewCard matchPromise={getMatchWithRelations(params.id, user.id)} />
    </Suspense>
  );
}
