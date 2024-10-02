import { getBrands } from '@/lib/database/queries';
import { Suspense } from 'react';
import { BrandsList } from './brandList';

export default async function BrandsPage() {
  const brands = await getBrands();
  if (!brands) throw new Error('Brand not found');

  const brandsPromise = getBrands();

  return (
    <>
      <h1>Brands</h1>
      <Suspense
        fallback={
          <>
            <p>Loading...</p>
          </>
        }
      >
        <BrandsList brandsPromise={brandsPromise} />
      </Suspense>
    </>
  );
}
