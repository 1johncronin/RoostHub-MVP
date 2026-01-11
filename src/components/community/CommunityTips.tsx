'use client';

import { useState } from 'react';
import { MessageSquare, Plus } from 'lucide-react';
import { TipSubmissionModal } from './TipSubmissionModal';

interface Tip {
  id: string;
  category: string;
  tip: string;
  author_note: string;
  created_at: string;
}

interface CommunityTipsProps {
  tips: Tip[];
  title?: string;
  showSubmit?: boolean;
  defaultCategory?: string;
  columns?: 1 | 2;
}

export function CommunityTips({
  tips,
  title = "Community Knowledge",
  showSubmit = true,
  defaultCategory,
  columns = 2
}: CommunityTipsProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <MessageSquare className="h-6 w-6 text-primary" />
          <h2 className="text-xl font-black italic uppercase font-space-grotesk">{title}</h2>
        </div>
        {showSubmit && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-xl font-bold text-sm hover:bg-primary/20 transition-colors"
          >
            <Plus className="h-4 w-4" />
            Share a Tip
          </button>
        )}
      </div>

      {tips.length > 0 ? (
        <div className={`grid ${columns === 2 ? 'md:grid-cols-2' : ''} gap-4`}>
          {tips.map((tip) => (
            <TipCard key={tip.id} tip={tip} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10 bg-card border border-dashed border-border rounded-2xl">
          <MessageSquare className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground mb-4">No tips yet. Be the first to share your knowledge!</p>
          {showSubmit && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-2 bg-primary text-white rounded-xl font-bold text-sm hover:scale-105 transition-transform"
            >
              Submit a Tip
            </button>
          )}
        </div>
      )}

      <TipSubmissionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultCategory={defaultCategory}
      />
    </div>
  );
}

function TipCard({ tip }: { tip: Tip }) {
  return (
    <div className="bg-card border border-border rounded-xl p-5 hover:border-primary/30 transition-colors">
      <span className="text-xs font-black uppercase tracking-widest text-primary">{tip.category}</span>
      <p className="text-sm mt-2 mb-3 leading-relaxed">"{tip.tip}"</p>
      <p className="text-xs text-muted-foreground">— {tip.author_note}</p>
    </div>
  );
}

// Standalone tip card for inline use
export function InlineTip({ category, tip, author }: { category: string; tip: string; author: string }) {
  return (
    <div className="bg-card border border-border rounded-xl p-4">
      <span className="text-xs font-black uppercase tracking-widest text-primary">{category}</span>
      <p className="text-sm mt-2 mb-2">"{tip}"</p>
      <p className="text-xs text-muted-foreground">— {author}</p>
    </div>
  );
}
