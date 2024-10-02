import { StringForm } from '@/app/strings/_components/string-form';
import { getBrands } from '@/lib/database/queries';

export default async function NewStringPage() {
  const brandsPromise = getBrands();
  return <StringForm page="new" brandsPromise={brandsPromise} />;
}
