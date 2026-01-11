'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function addToGarage(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return { error: 'Unauthorized' };

  const year = parseInt(formData.get('year') as string);
  const make = formData.get('make') as string;
  const model = formData.get('model') as string;
  const category = formData.get('category') as string;
  const hours = parseFloat(formData.get('hours') as string) || 0;
  const vin = formData.get('vin') as string;

  const { data, error } = await supabase
    .from('garage_machines')
    .insert({
      owner_id: user.id,
      year,
      make,
      model,
      category,
      hours,
      vin
    })
    .select()
    .single();

  if (error) return { error: error.message };

  revalidatePath('/garage');
  return { success: true, data };
}

export async function removeFromGarage(machineId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error('Unauthorized');

  const { error } = await supabase
    .from('garage_machines')
    .delete()
    .eq('id', machineId)
    .eq('owner_id', user.id);

  if (error) throw error;

  revalidatePath('/garage');
}
