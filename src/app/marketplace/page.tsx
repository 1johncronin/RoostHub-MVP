import { createClient } from '@/lib/supabase/server';
import { MarketplaceContainer } from '@/components/marketplace/MarketplaceContainer';

export default async function MarketplacePage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string; q?: string; sort?: string; view?: string }>;
}) {
  const supabase = await createClient();
  const params = await searchParams;
  const initialView = params.view || 'grid';
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
    dbQuery = dbQuery.or(`title.ilike.%${query}%,description.ilike.%${query}%`);
  }

  if (sort === 'newest') {
    dbQuery = dbQuery.order('created_at', { ascending: false });
  } else if (sort === 'price_low') {
    dbQuery = dbQuery.order('price', { ascending: true });
  } else if (sort === 'price_high') {
    dbQuery = dbQuery.order('price', { ascending: false });
  }

  const { data: listings } = await dbQuery;

  const displayListings = listings?.length ? listings : [
    {
      id: 'demo-1',
      title: '2024 KTM 300 XC-W (Demo)',
      price: 9800,
      currency: 'USD',
      location_name: 'Hood River, OR',
      location_lat: 45.7082,
      location_lng: -121.5175,
      type: 'machine',
      is_featured: true,
      machines: { year: 2024, make: 'KTM', model: '300 XC-W' },
      listing_media: [{ url: 'https://images.unsplash.com/photo-1558981806-ec527fa84c3d?auto=format&fit=crop&w=800&q=80' }]
    },
    {
      id: 'demo-2',
      title: 'Secure Shop Space (Demo)',
      price: 150,
      currency: 'USD',
      location_name: 'Bend, OR',
      location_lat: 44.0582,
      location_lng: -121.3153,
      type: 'storage',
      listing_media: []
    }
  ];

  return (
    <div className="container min-h-screen py-8">
      <MarketplaceContainer 
        listings={displayListings} 
        initialView={initialView} 
        params={params} 
      />
    </div>
  );
}