'use server';

import { validateRequest } from '@/lib/auth';
import { db } from '@/lib/database';
import { gearSets } from '@/lib/database/schema';
import { ActionState, GearSet } from '@/shared/types';
import { and, eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';
import { z } from 'zod';

export type GearSetActionState = ActionState<{
  racketId?: string[] | undefined;
  stringId?: string[] | undefined;
  stringTensionMains?: string[] | undefined;
  stringTensionCrosses?: string[] | undefined;
}>;

const newGearSetSchema = z.object({
  racketId: z.string().cuid2(),
  stringId: z.string().cuid2(),
  stringTensionMains: z.coerce.number().min(5),
  stringTensionCrosses: z.coerce.number().min(5),
});

export async function addGearSet(_: GearSetActionState, formData: FormData) {
  const { user } = await validateRequest();
  if (!user) throw new Error('unauthorized');

  const parsedForm = newGearSetSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!parsedForm.success) {
    return {
      errors: parsedForm.error.flatten().fieldErrors,
      error: 'invalid gear set data',
    };
  }

  let newGearSet: GearSet[];

  try {
    newGearSet = await db
      .insert(gearSets)
      .values({
        ...parsedForm.data,
        userId: user.id,
      })
      .returning();
    if (!newGearSet[0]) throw new Error(`could not create new gear set`);
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

  return redirect(`/gearSets/${newGearSet[0].id}`);
}

const editGearSetSchema = z.object({
  gearSetId: z.string().cuid2(),
  racketId: z.string().cuid2().optional(),
  stringId: z.string().cuid2().optional(),
  stringTensionMains: z.coerce.number().min(5).optional(),
  stringTensionCrosses: z.coerce.number().min(5).optional(),
});
export async function editGearSet(_: GearSetActionState, formData: FormData) {
  const { user } = await validateRequest();
  if (!user) throw new Error('unauthorized');

  const parsedForm = editGearSetSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!parsedForm.success) {
    console.log(parsedForm.error.flatten().fieldErrors);
    return {
      errors: parsedForm.error.flatten().fieldErrors,
      error: 'invalid gear set data',
    };
  }

  const { gearSetId, ...updatedGearSetData } = parsedForm.data;

  let updatedGearSet: GearSet[];

  try {
    updatedGearSet = await db
      .update(gearSets)
      .set(updatedGearSetData)
      .where(eq(gearSets.id, gearSetId))
      .returning();
    if (!updatedGearSet[0]) throw new Error(`couldnt edit gear set`);
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

  return redirect(`/gearSets/${updatedGearSet[0].id}`);
}

const deleteGearSetSchema = z.object({
  gearSetId: z.string().cuid2().min(2),
});

export async function deleteGearSet(formData: FormData) {
  const { user } = await validateRequest();
  if (!user) return redirect('/login');

  const parsedForm = deleteGearSetSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!parsedForm.success) {
    throw new Error('could not delete gear set');
  }

  await db
    .delete(gearSets)
    .where(
      and(
        eq(gearSets.id, parsedForm.data.gearSetId),
        eq(gearSets.userId, user.id),
      ),
    );

  // TODO redirect back to user profile when implemented
  return redirect('/');
}
