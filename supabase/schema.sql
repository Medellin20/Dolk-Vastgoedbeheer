-- Installation initiale uniquement, sur un projet Supabase vide.
-- Les changements futurs doivent utiliser des migrations distinctes.
begin;

create type public.property_status as enum ('draft', 'available', 'reserved', 'rented', 'unavailable');

create type public.property_type as enum ('appartement', 'studio', 'maison', 'chambre', 'loft', 'duplex');

create type public.viewing_status as enum ('pending', 'payment_pending', 'paid', 'confirmed', 'cancelled', 'completed');

create type public.reservation_status as enum ('submitted', 'under_review', 'accepted', 'rejected', 'awaiting_guarantee', 'guarantee_paid', 'confirmed', 'cancelled');

create type public.guarantee_status as enum ('awaiting_payment', 'payment_declared', 'payment_received', 'reservation_confirmed', 'refund_requested', 'refund_processing', 'refunded', 'cancelled');

create type public.refund_status as enum ('requested', 'approved', 'processing', 'refunded', 'rejected');

create type public.contact_status as enum ('new', 'in_progress', 'closed');

create table public.clients (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid references auth.users(id) on delete set null,
  first_name text not null,
  last_name text not null,
  email text not null unique,
  phone text,
  profession text,
  monthly_income numeric(12,2) check (monthly_income >= 0),
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index clients_auth_user_id_idx on public.clients (auth_user_id);

alter table public.clients enable row level security;

create table public.properties (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text not null,
  property_type property_type not null,
  address text,
  city text not null,
  postal_code text,
  neighborhood text,
  latitude double precision,
  longitude double precision,
  monthly_price numeric(12,2) not null check (monthly_price >= 0),
  service_charges numeric(12,2) not null default 0 check (service_charges >= 0),
  deposit_amount numeric(12,2) not null default 0 check (deposit_amount >= 0),
  viewing_fee numeric(12,2) not null default 50 check (viewing_fee >= 0),
  surface_m2 numeric(12,2) not null check (surface_m2 >= 0),
  bedrooms integer not null default 0 check (bedrooms >= 0),
  bathrooms integer not null default 0 check (bathrooms >= 0),
  rooms integer check (rooms >= 0),
  floor integer,
  floors_count integer check (floors_count >= 0),
  volume_m3 numeric(12,2) check (volume_m3 >= 0),
  contract_type text not null default 'Onbepaalde tijd',
  interior_type text not null default 'Ongemeubileerd',
  maintenance_condition text not null default 'Goed',
  construction_type text not null default 'Bestaande bouw',
  construction_year integer check (construction_year >= 0),
  energy_label text,
  has_elevator boolean not null default false,
  has_balcony boolean not null default false,
  has_terrace boolean not null default false,
  has_parking boolean not null default false,
  has_garage boolean not null default false,
  has_garden boolean not null default false,
  is_furnished boolean not null default false,
  available_from date,
  minimum_stay_months integer check (minimum_stay_months >= 0),
  status property_status not null default 'draft',
  is_published boolean not null default false,
  is_featured boolean not null default false,
  view_count integer not null default 0 check (view_count >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (latitude between -90 and 90),
  check (longitude between -180 and 180),
  check (monthly_price > 0 and surface_m2 > 0)
);

alter table public.properties enable row level security;

create table public.property_images (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references public.properties(id) on delete cascade,
  storage_path text not null,
  url text not null,
  alt_text text,
  is_primary boolean not null default false,
  sort_order integer not null default 0 check (sort_order >= 0),
  created_at timestamptz not null default now()
);

create index property_images_property_id_idx on public.property_images (property_id);

alter table public.property_images enable row level security;

create table public.amenities (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  label_fr text not null,
  icon text
);

create table public.property_amenities (
  property_id uuid not null references public.properties(id) on delete cascade,
  amenity_id uuid not null references public.amenities(id) on delete cascade,
  primary key (property_id, amenity_id)
);

alter table public.amenities enable row level security;

create table public.viewing_requests (
  id uuid primary key default gen_random_uuid(),
  reference text not null unique,
  property_id uuid not null references public.properties(id) on delete restrict,
  client_id uuid not null references public.clients(id) on delete restrict,
  requested_date date not null,
  requested_time_slot text not null,
  status viewing_status not null default 'pending',
  fee_amount numeric(12,2) not null check (fee_amount >= 0),
  stripe_checkout_session_id text,
  stripe_payment_intent_id text,
  paid_at timestamptz,
  admin_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index viewing_requests_property_id_idx on public.viewing_requests (property_id);

create index viewing_requests_client_id_idx on public.viewing_requests (client_id);

create index viewing_requests_stripe_checkout_session_id_idx on public.viewing_requests (stripe_checkout_session_id);

alter table public.viewing_requests enable row level security;

create table public.reservations (
  id uuid primary key default gen_random_uuid(),
  reference text not null unique,
  property_id uuid not null references public.properties(id) on delete restrict,
  client_id uuid not null references public.clients(id) on delete restrict,
  desired_move_in_date date not null,
  duration_months integer not null default 12 check (duration_months >= 0),
  occupants_count integer not null default 1 check (occupants_count >= 0),
  has_pets boolean not null default false,
  profession text,
  monthly_income numeric(12,2) check (monthly_income >= 0),
  employment_contract text,
  origin_city text,
  message text,
  status reservation_status not null default 'submitted',
  admin_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index reservations_property_id_idx on public.reservations (property_id);

create index reservations_client_id_idx on public.reservations (client_id);

alter table public.reservations enable row level security;

create table public.request_submissions (
  id uuid primary key default gen_random_uuid(),
  request_type text check (request_type in ('viewing', 'reservation_payment')) not null,
  source_id uuid not null,
  reference text not null unique,
  property_id uuid not null references public.properties(id) on delete restrict,
  client_id uuid not null references public.clients(id) on delete restrict,
  form_data jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  unique (request_type, source_id),
  check (jsonb_typeof(form_data) = 'object')
);

create index request_submissions_property_id_idx on public.request_submissions (property_id);

create index request_submissions_client_id_idx on public.request_submissions (client_id);

alter table public.request_submissions enable row level security;

create table public.guarantee_payments (
  id uuid primary key default gen_random_uuid(),
  reference text not null unique,
  reservation_id uuid not null references public.reservations(id) on delete restrict,
  client_id uuid not null references public.clients(id) on delete restrict,
  amount numeric(12,2) not null check (amount >= 0),
  status guarantee_status not null default 'awaiting_payment',
  declared_transfer_date date,
  declared_bank_name text,
  declared_reference text,
  proof_storage_path text,
  validated_at timestamptz,
  validated_by uuid,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index guarantee_payments_reservation_id_idx on public.guarantee_payments (reservation_id);

create index guarantee_payments_client_id_idx on public.guarantee_payments (client_id);

alter table public.guarantee_payments enable row level security;

create table public.refund_requests (
  id uuid primary key default gen_random_uuid(),
  reference text not null unique,
  guarantee_payment_id uuid not null references public.guarantee_payments(id) on delete restrict,
  reservation_id uuid not null references public.reservations(id) on delete restrict,
  client_id uuid not null references public.clients(id) on delete restrict,
  amount numeric(12,2) not null check (amount >= 0),
  reason text,
  status refund_status not null default 'requested',
  requested_at timestamptz not null default now(),
  processed_at timestamptz,
  admin_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index refund_requests_guarantee_payment_id_idx on public.refund_requests (guarantee_payment_id);

create index refund_requests_reservation_id_idx on public.refund_requests (reservation_id);

create index refund_requests_client_id_idx on public.refund_requests (client_id);

alter table public.refund_requests enable row level security;

create table public.bank_settings (
  id integer primary key check (id = 1) default 1,
  beneficiary_name text not null default '',
  iban text not null default '',
  bic text not null default '',
  bank_name text not null default '',
  payment_instructions text not null default '',
  default_deposit_amount numeric(12,2) not null check (default_deposit_amount >= 0),
  show_on_confirmations boolean not null default false,
  updated_at timestamptz not null default now()
);

alter table public.bank_settings enable row level security;

create table public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  subject text not null,
  message text not null,
  status contact_status not null default 'new',
  created_at timestamptz not null default now()
);

alter table public.contact_messages enable row level security;

create table public.admin_logs (
  id uuid primary key default gen_random_uuid(),
  actor text not null default 'admin',
  action text not null,
  entity_type text,
  entity_id uuid,
  details jsonb,
  created_at timestamptz not null default now()
);

alter table public.admin_logs enable row level security;

create table public.status_history (
  id uuid primary key default gen_random_uuid(),
  entity_type text not null,
  entity_id uuid not null,
  from_status text,
  to_status text not null,
  changed_by text not null default 'system',
  note text,
  created_at timestamptz not null default now()
);

alter table public.status_history enable row level security;

create table public.favorites (
  id uuid primary key default gen_random_uuid(),
  session_id text not null,
  property_id uuid not null references public.properties(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (session_id, property_id)
);

create index favorites_property_id_idx on public.favorites (property_id);

alter table public.favorites enable row level security;

create table public.site_settings (
  id integer primary key check (id = 1) default 1,
  footer_phone text not null default '',
  payment_link text not null default '',
  show_payment_link boolean not null default false,
  viewing_fee numeric(12,2) not null default 50 check (viewing_fee >= 0),
  updated_at timestamptz not null default now()
);

alter table public.site_settings enable row level security;

alter table public.property_amenities enable row level security;
create index property_amenities_amenity_idx on public.property_amenities (amenity_id);

create index properties_catalogue_idx on public.properties (city, monthly_price) where is_published;
create index property_images_order_idx on public.property_images (property_id, sort_order);
create index status_history_entity_idx on public.status_history (entity_type, entity_id, created_at);
create index request_submissions_created_idx on public.request_submissions (created_at desc);
create index reservations_status_idx on public.reservations (status, created_at desc);
create index viewing_requests_status_idx on public.viewing_requests (status, created_at desc);
create function public.touch_updated_at() returns trigger language plpgsql set search_path = '' as $$
begin
  new.updated_at = now();
  return new;
end;
$$;
revoke all on function public.touch_updated_at() from public;
-- Sérialise le changement d'image principale pour un même logement.
create function public.set_primary_property_image() returns trigger language plpgsql set search_path = '' as $$
begin
  if new.is_primary then
    perform 1 from public.properties where id = new.property_id for update;
    update public.property_images set is_primary = false
      where property_id = new.property_id and id <> new.id and is_primary;
  end if;
  return new;
end;
$$;
revoke all on function public.set_primary_property_image() from public;
create trigger property_image_primary before insert or update of is_primary on public.property_images
for each row execute function public.set_primary_property_image();

create trigger clients_updated_at before update on public.clients for each row execute function public.touch_updated_at();

create trigger properties_updated_at before update on public.properties for each row execute function public.touch_updated_at();

create trigger viewing_requests_updated_at before update on public.viewing_requests for each row execute function public.touch_updated_at();

create trigger reservations_updated_at before update on public.reservations for each row execute function public.touch_updated_at();

create trigger guarantee_payments_updated_at before update on public.guarantee_payments for each row execute function public.touch_updated_at();

create trigger refund_requests_updated_at before update on public.refund_requests for each row execute function public.touch_updated_at();

create trigger bank_settings_updated_at before update on public.bank_settings for each row execute function public.touch_updated_at();

create trigger site_settings_updated_at before update on public.site_settings for each row execute function public.touch_updated_at();

commit;
