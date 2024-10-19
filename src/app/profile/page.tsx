import ProfileLoadingSkeleton from '@/app/profile/_components/profile-loading-skeleton';
import { ProfileView } from '@/app/profile/_components/profile-view';
import { validateRequest } from '@/lib/auth';
import { getUserWithRelations } from '@/lib/database/queries';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

export default async function ProfilePage() {
  const { user } = await validateRequest();
  if (!user) {
    return redirect('/login');
  }

  return (
    <Suspense fallback={<ProfileLoadingSkeleton />}>
      <ProfileView userPromise={getUserWithRelations(user.id)} />
    </Suspense>
  );
}
