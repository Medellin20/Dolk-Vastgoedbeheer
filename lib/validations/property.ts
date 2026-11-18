import { z } from 'zod';

// Les champs numériques HTML vides renvoient une chaîne vide, pas undefined.
function optionalNumber(schema: z.ZodNumber) {
  return z.preprocess(
    (value) => typeof value === 'string' && value.trim() === '' ? undefined : value,
    schema.optional()
  );
}

export const propertySchema = z.object({
  title: z.string().trim().min(5, 'De titel moet minimaal 5 tekens bevatten.'),
  slug: z
    .string()
    .trim()
    .min(5, 'De URL-naam moet minimaal 5 tekens bevatten.')
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'De URL-naam mag alleen kleine letters, cijfers en koppeltekens bevatten.'),
  propertyType: z.enum(['appartement', 'studio', 'maison', 'chambre', 'loft', 'duplex'], { message: 'Kies een geldig woningtype.' }),

  address: z.string().trim().optional().or(z.literal('')),
  city: z.string().trim().min(2, 'Vul de stad van de woning in.'),
  postalCode: z.string().trim().optional().or(z.literal('')),
  neighborhood: z.string().trim().optional().or(z.literal('')),
  latitude: optionalNumber(z.coerce.number({ invalid_type_error: 'Vul een geldig getal in.' }).min(-90, 'De breedtegraad moet tussen -90 en 90 liggen.').max(90, 'De breedtegraad moet tussen -90 en 90 liggen.')),
  longitude: optionalNumber(z.coerce.number({ invalid_type_error: 'Vul een geldig getal in.' }).min(-180, 'De lengtegraad moet tussen -180 en 180 liggen.').max(180, 'De lengtegraad moet tussen -180 en 180 liggen.')),

  monthlyPrice: z.coerce.number({ invalid_type_error: 'Vul een geldig getal in.' }).positive('De maandprijs moet groter zijn dan nul.'),
  serviceCharges: z.coerce.number({ invalid_type_error: 'Vul een geldig getal in.' }).min(0, 'Vul een getal van nul of hoger in.').default(0),
  depositAmount: z.coerce.number({ invalid_type_error: 'Vul een geldig getal in.' }).min(0, 'Vul een getal van nul of hoger in.').default(0),

  surfaceM2: z.coerce.number({ invalid_type_error: 'Vul een geldig getal in.' }).positive('De oppervlakte moet groter zijn dan nul.'),
  bedrooms: z.coerce.number({ invalid_type_error: 'Vul een geldig getal in.' }).int('Vul een geheel getal in.').min(0, 'Vul een getal van nul of hoger in.'),
  bathrooms: z.coerce.number({ invalid_type_error: 'Vul een geldig getal in.' }).int('Vul een geheel getal in.').min(0, 'Vul een getal van nul of hoger in.'),
  rooms: optionalNumber(z.coerce.number({ invalid_type_error: 'Vul een geldig getal in.' }).int('Vul een geheel getal in.').min(0, 'Vul een getal van nul of hoger in.')),
  floor: optionalNumber(z.coerce.number({ invalid_type_error: 'Vul een geldig getal in.' }).int('Vul een geheel getal in.')),
  floorsCount: optionalNumber(z.coerce.number({ invalid_type_error: 'Vul een geldig getal in.' }).int('Vul een geheel getal in.').min(1, 'Vul een getal van één of hoger in.')),
  volumeM3: optionalNumber(z.coerce.number({ invalid_type_error: 'Vul een geldig getal in.' }).positive('Het volume moet groter zijn dan nul.')),
  contractType: z.string().trim().min(2, 'Kies een geldige optie voor contracttype.'),
  interiorType: z.string().trim().min(2, 'Kies een geldige optie voor interieurtype.'),
  maintenanceCondition: z.string().trim().min(2, 'Kies een geldige optie voor onderhoudstoestand.'),
  constructionType: z.string().trim().min(2, 'Kies een geldige optie voor bouwtype.'),
  constructionYear: optionalNumber(z.coerce.number({ invalid_type_error: 'Vul een geldig getal in.' }).int('Vul een geheel getal in.').min(1000, 'Vul een bouwjaar vanaf 1000 in.').max(2200, 'Vul een bouwjaar tot en met 2200 in.')),
  energyLabel: z.string().trim().optional().or(z.literal('')),

  hasElevator: z.boolean().default(false),
  hasBalcony: z.boolean().default(false),
  hasTerrace: z.boolean().default(false),
  hasParking: z.boolean().default(false),
  hasGarage: z.boolean().default(false),
  hasGarden: z.boolean().default(false),
  isFurnished: z.boolean().default(false),

  availableFrom: z.string().optional().or(z.literal('')),
  minimumStayMonths: z.coerce.number({ invalid_type_error: 'Vul een geldig getal in.' }).int('Vul een geheel getal in.').min(1, 'Vul een getal van één of hoger in.').default(12),

  status: z.enum(['draft', 'available', 'reserved', 'rented', 'unavailable'], { message: 'Kies een geldige woningstatus.' }),
  isPublished: z.boolean().default(false),
  isFeatured: z.boolean().default(false),

  amenityIds: z.array(z.string().uuid('Ongeldige voorziening.')).default([]),
});

export type PropertyInput = z.infer<typeof propertySchema>;
