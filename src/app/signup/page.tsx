import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";
import { signup } from "../actions";
import { Form } from "@/lib/Form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default async function SignUpPage() {
  const { user } = await validateRequest();
  if (user) return redirect("/");

  return (
    <Form action={signup}>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input type="email" autoComplete="email" name="email" />
      </div>

      <div>
        <Label htmlFor="password">Password</Label>
        <Input type="password" name="password" autoComplete="new-password" />
      </div>

      <Button>Sign Up</Button>
    </Form>
  );
}
