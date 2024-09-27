import { eq } from 'drizzle-orm';
import { db } from '.';
import { Brand, brands } from './schema';

export async function getBrand(id: string): Promise<Brand | undefined> {
  return await db.query.brands.findFirst({ where: eq(brands.id, id) });
}

export async function getBrands(): Promise<Brand[]> {
  return await db.query.brands.findMany();
}
