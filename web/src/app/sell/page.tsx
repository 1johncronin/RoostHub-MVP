import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { ListingWizard } from '@/components/sell/ListingWizard';

export default async function SellPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <div className="container max-w-3xl py-12">
        <div className="mb-8">
            <h1 className="text-3xl font-roboto-condensed font-bold italic uppercase">Create New Listing</h1>
            <p className="text-muted-foreground">Sell your machine, parts, or gear to the community.</p>
        </div>
        
        <ListingWizard userId={user.id} />
    </div>
  );
}
