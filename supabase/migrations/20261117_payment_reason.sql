-- Apply to existing databases before saving the new payment reason.
begin;
alter table public.site_settings
  add column if not exists payment_reason text not null default ''
  check (char_length(payment_reason) <= 140);
commit;
