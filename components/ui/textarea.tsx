import * as React from 'react';
import { cn } from '@/lib/utils/cn';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          'w-full rounded-xl border bg-sand-100/60 px-4 py-3 text-sm text-ink placeholder:text-ink-400',
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
Textarea.displayName = 'Textarea';
