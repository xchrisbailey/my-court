import { BrandForm } from '@/app/brands/_components/brand-form';
import { getBrand } from '@/lib/database/queries';

export default async function UpdateBrandPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const brand = getBrand(params.id);

  return (
    <>
      <BrandForm targetBrandPromise={brand} page="edit" />
    </>
  );
}
