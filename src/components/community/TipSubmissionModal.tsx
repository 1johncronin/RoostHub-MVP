'use client';

import { useState } from 'react';
import { X, MessageSquare, Loader2, CheckCircle } from 'lucide-react';
import { submitCommunityTip } from '@/app/actions/community';

const CATEGORIES = [
  'Dirt Bike',
  'Snowmobile',
  'ATV / UTV',
  'Buying Used',
  'Maintenance',
  'Safety',
  'Riding Tips',
  'General',
];

interface TipSubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCategory?: string;
}

export function TipSubmissionModal({ isOpen, onClose, defaultCategory }: TipSubmissionModalProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [category, setCategory] = useState(defaultCategory || 'General');
  const [tip, setTip] = useState('');
  const [authorNote, setAuthorNote] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('category', category);
    formData.append('tip', tip);
    formData.append('author_note', authorNote);

    const result = await submitCommunityTip(formData);

    if (result.error) {
      setError(result.error);
      setLoading(false);
    } else {
      setSuccess(true);
      setLoading(false);
      setTimeout(() => {
        onClose();
        setSuccess(false);
        setTip('');
        setAuthorNote('');
      }, 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-card border-2 border-border w-full max-w-lg rounded-[40px] p-8 shadow-2xl relative">
        <button onClick={onClose} className="absolute top-6 right-6 p-2 hover:bg-muted rounded-full transition-colors">
          <X className="h-5 w-5" />
        </button>

        {success ? (
          <div className="text-center py-8">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-black italic uppercase mb-2">Tip Submitted!</h3>
            <p className="text-muted-foreground">Thanks for sharing your knowledge. Your tip will be reviewed and posted soon.</p>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-primary/10 rounded-2xl">
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-black text-xl italic uppercase font-space-grotesk">Share a Tip</h3>
                <p className="text-xs text-muted-foreground">Help the next generation of riders</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1 block mb-2">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full p-3 rounded-xl bg-muted/50 border border-border focus:ring-2 focus:ring-primary/50 outline-none font-bold"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1 block mb-2">
                  Your Tip
                </label>
                <textarea
                  value={tip}
                  onChange={(e) => setTip(e.target.value)}
                  placeholder="Share something you've learned from experience..."
                  className="w-full p-3 rounded-xl bg-muted/50 border border-border focus:ring-2 focus:ring-primary/50 outline-none min-h-[120px] resize-none"
                  maxLength={500}
                />
                <p className="text-xs text-muted-foreground text-right mt-1">{tip.length}/500</p>
              </div>

              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1 block mb-2">
                  How to Credit You (Optional)
                </label>
                <input
                  type="text"
                  value={authorNote}
                  onChange={(e) => setAuthorNote(e.target.value)}
                  placeholder="e.g., '15-year MX rider' or 'Mountain sled guide, CO'"
                  className="w-full p-3 rounded-xl bg-muted/50 border border-border focus:ring-2 focus:ring-primary/50 outline-none"
                  maxLength={50}
                />
              </div>

              {error && (
                <p className="text-sm text-red-500 text-center">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading || tip.length < 20}
                className="w-full py-4 bg-primary text-white rounded-[20px] font-black uppercase italic text-sm hover:scale-[1.02] transition-all shadow-xl shadow-primary/30 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Submit Tip"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
