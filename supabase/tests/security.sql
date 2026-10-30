-- À exécuter avec psql / SQL Editor comme propriétaire, après installation.
-- Les fixtures sont annulées à la fin.
begin;
insert into public.properties (id, slug, title, description, city, monthly_price, surface_m2, property_type, is_published)
values ('00000000-0000-4000-8000-000000000001', 'test-public', 'Test public', '', 'Test', 100, 20, 'studio', true),
('00000000-0000-4000-8000-000000000002', 'test-draft', 'Test privé', '', 'Test', 100, 20, 'studio', false);
insert into public.property_images (property_id, storage_path, url, is_primary)
values ('00000000-0000-4000-8000-000000000001', 'test/1.jpg', 'https://example.invalid/1.jpg', true),
('00000000-0000-4000-8000-000000000001', 'test/2.jpg', 'https://example.invalid/2.jpg', true),
('00000000-0000-4000-8000-000000000002', 'test/3.jpg', 'https://example.invalid/3.jpg', true);
do $$ begin
  if (select count(*) from public.property_images where property_id = '00000000-0000-4000-8000-000000000001' and is_primary) <> 1 then
    raise exception 'Plusieurs images principales';
  end if;
end $$;
set local role anon;
do $$ begin
  if (select count(*) from public.properties where slug in ('test-public', 'test-draft')) <> 1 then
    raise exception 'RLS catalogue incorrecte';
  end if;
  if (select count(*) from public.property_images where storage_path like 'test/%') <> 2 then
    raise exception 'Images privées exposées';
  end if;
  begin
    perform * from public.clients;
    raise exception 'Clients exposés';
  exception when insufficient_privilege then null; end;
  begin
    update public.site_settings set viewing_fee = 0 where id = 1;
    raise exception 'Paramètres modifiables';
  exception when insufficient_privilege then null; end;
  begin
    delete from public.properties where slug = 'test-public';
    raise exception 'Suppression publique autorisée';
  exception when insufficient_privilege then null; end;
  begin
    insert into public.contact_messages (name, email, subject, message) values ('Test', 'test@example.invalid', 'test', 'test');
    raise exception 'Insertion directe autorisée';
  exception when insufficient_privilege then null; end;
end $$;
set local role authenticated;
do $$ begin
  if exists(select 1 from public.properties where slug = 'test-draft') then
    raise exception 'Compte Auth voit les brouillons';
  end if;
  begin
    perform * from public.bank_settings;
    raise exception 'Banque exposée aux comptes Auth';
  exception when insufficient_privilege then null; end;
end $$;
reset role;
-- Contrôle systématique des privilèges sur les 17 tables et les deux rôles.
do $$ declare t text; r text; op text; begin
  foreach t in array array['clients','properties','property_images','amenities','property_amenities','viewing_requests','reservations','request_submissions','guarantee_payments','refund_requests','bank_settings','contact_messages','admin_logs','status_history','favorites','site_settings'] loop
    if not (select relrowsecurity from pg_class where oid = ('public.' || t)::regclass) then
      raise exception 'RLS absente : %', t;
    end if;
    foreach r in array array['anon','authenticated'] loop
      foreach op in array array['INSERT','UPDATE','DELETE','TRUNCATE'] loop
        if has_table_privilege(r, 'public.' || t, op) then raise exception 'Droit excessif % % %', r,t,op; end if;
      end loop;
      if t <> all(array['properties','property_images','amenities','property_amenities','site_settings']) and has_table_privilege(r,'public.' || t,'SELECT') then
        raise exception 'Lecture privée autorisée : % %',r,t;
      end if;
    end loop;
  end loop;
end $$;
set local role service_role;
do $$ begin
  if (select count(*) from public.properties where slug in ('test-public', 'test-draft')) <> 2 then
    raise exception 'Accès serveur incomplet';
  end if;
end $$;
reset role;
rollback;
