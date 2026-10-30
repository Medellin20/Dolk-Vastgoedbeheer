import Link from 'next/link';
import { Facebook, Home, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { getSiteSettings } from '@/lib/data/site-settings';

const COLUMN_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/appartements', label: 'Appartementen' },
  { href: '/comment-ca-marche', label: 'Hoe werkt het' },
  { href: '/a-propos', label: 'Over ons' },
  { href: '/contact', label: 'Contact' },
  { href: '/faq', label: 'FAQ' },
];

const LEGAL_LINKS = [
  { href: '/mentions-legales', label: 'Juridische kennisgeving' },
  { href: '/confidentialite', label: 'Privacy' },
  { href: '/conditions-generales', label: 'Algemene voorwaarden' },
];

export async function Footer() {
  const [year, settings] = await Promise.all([
    Promise.resolve(new Date().getFullYear()),
    getSiteSettings(),
  ]);

  return (
    <footer className="border-t-4 border-champagne bg-emerald-950 text-sand-200">
      <div className="container-app grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        <div>
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-champagne/10">
              <Home className="h-4.5 w-4.5 text-white" strokeWidth={2.25} />
            </span>
            <span className="font-display text-xl font-medium tracking-tight text-white">
              Dolk Real Estate Management BV
            </span>
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-sand-300">
            Uw betrouwbare agentschap voor het huren van appartementen in Nederland — van de
            zoektocht tot de verhuizing.
          </p>
          <div className="mt-5 flex items-center gap-3">
            <a
              href="#"
              aria-label="Facebook"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/5 text-sand-200 transition-colors hover:bg-white/15 hover:text-white"
            >
              <Facebook className="h-4 w-4" />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/5 text-sand-200 transition-colors hover:bg-white/15 hover:text-white"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/5 text-sand-200 transition-colors hover:bg-white/15 hover:text-white"
            >
              <Linkedin className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-eyebrow uppercase text-champagne">Navigatie</h3>
          <ul className="mt-4 space-y-2.5">
            {COLUMN_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-sand-300 transition-colors hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-eyebrow uppercase text-champagne">Juridische informatie</h3>
          <ul className="mt-4 space-y-2.5">
            {LEGAL_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-sand-300 transition-colors hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-eyebrow uppercase text-champagne">Contact</h3>
          <ul className="mt-4 space-y-3">
            <li>
              <a
                href="mailto:contacts@realestatenl.agency"
                className="flex min-w-0 items-center gap-2.5 break-all text-sm text-sand-300 transition-colors hover:text-white"
              >
                <Mail className="h-4 w-4 shrink-0" />
                contacts@realestatenl.agency
              </a>
            </li>
            <li>
              <a
                href={`tel:${settings.footer_phone.replace(/[^\d+]/g, '')}`}
                className="flex min-w-0 items-center gap-2.5 break-all text-sm text-sand-300 transition-colors hover:text-white"
              >
                <Phone className="h-4 w-4 shrink-0" />
                {settings.footer_phone}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-app grid gap-4 py-5 text-xs leading-relaxed text-sand-400 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start">
          <div className="flex min-w-0 gap-2.5">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-sand-300" />
            <p>
              <span className="font-semibold text-sand-200">Dolk Real Estate Management BV</span> · Besloten vennootschap (BV) · Hoofdvestiging ·
              Waterjufferpad 24, 1706 BW Heerhugowaard, Nederland
            </p>
          </div>
          <p className="sm:text-right">KvK 42139168 · Vestigingsnummer 000066437288</p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-app flex flex-col items-center justify-between gap-3 py-5 text-xs text-sand-400 sm:flex-row">
          <p>© {year} Dolk Real Estate Management BV. Alle rechten voorbehouden.</p>
          <p>Appartementen huren in Nederland</p>
        </div>
      </div>
    </footer>
  );
}
