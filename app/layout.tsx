import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import { Toaster } from 'sonner';
import { MotionProvider } from '@/components/ui/motion-provider';
import './globals.css';
import { getSiteUrl } from '@/lib/utils/site-url';

const manrope = localFont({ src: '../public/fonts/manrope/latin.woff2', variable: '--font-manrope', display: 'swap', weight: '400 700' });
const cormorant = localFont({ src: [{ path: '../public/fonts/cormorant-garamond/latin.woff2', style: 'normal' }, { path: '../public/fonts/cormorant-garamond/latin-italic.woff2', style: 'italic' }], variable: '--font-cormorant', display: 'swap', weight: '400 700' });

const siteUrl = getSiteUrl();

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Vastgoed Beheer B.V. — Appartementen huren in Nederland',
    template: '%s | Vastgoed Beheer B.V.',
  },
  description:
    'Vastgoed Beheer B.V. begeleidt u bij het zoeken, bezichtigen en reserveren van huurappartementen in Nederland: Amsterdam, Rotterdam, Utrecht, Eindhoven, Den Haag en Groningen.',
  keywords: [
    'appartement huren Nederland',
    'appartement Amsterdam',
    'appartement huren Rotterdam',
    'huisvesting voor expats in Nederland',
    'Vastgoed Beheer B.V.',
  ],
  openGraph: {
    type: 'website',
    locale: 'nl_NL',
    siteName: 'Vastgoed Beheer B.V.',
    title: 'Vastgoed Beheer B.V. — Appartementen huren in Nederland',
    description:
      'Zoek, bezichtig en reserveer uw volgende woning in Nederland met vertrouwen.',
    url: siteUrl,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vastgoed Beheer B.V. — Appartementen huren in Nederland',
    description: 'Vind uw volgende woning in Nederland.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl" className={`${manrope.variable} ${cormorant.variable}`}>
      <body className="font-sans">
        <a href="#main-content" className="skip-link">Ga naar de inhoud</a>
        <MotionProvider>
        {children}
        <Toaster
          position="top-center"
          richColors
          toastOptions={{
            style: {
              fontFamily: 'inherit', borderRadius: '14px', border: '1px solid #DFEBE3',
            },
          }}
        />
        </MotionProvider>
      </body>
    </html>
  );
}
