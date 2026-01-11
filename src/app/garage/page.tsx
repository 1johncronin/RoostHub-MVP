import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { Bike, Settings, Plus, Share2, ShieldCheck, Wrench, AlertTriangle, History, CheckCircle, Zap, Bot, Star, ArrowRight, MessageSquare, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { getDueServices } from '@/lib/data/maintenance-intelligence';
import { HistoryButton } from '@/components/garage/HistoryButton';
import { InviteForm } from '@/components/garage/InviteForm';
import { ShareButton } from '@/components/layout/ShareButton';
import { deleteListing } from '@/app/actions/listings';
import { GarageAIChat } from '@/components/garage/GarageAIChat';
import { AddDreamModal } from '@/components/garage/AddDreamModal';

export default async function GaragePage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string; canceled?: string; chat?: string }>;
}) {
  const supabase = await createClient();
  const params = await searchParams;
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .maybeSingle();

  if (profileError || !profile) {
    return (
        <div className="container py-20 text-center">
            <h1 className="text-2xl font-black uppercase italic text-foreground">Profile Not Found</h1>
            <p className="text-muted-foreground mt-2">There was an issue loading your rider profile.</p>
            <Link href="/login" className="mt-6 inline-block bg-primary text-white px-8 py-3 rounded-xl font-bold uppercase italic hover:bg-primary/90 transition-all">Login</Link>
        </div>
    );
  }

  const { data: inviteCodes } = await supabase.from('invite_codes').select('code').eq('owner_id', user.id).limit(1);
  const inviteCode = inviteCodes?.[0]?.code || 'PENDING';

  // 1. Fetch Standalone Garage Machines
  const { data: garageMachines } = await supabase
    .from('garage_machines')
    .select('*')
    .eq('owner_id', user.id)
    .order('created_at', { ascending: false });

  // 2. Fetch Active Marketplace Listings
  const { data: listings } = await supabase
    .from('listings')
    .select('*, machines(*), maintenance_logs(*), listing_media(*)')
    .eq('seller_id', user.id)
    .order('created_at', { ascending: false });

  // 3. Fetch Garage Dreams
  const { data: dreams } = await supabase
    .from('garage_dreams')
    .select('*')
    .eq('user_id', user.id);

  const activeChatMachine = garageMachines?.find(m => m.id === params.chat);

  return (
    <div className="container py-8 max-w-7xl min-h-screen space-y-12">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 bg-muted/30 p-8 rounded-[40px] border-2 border-border shadow-xl">
        <div className="flex items-center gap-6">
          <div className="h-24 w-24 rounded-full bg-primary/10 border-4 border-background flex items-center justify-center overflow-hidden font-black text-4xl text-primary italic font-roboto-condensed shadow-inner">
            {profile?.avatar_url ? (
                <img src={profile.avatar_url} alt={profile.username} className="w-full h-full object-cover" />
            ) : (
                profile?.username?.[0].toUpperCase()
            )}
          </div>
          <div className="space-y-1">
            <h1 className="text-4xl font-black font-roboto-condensed italic uppercase tracking-tighter text-foreground">@{profile?.username}</h1>
            <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-primary text-primary-foreground shadow-lg shadow-primary/20">
                    {profile?.verification_level || 'BASIC'}
                </span>
                <span className="text-xs text-muted-foreground font-bold uppercase tracking-widest">
                    Rider Profile
                </span>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
            <Link href="/garage/settings" className="p-4 bg-card border-2 border-border rounded-2xl hover:border-primary transition-all hover:shadow-lg">
                <Settings className="h-6 w-6" />
            </Link>
            <ShareButton 
                title={`Check out @${profile?.username}'s Garage on RoostHub`} 
                variant="outline"
                className="p-4 bg-card border-2 border-border rounded-2xl hover:border-primary transition-all hover:shadow-lg"
            />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left: Main Garage Content */}
        <div className="lg:col-span-8 space-y-16">
            
            {/* STANDALONE GARAGE MACHINES */}
            <section className="space-y-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-black italic font-space-grotesk uppercase tracking-tight text-primary">The Collection</h2>
                        <p className="text-sm text-muted-foreground font-medium">Your personal fleet. Standalone machines not for sale.</p>
                    </div>
                    <Link href="/garage/add" className="flex items-center gap-2 bg-foreground text-background px-6 py-3 rounded-2xl font-black uppercase italic text-sm hover:scale-105 transition-all shadow-xl">
                        <Plus className="h-4 w-4" /> Add to Fleet
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {garageMachines?.map((m) => (
                        <div key={m.id} className="bg-card border-2 border-border rounded-[32px] overflow-hidden group hover:border-primary transition-all hover:shadow-2xl relative">
                            <div className="aspect-[16/10] bg-muted relative overflow-hidden">
                                {m.avatar_url ? (
                                    <img src={m.avatar_url} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                ) : (
                                    <div className="absolute inset-0 flex items-center justify-center opacity-10">
                                        <Bike className="h-32 w-32" />
                                    </div>
                                )}
                                <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase italic text-white border border-white/10">
                                    {m.year} {m.make}
                                </div>
                            </div>
                            <div className="p-6 space-y-4">
                                <h3 className="font-black text-2xl uppercase italic font-space-grotesk tracking-tight">{m.model}</h3>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2 text-primary font-black italic text-sm uppercase">
                                        <History className="h-4 w-4" /> {m.hours} HOURS
                                    </div>
                                    <div className="flex gap-2">
                                        <Link 
                                            href={`/garage?chat=${m.id}`}
                                            className="p-2 bg-primary/10 rounded-xl text-primary hover:bg-primary hover:text-white transition-all shadow-sm"
                                        >
                                            <Bot className="h-5 w-5" />
                                        </Link>
                                        <form action={async () => {
                                            'use server';
                                            const { removeFromGarage } = await import('@/app/actions/garage');
                                            await removeFromGarage(m.id);
                                        }} onSubmit={(e) => {
                                            if(!confirm('Remove this machine from your fleet?')) e.preventDefault();
                                        }}>
                                            <button type="submit" className="p-2 border border-destructive/20 text-destructive hover:bg-destructive hover:text-white rounded-xl transition-all">
                                                <Trash2 className="h-5 w-5" />
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    {garageMachines?.length === 0 && (
                        <div className="sm:col-span-2 py-12 border-4 border-dashed border-border rounded-[40px] flex flex-col items-center justify-center text-center opacity-40 hover:opacity-100 transition-opacity">
                            <Zap className="h-16 w-16 mb-4 text-primary" />
                            <p className="font-black italic uppercase text-lg">Empty Collection</p>
                            <p className="text-sm font-medium">Add your toys here to track maintenance or consult the AI Mechanic.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* ACTIVE MARKETPLACE LISTINGS */}
            <section className="space-y-8">
                <div>
                    <h2 className="text-3xl font-black italic font-space-grotesk uppercase tracking-tight text-primary">Marketplace Active</h2>
                    <p className="text-sm text-muted-foreground font-medium">Your toys currently available for the Roost community.</p>
                </div>

                <div className="grid grid-cols-1 gap-6">
                    {listings?.map((l) => (
                        <div key={l.id} className="bg-card border-2 border-border rounded-[32px] overflow-hidden hover:border-primary/50 transition-all shadow-lg p-2">
                            <div className="flex flex-col md:flex-row gap-6">
                                <div className="w-full md:w-48 aspect-square bg-muted rounded-[24px] overflow-hidden shrink-0">
                                    {l.listing_media?.[0] ? (
                                        <img src={l.listing_media[0].url} className="w-full h-full object-cover" />
                                    ) : <Bike className="h-12 w-12 m-auto mt-16 opacity-20" />}
                                </div>
                                <div className="p-4 flex-1 flex flex-col justify-center">
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="font-black text-xl uppercase italic font-space-grotesk">{l.title}</h3>
                                        <span className="text-2xl font-black text-primary italic font-space-grotesk">${l.price.toLocaleString()}</span>
                                    </div>
                                    <div className="flex gap-3">
                                        <Link href={`/listing/${l.id}/edit`} className="text-[10px] font-black uppercase italic px-4 py-2 border border-border rounded-lg hover:bg-accent transition-all">Edit Details</Link>
                                        <button className="text-[10px] font-black uppercase italic px-4 py-2 bg-primary text-white rounded-lg hover:scale-105 transition-all shadow-lg shadow-primary/20">Boost Ad</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>

        {/* Right Sidebar: AI Mechanic & Dreams */}
        <div className="lg:col-span-4 space-y-12">
            
            {/* AI MECHANIC CHAT */}
            {activeChatMachine ? (
                <GarageAIChat machineId={activeChatMachine.id} machineName={activeChatMachine.model} />
            ) : (
                <div className="bg-primary/5 border-2 border-primary/20 rounded-[40px] p-8 space-y-6 text-center shadow-xl">
                    <Bot className="h-12 w-12 text-primary mx-auto animate-bounce-slow" />
                    <div>
                        <h3 className="text-xl font-black italic uppercase font-space-grotesk">Select a machine to consult the AI Mechanic</h3>
                        <p className="text-xs text-muted-foreground font-medium mt-2">Get torque specs, parts lists, and service advice instantly.</p>
                    </div>
                </div>
            )}

            {/* GARAGE DREAMS (Subscribed Items) */}
            <div className="bg-card border-2 border-border rounded-[40px] p-8 space-y-8 shadow-xl">
                <div className="flex items-center justify-between">
                    <h3 className="text-xl font-black italic uppercase font-space-grotesk text-primary flex items-center gap-2">
                        <Star className="h-5 w-5 fill-primary" /> Garage Dreams
                    </h3>
                    <AddDreamModal />
                </div>
                
                <div className="space-y-4">
                    {dreams?.map((d) => (
                        <div key={d.id} className="p-4 bg-muted/30 rounded-2xl border border-border flex items-center justify-between group cursor-pointer hover:border-primary transition-all">
                            <div>
                                <div className="text-sm font-black uppercase italic">{d.dream_make} {d.dream_model}</div>
                                <div className="text-[10px] text-muted-foreground uppercase font-bold">Within {d.geo_radius_km}km</div>
                            </div>
                            <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                        </div>
                    ))}
                    {dreams?.length === 0 && (
                        <p className="text-xs text-muted-foreground text-center italic">Subscribe to your dream bikes and get notified when someone lists them nearby.</p>
                    )}
                </div>
            </div>

            {/* INVITE EARN CARD */}
            <div className="bg-foreground text-background rounded-[40px] p-8 space-y-6 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
                <h3 className="text-2xl font-black italic uppercase font-space-grotesk leading-none">Share the <br />RoostHub.</h3>
                <InviteForm inviteCode={inviteCode} />
            </div>
        </div>
      </div>
    </div>
  );
}
