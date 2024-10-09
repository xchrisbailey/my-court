'use server';
import { validateRequest } from '@/lib/auth';
import { db } from '@/lib/database';
import { practices } from '@/lib/database/schema';
import { ActionState, Practice } from '@/shared/types';
import { and, eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

export type PracticeActionState = ActionState<{
  type: string[] | undefined;
  playDate: string[] | undefined;
  location: string[] | undefined;
  city: string[] | undefined;
  state: string[] | undefined;
  notes: string[] | undefined;
  gearId: string[] | undefined;
}>;

const newPracticeSchema = z.object({
  type: z.string().min(3),
  playDate: z.coerce.string(),
  location: z.string().min(3),
  city: z.string().min(3),
  state: z.string().min(2).max(2),
  notes: z.string().min(3),
  gearId: z.string().cuid2(),
});

export async function addPractice(_: PracticeActionState, formData: FormData) {
  const { user } = await validateRequest();
  if (!user) throw new Error('unauthorized');

  const parsedForm = newPracticeSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );
  if (!parsedForm.success) {
    console.log(parsedForm.error.flatten().fieldErrors);
    return {
      errors: parsedForm.error.flatten().fieldErrors,
      error: 'Invalid practice data',
    };
  }

  let newPractice: { id: string }[];

  try {
    newPractice = await db
      .insert(practices)
      .values({
        ...parsedForm.data,
        userId: user.id,
      })
      .returning({ id: practices.id });

    if (!newPractice[0].id) {
      throw new Error('Failed to add practice');
    }
  } catch (err) {
    console.error(err);
    if (err instanceof Error) {
      return {
        error: err.message,
      };
    }
    return {
      error: 'Failed to add practice',
    };
  }
  return redirect(`/practices/${newPractice[0].id}`);
}

const editPracticeSchema = z.object({
  type: z.string().min(3).optional(),
  playDate: z.coerce.string().optional(),
  location: z.string().min(3).optional(),
  city: z.string().min(3).optional(),
  state: z.string().min(2).max(2).optional(),
  notes: z.string().min(3).optional(),
  gearId: z.string().cuid2().optional(),
  practiceId: z.string().cuid2(),
});

export async function editPractice(_: PracticeActionState, formData: FormData) {
  const { user } = await validateRequest();
  if (!user) throw new Error('unauthorized');

  const parsedForm = editPracticeSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );
  if (!parsedForm.success) {
    console.log(parsedForm.error.flatten().fieldErrors);
    return {
      errors: parsedForm.error.flatten().fieldErrors,
      error: 'Invalid practice data',
    };
  }

  const { practiceId, ...updatedPracticeData } = parsedForm.data;

  let updatedPractice: Practice[];

  try {
    updatedPractice = await db
      .update(practices)
      .set(updatedPracticeData)
      .where(and(eq(practices.id, practiceId), eq(practices.userId, user.id)))
      .returning();

    if (!updatedPractice[0]) {
      throw new Error('Failed to edit practice');
    }
  } catch (err) {
    console.error(err);
    if (err instanceof Error) {
      return {
        error: err.message,
      };
    }
    return {
      error: 'Failed to edit practice',
    };
  }

  return redirect(`/practices/${updatedPractice[0].id}`);
}

export async function deletePractice(practiceId: string) {
  const { user } = await validateRequest();
  if (!user) throw new Error('unauthorized');

  await db
    .delete(practices)
    .where(and(eq(practices.id, practiceId), eq(practices.userId, user.id)));

  revalidatePath('/practices');
}
