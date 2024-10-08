import { validateRequest } from '@/lib/auth';
import { getPractices } from '@/lib/database/queries';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import PracticeTable from './practice-table';

export default async function PracticesPage() {
  const { user } = await validateRequest();
  if (!user) return redirect('/login');
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PracticeTable practicesPromise={getPractices(user.id)} />
    </Suspense>
  );
}
