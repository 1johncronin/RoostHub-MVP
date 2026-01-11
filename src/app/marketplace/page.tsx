import { createClient } from '@/lib/supabase/server';
import { ListingCard } from '@/components/marketplace/ListingCard';
import { FilterBar } from '@/components/marketplace/FilterBar';

export default async function MarketplacePage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string; q?: string; sort?: string }>;
}) {
  const supabase = await createClient();
  const params = await searchParams;
  const type = params.type;
  const query = params.q;
  const sort = params.sort || 'newest';

  let dbQuery = supabase
    .from('listings')
    .select(`
      *,
      machines(year, make, model),
      listing_media(url, sort_order)
    `)
    .eq('status', 'active');

  if (type) {
    dbQuery = dbQuery.eq('type', type);
  }
  
  if (query) {
    // Search in title and description
    dbQuery = dbQuery.or(`title.ilike.%${query}%,description.ilike.%${query}%`);
  }

  // Sorting logic
  if (sort === 'newest') {
    dbQuery = dbQuery.order('created_at', { ascending: false });
  } else if (sort === 'price_low') {
    dbQuery = dbQuery.order('price', { ascending: true });
  } else if (sort === 'price_high') {
    dbQuery = dbQuery.order('price', { ascending: false });
  }

  const { data: listings } = await dbQuery;

  // Placeholder data if DB is empty (for demo purposes)
  const displayListings = listings?.length ? listings : [
    {
      id: 'demo-1',
      title: '2024 KTM 300 XC-W (Demo)',
      price: 9800,
      currency: 'USD',
      location_name: 'Hood River, OR',
      type: 'machine',
      machines: { year: 2024, make: 'KTM', model: '300 XC-W' },
      listing_media: [{ url: 'https://images.unsplash.com/photo-1558981806-ec527fa84c3d?auto=format&fit=crop&w=800&q=80' }]
    },
    {
      id: 'demo-2',
      title: 'Snowbike Kit - Timbersled Aro (Demo)',
      price: 4500,
      currency: 'USD',
      location_name: 'Bend, OR',
      type: 'part',
      listing_media: [{ url: 'https://images.unsplash.com/photo-1517502166878-35c93a0072f0?auto=format&fit=crop&w=800&q=80' }]
    },
    {
      id: 'demo-3',
      title: 'Fox V3 Helmet - Medium (Demo)',
      price: 350,
      currency: 'USD',
      location_name: 'Portland, OR',
      type: 'gear',
      listing_media: []
    }
  ];

  return (
    <div className="container min-h-screen py-8">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-4xl font-roboto-condensed font-bold italic uppercase tracking-tight">Marketplace</h1>
          <p className="text-muted-foreground">Find your next ride, part, or kit.</p>
        </div>

        <FilterBar currentType={type} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayListings.map((listing: any) => (
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
            />
          ))}
        </div>
        
        {displayListings.length === 0 && (
            <div className="py-20 text-center text-muted-foreground">
                No listings found. Be the first to post!
            </div>
        )}
      </div>
    </div>
  );
}
