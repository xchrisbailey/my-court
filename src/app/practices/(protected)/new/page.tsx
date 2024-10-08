import { validateRequest } from '@/lib/auth';
import { getGearSetsWithItems } from '@/lib/database/queries';
import { PracticeForm } from '../../_components/practice-form';

export default async function NewPracticePage() {
  const { user } = await validateRequest();
  if (!user) throw new Error('unauthorized');
  return (
    <PracticeForm page="new" gearPromise={getGearSetsWithItems(user.id)} />
  );
}
