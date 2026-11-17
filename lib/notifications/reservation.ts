import 'server-only';

import { createAdminClient } from '@/lib/supabase/admin';
import { sendAdminAlert } from '@/lib/notifications/email';
import { getPropertyEmailDetails } from '@/lib/notifications/property-details';

/**
 * Relit la réservation et son client dans la base avant d'envoyer l'alerte.
 * L'e-mail contient donc uniquement les données qui ont été effectivement
 * enregistrées, à destination de l'adresse configurée dans ALERT_EMAIL.
 */
export async function notifyAdminOfReservation(
  reservationId: string
): Promise<{ sent: boolean }> {
  const supabase = createAdminClient();

  const { data: reservation, error: reservationError } = await supabase
    .from('reservations')
    .select('*')
    .eq('id', reservationId)
    .maybeSingle();

  if (reservationError || !reservation) {
    console.error('RESERVATION EMAIL DATA ERROR:', reservationError);
    return { sent: false };
  }

  const [{ data: client, error: clientError }, { data: property, error: propertyError }] =
    await Promise.all([
      supabase.from('clients').select('*').eq('id', reservation.client_id).maybeSingle(),
      supabase.from('properties').select('*').eq('id', reservation.property_id).maybeSingle(),
    ]);

  if (clientError || propertyError || !client || !property) {
    console.error('RESERVATION EMAIL RELATED DATA ERROR:', {
      clientError,
      propertyError,
      reservationId,
    });
    return { sent: false };
  }

  const result = await sendAdminAlert(
    `Nieuw reserveringsdossier — ${reservation.reference}`,
    {
      'Referentie': reservation.reference,
      ...getPropertyEmailDetails(
        property,
        await getAmenityLabels(property.id)
      ),
      'Reserveringskosten (50% van de huur)': `${property.monthly_price / 2} €`,
      'Klant': `${client.first_name} ${client.last_name}`,
      Email: client.email,
      'Telefoon': client.phone,
      'Gewenste datum': reservation.desired_move_in_date,
      'Huurperiode': `${reservation.duration_months} maanden`,
      'Bewoners': reservation.occupants_count,
      'Huisdieren': reservation.has_pets ? 'Ja' : 'Nee',
      'Arbeidscontract': reservation.employment_contract,
      'Maandelijks inkomen': reservation.monthly_income === null ? undefined : `${reservation.monthly_income} €`,
      'Plaats van herkomst': reservation.origin_city,
      'Bericht': reservation.message,
    }
  );

  return { sent: result.sent };
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
