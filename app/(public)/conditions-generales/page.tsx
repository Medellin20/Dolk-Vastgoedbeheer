import type { Metadata } from 'next';
import { LegalPage } from '@/components/shared/legal-page';

export const metadata: Metadata = { title: 'Algemene voorwaarden' };

export default function ConditionsGeneralesPage() {
  return (
    <LegalPage title="Algemene gebruiksvoorwaarden" updatedAt="21 augustus 2026">
      <h2>Objet</h2>
      <p>
        Deze algemene voorwaarden regelen het gebruik van de website Dolk Vastgoedbeheer BV en de diensten
        voor het tot stand brengen van contacten voor de verhuur van appartementen in Nederland.
      </p>

      <h2>Bezichtigingsaanvragen</h2>
      <p>
        Voor het versturen van een bezichtigingsaanvraag via de website is geen betaling nodig. Het
        gewenste tijdstip is onder voorbehoud van bevestiging door Dolk Vastgoedbeheer BV, dat contact
        opneemt met de klant om de afspraak te organiseren.
      </p>

      <h2>Reserveringsaanvragen</h2>
      <p>
        Het versturen van een reserveringsaanvraag betekent geen definitieve aanvaarding en vereist
        geen betaling op de website. Dolk Vastgoedbeheer BV beoordeelt het dossier, deelt de beslissing mee
        en regelt eventuele vervolgstappen rechtstreeks met de klant.
      </p>

      <h2>Aansprakelijkheid</h2>
      <p>
        Dolk Vastgoedbeheer BV treedt op als tussenpersoon tussen huurders en eigenaren of beheerders. Het
        definitieve huurcontract wordt rechtstreeks gesloten tussen de huurder en de verhuurder van
        de betreffende woning.
      </p>

      <h2>Toepasselijk recht</h2>
      <p>Op deze algemene voorwaarden is Nederlands recht van toepassing.</p>
    </LegalPage>
  );
}
