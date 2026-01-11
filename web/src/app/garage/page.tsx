import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { Bike, Settings, Plus, Share2, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default async function GaragePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  const { data: listings } = await supabase
    .from('listings')
    .select('*, machines(*)')
    .eq('seller_id', user.id)
    .order('created_at', { ascending: false });

  return (
    <div className="container py-8 max-w-5xl min-h-screen">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12 bg-muted/30 p-8 rounded-3xl border border-border">
        <div className="flex items-center gap-6">
          <div className="h-24 w-24 rounded-full bg-primary/10 border-4 border-background flex items-center justify-center font-black text-4xl text-primary italic font-roboto-condensed">
            {profile?.username?.[0].toUpperCase()}
          </div>
          <div className="space-y-1">
            <h1 className="text-3xl font-black font-roboto-condensed italic uppercase tracking-tighter">@{profile?.username}</h1>
            <div className="flex items-center gap-3">
                <span className={cn(
                    "px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest",
                    profile?.verification_level === 'verified' ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                )}>
                    {profile?.verification_level || 'BASIC'}
                </span>
                <span className="text-xs text-muted-foreground font-medium flex items-center gap-1">
                    Joined Jan 2026
                </span>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
            <Link href="/garage/settings" className="p-3 border border-border rounded-xl hover:bg-accent transition-colors">
                <Settings className="h-5 w-5" />
            </Link>
            <button className="p-3 border border-border rounded-xl hover:bg-accent transition-colors">
                <Share2 className="h-5 w-5" />
            </button>
        </div>
      </div>

      {/* Garage Content */}
      <div className="space-y-8">
        <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold italic font-roboto-condensed uppercase">The Garage</h2>
            <Link href="/sell" className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-bold text-sm">
                <Plus className="h-4 w-4" /> Add Machine
            </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {listings?.map((l) => (
                <div key={l.id} className="bg-card border border-border rounded-2xl overflow-hidden group hover:border-primary/50 transition-colors">
                    <div className="flex">
                        <div className="w-1/3 aspect-square bg-muted">
                            {/* Listing Image would go here */}
                        </div>
                        <div className="p-4 flex-1 flex flex-col justify-center">
                            <h3 className="font-bold text-lg leading-tight uppercase italic font-roboto-condensed">{l.title}</h3>
                            <div className="text-sm text-muted-foreground mt-1">
                                {l.machines?.year} {l.machines?.make} {l.machines?.model}
                            </div>
                            <div className="mt-4 flex gap-2">
                                <Link href={`/listing/${l.id}`} className="text-xs font-bold text-primary hover:underline">View Listing</Link>
                                <span className="text-xs text-muted-foreground">•</span>
                                <button className="text-xs font-bold text-muted-foreground hover:text-foreground">Edit</button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            {listings?.length === 0 && (
                <div className="md:col-span-2 py-20 flex flex-col items-center justify-center text-center border-2 border-dashed border-border rounded-3xl bg-muted/10">
                    <Bike className="h-12 w-12 text-muted-foreground mb-4 opacity-20" />
                    <h3 className="font-bold text-xl">Empty Garage</h3>
                    <p className="text-muted-foreground max-w-xs mt-1">Your garage is where you showcase your current machines and active listings.</p>
                </div>
            )}
        </div>
      </div>
    </div>
  );
}
