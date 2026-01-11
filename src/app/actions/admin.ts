'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function getAdminStats() {
  const supabase = await createClient();

  const { count: usersCount } = await supabase.from('profiles').select('*', { count: 'exact', head: true });
  const { count: listingsCount } = await supabase.from('listings').select('*', { count: 'exact', head: true });
  const { data: payments } = await supabase.from('listing_promotions').select('amount_paid');
  
  const totalRevenue = payments?.reduce((acc, curr) => acc + (curr.amount_paid || 0), 0) || 0;

  return {
    usersCount: usersCount || 0,
    listingsCount: listingsCount || 0,
    revenue: totalRevenue
  };
}

export async function deleteListingAdmin(listingId: string) {
    const supabase = await createClient();
    const { error } = await supabase.from('listings').delete().eq('id', listingId);
    if (error) throw error;
    revalidatePath('/admin');
}
