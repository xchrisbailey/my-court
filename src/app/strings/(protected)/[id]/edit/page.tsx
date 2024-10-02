import { StringForm } from '@/app/strings/_components/string-form';
import { getBrands, getString } from '@/lib/database/queries';

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
