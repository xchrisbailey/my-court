import { validateRequest } from '@/lib/auth';
import {
  getGearSetWithItems,
  getRacketsWithBrand,
  getStringsWithBrand,
} from '@/lib/database/queries';
import { GearSetForm } from '../../form';

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
