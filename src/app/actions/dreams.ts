'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function addGarageDream(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return { error: 'Unauthorized' };

  const dream_make = formData.get('make') as string;
  const dream_model = formData.get('model') as string;
  const min_year = parseInt(formData.get('min_year') as string) || null;
  const max_price = parseFloat(formData.get('max_price') as string) || null;
  const geo_radius_km = parseInt(formData.get('radius') as string) || 100;

  const { error } = await supabase
    .from('garage_dreams')
    .insert({
      user_id: user.id,
      dream_make,
      dream_model,
      min_year,
      max_price,
      geo_radius_km
    });

  if (error) return { error: error.message };

  revalidatePath('/garage');
  return { success: true };
}

export async function removeGarageDream(dreamId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error('Unauthorized');

  const { error } = await supabase
    .from('garage_dreams')
    .delete()
    .eq('id', dreamId)
    .eq('user_id', user.id);

  if (error) throw error;

  revalidatePath('/garage');
}
