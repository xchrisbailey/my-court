import GearList from '@/components/GearList';
import { getStringsWithBrand } from '@/lib/database/queries';
import { Suspense } from 'react';

export default async function StringsPage() {
  return (
    <>
      <h1>Strings</h1>
      <Suspense
        fallback={
          <>
            <p>...loading</p>
          </>
        }
      >
        <GearList stringsPromise={getStringsWithBrand()} />
      </Suspense>
    </>
  );
}
