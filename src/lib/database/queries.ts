import { Brand, Racket, RacketWithBrand } from '@/shared/types';
import { eq } from 'drizzle-orm';
import { db } from '.';
import { brands, rackets } from './schema';

export async function getBrand(id: string): Promise<Brand | undefined> {
  return await db.query.brands.findFirst({ where: eq(brands.id, id) });
}

export async function getBrands(): Promise<Brand[]> {
  return await db.query.brands.findMany();
}

export async function getRackets(): Promise<Racket[]> {
  return await db.query.rackets.findMany({});
}

export async function getRacketsWithBrand(): Promise<RacketWithBrand[]> {
  return await db.query.rackets.findMany({
    with: { brand: true },
  });
}

export async function getRacket(id: string): Promise<Racket | undefined> {
  return await db.query.rackets.findFirst({
    where: eq(rackets.id, id),
  });
}

export async function getRacketWithBrand(
  id: string,
): Promise<RacketWithBrand | undefined> {
  return (await db.query.rackets.findFirst({
    where: eq(rackets.id, id),
    with: { brand: true },
  })) as RacketWithBrand;
}
