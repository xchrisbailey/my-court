'use server';

import { validateRequest } from '@/lib/auth';
import { db } from '@/lib/database';
import { brands } from '@/lib/database/schema';
import { ActionState, Brand } from '@/shared/types';
import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';
import { z } from 'zod';

export type BrandActionState = ActionState<{
  name?: string[] | undefined;
  logoLink?: string[] | undefined;
  about?: string[] | undefined;
}>;

const newBrandSchema = z.object({
  name: z.string().min(3).max(255),
  logoLink: z.string().url().min(3, { message: 'a logo link is required' }),
  about: z.string().min(3),
});

export async function addBrand(_: BrandActionState, formData: FormData) {
  const { user } = await validateRequest();
  if (!user) throw new Error('unauthorized');

  const parsedForm = newBrandSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!parsedForm.success) {
    return {
      errors: parsedForm.error.flatten().fieldErrors,
      error: 'invalid brand data',
    };
  }

  let newBrand: Brand[];

  try {
    newBrand = await db.insert(brands).values(parsedForm.data).returning();
    if (!newBrand[0])
      throw new Error(`couldnt create brand ${parsedForm.data.name}`);
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

  return redirect(`/brands/${newBrand[0].id}`);
}

const editBrandSchema = z.object({
  brandId: z.string().min(5),
  name: z.string().min(3).max(255).optional(),
  logoLink: z
    .string()
    .url()
    .min(3, { message: 'a logo link is required' })
    .optional(),
  about: z.string().min(3).optional(),
});

export async function editBrand(_: BrandActionState, formData: FormData) {
  const { user } = await validateRequest();
  if (!user) throw new Error('unauthorized');

  const parsedForm = editBrandSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!parsedForm.success) {
    return {
      errors: parsedForm.error.flatten().fieldErrors,
      error: 'invalid brand data',
    };
  }

  const { brandId, ...updatedBrandData } = parsedForm.data;

  let updatedBrand: Brand[];

  try {
    updatedBrand = await db
      .update(brands)
      .set(updatedBrandData)
      .where(eq(brands.id, brandId))
      .returning();
    if (!updatedBrand[0])
      throw new Error(`couldnt edit brand: ${parsedForm.data.name}`);
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

  return redirect(`/brands/${updatedBrand[0].id}`);
}

export async function deleteBrand(id: string) {
  const { user } = await validateRequest();
  if (!user) throw new Error('unauthorized');

  try {
    await db.delete(brands).where(eq(brands.id, id)).execute();
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
    throw new Error('an unknown error has occurred');
  }

  return redirect('/brands');
}
