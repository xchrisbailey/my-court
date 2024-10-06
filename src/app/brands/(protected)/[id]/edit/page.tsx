import { BrandForm } from '@/app/brands/_components/form';
import { getBrand } from '@/lib/database/queries';

export default async function UpdateBrandPage({
  params,
}: {
  params: { id: string };
}) {
  const brand = getBrand(params.id);

  return (
    <>
      <BrandForm targetBrandPromise={brand} page="edit" />
    </>
  );
}
