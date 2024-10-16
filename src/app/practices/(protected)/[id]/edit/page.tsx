import { PracticeForm } from '@/app/practices/_components/practice-form';
import { validateRequest } from '@/lib/auth';
import {
  getGearSetsWithItems,
  getPracticeWithRelations,
} from '@/lib/database/queries';
import { redirect } from 'next/navigation';

export default async function EditPracticePage(
  props: {
    params: Promise<{ id: string }>;
  }
) {
  const params = await props.params;
  const { user } = await validateRequest();
  if (!user) return redirect('/login');
  return (
    <PracticeForm
      page="edit"
      gearPromise={getGearSetsWithItems(user.id)}
      targetPracticePromise={getPracticeWithRelations(params.id, user.id)}
    />
  );
}
