import * as React from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, error, children, ...props }, ref) => {
    return (
      <div className="relative">
        <select
          ref={ref}
          className={cn(
            'h-12 w-full appearance-none rounded-xl border bg-sand-100/60 px-4 pr-9 text-sm text-ink',
            'shadow-inner shadow-emerald-950/[0.02] transition-all duration-200 focus:outline-none focus:ring-2 focus:bg-white focus:ring-sage/40 focus:border-emerald',
            error ? 'border-red-600' : 'border-ink-200',
            'disabled:bg-sand-100 disabled:cursor-not-allowed',
            className
          )}
          {...props}
        >
          {children}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
      </div>
    );
  }
);
Select.displayName = 'Select';
