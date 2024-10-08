import { validateRequest } from '@/lib/auth';
import { getPracticeWithRelations } from '@/lib/database/queries';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import PracticeCard from '../../_components/practice-card';

export default async function PracticeViewPage({
  params,
}: {
  params: { id: string };
}) {
  const { user } = await validateRequest();
  if (!user) return redirect('/login');

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <PracticeCard
        practicePromise={getPracticeWithRelations(params.id, user.id)}
      />
    </Suspense>
  );
}
