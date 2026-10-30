import { config } from 'dotenv';
import { createClient } from '@supabase/supabase-js';
config({ path: '.env.local', quiet: true });
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error('Renseigner NEXT_PUBLIC_SUPABASE_URL et SUPABASE_SERVICE_ROLE_KEY dans .env.local.');
  process.exit(1);
}
const client = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
const buckets = [
  ['property-images', { public: true, fileSizeLimit: 10 * 1024 * 1024, allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/avif'] }],
  ['payment-proofs', { public: false, fileSizeLimit: 8 * 1024 * 1024, allowedMimeTypes: ['application/pdf', 'image/jpeg', 'image/png', 'image/webp'] }],
];
try {
  const { data: existing, error } = await client.storage.listBuckets();
  if (error) throw new Error('Impossible de lister les buckets Supabase. Vérifier les droits et la connexion.');
  for (const [name, options] of buckets) {
    const result = existing.some(bucket => bucket.id === name)
      ? await client.storage.updateBucket(name, options)
      : await client.storage.createBucket(name, options);
    if (result.error) throw new Error(`Configuration du bucket ${name} impossible.`);
    console.log(`Bucket configuré : ${name} (${options.public ? 'public' : 'privé'}).`);
  }
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
