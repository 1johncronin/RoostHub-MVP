'use server'

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createListing(formData: FormData) {
  const supabase = await createClient();
  
  const userId = formData.get('userId') as string;
  const title = formData.get('title') as string;
  const price = parseFloat(formData.get('price') as string);
  const description = formData.get('description') as string;
  const type = formData.get('type') as 'machine' | 'part' | 'gear' | 'storage';
  const location = formData.get('location') as string;

  // 1. Insert Listing
  const { data: listing, error: listingError } = await supabase
    .from('listings')
    .insert({
      seller_id: userId,
      title,
      price,
      description,
      type,
      location_name: location,
      status: 'active'
    })
    .select()
    .single();

  if (listingError) {
    console.error('Listing error:', listingError);
    return { error: listingError.message };
  }

  // 2. Insert Machine details if applicable
  if (type === 'machine') {
    const year = parseInt(formData.get('year') as string);
    const make = formData.get('make') as string;
    const model = formData.get('model') as string;
    const hours = parseFloat(formData.get('hours') as string) || null;
    const mileage = parseFloat(formData.get('miles') as string) || null;

    const { error: machineError } = await supabase
      .from('machines')
      .insert({
        listing_id: listing.id,
        year,
        make,
        model,
        hours,
        mileage
      });

    if (machineError) {
       console.error('Machine error:', machineError);
    }
  }

  if (type === 'storage') {
    const space_type = formData.get('space_type') as string;
    const access_type = formData.get('access_type') as string;

    const { error: storageError } = await supabase
      .from('storage_spaces')
      .insert({
        listing_id: listing.id,
        space_type,
        access_type
      });

    if (storageError) {
        console.error('Storage space error:', storageError);
    }
  }

  revalidatePath('/marketplace');
  redirect(`/marketplace`); // Redirect to feed
}
