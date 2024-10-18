import { RacketForm } from '@/app/rackets/_components/racket-form';
import { getBrands, getRacket } from '@/lib/database/queries';

export default async function EditRacketPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
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
