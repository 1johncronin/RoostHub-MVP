'use server'

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createListing(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return { error: 'Unauthorized' };
  
  const title = formData.get('title') as string;
  const price = parseFloat(formData.get('price') as string);
  const description = formData.get('description') as string;
  const type = formData.get('type') as 'machine' | 'part' | 'gear' | 'storage';
  const location = formData.get('location') as string;
  const postal_code = formData.get('postal_code') as string;

  // Simple geocoding stub - in production, use Google Maps or Mapbox API
  let lat = null, lng = null;
  if (postal_code === '97701') { lat = 44.0582; lng = -121.3153; } // Bend, OR
  if (postal_code === '59715') { lat = 45.6770; lng = -111.0429; } // Bozeman, MT

  // 1. Insert Listing
  const { data: listing, error: listingError } = await supabase
    .from('listings')
    .insert({
      seller_id: user.id, // Use server-side verified ID
      title,
      price,
      description,
      type,
      location_name: location,
      postal_code,
      location_lat: lat,
      location_lng: lng,
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
    const yearStr = formData.get('year') as string;
    const make = formData.get('make') as string;
    const model = formData.get('model') as string;
    const vin = formData.get('vin') as string;
    const hoursStr = formData.get('hours') as string;
    const milesStr = formData.get('miles') as string;

    // Debug logging
    console.log('Machine form data:', { yearStr, make, model, vin, hoursStr, milesStr });

    // Validate required fields
    const year = parseInt(yearStr);
    if (!yearStr || isNaN(year)) {
      console.error('Invalid year:', yearStr);
      return { error: 'Year is required for machine listings' };
    }
    if (!make || make.trim() === '') {
      console.error('Invalid make:', make);
      return { error: 'Make/Brand is required for machine listings' };
    }
    if (!model || model.trim() === '') {
      console.error('Invalid model:', model);
      return { error: 'Model is required for machine listings' };
    }

    const hours = hoursStr ? parseFloat(hoursStr) : null;
    const mileage = milesStr ? parseFloat(milesStr) : null;

    const machineData = {
      listing_id: listing.id,
      year,
      make: make.trim(),
      model: model.trim(),
      vin: vin?.trim() || null,
      hours: hours && !isNaN(hours) ? hours : null,
      mileage: mileage && !isNaN(mileage) ? mileage : null
    };
    console.log('Inserting machine:', machineData);

    const { error: machineError } = await supabase
      .from('machines')
      .insert(machineData);

    if (machineError) {
       console.error('Machine error:', machineError);
       return { error: `Machine details failed: ${machineError.message}` };
    }
    console.log('Machine inserted successfully');
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
        return { error: `Storage details failed: ${storageError.message}` };
    }
  }

  revalidatePath('/marketplace');
  return { success: true, ...listing };
}

export async function updateListing(listingId: string, formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return { error: 'Unauthorized' };

  const title = formData.get('title') as string;
  const price = parseFloat(formData.get('price') as string);
  const description = formData.get('description') as string;
  const type = formData.get('type') as 'machine' | 'part' | 'gear' | 'storage';
  const location = formData.get('location') as string;
  const postal_code = formData.get('postal_code') as string;

  // Simple geocoding stub
  let lat = null, lng = null;
  if (postal_code === '97701') { lat = 44.0582; lng = -121.3153; }
  if (postal_code === '59715') { lat = 45.6770; lng = -111.0429; }

  // 1. Update Listing
  const { data: listing, error: listingError } = await supabase
    .from('listings')
    .update({
      title,
      price,
      description,
      type,
      location_name: location,
      postal_code,
      location_lat: lat,
      location_lng: lng,
      updated_at: new Date().toISOString()
    })
    .eq('id', listingId)
    .eq('seller_id', user.id)
    .select()
    .single();

  if (listingError) {
    console.error('Update error:', listingError);
    return { error: listingError.message };
  }

  // 2. Update Machine details if applicable
  if (type === 'machine') {
    const year = parseInt(formData.get('year') as string);
    const make = formData.get('make') as string;
    const model = formData.get('model') as string;
    const vin = formData.get('vin') as string;
    const hours = parseFloat(formData.get('hours') as string) || null;
    const mileage = parseFloat(formData.get('miles') as string) || null;

    await supabase
      .from('machines')
      .update({
        year,
        make,
        model,
        vin,
        hours,
        mileage
      })
      .eq('listing_id', listingId);
  }

  revalidatePath('/garage');
  revalidatePath('/marketplace');
  revalidatePath(`/listing/${listingId}`);
  return { success: true, ...listing };
}

export async function deleteListing(listingId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error('Unauthorized');

  const { error } = await supabase
    .from('listings')
    .delete()
    .eq('id', listingId)
    .eq('seller_id', user.id);

  if (error) throw error;

  revalidatePath('/garage');
  revalidatePath('/marketplace');
}

export async function markAsSold(listingId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error('Unauthorized');

  const { error } = await supabase
    .from('listings')
    .update({ status: 'sold' })
    .eq('id', listingId)
    .eq('seller_id', user.id);

  if (error) throw error;

  revalidatePath('/garage');
  revalidatePath('/marketplace');
}
