import { GearSetForm } from '@/app/gear-sets/_components/gear-set-form';
import {
  getRacketsWithBrand,
  getStringsWithBrand,
} from '@/lib/database/queries';

export default async function NewGearSetPage() {
  return (
    <GearSetForm
      page={'new'}
      racketsPromise={getRacketsWithBrand()}
      stringsPromise={getStringsWithBrand()}
    />
  );
}
