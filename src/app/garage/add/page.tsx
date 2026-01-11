import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { CollectionWizard } from '@/components/garage/CollectionWizard';

export default async function AddToFleetPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  return (
    <div className="container max-w-3xl py-12">
        <div className="mb-8">
            <h1 className="text-3xl font-roboto-condensed font-bold italic uppercase text-primary">Add to Collection</h1>
            <p className="text-muted-foreground">Log your machine in your private fleet. No listing created.</p>
        </div>
        
        <CollectionWizard userId={user.id} />
    </div>
  );
}
