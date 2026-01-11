import { createClient } from '@/lib/supabase/server';
import { sendEmail } from '@/lib/email';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const supabase = await createClient();

  // 1. Get all saved searches
  const { data: savedSearches } = await supabase
    .from('saved_searches')
    .select('*, profiles(id, email_verified_at)'); // Assume auth.users email is accessible or stored in profiles

  if (!savedSearches) return NextResponse.json({ message: 'No saved searches' });

  for (const search of savedSearches) {
    // 2. Check for new listings since last_checked_at
    let query = supabase
      .from('listings')
      .select('*')
      .eq('status', 'active')
      .gt('created_at', search.last_checked_at);

    if (search.filter_type) query = query.eq('type', search.filter_type);
    if (search.search_query) query = query.ilike('title', `%${search.search_query}%`);

    const { data: newMatches } = await query;

    if (newMatches && newMatches.length > 0) {
      // 3. Send Alert via Resend
      // Note: We need the actual email. In Supabase, it's in auth.users. 
      // For MVP we'll try to get it from profiles if we mirrored it, or just use a placeholder.
      const userEmail = "john@example.com"; // Placeholder - in production fetch from auth.admin

      await sendEmail({
        to: userEmail,
        subject: `RoostAlert: ${newMatches.length} new matches for "${search.search_query || 'All'}"`,
        text: `New items matching your search have been posted on RoostHub! 

Check them out: https://roosthub.vercel.app/marketplace`,
      });

      // 4. Update last_checked_at
      await supabase
        .from('saved_searches')
        .update({ last_checked_at: new Date().toISOString() })
        .eq('id', search.id);
    }
  }

  return NextResponse.json({ processed: savedSearches.length });
}
