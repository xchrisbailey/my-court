import { getBrand } from '@/lib/database/queries';
import { BrandForm } from '../../form';

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
