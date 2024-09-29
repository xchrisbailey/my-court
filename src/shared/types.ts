import {
  brands,
  gearSets,
  matches,
  practices,
  rackets,
  strings,
  users,
} from '@/lib/database/schema';

// form state base type
export type ActionState<T> = {
  error?: string;
  errors?: T;
  success?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

// database user types
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

// brand types
export type Brand = typeof brands.$inferSelect;
export type BrandWithProducts = Brand & {
  strings: String[];
  rackets: Racket[];
};
export type NewBrand = typeof brands.$inferInsert;

// racket types
export type Racket = typeof rackets.$inferSelect;
export type RacketWithBrand = Racket & {
  brand: Brand;
};
export type NewRacket = typeof rackets.$inferInsert;

// strings types
export type String = typeof strings.$inferSelect;
export type StringWithBrand = String & {
  brand: Brand;
};
export type NewString = typeof strings.$inferInsert;

// match types
export type Match = typeof matches.$inferSelect;
export type NewMatch = typeof matches.$inferInsert;

// practice type
export type Practice = typeof practices.$inferSelect;
export type NewPractice = typeof practices.$inferInsert;

// gear sets
export type GearSet = typeof gearSets.$inferSelect;
export type GearSetWithRacketAndString = GearSet & {
  racket: RacketWithBrand;
  strings: StringWithBrand;
};
export type NewGearSet = typeof gearSets.$inferInsert;
