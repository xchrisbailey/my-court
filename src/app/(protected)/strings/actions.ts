'use server';

import { validateRequest } from '@/lib/auth';
import { db } from '@/lib/database';
import { strings } from '@/lib/database/schema';
import { ActionState, String } from '@/shared/types';
import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';
import { z } from 'zod';

export type StringActionState = ActionState<{
  model?: string[] | undefined;
  composition?: string[] | undefined;
  gauge?: string[] | undefined;
  brandId?: string[] | undefined;
}>;

const newStringSchema = z.object({
  model: z.string().min(3, { message: 'must add model' }),
  composition: z.string().min(3, { message: 'must add composition' }),
  gauge: z.string().min(3, { message: 'must add gauge' }),
  brandId: z.string().cuid2(),
});

export async function addString(_: StringActionState, formData: FormData) {
  const { user } = await validateRequest();
  if (!user) throw new Error('unauthorized');

  const parsedForm = newStringSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!parsedForm.success) {
    return {
      errors: parsedForm.error.flatten().fieldErrors,
      error: 'invalid string data',
    };
  }

  let newString: String[];

  try {
    newString = await db.insert(strings).values(parsedForm.data).returning();
    if (!newString[0])
      throw new Error(`could not create string model ${parsedForm.data.model}`);
  } catch (err) {
    console.log(err);
    if (err instanceof Error) {
      return {
        error: err.message,
      };
    }

    return {
      error: 'an unknown error has occured',
    };
  }

  return redirect(`/strings/${newString[0].id}`);
}

const updateStringSchema = z.object({
  stringId: z.string().cuid2().min(3),
  model: z.string().min(3, { message: 'must add model' }).optional(),
  gauge: z.string().min(2, { message: 'must add gauge' }).optional(),
  composition: z.string().min(3, { message: 'must add model' }).optional(),
  brandId: z.string().cuid2().optional(),
});

export async function editString(_: StringActionState, formData: FormData) {
  const { user } = await validateRequest();
  if (!user) throw new Error('unauthorized');

  console.log(Object.fromEntries(formData.entries()));

  const parsedForm = updateStringSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!parsedForm.success) {
    console.log(parsedForm.error.flatten().fieldErrors);
    return {
      errors: parsedForm.error.flatten().fieldErrors,
      error: 'invalid string data',
    };
  }

  const { stringId, ...updatedStringData } = parsedForm.data;

  let updatedString: String[];

  try {
    updatedString = await db
      .update(strings)
      .set(updatedStringData)
      .where(eq(strings.id, stringId))
      .returning();
    if (!updatedString[0])
      throw new Error(`couldnt edit string: ${parsedForm.data.model}`);
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

  return redirect(`/strings/${updatedString[0].id}`);
}

const deleteStringSchema = z.object({
  stringId: z.string().cuid2().min(2),
});

export async function deleteString(formData: FormData) {
  const { user } = await validateRequest();
  if (!user) throw new Error('unauthorized');

  const parsedForm = deleteStringSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!parsedForm.success) {
    throw new Error('could not delete string');
  }

  await db.delete(strings).where(eq(strings.id, parsedForm.data.stringId));

  return redirect('/strings');
}
