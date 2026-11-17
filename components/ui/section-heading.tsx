import { cn } from '@/lib/utils/cn';

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}) {
  return (
    <div className={cn(align === 'center' && 'text-center', className)}>
      {eyebrow && (
        <span className="text-eyebrow uppercase text-canal-600">{eyebrow}</span>
      )}
      <h2 className="mt-3 font-display text-[2.5rem] leading-[1.05] text-ink-900 sm:text-[3.5rem]">{title}</h2>
      {description && (
        <p className={cn('mt-3 max-w-2xl text-ink-500', align === 'center' && 'mx-auto')}>
          {description}
        </p>
      )}
    </div>
  );
}
