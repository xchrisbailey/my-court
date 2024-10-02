import GearList from '@/components/gear-list';
import { getRacketsWithBrand } from '@/lib/database/queries';
import { Suspense } from 'react';

export default async function RacketsPage() {
  return (
    <>
      <h1>Rackets</h1>
      <Suspense
        fallback={
          <>
            <p>...loading</p>
          </>
        }
      >
        <GearList racketsPromise={getRacketsWithBrand()} />
      </Suspense>
    </>
  );
}
