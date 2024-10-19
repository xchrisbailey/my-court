import { GearList } from '@/components/gear-list';
import GearListSkeleton from '@/components/gear-list-skeleton';
import { getRacketsWithBrand } from '@/lib/database/queries';
import { Suspense } from 'react';

export default async function RacketsPage() {
  return (
    <>
      <Suspense fallback={<GearListSkeleton />}>
        <GearList racketsPromise={getRacketsWithBrand()} />
      </Suspense>
    </>
  );
}
