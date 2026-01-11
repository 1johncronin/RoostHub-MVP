'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';

const FILTERS = [
  { label: 'All', value: undefined },
  { label: 'Machines', value: 'machine' },
  { label: 'Parts', value: 'part' },
  { label: 'Gear', value: 'gear' },
];

export function FilterBar({ currentType }: { currentType?: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleFilter(type?: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (type) {
      params.set('type', type);
    } else {
      params.delete('type');
    }
    router.push(`/marketplace?${params.toString()}`);
  }

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
      {FILTERS.map((filter) => (
        <button
          key={filter.label}
          onClick={() => handleFilter(filter.value)}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors border",
            currentType === filter.value
              ? "bg-primary text-primary-foreground border-primary"
              : "bg-background border-border text-muted-foreground hover:border-primary hover:text-primary"
          )}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}
