import { GearList } from '@/components/gear-list';
import GearListSkeleton from '@/components/gear-list-skeleton';
import { getStringsWithBrand } from '@/lib/database/queries';
import { Suspense } from 'react';

export default async function StringsPage() {
  return (
    <>
      <Suspense fallback={<GearListSkeleton />}>
        <GearList stringsPromise={getStringsWithBrand()} />
      </Suspense>
    </>
  );
}
