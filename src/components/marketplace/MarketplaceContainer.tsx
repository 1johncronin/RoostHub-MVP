'use client';

import { useState } from 'react';
import { ListingCard } from './ListingCard';
import { FilterBar } from './FilterBar';
import dynamic from 'next/dynamic';
import { cn } from '@/lib/utils';

const MarketplaceMap = dynamic(() => import('@/components/map/MarketplaceMap'), {
  ssr: false,
  loading: () => <div className="h-[500px] w-full bg-muted animate-pulse rounded-3xl" />
});

export function MarketplaceContainer({ 
    listings, 
    initialView,
    params 
}: { 
    listings: any[], 
    initialView: string,
    params: any
}) {
  const [view, setView] = useState(initialView);

  return (
    <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-black italic uppercase font-space-grotesk text-primary tracking-tighter text-foreground">Marketplace</h1>
            <p className="text-muted-foreground font-medium">Find your next ride or secure Roostorage.</p>
          </div>
          
          <div className="flex bg-muted p-1 rounded-xl">
            <button 
                onClick={() => setView('grid')}
                className={cn("px-4 py-2 rounded-lg text-xs font-black uppercase italic transition-all", view === 'grid' ? "bg-background shadow-sm text-primary" : "text-muted-foreground")}
            >
                Grid
            </button>
            <button 
                onClick={() => setView('map')}
                className={cn("px-4 py-2 rounded-lg text-xs font-black uppercase italic transition-all", view === 'map' ? "bg-background shadow-sm text-primary" : "text-muted-foreground")}
            >
                Map
            </button>
          </div>
        </div>

        <FilterBar currentType={params.type} />

        {view === 'map' ? (
            <MarketplaceMap listings={listings} />
        ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {listings.map((listing: any) => (
                    <ListingCard
                        key={listing.id}
                        id={listing.id}
                        title={listing.title}
                        price={listing.price}
                        currency={listing.currency}
                        location={listing.location_name}
                        imageUrl={listing.listing_media?.[0]?.url}
                        type={listing.type}
                        make={listing.machines?.make}
                        model={listing.machines?.model}
                        year={listing.machines?.year}
                        isFeatured={listing.is_featured}
                    />
                ))}
            </div>
        )}
    </div>
  );
}
