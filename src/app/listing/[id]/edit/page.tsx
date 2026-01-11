import { createClient } from '@/lib/supabase/server';
import { notFound, redirect } from 'next/navigation';
import { ListingWizard } from '@/components/sell/ListingWizard';

export default async function EditListingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const { data: listing } = await supabase
    .from('listings')
    .select(`
      *,
      machines(*),
      parts(*),
      storage_spaces(*),
      listing_media(*)
    `)
    .eq('id', id)
    .single();

  if (!listing) notFound();
  if (listing.seller_id !== user.id) redirect('/garage');

  return (
    <div className="container max-w-3xl py-12">
        <div className="mb-8">
            <h1 className="text-3xl font-roboto-condensed font-bold italic uppercase">Edit Listing</h1>
            <p className="text-muted-foreground">Update your listing details and media.</p>
        </div>
        
        <ListingWizard userId={user.id} initialData={listing} />
    </div>
  );
}
