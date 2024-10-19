import { StringForm } from '@/app/strings/_components/string-form';
import { getBrands, getString } from '@/lib/database/queries';

export default async function EditStringPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  return (
    <StringForm
      page="edit"
      brandsPromise={getBrands()}
      targetStringPromise={getString(params.id)}
    />
  );
}
