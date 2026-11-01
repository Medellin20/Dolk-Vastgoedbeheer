import type { Metadata } from 'next';
import { LegalPage } from '@/components/shared/legal-page';

export const metadata: Metadata = { title: 'Juridische kennisgeving' };

export default function MentionsLegalesPage() {
  return (
    <LegalPage title="Juridische kennisgeving" updatedAt="30 oktober 2026">
      <h2>Website-uitgever</h2>
      <p>
        De website Dolk Vastgoedbeheer BV wordt uitgegeven door <strong>Dolk Vastgoedbeheer BV</strong>,
        een besloten vennootschap (BV), ingeschreven bij de Kamer van Koophandel onder nummer{' '}
        <strong>KvK 42139168</strong>.
      </p>
      <p>
        Type vestiging: Hoofdvestiging (hoofdkantoor).<br />
        Vestigingsnummer: 000066437288.<br />
        Vestigingsadres: Waterjufferpad 24, 1706 BW Heerhugowaard, Nederland.
      </p>

      <h2>Intellectueel eigendom</h2>
      <p>
        Alle inhoud op deze website (teksten, foto’s, logo en huisstijl) wordt beschermd door het
        auteursrecht. Elke reproductie, ook gedeeltelijk, is zonder voorafgaande toestemming verboden.
      </p>

      <h2>Aansprakelijkheid</h2>
      <p>
        Dolk Vastgoedbeheer BV doet haar best om de juistheid van de informatie op deze website te waarborgen,
        maar kan niet aansprakelijk worden gesteld voor fouten, weglatingen of tijdelijke onbeschikbaarheid.
      </p>

      <h2>Contact</h2>
      <p>Voor vragen over deze juridische kennisgeving kunt u contact opnemen via contacts@realestatenl.agency.</p>
    </LegalPage>
  );
}
