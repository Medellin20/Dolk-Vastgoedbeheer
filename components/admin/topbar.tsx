'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUpRight, ChevronRight, ShieldCheck } from 'lucide-react';

const LABELS: Record<string, string> = {
  appartements: 'Appartementen', nouveau: 'Nieuwe woning', visites: 'Bezichtigingen',
  reservations: 'Reserveringen', garanties: 'Waarborgen', remboursements: 'Terugbetalingen',
  clients: 'Klanten', parametres: 'Instellingen', 'configuration-bancaire': 'Bankgegevens',
};
export function AdminTopbar() {
  const segments = usePathname().split('/').filter(Boolean).slice(1);
  return (
    <header className="flex min-h-20 flex-wrap items-center justify-between gap-3 border-b border-emerald/10 bg-white/80 px-4 py-4 backdrop-blur sm:px-6 lg:px-8">
      <nav aria-label="Broodkruimel" className="flex min-w-0 items-center gap-2 text-xs text-ink-400">
        <Link href="/admin" className="font-semibold text-emerald">Workspace</Link>
        <ChevronRight className="h-3 w-3 shrink-0" />
        <span className="truncate text-ink-600">{segments.length ? LABELS[segments[segments.length - 1]] ?? 'Woning bewerken' : 'Dashboard'}</span>
      </nav>
      <div className="flex items-center gap-4">
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-semibold text-emerald hover:underline">Website bekijken <ArrowUpRight className="h-3.5 w-3.5" /></Link>
        <span className="hidden items-center gap-2 border-l border-emerald/10 pl-4 text-xs text-ink-500 sm:inline-flex"><ShieldCheck className="h-4 w-4 text-emerald" /> Beheerder</span>
        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-champagne/50 bg-champagne/15 font-display text-emerald">D</span>
      </div>
    </header>
  );
}
