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

async function setupStorage() {
  console.log('--- STORAGE DEBUG START ---');
  console.log('URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
  
  const { data: buckets, error: listError } = await supabase.storage.listBuckets();
  
  if (listError) {
    console.error('Error listing buckets:', listError);
    return;
  }

  console.log('Current Buckets:', buckets.map(b => b.name));

  const bucketExists = buckets.find(b => b.name === 'listing-media');

  if (!bucketExists) {
    console.log('Creating "listing-media" bucket...');
    const { data, error } = await supabase.storage.createBucket('listing-media', {
      public: true,
      allowedMimeTypes: ['image/*', 'video/*'],
      fileSizeLimit: 52428800
    });

    if (error) {
      console.error('Error creating bucket:', error);
    } else {
      console.log('Successfully created "listing-media" bucket.');
    }
  } else {
    console.log('"listing-media" bucket found.');
    // Ensure it's public
    if (!bucketExists.public) {
        console.log('Bucket is private. Updating to PUBLIC...');
        await supabase.storage.updateBucket('listing-media', { public: true });
    }
  }

  // Test Upload
  console.log('Testing upload...');
  const { data: testData, error: testError } = await supabase.storage
    .from('listing-media')
    .upload('test-connection.txt', 'Connection OK', { upsert: true });

  if (testError) {
    console.error('Upload Test FAILED:', testError);
  } else {
    console.log('Upload Test SUCCESSFUL:', testData.path);
  }
  
  console.log('--- STORAGE DEBUG END ---');
}

setupStorage();