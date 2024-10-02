import { getBrands } from '@/lib/database/queries';
import { StringForm } from '../form';

export default async function NewStringPage() {
  const brandsPromise = getBrands();
  return <StringForm page="new" brandsPromise={brandsPromise} />;
}
