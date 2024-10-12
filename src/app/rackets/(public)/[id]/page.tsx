import RacketSpecCard from '@/app/rackets/_components/racket-spec-card';
import { deleteRacket } from '@/app/rackets/actions';
import { Button } from '@/components/ui/button';
import { validateRequest } from '@/lib/auth';
import { getRacketWithBrand } from '@/lib/database/queries';
import { Pencil, Trash } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function RacketPage({
  params,
}: {
  params: { id: string };
}) {
  const racket = await getRacketWithBrand(params.id);
  if (!racket) return notFound();
  const { user } = await validateRequest();

  return (
    <>
      <div className="flex justify-between items-center w-full">
        <h1 className="mb-2">
          {racket.year} {racket.brand.name} {racket.model}
        </h1>
        <div>
          {user ? (
            <div className="flex gap-2 justify-end items-center">
              <Button asChild variant="secondary" size="icon">
                <Link href={`/rackets/${racket.id}/edit`}>
                  <Pencil className="w-4 h-4" />
                </Link>
              </Button>
              <form action={deleteRacket}>
                <input type="hidden" value={racket.id} name="racketId" />
                <Button variant="destructive" size="icon">
                  <Trash className="w-4 h-4" />
                </Button>
              </form>
            </div>
          ) : null}
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <RacketSpecCard
          headSize={racket.headSize.toString()}
          stringPattern={racket.stringPattern}
          weight={racket.weight}
          swingWeight={racket.swingWeight}
        />
      </div>
    </>
  );
}
