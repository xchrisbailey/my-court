import { getBrands, getString } from '@/lib/database/queries';
import { StringForm } from '../../form';

export default async function EditStringPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <StringForm
      page="edit"
      brandsPromise={getBrands()}
      targetStringPromise={getString(params.id)}
    />
  );
}
