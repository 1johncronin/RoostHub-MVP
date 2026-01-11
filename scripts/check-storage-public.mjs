import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function checkPublic() {
  console.log('Checking buckets as ANON user...');
  const { data, error } = await supabase.storage.listBuckets();
  if (error) {
    console.error('ANON bucket list FAILED:', error.message);
  } else {
    console.log('ANON visible buckets:', data.map(b => b.name));
  }
}

checkPublic();
