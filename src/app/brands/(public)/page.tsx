import { BrandsListSkeleton } from '@/app/brands/_components/brand-list-skeleton';
import { getBrands } from '@/lib/database/queries';
import { Suspense } from 'react';
import { BrandsList } from '../_components/brand-list';

export default async function BrandsPage() {
  const brands = await getBrands();
  if (!brands) throw new Error('Brand not found');

  const brandsPromise = getBrands();

  return (
    <>
      <h1>Brands</h1>
      <Suspense fallback={<BrandsListSkeleton />}>
        <BrandsList brandsPromise={brandsPromise} />
      </Suspense>
    </>
  );
}
