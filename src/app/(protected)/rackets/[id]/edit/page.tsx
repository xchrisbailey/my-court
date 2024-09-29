import { getBrands, getRacket } from '@/lib/database/queries';
import { RacketForm } from '../../form';

export default async function EditRacketPage({
  params,
}: {
  params: { id: string };
}) {
  const racketPromise = getRacket(params.id);
  const brandsPromise = getBrands();

  return (
    <RacketForm
      page="edit"
      brandsPromise={brandsPromise}
      targetRacketPromise={racketPromise}
    />
  );
}
