import { useSession } from '@/lib/auth/context';
import { redirect } from 'next/navigation';
import { AuthForm } from '../form';

export default async function SignUpPage() {
  const session = useSession();
  if (session.user) return redirect('/');

  return (
    <div className="mx-auto grid min-h-[calc(100dvh-80px)] w-full items-center md:w-1/3">
      <div>
        <h1 className="mb-4 text-5xl font-bold">Sign Up</h1>
        <AuthForm page="signup" />
      </div>
    </div>
  );
}
