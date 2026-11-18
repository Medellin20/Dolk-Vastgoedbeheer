import { dutchDisplay } from '@/lib/utils/dutch-display';
import { formatPrice, formatSurface } from '@/lib/utils/format';
import type { Property } from '@/types/database';
import type { PropertyInput } from '@/lib/validations/property';

type DescriptionSource = Pick<
  PropertyInput,
  | 'propertyType'
  | 'city'
  | 'neighborhood'
  | 'monthlyPrice'
  | 'serviceCharges'
  | 'depositAmount'
  | 'surfaceM2'
  | 'bedrooms'
  | 'bathrooms'
  | 'floor'
  | 'interiorType'
  | 'hasElevator'
  | 'hasBalcony'
  | 'hasTerrace'
  | 'hasParking'
  | 'hasGarage'
  | 'hasGarden'
  | 'availableFrom'
>;

const listFormatter = new Intl.ListFormat('nl-NL');

function formatAvailableDate(value: string) {
  const [year, month, day] = value.split('-').map(Number);
  if (!year || !month || !day) return null;
  return new Intl.DateTimeFormat('nl-NL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(Date.UTC(year, month - 1, day)));
}

export function generatePropertyDescription(source: DescriptionSource, amenityLabels: string[] = []) {
  const type = dutchDisplay(source.propertyType);
  const location = source.neighborhood?.trim()
    ? `in de wijk ${source.neighborhood.trim()} in ${source.city}`
    : `in ${source.city}`;
  const interior = dutchDisplay(source.interiorType).trim().toLocaleLowerCase('nl-NL');
  const rooms = [
    `${source.bedrooms} slaapkamer${source.bedrooms === 1 ? '' : 's'}`,
    `${source.bathrooms} badkamer${source.bathrooms === 1 ? '' : 's'}`,
  ];
  const floor = source.floor === undefined
    ? ''
    : source.floor === 0
      ? 'De woning ligt op de begane grond.'
      : `De woning ligt op de ${source.floor}e verdieping.`;
  const features = [
    source.hasElevator && 'een lift',
    source.hasBalcony && 'een balkon',
    source.hasTerrace && 'een terras',
    source.hasParking && 'parkeergelegenheid',
    source.hasGarage && 'een garage',
    source.hasGarden && 'een tuin',
    ...amenityLabels.map((label) => dutchDisplay(label).trim()),
  ].filter((value): value is string => Boolean(value));
  const availabilityDate = source.availableFrom ? formatAvailableDate(source.availableFrom) : null;

  return [
    `Ontdek een ${type} van ${formatSurface(source.surfaceM2)} ${location}.`,
    interior ? `De woning is ${interior}.` : '',
    `De woning heeft ${listFormatter.format(rooms)}.`,
    floor,
    features.length > 0 ? `Voorzieningen: ${listFormatter.format(features)}.` : '',
    availabilityDate ? `Beschikbaar vanaf ${availabilityDate}.` : '',
    `De maandelijkse huur bedraagt ${formatPrice(source.monthlyPrice)}.`,
    source.serviceCharges > 0 ? `De maandelijkse servicekosten bedragen ${formatPrice(source.serviceCharges)}.` : '',
    source.depositAmount > 0 ? `De waarborgsom bedraagt ${formatPrice(source.depositAmount)}.` : '',
  ].filter(Boolean).join(' ');
}

export function generatePropertyDescriptionFromProperty(property: Property, amenityLabels: string[] = []) {
  return generatePropertyDescription({
    propertyType: property.property_type,
    city: property.city,
    neighborhood: property.neighborhood ?? '',
    monthlyPrice: property.monthly_price,
    serviceCharges: property.service_charges,
    depositAmount: property.deposit_amount,
    surfaceM2: property.surface_m2,
    bedrooms: property.bedrooms,
    bathrooms: property.bathrooms,
    floor: property.floor ?? undefined,
    interiorType: property.interior_type,
    hasElevator: property.has_elevator,
    hasBalcony: property.has_balcony,
    hasTerrace: property.has_terrace,
    hasParking: property.has_parking,
    hasGarage: property.has_garage,
    hasGarden: property.has_garden,
    availableFrom: property.available_from ?? '',
  }, amenityLabels);
}
