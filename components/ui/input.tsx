import * as React from 'react';
import { cn } from '@/lib/utils/cn';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          'h-12 w-full rounded-xl border bg-sand-100/60 px-4 text-sm text-ink placeholder:text-ink-400',
          'shadow-inner shadow-emerald-950/[0.02] transition-all duration-200 focus:outline-none focus:ring-2 focus:bg-white focus:ring-sage/40 focus:border-emerald',
          error ? 'border-red-600' : 'border-ink-200',
          'disabled:bg-sand-100 disabled:cursor-not-allowed',
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';
