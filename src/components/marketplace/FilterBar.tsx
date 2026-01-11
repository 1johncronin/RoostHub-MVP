'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Search, Bell, Check, MapPin } from 'lucide-react';
import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';

const FILTERS = [
  { label: 'All', value: undefined },
  { label: 'Machines', value: 'machine' },
  { label: 'Parts', value: 'part' },
  { label: 'Gear', value: 'gear' },
  { label: 'Roostorage', value: 'storage' },
];

const SORT_OPTIONS = [
  { label: 'Newest', value: 'newest' },
  { label: 'Price: Low to High', value: 'price_low' },
  { label: 'Price: High to Low', value: 'price_high' },
  { label: 'Nearest', value: 'nearest' },
];

const RADIUS_OPTIONS = [
  { label: '50 Miles', value: '50' },
  { label: '100 Miles', value: '100' },
  { label: '250 Miles', value: '250' },
  { label: '500 Miles', value: '500' },
  { label: 'Nationwide', value: 'all' },
];

export function FilterBar({ currentType }: { currentType?: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('q') || '');
  const [zip, setZip] = useState(searchParams.get('zip') || '');
  const [radius, setRadius] = useState(searchParams.get('radius') || 'all');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const supabase = createClient();

  const handleSaveSearch = async () => {
    setSaving(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        alert("Please login to save searches");
        setSaving(false);
        return;
    }

    await supabase.from('saved_searches').insert({
        user_id: user.id,
        search_query: search,
        filter_type: currentType,
    });

    setSaved(true);
    setSaving(false);
    setTimeout(() => setSaved(false), 2000);
  };

  // Debounce search update
  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (search) params.set('q', search); else params.delete('q');
      if (zip) params.set('zip', zip); else params.delete('zip');
      if (radius !== 'all') params.set('radius', radius); else params.delete('radius');
      
      router.push(`/marketplace?${params.toString()}`);
    }, 500);

    return () => clearTimeout(timer);
  }, [search, zip, radius, router, searchParams]);

  function handleFilter(type?: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (type) {
      params.set('type', type);
    } else {
      params.delete('type');
    }
    router.push(`/marketplace?${params.toString()}`);
  }

  function handleSort(sort: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', sort);
    router.push(`/marketplace?${params.toString()}`);
  }

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
      <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
        {FILTERS.map((filter) => (
          <button
            key={filter.label}
            onClick={() => handleFilter(filter.value)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-bold uppercase italic font-space-grotesk transition-all border",
              currentType === filter.value
                ? "bg-primary text-primary-foreground border-primary shadow-[0_0_15px_-3px_rgba(107,44,245,0.4)]"
                : "bg-background border-border text-muted-foreground hover:border-primary hover:text-primary"
            )}
          >
            {filter.label}
          </button>
        ))}

        {/* Save Search Button */}
        {(search || currentType) && (
            <button 
                onClick={handleSaveSearch}
                disabled={saving}
                className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-black uppercase italic transition-all border shrink-0",
                    saved ? "bg-green-500 border-green-500 text-white" : "border-primary/30 text-primary hover:bg-primary/5"
                )}
            >
                {saved ? <Check className="h-3 w-3" /> : <Bell className={cn("h-3 w-3", saving && "animate-bounce")} />}
                {saved ? "Saved!" : "Alert Me"}
            </button>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        <div className="flex gap-2">
            <div className="relative w-28 shrink-0">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                    type="text"
                    placeholder="Zip"
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                    maxLength={5}
                    className="w-full pl-9 pr-2 py-2 rounded-xl bg-muted/50 border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm font-bold"
                />
            </div>
            <select
                value={radius}
                onChange={(e) => setRadius(e.target.value)}
                className="bg-muted/50 border border-border rounded-xl px-3 py-2 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all cursor-pointer uppercase italic"
            >
                {RADIUS_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
        </div>

        <div className="relative flex-1 sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search listings..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-muted/50 border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm"
          />
        </div>

        <select
          onChange={(e) => handleSort(e.target.value)}
          value={searchParams.get('sort') || 'newest'}
          className="bg-muted/50 border border-border rounded-xl px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all cursor-pointer"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}