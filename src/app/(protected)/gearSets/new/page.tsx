import {
  getRacketsWithBrand,
  getStringsWithBrand,
} from '@/lib/database/queries';
import { GearSetForm } from '../form';

export default async function NewGearSetPage() {
  return (
    <GearSetForm
      page={'new'}
      racketsPromise={getRacketsWithBrand()}
      stringsPromise={getStringsWithBrand()}
    />
  );
}
