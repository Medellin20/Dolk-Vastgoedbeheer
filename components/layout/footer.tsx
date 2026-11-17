import Link from 'next/link';
import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react';
import { BrandIcon } from '@/components/shared/brand-icon';
import { getSiteSettings } from '@/lib/data/site-settings';

const navigation = [
  { href: '/', label: 'Home' },
  { href: '/appartements', label: 'Woningaanbod' },
  { href: '/comment-ca-marche', label: 'Hoe werkt het' },
  { href: '/a-propos', label: 'Over ons' },
  { href: '/contact', label: 'Contact' },
  { href: '/faq', label: 'Veelgestelde vragen' },
];
const legal = [
  { href: '/mentions-legales', label: 'Juridische informatie' },
  { href: '/confidentialite', label: 'Privacyverklaring' },
  { href: '/conditions-generales', label: 'Algemene voorwaarden' },
];

export async function Footer() {
  const settings = await getSiteSettings();
  return (
    <footer className="bg-emerald-950 text-sand-200">
      <div className="container-app flex flex-col items-start justify-between gap-6 border-b border-white/15 py-12 sm:flex-row sm:items-center">
        <div><p className="editorial-label text-champagne">Een nieuwe stap begint met een gesprek</p><p className="mt-3 font-display text-4xl text-sand-100 sm:text-5xl">Waar wilt u wonen?</p></div>
        <Link href="/contact" className="inline-flex min-h-12 items-center gap-5 rounded-md border border-champagne/60 px-6 py-3 text-sm font-semibold text-champagne transition hover:bg-champagne hover:text-ink-900">Neem contact op <ArrowUpRight className="h-4 w-4" /></Link>
      </div>
      <div className="container-app grid min-w-0 gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_1fr_1.2fr]">
        <div className="min-w-0">
          <Link href="/" className="inline-flex items-center gap-3" aria-label="Vastgoed Beheer B.V. — Home"><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-sand-100"><BrandIcon className="h-8 w-8" /></span><span className="font-display text-2xl text-white">Vastgoed Beheer B.V.</span></Link>
          <p className="mt-5 max-w-xs text-sm leading-7 text-sand-300">Woningen in Nederland. Persoonlijke aandacht, duidelijke informatie en ruimte voor uw volgende hoofdstuk.</p>
          <p className="mt-5 text-xs tracking-wide text-champagne">Gevestigd in Rotterdam · KvK 83136851</p>
        </div>
        <div><h2 className="editorial-label text-champagne">Ontdek</h2><ul className="mt-5 space-y-3">{navigation.map(link => <li key={link.href}><Link href={link.href} className="text-sm text-sand-300 transition hover:text-white">{link.label}</Link></li>)}</ul></div>
        <div><h2 className="editorial-label text-champagne">Goed om te weten</h2><ul className="mt-5 space-y-3">{legal.map(link => <li key={link.href}><Link href={link.href} className="text-sm text-sand-300 transition hover:text-white">{link.label}</Link></li>)}</ul></div>
        <div className="min-w-0"><h2 className="editorial-label text-champagne">Ons kantoor</h2><address className="mt-5 space-y-4 text-sm not-italic text-sand-300">
          <p className="flex items-start gap-3"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-champagne" /><span>Hijkerveld 164<br />3085 PD Rotterdam<br />Nederland</span></p>
          <a href="mailto:contacts@vastgoedbeheernl.agency" className="flex min-w-0 items-start gap-3 hover:text-white"><Mail className="mt-0.5 h-4 w-4 shrink-0 text-champagne" /><span className="min-w-0 break-all">contacts@vastgoedbeheernl.agency</span></a>
          <a href={`tel:${settings.footer_phone.replace(/[^\d+]/g, '')}`} className="flex items-center gap-3 hover:text-white"><Phone className="h-4 w-4 shrink-0 text-champagne" /><span className="break-all">{settings.footer_phone}</span></a>
        </address></div>
      </div>
      <div className="border-t border-white/10"><div className="container-app flex flex-col justify-between gap-3 py-6 text-xs leading-relaxed text-sand-400 sm:flex-row"><p>© {new Date().getFullYear()} Vastgoed Beheer B.V. Alle rechten voorbehouden.</p><p>Besloten vennootschap · Rotterdam, Nederland</p></div></div>
    </footer>
  );
}
