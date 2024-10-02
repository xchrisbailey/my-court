import { AuthForm } from '@/app/(auth)/_components/auth-form';
import { validateRequest } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function SignInPage() {
  const { user } = await validateRequest();
  if (user) {
    return redirect('/');
  }

  return (
    <div className="grid items-center mx-auto w-full md:w-1/3">
      <div>
        <h1>Login</h1>
        <AuthForm page="login" />
      </div>
    </div>
  );
}
