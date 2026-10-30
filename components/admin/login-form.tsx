'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { Lock } from 'lucide-react';
import { loginAdmin, type AdminLoginState } from '@/actions/admin-auth';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

const initialState: AdminLoginState = { success: false, message: '' };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" size="lg" isLoading={pending}>
      Se connecter
    </Button>
  );
}

export function AdminLoginForm() {
  const [state, formAction] = useFormState(loginAdmin, initialState);

  return (
    <form action={formAction} className="space-y-5">
      <div>
        <Label htmlFor="password" className="text-ink-600">
          Mot de passe administrateur
        </Label>
        <Input
          id="password"
          name="password"
          type="password"
          required
          autoFocus
          autoComplete="current-password"
          className="border-emerald/20 bg-sand-100 text-ink-900 placeholder:text-ink-400 focus:border-emerald"
        />
      </div>

      {state.message && !state.success && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{state.message}</p>
      )}

      <SubmitButton />
    </form>
  );
}
