import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";
import { AuthForm } from "../form";

export default async function SignUpPage() {
  const { user } = await validateRequest();
  if (user) return redirect("/");

  return (
    <div className="grid items-center mx-auto w-full md:w-1/3 min-h-[calc(100dvh-80px)]">
      <div>
        <h1 className="mb-4 text-5xl font-bold">Sign Up</h1>
        <AuthForm page="signup" />
      </div>
    </div>
  );
}
