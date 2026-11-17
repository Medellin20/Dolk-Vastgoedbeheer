import Image from 'next/image';

/** The favicon is also the single source for the company logo mark. */
export function BrandIcon({ className = 'h-7 w-7' }: { className?: string }) {
  return <Image src="/icon.svg" alt="" width={48} height={48} unoptimized className={`shrink-0 ${className}`} />;
}
