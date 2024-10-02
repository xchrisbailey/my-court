import { RacketForm } from '@/app/rackets/_components/racket-form';
import { getBrands } from '@/lib/database/queries';

export default async function NewRacketPage() {
  const brandsPromise = getBrands();

  return <RacketForm page="new" brandsPromise={brandsPromise} />;
}
