'use client';

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { RacketWithBrand } from '@/shared/types';
import Link from 'next/link';
import { use } from 'react';

type Props = {
  racketsPromise: Promise<RacketWithBrand[]>;
};

export default function GearList({ racketsPromise }: Props) {
  const rackets = use(racketsPromise);
  return (
    <div className="container py-2 mx-auto">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {rackets.map(racket => (
          <RacketListCard racket={racket} key={racket.id} />
        ))}
      </div>
    </div>
  );
}

function RacketListCard({ racket }: { racket: RacketWithBrand }) {
  return (
    <Link
      href={`/rackets/${racket.id}`}
      key={racket.id}
      className="block hover:no-underline"
    >
      <Card className="h-full transition-shadow hover:shadow-md">
        <CardHeader>
          <CardTitle className="mb-2 text-xl">{racket.model}</CardTitle>
          <CardDescription>
            <span className="block mb-1 text-sm text-muted-foreground">
              Brand: {racket.brand.name}
            </span>
            <span className="block text-sm text-muted-foreground">
              Year: {racket.year}
            </span>
            <span className="block text-sm text-muted-foreground">
              Head Size: {racket.headSize} sq in
            </span>
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}
