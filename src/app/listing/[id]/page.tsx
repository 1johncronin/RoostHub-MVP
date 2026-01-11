import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import { MapPin, Calendar, Clock, Share2, Heart, MessageSquare, ShieldCheck, Wrench, Info, Zap, ChevronRight, History } from 'lucide-react';
import Link from 'next/link';
import { Metadata, ResolvingMetadata } from 'next';
import { getOrCreateThread } from '@/app/actions/messages';
import { cn } from '@/lib/utils';

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { id } = await params;
  const supabase = await createClient();

  const { data: listing } = await supabase
    .from('listings')
    .select('*, machines(year, make, model), listing_media(url)')
    .eq('id', id)
    .single();

  if (!listing) return { title: 'Listing | RoostHub' };

  const title = `${listing.title} | RoostHub`;
  return {
    title,
    openGraph: { title, images: listing.listing_media?.[0]?.url ? [listing.listing_media[0].url] : [] },
  };
}

function DemoListingDetail({ id }: { id: string }) {
    const demoData: Record<string, any> = {
        'demo-1': {
            title: '2024 KTM 300 XC-W',
            price: 9800,
            currency: 'USD',
            location_name: 'Hood River, OR',
            type: 'machine',
            is_featured: true,
            machines: { year: 2024, make: 'KTM', model: '300 XC-W', hours: 12, condition: 'excellent', vin: '1KTMXXXXXXXXXXXXX' },
            listing_media: [
                { url: 'https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?q=80&w=1200&auto=format&fit=crop' },
                { url: 'https://images.unsplash.com/photo-1444491741275-3747c53c99b4?q=80&w=1200&auto=format&fit=crop' }
            ],
            profiles: { username: 'ktm_rider', verification_level: 'verified' },
            description: 'Absolutely mint 2024 KTM 300 XC-W. Fuel injected, only 12 hours. Ready to roost. Comes with FMF Gnarly pipe and carbon guard. Meticulously maintained with records.',
            maintenance_logs: [
                { service_type: 'First Oil Change', hours: 5, performed_at: '2025-12-01' },
                { service_type: 'Air Filter Service', hours: 10, performed_at: '2026-01-05' }
            ]
        },
        'demo-2': {
            title: 'Secure Shop Space',
            price: 150,
            currency: 'USD',
            location_name: 'Bend, OR',
            type: 'storage',
            is_featured: true,
            storage_spaces: { space_type: 'Shop', access_type: '24/7', has_security: true, has_climate_control: true },
            listing_media: [{ url: 'https://images.unsplash.com/photo-1513828583688-c52646db42da?q=80&w=1200&auto=format&fit=crop' }],
            profiles: { username: 'shop_master', verification_level: 'verified' },
            description: 'Heated shop space available for rent. Secure, 24/7 access. Perfect for storing bikes or working on builds. Tools available for use.'
        }
    };

    const listing = demoData[id] || demoData['demo-1'];
    return <ListingUI listing={listing} isDemo={true} />;
}

