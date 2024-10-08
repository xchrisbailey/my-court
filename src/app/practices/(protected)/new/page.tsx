import { validateRequest } from '@/lib/auth';
import { getGearSetsWithItems } from '@/lib/database/queries';
import { redirect } from 'next/navigation';
import { PracticeForm } from '../../_components/practice-form';

export default async function NewPracticePage() {
  const { user } = await validateRequest();
  if (!user) return redirect('/login');
  return (
    <PracticeForm page="new" gearPromise={getGearSetsWithItems(user.id)} />
  );
}
