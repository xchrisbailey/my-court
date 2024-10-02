import { GearSetForm } from '@/app/gear-sets/_components/gear-set-form';
import { validateRequest } from '@/lib/auth';
import {
  getGearSetWithItems,
  getRacketsWithBrand,
  getStringsWithBrand,
} from '@/lib/database/queries';

export default async function EditGearSetPage({
  params,
}: {
  params: { id: string };
}) {
  const { user } = await validateRequest();
  if (!user) throw new Error('unauthorized');
  return (
    <GearSetForm
      page={'edit'}
      racketsPromise={getRacketsWithBrand()}
      stringsPromise={getStringsWithBrand()}
      targetGearSet={getGearSetWithItems(params.id, user.id)}
    />
  );
}
