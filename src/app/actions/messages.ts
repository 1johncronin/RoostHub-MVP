'use server';

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export async function getOrCreateThread(listingId: string, sellerId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect('/login');
  if (user.id === sellerId) return { error: "You cannot message yourself." };

  // Check if thread already exists
  const { data: existingThread } = await supabase
    .from('message_threads')
    .select('id')
    .eq('listing_id', listingId)
    .eq('buyer_id', user.id)
    .single();

  if (existingThread) {
    redirect(`/messages/${existingThread.id}`);
  }

  // Create new thread
  const { data: newThread, error } = await supabase
    .from('message_threads')
    .insert({
      listing_id: listingId,
      buyer_id: user.id,
      seller_id: sellerId
    })
    .select()
    .single();

  if (error) {
    console.error('Thread creation error:', error);
    return { error: error.message };
  }

  redirect(`/messages/${newThread.id}`);
}
