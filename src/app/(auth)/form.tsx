'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useActionState } from 'react';
import { ActionState, login, signup } from './actions';

type Props = {
  page: 'login' | 'signup';
};

export function AuthForm({ page }: Props) {
  const [state, action, pending] = useActionState<ActionState, FormData>(
    page === 'login' ? login : signup,
    {
      error: '',
    },
  );

  return (
    <>
      <form action={action} className="space-y-5 min-w-1/3">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            autoComplete="email"
            name="email"
            required
            placeholder="Enter your address"
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
