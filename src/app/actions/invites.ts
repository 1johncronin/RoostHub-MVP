'use server';

import { createClient } from '@/lib/supabase/server';
import { sendEmail } from '@/lib/email';
import { nanoid } from 'nanoid';

import { headers } from 'next/headers';

export async function sendInvite(recipientEmail: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return { error: 'Unauthorized' };

  const host = (await headers()).get('host');
  const protocol = host?.includes('localhost') ? 'http' : 'https';
  const origin = `${protocol}://${host}`;

  // ... (keep invite code logic) ...
  let { data: inviteCode } = await supabase
    .from('invite_codes')
    .select('code')
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

  // 2. Log the invite
  await supabase.from('viral_invites').insert({
    invite_code_id: (inviteCode as any).id,
    inviter_id: user.id,
    invitee_email: recipientEmail
  });

  // 3. Send Email via Resend
  const inviteLink = `${origin}/login?invite=${inviteCode?.code || ''}`;
  const result = await sendEmail({
    to: recipientEmail,
    subject: `You've been invited to RoostHub! 🏁`,
    text: `Your friend has invited you to join the premier motorsports marketplace. \n\nJoin now and get a free listing boost: ${inviteLink}`,
  });

  return result || { success: true };
}
