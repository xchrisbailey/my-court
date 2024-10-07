'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useActionState } from 'react';
import { AuthActionState, login, signup } from '../actions';

type Props = {
  page: 'login' | 'signup';
};

export function AuthForm({ page }: Props) {
  const [state, action, pending] = useActionState<AuthActionState, FormData>(
    page === 'login' ? login : signup,
    {
      error: '',
    },
  );

  return (
    <>
      <form action={action} className="space-y-5 min-w-1/3" aria-label="form">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            autoComplete="email"
            name="email"
            required
            placeholder="Enter your address"
            aria-label="Email"
          />
          {state.errors?.email && <p>{state.errors.email[0]}</p>}
        </div>

        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            name="password"
            autoComplete="current-password"
            minLength={6}
            required
            placeholder="Enter your password"
            aria-label="Password"
          />
          {state.errors?.password && <p>{state.errors.password[0]}</p>}
        </div>

        {state?.error && (
          <div className="text-sm text-red-500">{state.error}</div>
        )}

        <Button disabled={pending}>
          {pending ? 'loading...' : page === 'login' ? 'login' : 'signup'}
        </Button>
      </form>
    </>
  );
}
