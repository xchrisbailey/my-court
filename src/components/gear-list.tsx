'use client';

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { RacketWithRelations, StringWithRelations } from '@/shared/types';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React, { use, type JSX } from 'react';

type Props = {
  racketsPromise?: Promise<RacketWithRelations[]>;
  stringsPromise?: Promise<StringWithRelations[]>;
};

export function GearList({ racketsPromise, stringsPromise }: Props) {
  const rackets = racketsPromise ? use(racketsPromise) : null;
  const strings = stringsPromise ? use(stringsPromise) : null;
  const searchParams = useSearchParams();
  const brand: string | null = searchParams.get('brand');

  const gear: JSX.Element[] = [];
  if (brand) {
    rackets
      ?.filter(racket => racket.brand.name === brand)
      .map(racket =>
        gear.push(<RacketListCard racket={racket} key={racket.id} />),
      );
    strings
      ?.filter(string => string.brand.name === brand)
      .map(string =>
        gear.push(<StringListCard string={string} key={string.id} />),
      );
  } else {
    rackets?.map(racket =>
      gear.push(<RacketListCard racket={racket} key={racket.id} />),
    );
    strings?.map(string =>
      gear.push(<StringListCard string={string} key={string.id} />),
    );
  }

  return (
    <div className="container py-2 mx-auto">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {RenderGearItems(gear)}
      </div>
    </div>
  );
}

export function RacketListCard({ racket }: { racket: RacketWithRelations }) {
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

export function StringListCard({ string }: { string: StringWithRelations }) {
  return (
    <Link
      href={`/strings/${string.id}`}
      key={string.id}
      className="block hover:no-underline"
    >
      <Card className="h-full transition-shadow hover:shadow-md">
        <CardHeader>
          <CardTitle className="mb-2 text-xl">{string.model}</CardTitle>
          <CardDescription>
            <span className="block mb-1 text-sm text-muted-foreground">
              Brand: {string.brand.name}
            </span>
            <span className="block mb-1 text-sm text-muted-foreground">
              Composition: {string.composition}
            </span>
            <span className="block text-sm text-muted-foreground">
              Gauge: {string.gauge}
            </span>
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}

export function RenderGearItems(gear: JSX.Element[]) {
  return React.Children.map(gear, (child, index) => {
    return React.cloneElement(child, { key: index });
  });
}
