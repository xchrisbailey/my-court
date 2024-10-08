'use server';

import {
  Brand,
  String as DBString,
  GearSetWithRacketAndString,
  MatchWithRelations,
  PracticeWithRelations,
  Racket,
  RacketWithBrand,
  StringWithBrand,
} from '@/shared/types';
import { and, eq } from 'drizzle-orm';
import { db } from '.';
import {
  brands,
  gearSets,
  matches,
  practices,
  rackets,
  strings,
} from './schema';

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

export async function getStrings(): Promise<DBString[]> {
  return await db.query.strings.findMany({});
}

export async function getStringsWithBrand(): Promise<StringWithBrand[]> {
  return await db.query.strings.findMany({
    with: { brand: true },
  });
}

export async function getString(id: string): Promise<DBString | undefined> {
  return await db.query.strings.findFirst({
    where: eq(strings.id, id),
  });
}

export async function getStringWithBrand(
  id: string,
): Promise<StringWithBrand | undefined> {
  return (await db.query.strings.findFirst({
    where: eq(strings.id, id),
    with: { brand: true },
  })) as StringWithBrand;
}

export async function getGearSetWithItems(
  id: string,
  uid: string,
): Promise<GearSetWithRacketAndString | undefined> {
  return (await db.query.gearSets.findFirst({
    where: and(eq(gearSets.id, id), eq(gearSets.userId, uid)),
    with: {
      strings: {
        with: {
          brand: true,
        },
      },
      racket: {
        with: {
          brand: true,
        },
      },
    },
  })) as GearSetWithRacketAndString;
}

export async function getGearSetsWithItems(
  uid: string,
): Promise<GearSetWithRacketAndString[]> {
  return (await db.query.gearSets.findMany({
    where: eq(gearSets.userId, uid),
    with: {
      strings: {
        with: {
          brand: true,
        },
      },
      racket: {
        with: {
          brand: true,
        },
      },
    },
  })) as GearSetWithRacketAndString[];
}

export async function getMatchWithRelations(
  id: string,
  uid: string,
): Promise<MatchWithRelations | undefined> {
  return (await db.query.matches.findFirst({
    where: and(eq(matches.id, id), eq(matches.userId, uid)),
    with: {
      user: true,
      gear: {
        with: {
          racket: {
            with: {
              brand: true,
            },
          },
          strings: {
            with: {
              brand: true,
            },
          },
        },
      },
    },
  })) as MatchWithRelations;
}

export async function getMatches(uid: string) {
  return await db.query.matches.findMany({
    where: eq(matches.userId, uid),
  });
}

export async function getPracticeWithRelations(
  id: string,
  uid: string,
): Promise<PracticeWithRelations | undefined> {
  return (await db.query.practices.findFirst({
    where: and(eq(practices.id, id), eq(practices.userId, uid)),
    with: {
      user: true,
      gear: {
        with: {
          racket: {
            with: {
              brand: true,
            },
          },
          strings: {
            with: {
              brand: true,
            },
          },
        },
      },
    },
  })) as PracticeWithRelations;
}

export async function getPractices(uid: string) {
  return await db.query.practices.findMany({
    where: eq(practices.userId, uid),
  });
}
