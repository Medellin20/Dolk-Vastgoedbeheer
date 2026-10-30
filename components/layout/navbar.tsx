'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Building2, CircleHelp, Home, Info, Mail, Menu, User, Workflow, X } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

const NAV_LINKS = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/appartements', label: 'Appartementen', icon: Building2 },
  { href: '/comment-ca-marche', label: 'Hoe werkt het', icon: Workflow },
  { href: '/a-propos', label: 'Over ons', icon: Info },
  { href: '/contact', label: 'Contact', icon: Mail },
];
const MENU_LINKS = [...NAV_LINKS, { href: '/faq', label: 'Veelgestelde vragen', icon: CircleHelp }, { href: '/mon-compte', label: 'Mijn account', icon: User }];
const isActive = (path: string, href: string) => href === '/' ? path === '/' : path === href || path.startsWith(`${href}/`);

export function Navbar() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = React.useState(false);
  const toggleRef = React.useRef<HTMLButtonElement>(null);
  const menuRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => { setOpen(false); }, [pathname]);
  React.useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setOpen(false); toggleRef.current?.focus(); }
    };
    const clickOutside = (event: PointerEvent) => {
      if (!menuRef.current?.contains(event.target as Node) && !toggleRef.current?.contains(event.target as Node)) setOpen(false);
    };
    window.addEventListener('keydown', close);
    document.addEventListener('pointerdown', clickOutside);
    return () => { window.removeEventListener('keydown', close); document.removeEventListener('pointerdown', clickOutside); };
  }, [open]);
  return (
    <header className="sticky top-0 z-50 border-b border-emerald/10 bg-sand-100/95 backdrop-blur-xl">
      <div className="hidden border-b border-emerald/10 bg-emerald px-4 py-2 text-center text-[10px] font-medium uppercase tracking-[0.22em] text-sand-200 sm:block">
        Dolk Real Estate Management BV <span className="mx-3 text-champagne">/</span> Uw volgende hoofdstuk begint hier
      </div>
      <nav aria-label="Hoofdnavigatie" className="container-app flex h-20 items-center justify-between gap-4">
        <Link href="/" className="flex min-w-0 items-center gap-2 sm:gap-3" aria-label="Dolk Real Estate Management BV — Home">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center sm:h-11 sm:w-11 rounded-t-2xl border border-champagne bg-emerald text-champagne"><Building2 className="h-6 w-6" strokeWidth={1.3} /></span>
          <span className="flex min-w-0 flex-col"><span className="font-display text-2xl leading-none text-emerald">Dolk</span><span className="mt-1 max-w-[12rem] text-[9px] font-semibold uppercase leading-relaxed tracking-[0.1em] text-ink-500">Real Estate Management BV</span></span>
        </Link>
        <div className="hidden items-center gap-1 xl:flex">
          {NAV_LINKS.map(link => <Link key={link.href} href={link.href} aria-current={isActive(pathname, link.href) ? 'page' : undefined} className={cn('rounded-lg px-3 py-2 text-sm font-medium transition-colors', isActive(pathname, link.href) ? 'bg-emerald/5 text-emerald' : 'text-ink-500 hover:text-emerald hover:bg-white')}>{link.label}</Link>)}
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <Link href="/mon-compte" aria-label="Mijn account" className="hidden rounded-full border border-emerald/15 p-3 text-emerald transition hover:bg-white sm:inline-flex"><User className="h-4 w-4" /></Link>
          <Link href="/appartements" className="hidden items-center gap-3 rounded-xl bg-champagne px-5 py-3 text-sm font-semibold text-ink-900 transition hover:bg-champagne-300 md:inline-flex">Bekijk woningen <ArrowUpRight className="h-4 w-4" /></Link>
          <button ref={toggleRef} type="button" aria-expanded={open} aria-controls="navigation-menu" aria-label={open ? 'Menu sluiten' : 'Menu openen'} onClick={() => setOpen(!open)} className="flex h-10 w-10 shrink-0 items-center justify-center sm:h-11 sm:w-11 rounded-xl border border-emerald/20 text-emerald hover:bg-white">{open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>
        </div>
      </nav>
      <AnimatePresence>
        {open && <motion.div ref={menuRef} id="navigation-menu" initial={reduceMotion ? false : { opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: reduceMotion ? 0 : 0.2 }} className="absolute inset-x-0 top-full max-h-[calc(100dvh-7.5rem)] overflow-y-auto border-b border-champagne/40 bg-sand-100 shadow-lifted">
          <div className="container-app grid gap-2 py-6 sm:grid-cols-2 lg:grid-cols-3">
            {MENU_LINKS.map(link => <Link key={link.href} href={link.href} onClick={() => setOpen(false)} aria-current={isActive(pathname, link.href) ? 'page' : undefined} className={cn('flex items-center gap-4 rounded-xl border p-4 transition', isActive(pathname, link.href) ? 'border-emerald bg-emerald text-white' : 'border-emerald/10 bg-white text-emerald hover:border-champagne')}><link.icon className="h-5 w-5 shrink-0" strokeWidth={1.5} /><span className="flex-1 text-sm font-semibold">{link.label}</span><ArrowUpRight className="h-4 w-4 text-champagne" /></Link>)}
          </div>
        </motion.div>}
      </AnimatePresence>
    </header>
  );
}
