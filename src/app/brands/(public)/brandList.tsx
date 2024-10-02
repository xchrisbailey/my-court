'use clinet';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Brand } from '@/shared/types';
import Link from 'next/link';
import { use } from 'react';

type Props = {
  brandsPromise: Promise<Brand[]>;
};

export function BrandsList(props: Props) {
  const brands: Brand[] = use(props.brandsPromise);

  if (brands.length === 0) {
    return (
      <>
        <h2>No Brands Found Yet</h2>
      </>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {brands.map(brand => (
        <BrandCard brand={brand} key={brand.id} />
      ))}
    </div>
  );
}

export function BrandCard({ brand }: { brand: Brand }) {
  return (
    <Card key={brand.name}>
      <CardHeader className="flex flex-row gap-4 items-center">
        <Avatar>
          <AvatarImage src={brand.logoLink} alt={`${brand.name} logo`} />
          <AvatarFallback>{brand.name[0]}</AvatarFallback>
        </Avatar>
        <CardTitle>
          <Link
            href={`/brands/${brand.id}`}
            className="no-underline hover:text-black"
          >
            {brand.name}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{brand.about}</CardDescription>
      </CardContent>
    </Card>
  );
}
