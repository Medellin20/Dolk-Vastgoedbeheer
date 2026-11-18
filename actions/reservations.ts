'use server';

import { dutchDisplay } from '@/lib/utils/dutch-display';
import { createAdminClient } from '@/lib/supabase/admin';
import {
  reservationSchema,
  type ReservationInput,
} from '@/lib/validations/reservation';
import { sendAdminAlert } from '@/lib/notifications/email';
import { getPropertyEmailDetails } from '@/lib/notifications/property-details';
import { getSiteSettings } from '@/lib/data/site-settings';
import type { ActionResult } from '@/types';

/**
 * Transmet le formulaire de réservation à l'agence.
 * Cette action n'enregistre ni client ni réservation : son seul effet est
 * l'envoi de l'e-mail à l'adresse définie dans ALERT_EMAIL.
 */
export async function createReservation(
  input: ReservationInput
): Promise<ActionResult> {
  const parsed = reservationSchema.safeParse(input);

  if (!parsed.success) {
    return {
      success: false,
      message: 'Corrigeer de gemarkeerde velden.',
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const supabase = createAdminClient();
  const { data: property, error: propertyError } = await supabase
    .from('properties')
    .select('*')
    .eq('id', parsed.data.propertyId)
    .maybeSingle();

  if (propertyError || !property || !property.is_published) {
    console.error('RESERVATION PAYMENT PROPERTY ERROR:', propertyError);
    return {
      success: false,
      message: 'Deze woning is niet meer beschikbaar.',
    };
  }

  const [amenityLabels, siteSettings] = await Promise.all([
    getAmenityLabels(property.id),
    getSiteSettings(),
  ]);

  const emailResult = await sendAdminAlert(
    `Nieuwe reserveringsaanvraag — ${property.title}`,
    {
      ...getPropertyEmailDetails(
        property,
        amenityLabels
      ),
      'Reserveringskosten (50% van de huur)': `${property.monthly_price / 2} €`,
      'Betaallink': siteSettings.payment_link,
      'Klant': `${parsed.data.firstName} ${parsed.data.lastName}`,
      Email: parsed.data.email,
      'Telefoon': parsed.data.phone,
      'Gewenste datum': parsed.data.desiredMoveInDate,
      'Huurperiode': `${parsed.data.durationMonths} maanden`,
      'Bewoners': parsed.data.occupantsCount,
      'Huisdieren': parsed.data.hasPets ? 'Ja' : 'Nee',
      'Arbeidscontract': dutchDisplay(parsed.data.employmentContract),
      'Maandelijks inkomen': `${parsed.data.monthlyIncome} €`,
      'Plaats van herkomst': parsed.data.originCity,
      'Bericht': parsed.data.message || undefined,
    }
  );

  if (!emailResult.sent) {
    console.error('RESERVATION PAYMENT EMAIL FAILED:', emailResult.reason);
    return {
      success: false,
      message: 'De e-mail kon niet worden verzonden. Probeer het opnieuw.',
    };
  }

  return {
    success: true,
    message: 'U ontvangt een e-mailmelding.',
  };
}

async function getAmenityLabels(propertyId: string): Promise<string[]> {
  const supabase = createAdminClient();
  const { data } = await supabase
    .from('property_amenities')
    .select('amenities(label_fr)')
    .eq('property_id', propertyId);

  return (data ?? [])
    .map((item) => item.amenities?.label_fr)
    .filter((label): label is string => Boolean(label));
}
