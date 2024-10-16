import { validateRequest } from '@/lib/auth';
import { getMatchWithRelations } from '@/lib/database/queries';
import { Suspense } from 'react';
import MatchCard from '../../_components/match-card';

export default async function MatchViewPage(
  props: {
    params: Promise<{ id: string }>;
  }
) {
  const params = await props.params;
  const { user } = await validateRequest();
  if (!user) throw new Error('Unauthorized');
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <MatchCard matchPromise={getMatchWithRelations(params.id, user.id)} />
    </Suspense>
  );
}
