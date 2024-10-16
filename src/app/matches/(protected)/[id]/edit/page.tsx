import { MatchForm } from '@/app/matches/_components/match-form';
import { validateRequest } from '@/lib/auth';
import {
  getGearSetsWithItems,
  getMatchWithRelations,
} from '@/lib/database/queries';
import { redirect } from 'next/navigation';

export default async function EditMatchPage(
  props: {
    params: Promise<{ id: string }>;
  }
) {
  const params = await props.params;
  const { user } = await validateRequest();
  if (!user) redirect('/login');

  return (
    <MatchForm
      page="edit"
      targetMatchPromise={getMatchWithRelations(params.id, user.id)}
      gearPromise={getGearSetsWithItems(user.id)}
    />
  );
}
