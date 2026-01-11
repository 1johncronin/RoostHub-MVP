'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function updateProfile(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return { error: 'Unauthorized' };

  const full_name = formData.get('full_name') as string;
  const username = formData.get('username') as string;
  const avatar_url = formData.get('avatar_url') as string;
  const city = formData.get('city') as string;
  const state = formData.get('state') as string;
  const postal_code = formData.get('postal_code') as string;
  const country = formData.get('country') as string;

  const { error } = await supabase
    .from('profiles')
    .update({
      full_name,
      username,
      avatar_url,
      city,
      state,
      postal_code,
      country,
      updated_at: new Date().toISOString()
    })
    .eq('id', user.id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/garage');
  revalidatePath('/garage/settings');
  return { success: true };
}
