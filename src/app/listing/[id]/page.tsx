import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import { MapPin, Calendar, Clock, Share2, Heart, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { Metadata, ResolvingMetadata } from 'next';

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

  if (!listing) {
    return { title: 'Listing Not Found | RoostHub' };
  }

  const title = `${listing.title} | RoostHub`;
  const description = listing.description || `Buy this ${listing.type} on RoostHub.`;
  const image = listing.listing_media?.[0]?.url || '/og-placeholder.png';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [image],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
}

import { createBoostCheckout } from '@/app/actions/stripe';
import { getOrCreateThread } from '@/app/actions/messages';

export default async function ListingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: listing } = await supabase
    .from('listings')
    .select(`
      *,
      profiles(id, username, avatar_url, verification_level),
      machines(*),
      parts(*),
      listing_media(*)
    `)
    .eq('id', id)
    .single();

  // ... (keep notFound and demo logic) ...

  const handleMessage = async () => {
    'use server';
    if (listing) {
        await getOrCreateThread(listing.id, listing.profiles.id);
    }
  };

  return (
    <div className="container py-8 max-w-6xl">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column content ... */}
        <div className="lg:col-span-2 space-y-8">
            {/* ... media and description ... */}
            <div className="aspect-video bg-muted rounded-2xl overflow-hidden border border-border">
                {listing.listing_media?.[0] ? (
                <img src={listing.listing_media[0].url} alt={listing.title} className="w-full h-full object-cover" />
                ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground italic font-roboto-condensed text-xl">No Media Provided</div>
                )}
            </div>

            <div className="space-y-4">
                <div className="flex justify-between items-start">
                <h1 className="text-4xl font-space-grotesk font-black italic uppercase tracking-tighter text-foreground">{listing.title}</h1>
                <div className="flex gap-2">
                    <button className="p-2 border border-border rounded-full hover:bg-accent transition-colors"><Share2 className="h-5 w-5" /></button>
                    <button className="p-2 border border-border rounded-full hover:bg-accent text-destructive transition-colors"><Heart className="h-5 w-5" /></button>
                </div>
                </div>

                <div className="flex flex-wrap gap-4 text-[10px] font-black uppercase italic tracking-widest text-muted-foreground">
                <div className="flex items-center gap-1 bg-muted px-3 py-1 rounded-lg border border-border/50"><MapPin className="h-3 w-3 text-primary" /> {listing.location_name}</div>
                <div className="flex items-center gap-1 bg-muted px-3 py-1 rounded-lg border border-border/50"><Calendar className="h-3 w-3 text-primary" /> Jan 10, 2026</div>
                <div className="flex items-center gap-1 bg-primary/10 text-primary px-3 py-1 rounded-lg border border-primary/20">{listing.type}</div>
                </div>

                <div className="pt-6 border-t border-border">
                <h2 className="text-xl font-black uppercase italic font-space-grotesk text-primary mb-4">Description</h2>
                <p className="text-muted-foreground font-medium whitespace-pre-wrap leading-relaxed">{listing.description || "No description provided."}</p>
                </div>
            </div>
        </div>

        {/* Right column: Actions */}
        <div className="space-y-6">
          <div className="bg-card border border-border p-8 rounded-3xl shadow-2xl sticky top-24">
            <div className="text-5xl font-space-grotesk font-black italic text-primary mb-8 tracking-tighter">
              {new Intl.NumberFormat('en-US', { style: 'currency', currency: listing.currency, maximumFractionDigits: 0 }).format(listing.price)}
            </div>

            <div className="space-y-3">
              <form action={handleMessage}>
                <button type="submit" className="w-full bg-primary text-white py-4 rounded-2xl font-black uppercase italic text-lg hover:scale-[1.02] transition-all shadow-lg shadow-primary/25 flex items-center justify-center gap-2">
                    <MessageSquare className="h-5 w-5 fill-current" />
                    Message Seller
                </button>
              </form>
              <button className="w-full border-2 border-border py-4 rounded-2xl font-black uppercase italic text-lg hover:bg-accent transition-all">
                Make Offer
              </button>
            </div>

            <div className="mt-10 pt-8 border-t border-border/50">
                <div className="flex items-center gap-4">
                    <div className="h-14 w-14 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center font-black text-primary italic text-xl">
                        {listing.profiles?.username?.[0].toUpperCase()}
                    </div>
                    <div>
                        <div className="font-black italic uppercase text-lg">@{listing.profiles?.username}</div>
                        <div className="text-[10px] text-muted-foreground font-black uppercase tracking-widest flex items-center gap-1">
                            <ShieldCheck className="h-3 w-3 text-green-500" />
                            {listing.profiles?.verification_level} Member
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ShieldCheck({ className }: { className?: string }) {
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/></svg>
}

function DemoListingDetail({ id }: { id: string }) {
    const demoData: Record<string, any> = {
        'demo-1': {
            title: '2024 KTM 300 XC-W',
            price: 9800,
            currency: 'USD',
            location_name: 'Hood River, OR',
            type: 'machine',
            machines: { year: 2024, make: 'KTM', model: '300 XC-W', hours: 12, condition: 'excellent' },
            listing_media: [{ url: 'https://images.unsplash.com/photo-1558981806-ec527fa84c3d?auto=format&fit=crop&w=1200&q=80' }],
            profiles: { username: 'ktm_rider', verification_level: 'verified' },
            description: 'Absolutely mint 2024 KTM 300 XC-W. Fuel injected, only 12 hours. Ready to roost. Comes with FMF Gnarly pipe and carbon guard.'
        },
        'demo-2': {
            title: 'Secure Shop Space',
            price: 150,
            currency: 'USD',
            location_name: 'Bend, OR',
            type: 'storage',
            listing_media: [{ url: 'https://images.unsplash.com/photo-1595079676339-1534801ad6cf?auto=format&fit=crop&w=1200&q=80' }],
            profiles: { username: 'shop_master', verification_level: 'verified' },
            description: 'Heated shop space available for rent. Secure, 24/7 access. Perfect for storing bikes or working on builds.'
        }
    };

    const listing = demoData[id] || demoData['demo-1'];

    return (
        <div className="container py-8 max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-foreground">
                <div className="lg:col-span-2 space-y-8">
                    <div className="aspect-video bg-muted rounded-3xl overflow-hidden border border-border shadow-2xl">
                        <img src={listing.listing_media[0].url} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="space-y-4">
                        <h1 className="text-5xl font-black italic uppercase font-space-grotesk text-primary tracking-tighter">{listing.title}</h1>
                        <div className="flex flex-wrap gap-4 text-[10px] font-black uppercase italic tracking-widest text-muted-foreground">
                            <div className="flex items-center gap-1 bg-muted px-3 py-1 rounded-lg"><MapPin className="h-3 w-3 text-primary" /> {listing.location_name}</div>
                            <div className="flex items-center gap-1 bg-primary/10 text-primary px-3 py-1 rounded-lg">{listing.type}</div>
                        </div>
                        <p className="text-xl text-muted-foreground leading-relaxed pt-6 border-t border-border/50">{listing.description}</p>
                    </div>
                </div>
                <div className="space-y-6">
                    <div className="bg-card border border-border p-8 rounded-3xl shadow-2xl sticky top-24">
                        <div className="text-5xl font-black italic text-primary mb-8 font-space-grotesk">${listing.price.toLocaleString()}</div>
                        <Link href="/login" className="block w-full bg-primary text-white py-4 rounded-2xl font-black uppercase italic text-center hover:scale-[1.02] transition-all shadow-lg shadow-primary/20">Message Seller</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
