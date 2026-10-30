-- Aucune annonce, aucun client, aucune coordonnée bancaire fictive.
begin;
insert into public.site_settings (id, footer_phone, payment_link, show_payment_link, viewing_fee)
values (1, '+31684130011', 'https://bunq.me/EtelaHorvathova', true, 50)
on conflict (id) do nothing;
insert into public.bank_settings (id, default_deposit_amount, show_on_confirmations) values (1, 0, false)
on conflict (id) do nothing;
insert into public.amenities (key, label_fr, icon) values
('wifi', 'Internet / Wi-Fi', 'Wifi'),
('elevator', 'Ascenseur', 'ArrowUpDown'),
('balcony', 'Balcon', 'Sun'),
('terrace', 'Terrasse', 'Sun'),
('parking', 'Parking', 'Car'),
('garage', 'Garage', 'Car'),
('garden', 'Jardin', 'Trees'),
('furnished', 'Meublé', 'Sofa'),
('washing-machine', 'Lave-linge', 'WashingMachine'),
('dishwasher', 'Lave-vaisselle', 'Utensils'),
('air-conditioning', 'Climatisation', 'Wind'),
('storage', 'Débarras', 'Archive')
on conflict (key) do nothing;
commit;
