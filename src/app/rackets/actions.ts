'use server';

import { validateRequest } from '@/lib/auth';
import { db } from '@/lib/database';
import { rackets } from '@/lib/database/schema';
import { ActionState, Racket } from '@/shared/types';
import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';
import { z } from 'zod';

export type RacketActionState = ActionState<{
  model?: string[] | undefined;
  year?: string[] | undefined;
  headSize?: string[] | undefined;
  stringPattern?: string[] | undefined;
  weight?: string[] | undefined;
  swingWeight?: string[] | undefined;
  brandId?: string[] | undefined;
}>;

const newRacketSchema = z.object({
  model: z.string().min(3, { message: 'must add model' }),
  year: z.coerce.number().min(1950),
  headSize: z.coerce.number().min(95),
  stringPattern: z.string().min(3, { message: 'please pick a string pattern' }),
  weight: z.coerce.number().min(10),
  swingWeight: z.coerce.number().min(10),
  brandId: z.string().cuid2(),
});

export async function addRacket(_: RacketActionState, formData: FormData) {
  const { user } = await validateRequest();
  if (!user) throw new Error('unauthorized');

  const parsedForm = newRacketSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!parsedForm.success) {
    return {
      errors: parsedForm.error.flatten().fieldErrors,
      error: 'invalid racket data',
    };
  }

  let newRacket: Racket[];

  try {
    newRacket = await db.insert(rackets).values(parsedForm.data).returning();
    if (!newRacket[0])
      throw new Error(`could not create racket model ${parsedForm.data.model}`);
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

  return redirect(`/rackets/${newRacket[0].id}`);
}

const updateRacketSchema = z.object({
  racketId: z.string().cuid2().min(3),
  model: z.string().min(3, { message: 'must add model' }).optional(),
  year: z.coerce.number().min(1950).optional(),
  headSize: z.coerce.number().min(95).optional(),
  stringPattern: z
    .string()
    .min(3, { message: 'please pick a string pattern' })
    .optional(),
  weight: z.coerce.number().min(10).optional(),
  swingWeight: z.coerce.number().min(10).optional(),
  brandId: z.string().cuid2().optional(),
});

export async function editRacket(_: RacketActionState, formData: FormData) {
  const { user } = await validateRequest();
  if (!user) throw new Error('unauthorized');

  const parsedForm = updateRacketSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!parsedForm.success) {
    console.log(parsedForm.error.flatten().fieldErrors);
    return {
      errors: parsedForm.error.flatten().fieldErrors,
      error: 'invalid racket data',
    };
  }

  const { racketId, ...updatedRacketData } = parsedForm.data;

  let updatedRacket: Racket[];

  try {
    updatedRacket = await db
      .update(rackets)
      .set(updatedRacketData)
      .where(eq(rackets.id, racketId))
      .returning();
    if (!updatedRacket[0])
      throw new Error(`couldnt edit racket: ${parsedForm.data.model}`);
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

  return redirect(`/rackets/${updatedRacket[0].id}`);
}

const deleteRacketSchema = z.object({
  racketId: z.string().cuid2().min(2),
});

export async function deleteRacket(formData: FormData) {
  const { user } = await validateRequest();
  if (!user) throw new Error('unauthorized');

  const parsedForm = deleteRacketSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!parsedForm.success) {
    throw new Error('could not delete racket');
  }

  try {
    const result = await db
      .delete(rackets)
      .where(eq(rackets.id, parsedForm.data.racketId));
    if (result.count === 0) {
      throw new Error('could not delete racket');
    }
  } catch {
    throw new Error('could not delete racket');
  }

  return redirect('/rackets');
}
