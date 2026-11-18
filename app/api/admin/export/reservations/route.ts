import { NextResponse, type NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { isValidAdminSessionToken } from '@/lib/auth/admin-session';
import { dutchDisplay } from '@/lib/utils/dutch-display';
import { ADMIN_SESSION_COOKIE, RESERVATION_STATUS_LABELS } from '@/lib/utils/constants';
import { createAdminClient } from '@/lib/supabase/admin';

function escapeCsvValue(value: unknown): string {
  const str = value === null || value === undefined ? '' : String(value);
  if (/[",\n]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export async function GET(_request: NextRequest) {
  const token = cookies().get(ADMIN_SESSION_COOKIE)?.value;
  const isAuthenticated = await isValidAdminSessionToken(token);

  if (!isAuthenticated) {
    return NextResponse.json({ error: 'Niet toegestaan' }, { status: 401 });
  }

  const supabase = createAdminClient();
  const { data: reservations, error } = await supabase
    .from('reservations')
    .select('*, properties(title, city), clients(first_name, last_name, email, phone)')
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: 'De gegevens konden niet worden geladen.' }, { status: 500 });
  }

  const headers = [
    'Referentie',
    'Woning',
    'Plaats',
    'Klant',
    'E-mail',
    'Telefoon',
    'Gewenste intrekdatum',
    'Huurperiode (maanden)',
    'Bewoners',
    'Huisdieren',
    'Arbeidscontract',
    'Maandelijks inkomen',
    'Status',
    'Aangemaakt op',
  ];

  const rows = (reservations ?? []).map((r) => [
    r.reference,
    r.properties?.title,
    r.properties?.city,
    `${r.clients?.first_name} ${r.clients?.last_name}`,
    r.clients?.email,
    r.clients?.phone,
    r.desired_move_in_date,
    r.duration_months,
    r.occupants_count,
    r.has_pets ? 'Ja' : 'Nee',
    r.employment_contract ? dutchDisplay(r.employment_contract) : '',
    r.monthly_income,
    RESERVATION_STATUS_LABELS[r.status] ?? r.status,
    r.created_at,
  ]);

  const csv = [headers, ...rows].map((row) => row.map(escapeCsvValue).join(',')).join('\n');
  const bom = '\uFEFF'; // BOM pour un affichage correct des accents dans Excel

  return new NextResponse(bom + csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="reserveringen-${new Date().toISOString().split('T')[0]}.csv"`,
    },
  });
}
