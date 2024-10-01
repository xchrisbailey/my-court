import { validateRequest } from '@/lib/auth';
import { getGearSetWithItems } from '@/lib/database/queries';
import { notFound, redirect } from 'next/navigation';
import { GearSetCard } from '../_components/GearSetCard';

export default async function GearSetPage({
  params,
}: {
  params: { id: string };
}) {
  const { user } = await validateRequest();
  if (!user) redirect('/login');

  const gearSet = await getGearSetWithItems(params.id, user.id);
  if (!gearSet) notFound();

  return (
    <div className="w-full">
      <GearSetCard gear={gearSet} display="view" />
    </div>
  );
}
