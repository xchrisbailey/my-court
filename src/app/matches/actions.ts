'use server';

import { validateRequest } from '@/lib/auth';
import { db } from '@/lib/database';
import { matches } from '@/lib/database/schema';
import { ActionState, Match } from '@/shared/types';
import { and, eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';
import { z } from 'zod';

export type MatchActionState = ActionState<{
  organization: string[] | undefined;
  location: string[] | undefined;
  city: string[] | undefined;
  state: string[] | undefined;
  playDate: string[] | undefined;
  notes: string[] | undefined;
  firstSetSelf: string[] | undefined;
  firstSetOpponent: string[] | undefined;
  firstSetTieBreakSelf: string[] | undefined;
  firstSetTieBreakOpponent: string[] | undefined;
  secondSetSelf: string[] | undefined;
  secondSetOpponent: string[] | undefined;
  secondSetTieBreakSelf: string[] | undefined;
  secondSetTieBreakOpponent: string[] | undefined;
  thirdSetSelf: string[] | undefined;
  thirdSetOpponent: string[] | undefined;
  thirdSetTieBreakSelf: string[] | undefined;
  thirdSetTieBreakOpponent: string[] | undefined;
  gearId: string[] | undefined;
}>;

const newMatchSchema = z.object({
  organization: z.string().min(3),
  location: z.string().min(3),
  city: z.string().min(3),
  state: z.string().min(2).max(2),
  playDate: z.coerce.string(),
  notes: z.string().min(3),
  firstSetSelf: z.coerce.number().max(7),
  firstSetOpponent: z.coerce.number().max(7),
  firstSetTieBreakSelf: z.coerce.number().optional(),
  firstSetTieBreakOpponent: z.coerce.number().optional(),
  secondSetSelf: z.coerce.number().max(7),
  secondSetOpponent: z.coerce.number().max(7),
  secondSetTieBreakSelf: z.coerce.number().optional(),
  secondSetTieBreakOpponent: z.coerce.number().optional(),
  thirdSetSelf: z.coerce.number().max(7).optional(),
  thirdSetOpponent: z.coerce.number().max(7).optional(),
  thirdSetTieBreakSelf: z.coerce.number().optional(),
  thirdSetTieBreakOpponent: z.coerce.number().optional(),
  gearId: z.string().cuid2(),
});

export async function addMatch(_: MatchActionState, formData: FormData) {
  const { user } = await validateRequest();
  if (!user) throw new Error('unauthorized');

  const parsedForm = newMatchSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  console.log(Object.fromEntries(formData.entries()));

  if (!parsedForm.success) {
    console.log(parsedForm.error.flatten().fieldErrors);
    return {
      errors: parsedForm.error.flatten().fieldErrors,
      error: 'invalid match data',
    };
  }

  let newMatch: Match[];

  try {
    newMatch = await db
      .insert(matches)
      .values({ ...parsedForm.data, userId: user.id })
      .returning();

    if (!newMatch[0]) throw new Error(`could not add match`);
  } catch (err) {
    console.log(err);
    if (err instanceof Error) {
      return {
        error: err.message,
      };
    }

    console.log(err);
    return {
      error: 'an unknown error has occured',
    };
  }

  return redirect(`/matches/${newMatch[0].id}`);
}

const editMatchSchema = z.object({
  organization: z.string().min(3).optional(),
  location: z.string().min(3).optional(),
  city: z.string().min(3).optional(),
  state: z.string().min(2).max(2).optional(),
  playDate: z.coerce.string().optional(),
  notes: z.string().min(3).optional(),
  firstSetSelf: z.coerce.number().max(7).optional(),
  firstSetOpponent: z.coerce.number().max(7).optional(),
  firstSetTieBreakSelf: z.coerce.number().optional(),
  firstSetTieBreakOpponent: z.coerce.number().optional(),
  secondSetSelf: z.coerce.number().max(7).optional(),
  secondSetOpponent: z.coerce.number().max(7).optional(),
  secondSetTieBreakSelf: z.coerce.number().optional(),
  secondSetTieBreakOpponent: z.coerce.number().optional(),
  thirdSetSelf: z.coerce.number().max(7).optional(),
  thirdSetOpponent: z.coerce.number().max(7).optional(),
  thirdSetTieBreakSelf: z.coerce.number().optional(),
  thirdSetTieBreakOpponent: z.coerce.number().optional(),
  gearId: z.string().cuid2().optional(),
  matchId: z.string().cuid2(),
});

export async function editMatch(_: MatchActionState, formData: FormData) {
  const { user } = await validateRequest();
  if (!user) throw new Error('unauthorized');

  const parsedForm = editMatchSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!parsedForm.success) {
    console.log(parsedForm.error.flatten().fieldErrors);
    return {
      errors: parsedForm.error.flatten().fieldErrors,
      error: 'invalid match data',
    };
  }

  const { matchId, ...updatedMatchData } = parsedForm.data;

  let updatedMatch: Match[];

  try {
    updatedMatch = await db
      .update(matches)
      .set(updatedMatchData)
      .where(and(eq(matches.id, matchId), eq(matches.userId, user.id)))
      .returning();
    if (!updatedMatch[0]) throw new Error(`couldnt edit match`);
  } catch (err) {
    if (err instanceof Error) {
      return {
        error: err.message,
      };
    }

    console.log(err);
    return {
      error: 'an unknown error has occured',
    };
  }

  return redirect(`/matches/${updatedMatch[0].id}`);
}

const deleteMatchSchema = z.object({
  matchId: z.string().cuid2().min(2),
});

export async function deleteMatch(formData: FormData) {
  const { user } = await validateRequest();
  if (!user) throw new Error('unauthorized');

  const parsedForm = deleteMatchSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!parsedForm.success) {
    throw new Error('could not delete match');
  }

  await db
    .delete(matches)
    .where(
      and(eq(matches.id, parsedForm.data.matchId), eq(matches.userId, user.id)),
    );

  return redirect('/matches/new');
}
