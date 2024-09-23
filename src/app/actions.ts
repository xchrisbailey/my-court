import { lucia, validateRequest } from "@/lib/auth";
import { db } from "@/lib/database";
import { users } from "@/lib/database/schema";
import { ActionResult } from "@/lib/Form";
import { hash, verify } from "@node-rs/argon2";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

const signUpSchema = z.object({
  email: z.string().email().min(2),
  password: z
    .string()
    .min(6, { message: "password must be at least 6 characters" }),
});

export async function signup(
  _: any,
  formData: FormData,
): Promise<ActionResult> {
  "use server";
  const userData = signUpSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!userData.success) {
    return {
      error: "invalid email or password",
    };
  }

  const hashedPassword = await hash(userData.data.password, {
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1,
  });

  try {
    const uid = await db
      .insert(users)
      .values({
        password: hashedPassword,
        email: userData.data.email,
      })
      .returning({ id: users.id });

    const session = await lucia.createSession(uid[0].id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );
  } catch (err) {
    if (err instanceof Error) {
      return {
        error: err.message,
      };
    }

    return {
      error: "An unknown error has occured: " + err,
    };
  }

  return redirect("/");
}

export async function logout(): Promise<ActionResult> {
  "use server";
  const { session } = await validateRequest();
  if (!session) {
    return {
      error: "Unauthorized",
    };
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
  return redirect("/login");
}

export async function login(_: any, formData: FormData): Promise<ActionResult> {
  "use server";
  const userData = signUpSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!userData.success) {
    return {
      error: "invalid email or password",
    };
  }

  const existingUser = await db.query.users.findFirst({
    where: eq(users.email, userData.data.email),
  });
  if (!existingUser) {
    return {
      error: "Incorrect username or password",
    };
  }

  const validPassword = await verify(
    existingUser.password,
    userData.data.password,
    {
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1,
    },
  );
  if (!validPassword) {
    return {
      error: "Incorrect username or password",
    };
  }

  const session = await lucia.createSession(existingUser.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
  return redirect("/");
}
