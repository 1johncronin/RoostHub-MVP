import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function makeAdmin(email) {
  try {
    console.log(`🚀 Searching for user with email: ${email}...`);
    
    const { data: userData, error: userError } = await supabase
      .from('profiles')
      .select('id')
      .eq('id', (await supabase.auth.admin.listUsers()).data.users.find(u => u.email === email)?.id)
      .single();

    if (!userData) throw new Error('User not found in profiles.');

    const { error: updateError } = await supabase
      .from('profiles')
      .update({ role: 'admin' })
      .eq('id', userData.id);

    if (updateError) throw updateError;

    console.log(`✅ Success! ${email} is now an admin.`);

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

const email = process.argv[2];
if (!email) {
  console.log('Please provide an email: node scripts/make-admin.mjs your@email.com');
} else {
  makeAdmin(email);
}
