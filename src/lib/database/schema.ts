import { createId } from '@paralleldrive/cuid2';
import { relations } from 'drizzle-orm';
import { integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('user', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export const sessions = pgTable('session', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id),
  expiresAt: timestamp('expires_at', {
    withTimezone: true,
    mode: 'date',
  }).notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
  matches: many(matches),
  practices: many(practices),
  rackets: many(racketsToUsers),
  strings: many(stringsToUsers),
  refreshTokens: many(refreshTokens),
  gearSets: many(gearSets),
}));

export const refreshTokens = pgTable('refreshToken', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  hashedToken: text('hashedToken').notNull(),
  userId: text('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  revoked: integer('revoked').default(0),
  createdAt: timestamp('createdAt').defaultNow(),
});

export const refreshTokensRelations = relations(refreshTokens, ({ one }) => ({
  user: one(users, {
    fields: [refreshTokens.userId],
    references: [users.id],
  }),
}));

export const matches = pgTable('match', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  organization: text('organization').notNull(),
  location: text('location').notNull(),
  city: text('city').notNull(),
  state: text('state').notNull(),
  playDate: text('playDate').notNull(),
  notes: text('notes'),
  firstSetSelf: integer('firstSetSelf').default(0),
  firstSetOpponent: integer('firstSetOpponent').default(0),
  firstSetTieBreakSelf: integer('firstSetTieBreakSelf').default(0),
  firstSetTieBreakOponnent: integer('firstSetTieBreakOponnent').default(0),
  secondSetSelf: integer('secondSetSelf').default(0),
  secondSetOpponent: integer('secondSetOpponent').default(0),
  secondSetTieBreakSelf: integer('secondSetTieBreakSelf').default(0),
  secondSetTieBreakOponnent: integer('secondSetTieBreakOponnent').default(0),
  thirdSetSelf: integer('thirdSetSelf').default(0),
  thirdSetOpponent: integer('thirdSetOpponent').default(0),
  thirdSetTieBreakSelf: integer('thirdSetTieBreakSelf').default(0),
  thirdSetTieBreakOponnent: integer('thirdSetTieBreakOponnent').default(0),
  thirdSetType: text('thirdSetType'),
  gearId: text('gearId').references(() => gearSets.id),
  userId: text('userId')
    .references(() => users.id, { onDelete: 'cascade' })
    .notNull(),
  createdAt: timestamp('createdAt').defaultNow(),
});

export const matchesRelations = relations(matches, ({ one }) => ({
  user: one(users, {
    fields: [matches.userId],
    references: [users.id],
  }),
  gear: one(gearSets, {
    fields: [matches.gearId],
    references: [gearSets.id],
  }),
}));

export const gearSets = pgTable('gearSet', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  userId: text('userId').references(() => users.id, { onDelete: 'cascade' }),
  racketId: text('racketId').references(() => rackets.id),
  stringId: text('stringId').references(() => strings.id),
  stringTension: integer('stringTension').notNull(),
  createdAt: timestamp('createdAt').defaultNow(),
});

export const gearSetsRelations = relations(gearSets, ({ many, one }) => ({
  user: one(users, {
    fields: [gearSets.userId],
    references: [users.id],
  }),
  racket: one(rackets, {
    fields: [gearSets.racketId],
    references: [rackets.id],
  }),
  strings: one(strings, {
    fields: [gearSets.stringId],
    references: [strings.id],
  }),
  matches: many(matches),
}));

export const practices = pgTable('practice', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  userId: text('userId').references(() => users.id, { onDelete: 'cascade' }),
  createdAt: timestamp('createdAt').defaultNow(),
});

export const practicesRelations = relations(practices, ({ one }) => ({
  user: one(users, {
    fields: [practices.userId],
    references: [users.id],
  }),
}));

export const brands = pgTable('brands', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  name: text('name').notNull(),
  about: text('about').notNull(),
  logoLink: text('logoLink').notNull(),
  createdAt: timestamp('createdAt').defaultNow(),
});

export type Brand = typeof brands.$inferSelect;
export type NewBrand = typeof brands.$inferInsert;

export const brandsRelations = relations(brands, ({ many }) => ({
  strings: many(strings),
  rackets: many(rackets),
}));

export const rackets = pgTable('racket', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  model: text('model').notNull(),
  year: integer('year').notNull(),
  headSize: integer('headSize').notNull(),
  stringPattern: text('stringPattern').notNull(),
  weight: integer('weight').notNull(),
  swingWeight: integer('swingWeight').notNull(),
  brandId: text('brandId')
    .notNull()
    .references(() => brands.id),
  createdAt: timestamp('createdAt').defaultNow(),
});

export const racketsRelations = relations(rackets, ({ many, one }) => ({
  racketsToUsers: many(racketsToUsers),
  brand: one(brands, {
    fields: [rackets.brandId],
    references: [brands.id],
  }),
}));

export const racketsToUsers = pgTable('racketToUser', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  userId: text('userId').references(() => users.id, { onDelete: 'cascade' }),
  racketId: text('racketId').references(() => rackets.id),
});

export const racketsToUsersRelations = relations(racketsToUsers, ({ one }) => ({
  racket: one(rackets, {
    fields: [racketsToUsers.racketId],
    references: [rackets.id],
  }),
  user: one(users, {
    fields: [racketsToUsers.userId],
    references: [users.id],
  }),
}));

export const strings = pgTable('string', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  model: text('model').notNull(),
  gauge: text('gauge').notNull(),
  composition: text('composition').notNull(),
  brandId: text('brandId')
    .notNull()
    .references(() => brands.id),
  createdAt: timestamp('createdAt').defaultNow(),
});

export const stringsRelations = relations(strings, ({ many, one }) => ({
  stringsToUsers: many(stringsToUsers),
  brand: one(brands, {
    fields: [strings.brandId],
    references: [brands.id],
  }),
}));

export const stringsToUsers = pgTable('stringToUser', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  userId: text('userId').references(() => users.id, { onDelete: 'cascade' }),
  stringId: text('stringId').references(() => strings.id),
  createdAt: timestamp('createdAt').defaultNow(),
});

export const stringsToUsersRelations = relations(stringsToUsers, ({ one }) => ({
  string: one(strings, {
    fields: [stringsToUsers.stringId],
    references: [strings.id],
  }),
  user: one(users, {
    fields: [stringsToUsers.userId],
    references: [users.id],
  }),
}));
