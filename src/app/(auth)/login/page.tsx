import { validateRequest } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { AuthForm } from '../form';

export default async function SignInPage() {
  const { user } = await validateRequest();
  if (user) {
    return redirect('/');
  }

  return (
    <div className="mx-auto grid min-h-[calc(100dvh-80px)] w-full items-center md:w-1/3">
      <div>
        <h1 className="mb-4 text-5xl font-bold">Login</h1>
        <AuthForm page="login" />
      </div>
    </div>
  );
}
