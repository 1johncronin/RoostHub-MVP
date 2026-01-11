'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Search } from 'lucide-react';
import { useState, useEffect } from 'react';

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
];

export function FilterBar({ currentType }: { currentType?: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('q') || '');

  // Debounce search update
  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (search) {
        params.set('q', search);
      } else {
        params.delete('q');
      }
      router.push(`/marketplace?${params.toString()}`);
    }, 500);

    return () => clearTimeout(timer);
  }, [search, router, searchParams]);

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
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
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
