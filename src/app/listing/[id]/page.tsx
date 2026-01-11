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

export default async function ListingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: listing } = await supabase
    .from('listings')
    .select(`
      *,
      profiles(username, avatar_url, verification_level),
      machines(*),
      parts(*),
      listing_media(*)
    `)
    .eq('id', id)
    .single();

  if (!listing) {
    // Check if it's a demo ID (from the marketplace page logic)
    if (id.startsWith('demo-')) {
        return <DemoListingDetail id={id} />;
    }
    notFound();
  }

  return (
    <div className="container py-8 max-w-6xl">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Media & Details */}
        <div className="lg:col-span-2 space-y-8">
          <div className="aspect-video bg-muted rounded-2xl overflow-hidden border border-border">
            {listing.listing_media?.[0] ? (
              <img src={listing.listing_media[0].url} alt={listing.title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground italic font-roboto-condensed text-xl">No Media Provided</div>
            )}
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <h1 className="text-4xl font-roboto-condensed font-bold italic uppercase tracking-tighter">{listing.title}</h1>
              <div className="flex gap-2">
                <button className="p-2 border border-border rounded-full hover:bg-accent"><Share2 className="h-5 w-5" /></button>
                <button className="p-2 border border-border rounded-full hover:bg-accent text-destructive"><Heart className="h-5 w-5" /></button>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground font-medium">
              <div className="flex items-center gap-1 bg-muted px-3 py-1 rounded-full"><MapPin className="h-4 w-4" /> {listing.location_name}</div>
              <div className="flex items-center gap-1 bg-muted px-3 py-1 rounded-full"><Calendar className="h-4 w-4" /> Posted Jan 10, 2026</div>
              <div className="flex items-center gap-1 bg-muted px-3 py-1 rounded-full capitalize">{listing.type}</div>
            </div>

            <div className="prose prose-invert max-w-none pt-4 border-t border-border">
              <h2 className="text-xl font-bold uppercase italic font-roboto-condensed">Description</h2>
              <p className="text-muted-foreground whitespace-pre-wrap">{listing.description || "No description provided."}</p>
            </div>

            {listing.machines && (
                <div className="pt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-4 bg-muted/50 rounded-xl border border-border">
                        <span className="text-xs text-muted-foreground uppercase font-bold tracking-widest block mb-1">Year</span>
                        <span className="text-lg font-bold">{listing.machines.year}</span>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-xl border border-border">
                        <span className="text-xs text-muted-foreground uppercase font-bold tracking-widest block mb-1">Make</span>
                        <span className="text-lg font-bold">{listing.machines.make}</span>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-xl border border-border">
                        <span className="text-xs text-muted-foreground uppercase font-bold tracking-widest block mb-1">Model</span>
                        <span className="text-lg font-bold">{listing.machines.model}</span>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-xl border border-border">
                        <span className="text-xs text-muted-foreground uppercase font-bold tracking-widest block mb-1">Condition</span>
                        <span className="text-lg font-bold capitalize">{listing.machines.condition || 'N/A'}</span>
                    </div>
                </div>
            )}
          </div>
        </div>

        {/* Right: Actions / Pricing */}
        <div className="space-y-6">
          <div className="bg-card border border-border p-6 rounded-2xl shadow-lg sticky top-24">
            <div className="text-4xl font-roboto-condensed font-black italic text-primary mb-6">
              {new Intl.NumberFormat('en-US', { style: 'currency', currency: listing.currency }).format(listing.price)}
            </div>

            <div className="space-y-3">
              <button className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-bold text-lg hover:bg-primary/90 flex items-center justify-center gap-2">
                <MessageSquare className="h-5 w-5 fill-current" />
                Message Seller
              </button>
              <button className="w-full border border-border py-4 rounded-xl font-bold text-lg hover:bg-accent transition-colors">
                Make Offer
              </button>
            </div>

            <div className="mt-8 pt-6 border-t border-border">
                <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">
                        {listing.profiles?.username?.[0].toUpperCase()}
                    </div>
                    <div>
                        <div className="font-bold">@{listing.profiles?.username}</div>
                        <div className="text-xs text-muted-foreground font-medium flex items-center gap-1">
                            <ShieldCheck className="h-3 w-3 text-primary" />
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
    return (
        <div className="container py-20 text-center">
            <h1 className="text-2xl font-bold italic mb-4 uppercase font-roboto-condensed">DEMO CONTENT</h1>
            <p className="text-muted-foreground max-w-sm mx-auto">This is a placeholder for demo item <span className="font-mono text-primary">{id}</span>. Create a real listing via the Sell Wizard to see the full detail view.</p>
            <Link href="/marketplace" className="mt-8 inline-block text-primary underline">Back to Marketplace</Link>
        </div>
    );
}
