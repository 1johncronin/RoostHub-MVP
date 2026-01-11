'use client';

import { History } from 'lucide-react';
import { generateCertifiedHistory } from '@/lib/pdf-generator';

export function HistoryButton({ machine, logs }: { machine: any; logs: any[] }) {
  return (
    <button 
        onClick={() => generateCertifiedHistory(machine, logs)}
        className="px-4 py-2 bg-muted hover:bg-primary hover:text-primary-foreground rounded-lg text-xs font-black uppercase italic transition-all flex items-center gap-2"
    >
        <History className="h-3 w-3" /> Certified History
    </button>
  );
}
