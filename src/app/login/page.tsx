import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { validateRequest } from "@/lib/auth";
import { Form } from "@/lib/Form";
import { redirect } from "next/navigation";
import { login } from "../actions";

export default async function SignInPage() {
  const { user } = await validateRequest();
  if (user) {
    return redirect("/");
  }

  return (
    <>
      <h1>Login</h1>
      <Form action={login}>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input type="email" autoComplete="email" name="email" />
        </div>

        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            name="password"
            autoComplete="current-password"
          />
        </div>

        <Button>Sign In</Button>
      </Form>
    </>
  );
}
