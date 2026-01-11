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

  const { error } = await supabase
    .from('profiles')
    .update({
      full_name,
      username,
      avatar_url,
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
