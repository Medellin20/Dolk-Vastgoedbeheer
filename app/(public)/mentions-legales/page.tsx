import type { Metadata } from 'next';
import { LegalPage } from '@/components/shared/legal-page';

export const metadata: Metadata = { title: 'Juridische kennisgeving' };

export default function MentionsLegalesPage() {
  return (
    <LegalPage title="Juridische kennisgeving" updatedAt="17 november 2026">
      <h2>Website-uitgever</h2>
      <p>
        De website Vastgoed Beheer B.V. wordt uitgegeven door <strong>Vastgoed Beheer B.V.</strong>,
        een besloten vennootschap (BV), ingeschreven bij de Kamer van Koophandel onder nummer{' '}
        <strong>KvK 83136851</strong>.
      </p>
      <p>
        Type vestiging: Hoofdvestiging (hoofdkantoor).<br />
        Vestigingsadres: Hijkerveld 164, 3085 PD Rotterdam, Nederland.
      </p>

      <h2>Intellectueel eigendom</h2>
      <p>
        Alle inhoud op deze website (teksten, foto’s, logo en huisstijl) wordt beschermd door het
        auteursrecht. Elke reproductie, ook gedeeltelijk, is zonder voorafgaande toestemming verboden.
      </p>

      <h2>Aansprakelijkheid</h2>
      <p>
        Vastgoed Beheer B.V. doet haar best om de juistheid van de informatie op deze website te waarborgen,
        maar kan niet aansprakelijk worden gesteld voor fouten, weglatingen of tijdelijke onbeschikbaarheid.
      </p>

      <h2>Contact</h2>
      <p>Voor vragen over deze juridische kennisgeving kunt u contact opnemen via Contacts@dolkvastgoednl.agency.</p>
    </LegalPage>
  );
}
