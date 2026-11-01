import type { Metadata, Viewport } from 'next';
import { Toaster } from 'sonner';
import { MotionProvider } from '@/components/ui/motion-provider';
import './globals.css';
import { getSiteUrl } from '@/lib/utils/site-url';

const siteUrl = getSiteUrl();

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Dolk Vastgoedbeheer BV — Appartementen huren in Nederland',
    template: '%s | Dolk Vastgoedbeheer BV',
  },
  description:
    'Dolk Vastgoedbeheer BV begeleidt u bij het zoeken, bezichtigen en reserveren van huurappartementen in Nederland: Amsterdam, Rotterdam, Utrecht, Eindhoven, Den Haag en Groningen.',
  keywords: [
    'appartement huren Nederland',
    'appartement Amsterdam',
    'appartement huren Rotterdam',
    'huisvesting voor expats in Nederland',
    'Dolk Vastgoedbeheer BV',
  ],
  openGraph: {
    type: 'website',
    locale: 'nl_NL',
    siteName: 'Dolk Vastgoedbeheer BV',
    title: 'Dolk Vastgoedbeheer BV — Appartementen huren in Nederland',
    description:
      'Zoek, bezichtig en reserveer uw volgende woning in Nederland met vertrouwen.',
    url: siteUrl,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dolk Vastgoedbeheer BV — Appartementen huren in Nederland',
    description: 'Vind uw volgende woning in Nederland.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl">
      <body className="font-sans">
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
