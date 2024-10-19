import { validateRequest } from '@/lib/auth';
import { getPractices } from '@/lib/database/queries';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import PracticeTable from '../_components/practice-table';
import { PracticeTableSkeleton } from '@/app/practices/_components/practice-table-skeleton';

export default async function PracticesPage() {
  const { user } = await validateRequest();
  if (!user) return redirect('/login');
  return (
    <Suspense fallback={<PracticeTableSkeleton />}>
      <PracticeTable practicesPromise={getPractices(user.id)} />
    </Suspense>
  );
}
