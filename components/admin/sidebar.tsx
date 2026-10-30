'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Building2,
  PlusCircle,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  Home,
  Landmark,
  RefreshCcw,
  ShieldCheck,
  CalendarDays,
  FileText,
  ArrowUpRight,
} from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { logoutAdmin } from '@/actions/admin-auth';

const NAV_ITEMS = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/admin/appartements', label: 'Appartementen', icon: Building2 },
  { href: '/admin/appartements/nouveau', label: 'Woning toevoegen', icon: PlusCircle },
  { href: '/admin/visites', label: 'Bezichtigingen', icon: CalendarDays },
  { href: '/admin/reservations', label: 'Reserveringen', icon: FileText },
  { href: '/admin/garanties', label: 'Waarborgen', icon: ShieldCheck },
  { href: '/admin/remboursements', label: 'Terugbetalingen', icon: RefreshCcw },
  { href: '/admin/clients', label: 'Klanten', icon: Users },
  { href: '/admin/configuration-bancaire', label: 'Bankgegevens', icon: Landmark },
  { href: '/admin/parametres', label: 'Instellingen', icon: Settings },
];

function NavLinks({ pathname, onNavigate }: { pathname: string; onNavigate?: () => void }) {
  return (
    <nav className="flex flex-1 flex-col gap-1.5 overflow-y-auto px-4 py-6">
      <p className="mb-3 px-3 text-[9px] font-semibold uppercase tracking-[0.2em] text-sage">Portfolio & beheer</p>
      {NAV_ITEMS.map((item) => {
        const isActive = item.exact ? pathname === item.href : item.href === '/admin/appartements' ? pathname.startsWith(item.href) && !pathname.endsWith('/nouveau') : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            aria-current={isActive ? 'page' : undefined}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              'flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors',
              isActive ? 'border border-champagne/25 bg-champagne/15 text-champagne shadow-soft' : 'border border-transparent text-sand-300 hover:bg-white/5 hover:text-white'
            )}
          >
            <item.icon className="h-4.5 w-4.5 shrink-0" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

export function AdminSidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  React.useEffect(() => {
    if (!mobileOpen) return;
    const close = (event: KeyboardEvent) => { if (event.key === 'Escape') setMobileOpen(false); };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [mobileOpen]);

  return (
    <>
      {/* Sidebar desktop */}
      <aside className="hidden h-screen w-72 shrink-0 flex-col border-r border-white/10 bg-emerald-950 lg:sticky lg:top-0 lg:flex">
        <SidebarHeader />
        <NavLinks pathname={pathname} />
        <LogoutSection />
      </aside>

      {/* Topbar mobile */}
      <div className="sticky top-0 z-40 flex w-full items-center justify-between border-b border-ink-100 bg-white/95 px-4 py-3 backdrop-blur lg:hidden">
        <Link href="/admin" className="flex min-w-0 items-center gap-2">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald text-champagne">
            <Home className="h-4 w-4" />
          </span>
          <span className="min-w-0 text-sm font-extrabold leading-snug text-ink-900">Dolk Real Estate Management BV</span>
        </Link>
        <button
          onClick={() => setMobileOpen(true)}
          className="shrink-0 rounded-lg p-2 text-ink-700"
          aria-label="Beheermenu openen"
          aria-expanded={mobileOpen}
        >
          <Menu className="h-5.5 w-5.5" />
        </button>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="absolute inset-0 bg-ink-950/60" onClick={() => setMobileOpen(false)} />
          <div className="relative flex h-full w-[min(18rem,calc(100vw-2rem))] flex-col bg-emerald-950 shadow-2xl">
            <div className="flex items-center justify-between px-5 py-4">
              <SidebarHeader compact />
              <button
                onClick={() => setMobileOpen(false)}
                className="rounded-lg p-1.5 text-sand-300 hover:bg-white/10"
                aria-label="Menu sluiten"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <NavLinks pathname={pathname} onNavigate={() => setMobileOpen(false)} />
            <LogoutSection />
          </div>
        </div>
      )}
    </>
  );
}

function SidebarHeader({ compact }: { compact?: boolean }) {
  return (
    <Link href="/admin" className={cn('flex items-center gap-2', !compact && 'border-b border-white/10 px-6 py-7')}>
      <span className="flex h-9 w-9 items-center justify-center rounded-t-2xl border border-champagne/40 bg-champagne/10">
        <Home className="h-4.5 w-4.5 text-champagne" />
      </span>
      <div>
        <p className="font-display text-lg text-white">Dolk Real Estate Management BV</p>
        <p className="mt-1 text-[9px] font-medium uppercase tracking-[0.18em] text-champagne">Private workspace</p>
      </div>
    </Link>
  );
}

function LogoutSection() {
  return (
    <div className="border-t border-white/10 p-4">
      <Link href="/" className="mb-3 flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-4 text-xs text-sand-200">Naar de website <ArrowUpRight className="h-4 w-4 text-champagne" /></Link>
      <form action={logoutAdmin}>
        <button
          type="submit"
          className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-sand-300 transition-colors hover:bg-white/5 hover:text-white"
        >
          <LogOut className="h-4.5 w-4.5" />
          Uitloggen
        </button>
      </form>
    </div>
  );
}