function ListingUI({ listing, isDemo = false }: { listing: any, isDemo?: boolean }) {
    return (
        <div className="container py-8 max-w-7xl animate-in fade-in duration-700">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-[10px] font-black uppercase italic tracking-widest text-muted-foreground mb-6">
                <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                <ChevronRight className="h-3 w-3" />
                <Link href="/marketplace" className="hover:text-primary transition-colors">Marketplace</Link>
                <ChevronRight className="h-3 w-3" />
                <span className="text-foreground">{listing.title}</span>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
                {/* Left: Content (8 cols) */}
                <div className="xl:col-span-8 space-y-8">
                    {/* Hero Gallery */}
                    <div className="space-y-4">
                        <div className="aspect-[16/10] bg-muted rounded-3xl overflow-hidden border-2 border-border shadow-2xl relative group">
                            {listing.is_featured && (
                                <div className="absolute top-6 left-6 z-20 bg-primary text-white text-xs font-black px-4 py-2 rounded-xl shadow-2xl uppercase italic tracking-widest flex items-center gap-2 animate-pulse">
                                    <Zap className="h-4 w-4 fill-current" />
                                    Featured Listing
                                </div>
                            )}
                            {listing.listing_media?.[0] ? (
                                <img src={listing.listing_media[0].url} alt="" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-muted-foreground italic font-space-grotesk text-2xl">No High-Res Media</div>
                            )}
                        </div>
                        {/* Thumbnails */}
                        <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
                            {listing.listing_media?.map((m: any, i: number) => (
                                <div key={i} className="h-24 aspect-square bg-muted rounded-2xl overflow-hidden border-2 border-border flex-shrink-0 cursor-pointer hover:border-primary transition-all">
                                    <img src={m.url} className="w-full h-full object-cover" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Main Specs Bar */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-card border border-border p-6 rounded-2xl shadow-sm">
                            <span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] block mb-1">Make</span>
                            <span className="text-xl font-black italic uppercase font-space-grotesk">{listing.machines?.make || listing.type}</span>
                        </div>
                        <div className="bg-card border border-border p-6 rounded-2xl shadow-sm">
                            <span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] block mb-1">Model</span>
                            <span className="text-xl font-black italic uppercase font-space-grotesk">{listing.machines?.model || 'Custom'}</span>
                        </div>
                        <div className="bg-card border border-border p-6 rounded-2xl shadow-sm">
                            <span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] block mb-1">Year</span>
                            <span className="text-xl font-black italic uppercase font-space-grotesk">{listing.machines?.year || 'N/A'}</span>
                        </div>
                        <div className="bg-card border border-border p-6 rounded-2xl shadow-sm">
                            <span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] block mb-1">Condition</span>
                            <span className="text-xl font-black italic uppercase font-space-grotesk text-green-500">{listing.machines?.condition || 'Good'}</span>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-4">
                        <h2 className="text-2xl font-black italic uppercase font-space-grotesk text-primary flex items-center gap-2">
                            <Info className="h-6 w-6" /> Overview
                        </h2>
                        <div className="prose prose-invert max-w-none">
                            <p className="text-lg text-muted-foreground leading-relaxed font-medium bg-muted/20 p-8 rounded-3xl border border-border/50">
                                {listing.description}
                            </p>
                        </div>
                    </div>

                    {/* Omniscient History Area */}
                    {listing.maintenance_logs?.length > 0 && (
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <h2 className="text-2xl font-black italic uppercase font-space-grotesk text-primary flex items-center gap-2">
                                    <History className="h-6 w-6" /> RoostHub History
                                </h2>
                                <div className="bg-green-500/10 text-green-500 px-3 py-1 rounded-full text-[10px] font-black uppercase italic border border-green-500/20">Certified Records</div>
                            </div>
                            <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-xl">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-muted/50 border-b border-border">
                                            <th className="p-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Date</th>
                                            <th className="p-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Service</th>
                                            <th className="p-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground text-right">Hours</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border/50">
                                        {listing.maintenance_logs.map((log: any, idx: number) => (
                                            <tr key={idx} className="hover:bg-muted/30 transition-colors">
                                                <td className="p-4 text-sm font-bold">{new Date(log.performed_at).toLocaleDateString()}</td>
                                                <td className="p-4 text-sm font-black italic uppercase">{log.service_type}</td>
                                                <td className="p-4 text-sm font-bold text-right text-primary">{log.hours}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>

                {/* Right: Sidebar (4 cols) */}
                <div className="xl:col-span-4 space-y-6">
                    <div className="bg-card border-2 border-border p-8 rounded-[40px] shadow-2xl sticky top-24 space-y-8 overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -z-10" />
                        
                        <div>
                            <span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em] mb-2 block">Asking Price</span>
                            <div className="text-6xl font-black italic text-primary font-space-grotesk tracking-tighter leading-none">
                                ${listing.price.toLocaleString()}
                            </div>
                        </div>

                        <div className="space-y-3">
                            <button className="w-full bg-primary text-white py-5 rounded-[24px] font-black uppercase italic text-xl hover:scale-[1.02] transition-all shadow-xl shadow-primary/30 flex items-center justify-center gap-3 active:scale-95">
                                <MessageSquare className="h-6 w-6 fill-current" />
                                Message Seller
                            </button>
                            <button className="w-full border-2 border-border py-5 rounded-[24px] font-black uppercase italic text-xl hover:bg-accent transition-all active:scale-95">
                                Make Offer
                            </button>
                        </div>

                        {/* Omniscient Stats */}
                        <div className="space-y-4 pt-8 border-t border-border">
                            <div className="flex justify-between items-center bg-muted/30 p-4 rounded-2xl border border-border/50">
                                <div className="flex items-center gap-2">
                                    <Clock className="h-4 w-4 text-primary" />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Usage</span>
                                </div>
                                <span className="font-black italic uppercase">{listing.machines?.hours || 0} Hours</span>
                            </div>
                            <div className="flex justify-between items-center bg-muted/30 p-4 rounded-2xl border border-border/50">
                                <div className="flex items-center gap-2">
                                    <ShieldCheck className="h-4 w-4 text-primary" />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">VIN Status</span>
                                </div>
                                <span className="font-black italic uppercase text-green-500">{listing.machines?.vin ? 'Verified' : 'Pending'}</span>
                            </div>
                        </div>

                        {/* Seller Area */}
                        <div className="pt-8 border-t border-border">
                            <div className="flex items-center gap-4">
                                <div className="h-16 w-14 rounded-2xl bg-primary text-white flex flex-col items-center justify-center font-black italic text-2xl -rotate-3">
                                    {listing.profiles?.username?.[0].toUpperCase()}
                                </div>
                                <div>
                                    <div className="font-black italic uppercase text-xl tracking-tighter leading-none">@{listing.profiles?.username}</div>
                                    <div className="text-[10px] text-muted-foreground font-black uppercase tracking-widest mt-1">Verified Member</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Share Action */}
                    <button className="w-full bg-muted/50 border border-border p-4 rounded-2xl flex items-center justify-center gap-2 text-xs font-black uppercase italic hover:bg-muted transition-all">
                        <Share2 className="h-4 w-4" /> Share This Listing
                    </button>
                </div>
            </div>
        </div>
    );
}

export default async function ListingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();

  if (id.startsWith('demo-')) {
    return <DemoListingDetail id={id} />;
  }

  const { data: listing } = await supabase
    .from('listings')
    .select(`
      *,
      profiles(id, username, avatar_url, verification_level),
      machines(*),
      parts(*),
      storage_spaces(*),
      listing_media(*),
      maintenance_logs(*)
    `)
    .eq('id', id)
    .single();

  if (!listing) notFound();

  return <ListingUI listing={listing} />;
}
