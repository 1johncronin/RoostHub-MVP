import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { MessageSquare, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default async function MessagesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  const { data: threads } = await supabase
    .from('message_threads')
    .select(`
      *,
      listings(title),
      buyer:profiles!message_threads_buyer_id_fkey(username),
      seller:profiles!message_threads_seller_id_fkey(username)
    `)
    .or(`buyer_id.eq.${user.id},seller_id.eq.${user.id}`)
    .order('created_at', { ascending: false });

  return (
    <div className="container py-12 max-w-4xl min-h-screen">
      <h1 className="text-4xl font-black italic uppercase font-space-grotesk text-primary mb-8 tracking-tighter">Messages</h1>
      
      <div className="space-y-4">
        {threads?.map((t: any) => (
          <Link key={t.id} href={`/messages/${t.id}`} className="block">
            <div className="bg-card border border-border p-6 rounded-2xl flex items-center justify-between hover:border-primary/50 transition-all hover:shadow-xl group">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary italic">
                    {(user.id === t.buyer_id ? t.seller?.username : t.buyer?.username)?.[0].toUpperCase()}
                </div>
                <div>
                    <div className="font-black italic uppercase text-sm tracking-tight">
                        {user.id === t.buyer_id ? t.seller?.username : t.buyer?.username}
                    </div>
                    <div className="text-xs text-muted-foreground font-medium uppercase mt-0.5 tracking-widest">{t.listings?.title}</div>
                </div>
              </div>
              <ShieldCheck className="h-5 w-5 text-primary opacity-20 group-hover:opacity-100 transition-opacity" />
            </div>
          </Link>
        ))}

        {threads?.length === 0 && (
          <div className="py-20 text-center border-2 border-dashed border-border rounded-3xl bg-muted/10">
            <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-20" />
            <h3 className="font-bold text-xl uppercase italic">No Active Conversations</h3>
            <p className="text-muted-foreground max-w-xs mx-auto mt-1">Start a conversation by messaging a seller on their listing page.</p>
          </div>
        )}
      </div>
    </div>
  );
}
