import { getBrands } from '@/lib/database/queries';
import { RacketForm } from '../form';

export default async function NewRacketPage() {
  const brandsPromise = getBrands();

  return <RacketForm page="new" brandsPromise={brandsPromise} />;
}
