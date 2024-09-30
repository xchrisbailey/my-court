import { deleteString } from '@/app/(protected)/strings/actions';
import StringSpecCard from '@/components/stringSpecCard';
import { Button } from '@/components/ui/button';
import { validateRequest } from '@/lib/auth';
import { getStringWithBrand } from '@/lib/database/queries';
import { Pencil, Trash } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function stringPage({
  params,
}: {
  params: { id: string };
}) {
  const string = await getStringWithBrand(params.id);
  if (!string) notFound();
  const { user } = await validateRequest();

  return (
    <>
      <div className="flex justify-between items-center w-full">
        <h1 className="mb-2">
          {string.brand.name} {string.model}
        </h1>
        <div>
          {user ? (
            <div className="flex gap-2 justify-end items-center">
              <Button asChild variant="secondary" size="icon">
                <Link href={`/strings/${string.id}/edit`}>
                  <Pencil className="w-4 h-4" />
                </Link>
              </Button>
              <form action={deleteString}>
                <input type="hidden" value={string.id} name="stringId" />
                <Button variant="destructive" size="icon">
                  <Trash className="w-4 h-4" />
                </Button>
              </form>
            </div>
          ) : null}
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <StringSpecCard
          gauge={string.gauge}
          composition={string.composition}
          tensionRange={0}
        />
      </div>
    </>
  );
}
