import * as React from 'react';
import { cn } from '@/lib/utils/cn';

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center rounded-2xl border border-emerald/10 bg-white shadow-soft px-6 py-16 text-center',
        className
      )}
    >
      {icon && <div className="mb-5 rounded-2xl border border-champagne/30 bg-champagne/10 p-4 text-emerald">{icon}</div>}
      <h3 className="text-lg font-semibold text-emerald">{title}</h3>
      {description && <p className="mt-1.5 max-w-sm text-sm text-ink-400">{description}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
