import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { Bike, Settings, Plus, Share2, ShieldCheck, Wrench, AlertTriangle, History, CheckCircle, Zap } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { getDueServices } from '@/lib/data/maintenance-intelligence';
import { HistoryButton } from '@/components/garage/HistoryButton';
import { InviteForm } from '@/components/garage/InviteForm';
import { ShareButton } from '@/components/layout/ShareButton';
import { deleteListing } from '@/app/actions/listings';

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

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('*, invite_codes(code)')
    .eq('id', user.id)
    .maybeSingle();

  if (profileError || !profile) {
    console.error('Profile fetch error:', profileError);
    return (
        <div className="container py-20 text-center">
            <h1 className="text-2xl font-black uppercase italic">Profile Not Found</h1>
            <p className="text-muted-foreground mt-2">There was an issue loading your rider profile. Please try logging in again.</p>
            <Link href="/login" className="mt-6 inline-block bg-primary text-white px-8 py-3 rounded-xl font-bold uppercase italic">Login</Link>
        </div>
    );
  }

  const { data: listings } = await supabase
    .from('listings')
    .select('*, machines(*), maintenance_logs(*), listing_media(*)')
    .eq('seller_id', user.id)
    .order('created_at', { ascending: false });

  const inviteCode = (profile as any)?.invite_codes?.[0]?.code || 'PENDING';

  return (
    <div className="container py-8 max-w-5xl min-h-screen">
      {/* ... (Stripe Status Toasts) ... */}
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

      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12 bg-muted/30 p-8 rounded-3xl border border-border">
        <div className="flex items-center gap-6">
          <div className="h-24 w-24 rounded-full bg-primary/10 border-4 border-background flex items-center justify-center overflow-hidden font-black text-4xl text-primary italic font-roboto-condensed">
            {profile?.avatar_url ? (
                <img src={profile.avatar_url} alt={profile.username} className="w-full h-full object-cover" />
            ) : (
                profile?.username?.[0].toUpperCase()
            )}
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
            <ShareButton 
                title={`Check out @${profile?.username}'s Garage on RoostHub`} 
                variant="outline"
                className="p-3"
            />
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
                const mainImage = l.listing_media?.[0]?.url;
                
                return (
                    <div key={l.id} className="bg-card border border-border rounded-3xl overflow-hidden group hover:border-primary/50 transition-all hover:shadow-2xl">
                        <div className="flex flex-col md:flex-row">
                            <div className="w-full md:w-1/3 aspect-[4/3] bg-muted relative">
                                {mainImage ? (
                                    <img src={mainImage} alt={l.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                ) : (
                                    <div className="absolute inset-0 flex items-center justify-center opacity-20">
                                        <Bike className="h-20 w-20" />
                                    </div>
                                )}
                                {l.status === 'sold' && (
                                    <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex items-center justify-center z-10">
                                        <div className="border-4 border-primary text-primary px-6 py-2 rounded-xl font-black text-3xl uppercase italic font-space-grotesk -rotate-12 shadow-[0_0_30px_rgba(124,58,237,0.5)]">
                                            SOLD
                                        </div>
                                    </div>
                                )}
                                <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md text-white text-[10px] font-black px-2 py-1 rounded uppercase italic border border-white/10">
                                    {l.machines?.year} {l.machines?.make}
                                </div>
                            </div>
                            <div className="p-8 flex-1 flex flex-col justify-between gap-6">
                                <div>
                                    <div className="flex justify-between items-start text-foreground">
                                        <h3 className={cn("font-black text-3xl leading-tight uppercase italic font-space-grotesk tracking-tighter", l.status === 'sold' && "opacity-50 line-through")}>{l.title}</h3>
                                        <div className="text-right">
                                            <div className="text-2xl font-black text-primary italic font-space-grotesk">${l.price.toLocaleString()}</div>
                                            <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{l.machines?.hours || 0} HOURS</div>
                                        </div>
                                    </div>

                                    {/* Alerts */}
                                    {dueServices.length > 0 && (
                                        <div className="mt-6 flex flex-wrap gap-2">
                                            {dueServices.slice(0, 2).map((s: any) => (
                                                <div key={s.type} className="flex items-center gap-2 px-3 py-1.5 bg-amber-500/10 border border-amber-500/20 rounded-lg text-amber-500">
                                                    <AlertTriangle className="h-3 w-3" />
                                                    <span className="text-[10px] font-black uppercase italic tracking-tight">{s.type} DUE</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-border/50">
                                    <Link href={`/listing/${l.id}`} className="px-4 py-2 bg-muted hover:bg-primary hover:text-primary-foreground rounded-lg text-xs font-black uppercase italic transition-all flex items-center gap-2 text-foreground hover:text-white">
                                        View
                                    </Link>
                                    <Link href={`/listing/${l.id}/edit`} className="px-4 py-2 bg-muted hover:bg-primary hover:text-primary-foreground rounded-lg text-xs font-black uppercase italic transition-all flex items-center gap-2 text-foreground hover:text-white">
                                        Edit
                                    </Link>
                                    <button className="px-4 py-2 bg-muted hover:bg-primary hover:text-primary-foreground rounded-lg text-xs font-black uppercase italic transition-all flex items-center gap-2 text-foreground hover:text-white">
                                        <Wrench className="h-3 w-3" /> Log
                                    </button>
                                    <HistoryButton machine={l.machines} logs={l.maintenance_logs} />
                                    
                                    {l.status !== 'sold' && (
                                        <form action={async () => {
                                            'use server';
                                            const { markAsSold } = await import('@/app/actions/listings');
                                            await markAsSold(l.id);
                                        }}>
                                            <button type="submit" className="px-4 py-2 border-2 border-primary/20 text-primary hover:bg-primary hover:text-white rounded-lg text-xs font-black uppercase italic transition-all">
                                                Mark Sold
                                            </button>
                                        </form>
                                    )}

                                    <form action={async () => {
                                        'use server';
                                        await deleteListing(l.id);
                                    }} onSubmit={(e) => {
                                        if(!confirm('Are you sure you want to delete this listing?')) e.preventDefault();
                                    }}>
                                        <button type="submit" className="px-4 py-2 border border-destructive/20 text-destructive hover:bg-destructive hover:text-white rounded-lg text-xs font-black uppercase italic transition-all">
                                            Delete
                                        </button>
                                    </form>

                                    {l.status !== 'sold' && (
                                        <form action={async () => {
                                            'use server';
                                            const { createBoostCheckout } = await import('@/app/actions/stripe');
                                            await createBoostCheckout(l.id);
                                        }} className="ml-auto">
                                            <button type="submit" className="px-6 py-2 bg-primary text-white rounded-lg text-xs font-black uppercase italic hover:scale-105 transition-all shadow-lg shadow-primary/30">
                                                Boost $19
                                            </button>
                                        </form>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}

            {listings?.length === 0 && (
                <div className="md:col-span-2 py-20 flex flex-col items-center justify-center text-center border-2 border-dashed border-border rounded-3xl bg-muted/10">
                    <Bike className="h-12 w-12 text-muted-foreground mb-4 opacity-20" />
                    <h3 className="font-bold text-xl uppercase italic">Empty Garage</h3>
                    <p className="text-muted-foreground max-w-xs mt-1 font-medium">Your garage is where you showcase your current machines and active listings.</p>
                </div>
            )}
        </div>
      </div>

      {/* Invite & Earn Section */}
      <div className="mt-12 bg-primary/5 border-2 border-primary/20 rounded-[40px] p-10 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10 group-hover:scale-110 transition-transform duration-700" />
        <div className="max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary text-white text-[10px] font-black uppercase italic tracking-widest">
                <Zap className="h-3 w-3 fill-current" /> Viral Program
            </div>
            <h2 className="text-4xl font-black italic uppercase font-space-grotesk tracking-tighter leading-none text-foreground">Invite a friend, <br />get a <span className="text-primary">free boost</span>.</h2>
            <p className="text-muted-foreground font-medium">Grow the RoostHub community. When your friend joins, we'll drop a free $19 Featured Listing credit in your garage.</p>
            
            <InviteForm inviteCode={inviteCode} />
        </div>
      </div>
    </div>
  );
}