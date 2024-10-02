import { AuthForm } from '@/app/(auth)/_components/auth-form';
import { validateRequest } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function SignUpPage() {
  const { user } = await validateRequest();
  if (user) return redirect('/');

  return (
    <div className="mx-auto grid min-h-[calc(100dvh-80px)] w-full items-center md:w-1/3">
      <div>
        <h1>Sign Up</h1>
        <AuthForm page="signup" />
      </div>
    </div>
  );
}
