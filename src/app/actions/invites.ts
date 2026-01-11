'use server';

import { createClient } from '@/lib/supabase/server';
import { sendEmail } from '@/lib/email';
import { nanoid } from 'nanoid';

export async function sendInvite(recipientEmail: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return { error: 'Unauthorized' };

  // 1. Get or create invite code for user
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
    const inviteLink = `https://roosthub.vercel.app/login?invite=${inviteCode?.code || ''}`;
    await sendEmail({
    to: recipientEmail,
    subject: `You've been invited to RoostHub! 🏁`,
    text: `Your friend has invited you to join the premier motorsports marketplace. \n\nJoin now and get a free listing boost: ${inviteLink}`,
  });

  return { success: true };
}
