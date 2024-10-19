import { getBrand } from '@/lib/database/queries';
import { notFound } from 'next/navigation';

export default async function BrandPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const brand = await getBrand(params.id);
  if (!brand) return notFound();

  return (
    <>
      <h1>{brand?.name}</h1>
    </>
  );
}
