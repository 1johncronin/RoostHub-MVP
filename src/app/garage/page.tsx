import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { Bike, Settings, Plus, Share2, ShieldCheck, Wrench, AlertTriangle, History, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { getDueServices } from '@/lib/data/maintenance-intelligence';
import { HistoryButton } from '@/components/garage/HistoryButton';

export default async function GaragePage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string; canceled?: string }>;
}) {
  const supabase = await createClient();
  const params = await searchParams;
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
    .select('*, machines(*), maintenance_logs(*)')
    .eq('seller_id', user.id)
    .order('created_at', { ascending: false });

  return (
    <div className="container py-8 max-w-5xl min-h-screen">
      {/* Stripe Status Toasts */}
      {params.success && (
        <div className="mb-8 p-4 bg-green-500/10 border border-green-500/20 rounded-2xl flex items-center gap-3 text-green-500 animate-in fade-in slide-in-from-top-4">
            <CheckCircle className="h-5 w-5" />
            <p className="text-sm font-black uppercase italic tracking-tight">Listing Boosted Successfully! Your machine is now featured.</p>
        </div>
      )}
      {params.canceled && (
        <div className="mb-8 p-4 bg-destructive/10 border border-destructive/20 rounded-2xl flex items-center gap-3 text-destructive">
            <AlertTriangle className="h-5 w-5" />
            <p className="text-sm font-black uppercase italic tracking-tight">Checkout canceled. No charges were made.</p>
        </div>
      )}
      {/* ... previous header logic ... */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12 bg-muted/30 p-8 rounded-3xl border border-border">
        <div className="flex items-center gap-6">
          <div className="h-24 w-24 rounded-full bg-primary/10 border-4 border-background flex items-center justify-center font-black text-4xl text-primary italic font-roboto-condensed">
            {profile?.username?.[0].toUpperCase()}
          </div>
          <div className="space-y-1">
            <h1 className="text-3xl font-black font-roboto-condensed italic uppercase tracking-tighter text-foreground">@{profile?.username}</h1>
            <div className="flex items-center gap-3">
                <span className={cn(
                    "px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest",
                    profile?.verification_level === 'verified' ? "bg-primary text-primary-foreground shadow-[0_0_15px_-3px_rgba(107,44,245,0.5)]" : "bg-muted text-muted-foreground"
                )}>
                    {profile?.verification_level || 'BASIC'}
                </span>
                <span className="text-xs text-muted-foreground font-bold uppercase tracking-tighter">
                    Rider Profile
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
            <h2 className="text-2xl font-black italic font-space-grotesk uppercase tracking-tight text-primary">The Garage</h2>
            <Link href="/sell" className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2 rounded-xl font-black uppercase italic text-sm hover:scale-105 transition-all shadow-lg shadow-primary/20">
                <Plus className="h-4 w-4" /> Add Machine
            </Link>
        </div>

        <div className="grid grid-cols-1 gap-6">
            {listings?.map((l) => {
                const dueServices = getDueServices(l.machines?.category || 'Motocross', l.machines?.hours || 0);
                
                return (
                    <div key={l.id} className="bg-card border border-border rounded-3xl overflow-hidden group hover:border-primary/50 transition-all hover:shadow-2xl">
                        <div className="flex flex-col md:flex-row">
                            <div className="w-full md:w-1/3 aspect-[4/3] bg-muted relative">
                                <div className="absolute inset-0 flex items-center justify-center opacity-20">
                                    <Bike className="h-20 w-20" />
                                </div>
                                <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md text-white text-[10px] font-black px-2 py-1 rounded uppercase italic border border-white/10">
                                    {l.machines?.year} {l.machines?.make}
                                </div>
                            </div>
                            <div className="p-8 flex-1 flex flex-col justify-between gap-6">
                                <div>
                                    <div className="flex justify-between items-start">
                                        <h3 className="font-black text-3xl leading-tight uppercase italic font-space-grotesk tracking-tighter">{l.title}</h3>
                                        <div className="text-right">
                                            <div className="text-2xl font-black text-primary italic font-space-grotesk">${l.price.toLocaleString()}</div>
                                            <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{l.machines?.hours || 0} HOURS</div>
                                        </div>
                                    </div>

                                    {/* Omniscient Maintenance Alerts */}
                                    {dueServices.length > 0 && (
                                        <div className="mt-6 flex flex-wrap gap-2">
                                            {dueServices.slice(0, 2).map((s: any) => (
                                                <div key={s.type} className="flex items-center gap-2 px-3 py-1.5 bg-amber-500/10 border border-amber-500/20 rounded-lg text-amber-500 animate-pulse">
                                                    <AlertTriangle className="h-3 w-3" />
                                                    <span className="text-[10px] font-black uppercase italic tracking-tight">{s.type} DUE</span>
                                                </div>
                                            ))}
                                            {dueServices.length > 2 && (
                                                <div className="px-3 py-1.5 bg-muted rounded-lg text-muted-foreground text-[10px] font-black uppercase italic">
                                                    +{dueServices.length - 2} MORE
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>

                                <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-border/50">
                                    <Link href={`/listing/${l.id}`} className="px-4 py-2 bg-muted hover:bg-primary hover:text-primary-foreground rounded-lg text-xs font-black uppercase italic transition-all flex items-center gap-2">
                                        Marketplace View
                                    </Link>
                                    <button className="px-4 py-2 bg-muted hover:bg-primary hover:text-primary-foreground rounded-lg text-xs font-black uppercase italic transition-all flex items-center gap-2">
                                        <Wrench className="h-3 w-3" /> Log Service
                                    </button>
                                    <HistoryButton machine={l.machines} logs={l.maintenance_logs} />
                                    <form action={async () => {
                                        'use server';
                                        const { createBoostCheckout } = await import('@/app/actions/stripe');
                                        await createBoostCheckout(l.id);
                                    }} className="ml-auto">
                                        <button type="submit" className="px-6 py-2 bg-primary text-white rounded-lg text-xs font-black uppercase italic hover:scale-105 transition-all shadow-lg shadow-primary/30">
                                            Boost Listing $19
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}

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
