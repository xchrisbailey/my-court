import { validateRequest } from '@/lib/auth';
import { getGearSetsWithItems } from '@/lib/database/queries';
import { MatchForm } from '../../_components/match-form';

export default async function NewMatchPage() {
  const { user } = await validateRequest();
  if (!user) throw new Error('unauthorized');
  return <MatchForm page="new" gearPromise={getGearSetsWithItems(user.id)} />;
}
