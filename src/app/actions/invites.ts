'use server';

import { createClient } from '@/lib/supabase/server';
import { sendEmail } from '@/lib/email';
import { nanoid } from 'nanoid';

import { headers } from 'next/headers';

export async function sendInvite(recipientEmail: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return { error: 'Unauthorized' };

  // 1. Check Daily Limit
  const { data: profile } = await supabase.from('profiles').select('daily_invites_sent, last_invite_sent_at').eq('id', user.id).single();
  
  const dailyLimit = 5;
  const lastSent = profile?.last_invite_sent_at ? new Date(profile.last_invite_sent_at) : new Date(0);
  const isNewDay = lastSent.toDateString() !== new Date().toDateString();
  const sentToday = isNewDay ? 0 : (profile?.daily_invites_sent || 0);

  if (sentToday >= dailyLimit) {
    return { error: { message: `Daily limit reached! Your 5 invites will refill tomorrow.` } };
  }

  const host = (await headers()).get('host');
  const protocol = host?.includes('localhost') ? 'http' : 'https';
  const origin = `${protocol}://${host}`;

  // 2. Get or create invite code for user
  let { data: inviteCode } = await supabase
    .from('invite_codes')
    .select('id, code')
    .eq('owner_id', user.id)
    .single();

  if (!inviteCode) {
    const newCode = `ROOST-${nanoid(6).toUpperCase()}`;
    const { data: created } = await supabase
        .from('invite_codes')
        .insert({ code: newCode, owner_id: user.id })
        .select()
        .single();
    inviteCode = created;
  }

  // 3. Log the invite
  await supabase.from('viral_invites').insert({
    invite_code_id: (inviteCode as any).id,
    inviter_id: user.id,
    invitee_email: recipientEmail
  });

  // 4. Update Daily Count
  await supabase.from('profiles').update({
    daily_invites_sent: sentToday + 1,
    last_invite_sent_at: new Date().toISOString()
  }).eq('id', user.id);

  // 5. Send Email via Resend
  const inviteLink = `${origin}/login?invite=${inviteCode?.code || ''}`;
  const result = await sendEmail({
    to: recipientEmail,
    subject: `You've been invited to RoostHub! 🏁`,
    text: `Your friend has invited you to join the premier motorsports marketplace. \n\nJoin now and get a free listing boost: ${inviteLink}`,
  });

  return result || { success: true };
}
