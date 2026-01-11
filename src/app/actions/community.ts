'use server';

import { createClient } from '@/lib/supabase/server';

export async function submitCommunityTip(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const category = formData.get('category') as string;
  const tip = formData.get('tip') as string;
  const authorNote = formData.get('author_note') as string;

  if (!tip || tip.length < 20) {
    return { error: 'Tip must be at least 20 characters' };
  }

  if (tip.length > 500) {
    return { error: 'Tip must be under 500 characters' };
  }

  const { error } = await supabase.from('community_tips').insert({
    user_id: user?.id || null,
    category,
    tip,
    author_note: authorNote || 'Anonymous Rider',
    status: 'pending', // pending, approved, rejected
  });

  if (error) {
    console.error('Error submitting tip:', error);
    return { error: 'Failed to submit tip. Please try again.' };
  }

  return { success: true };
}

export async function getApprovedTips(limit: number = 20) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('community_tips')
    .select('*')
    .eq('status', 'approved')
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching tips:', error);
    return [];
  }

  return data || [];
}

export async function getTipsByCategory(category: string, limit: number = 10) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('community_tips')
    .select('*')
    .eq('status', 'approved')
    .eq('category', category)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching tips:', error);
    return [];
  }

  return data || [];
}

// Admin function to approve/reject tips
export async function moderateTip(tipId: string, status: 'approved' | 'rejected') {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: 'Unauthorized' };
  }

  // Check if user is admin (you'd implement proper admin check)
  const { data: profile } = await supabase
    .from('profiles')
    .select('is_admin')
    .eq('id', user.id)
    .single();

  if (!profile?.is_admin) {
    return { error: 'Unauthorized' };
  }

  const { error } = await supabase
    .from('community_tips')
    .update({ status })
    .eq('id', tipId);

  if (error) {
    return { error: 'Failed to update tip' };
  }

  return { success: true };
}
