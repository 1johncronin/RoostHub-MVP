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
      machines(year, make, model, category, hours),
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

  // HIGH-FIDELITY DEMO DATA (Correct Structure)
  const displayListings = (listings && listings.length > 0) ? listings : [
    {
      id: 'demo-1',
      title: '2024 KTM 300 XC-W',
      price: 9800,
      currency: 'USD',
      location_name: 'Hood River, OR',
      location_lat: 45.7082,
      location_lng: -121.5175,
      type: 'machine',
      is_featured: true,
      machines: { year: 2024, make: 'KTM', model: '300 XC-W', hours: 12 },
      listing_media: [{ url: 'https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?q=80&w=1200&auto=format&fit=crop' }]
    },
    {
      id: 'demo-2',
      title: 'Secure Shop Space',
      price: 150,
      currency: 'USD',
      location_name: 'Bend, OR',
      location_lat: 44.0582,
      location_lng: -121.3153,
      type: 'storage',
      is_featured: true,
      machines: null,
      listing_media: [{ url: 'https://images.unsplash.com/photo-1513828583688-c52646db42da?q=80&w=1200&auto=format&fit=crop' }]
    },
    {
      id: 'demo-3',
      title: 'YZ450F Factory Parts',
      price: 450,
      currency: 'USD',
      location_name: 'Portland, OR',
      location_lat: 45.5152,
      location_lng: -122.6784,
      type: 'part',
      is_featured: false,
      machines: null,
      listing_media: [{ url: 'https://images.unsplash.com/photo-1444491741275-3747c53c99b4?q=80&w=1200&auto=format&fit=crop' }]
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
