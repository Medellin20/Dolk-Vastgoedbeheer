import { dutchDisplay } from '@/lib/utils/dutch-display';
import type { Property } from '@/types/database';
import { getSiteUrl } from '@/lib/utils/site-url';

type EmailDetails = Record<string, string | number | null | undefined>;

function formatPrice(value: number): string {
  return new Intl.NumberFormat('nl-NL', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(value);
}

function formatDate(value: string): string {
  const [year, month, day] = value.split('-').map(Number);

  if (!year || !month || !day) return value;

  return new Intl.DateTimeFormat('nl-NL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(Date.UTC(year, month - 1, day)));
}

/**
 * Transforme les caractéristiques d'un logement en lignes lisibles dans les
 * alertes e-mail administrateur.
 */
export function getPropertyEmailDetails(
  property: Property,
  amenityLabels: string[]
): EmailDetails {
  const address = [
    property.address,
    [property.postal_code, property.city].filter(Boolean).join(' '),
  ]
    .filter(Boolean)
    .join(', ');

  return {
    'Woning': property.title,
    'Link naar de woning': `${getSiteUrl()}/appartements/${property.slug}`,
    Type: dutchDisplay(property.property_type),
    'Adres': address || property.city,
    'Wijk': property.neighborhood,
    'Beschrijving': property.description || undefined,
    'Maandelijkse huur': formatPrice(property.monthly_price),
    'Maandelijkse servicekosten': formatPrice(property.service_charges),
    'Waarborgsom': formatPrice(property.deposit_amount),
    'Bezichtigingskosten': formatPrice(property.viewing_fee),
    'Oppervlakte': `${property.surface_m2} m²`,
    'Slaapkamers': property.bedrooms,
    'Badkamers': property.bathrooms,
    'Kamers': property.rooms,
    'Verdieping': property.floor === null ? undefined : property.floor === 0 ? 'Begane grond' : `${property.floor}e verdieping`,
    'Aantal verdiepingen': property.floors_count,
    Volume: property.volume_m3 === null ? undefined : `${property.volume_m3} m³`,
    'Contract': dutchDisplay(property.contract_type),
    'Interieur': dutchDisplay(property.interior_type),
    'Gemeubileerd': property.is_furnished ? 'Ja' : 'Nee',
    'Onderhoudstoestand': dutchDisplay(property.maintenance_condition),
    'Bouwtype': dutchDisplay(property.construction_type),
    'Bouwjaar': property.construction_year,
    'Energielabel': property.energy_label,
    'Lift': property.has_elevator ? 'Ja' : 'Nee',
    'Balkon': property.has_balcony ? 'Ja' : 'Nee',
    'Terras': property.has_terrace ? 'Ja' : 'Nee',
    'Parkeerplaats': property.has_parking ? 'Ja' : 'Nee',
    Garage: property.has_garage ? 'Ja' : 'Nee',
    'Tuin': property.has_garden ? 'Ja' : 'Nee',
    'Voorzieningen': amenityLabels.length > 0 ? amenityLabels.map(dutchDisplay).join(', ') : 'Niet opgegeven',
    'Beschikbaar vanaf': property.available_from
      ? formatDate(property.available_from)
      : 'In overleg',
    'Minimale huurperiode': property.minimum_stay_months
      ? `${property.minimum_stay_months} maanden`
      : undefined,
  };
}
