'use client';

import { useState } from 'react';
import { MessageSquare, DollarSign, Loader2, Rocket } from 'lucide-react';
import { getOrCreateThread } from '@/app/actions/messages';
import { createBoostCheckout } from '@/app/actions/stripe';
import { cn } from '@/lib/utils';

interface ListingActionsProps {
  listingId: string;
  sellerId: string;
  price: number;
  currentUserId?: string;
}

export function ListingActions({ listingId, sellerId, price, currentUserId }: ListingActionsProps) {
  const [loading, setLoading] = useState(false);
  const [boosting, setBoosting] = useState(false);

  const handleMessage = async () => {
    if (!currentUserId) {
      window.location.href = `/login?returnTo=/listing/${listingId}`;
      return;
    }
    setLoading(true);
    const result = await getOrCreateThread(listingId, sellerId);
    if (result?.error) {
      alert(result.error);
      setLoading(false);
    }
  };

  const handleMakeOffer = () => {
    if (!currentUserId) {
      window.location.href = `/login?returnTo=/listing/${listingId}`;
      return;
    }
    alert("Offer system coming soon! For now, please message the seller directly.");
  };

  const handleBoost = async () => {
    setBoosting(true);
    try {
        await createBoostCheckout(listingId);
    } catch (e) {
        alert("Failed to start checkout. Please try again.");
        setBoosting(false);
    }
  };

  if (currentUserId === sellerId) {
    return (
      <div className="space-y-3">
        <p className="text-xs text-muted-foreground text-center font-bold uppercase italic">This is your listing</p>
        <div className="grid grid-cols-2 gap-3">
            <button 
                onClick={() => window.location.href = `/garage`}
                className="w-full bg-accent text-accent-foreground py-4 rounded-[20px] font-black uppercase italic text-sm hover:bg-accent/80 transition-all active:scale-95"
            >
                Manage
            </button>
            <button 
                onClick={handleBoost}
                disabled={boosting}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-4 rounded-[20px] font-black uppercase italic text-sm hover:scale-105 transition-all shadow-lg shadow-purple-500/25 flex items-center justify-center gap-2 active:scale-95 disabled:opacity-70"
            >
                {boosting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Rocket className="h-4 w-4 fill-current" />}
                Boost Listing
            </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <button 
        onClick={handleMessage}
        disabled={loading}
        className="w-full bg-primary text-white py-5 rounded-[24px] font-black uppercase italic text-xl hover:scale-[1.02] transition-all shadow-xl shadow-primary/30 flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50"
      >
        {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : <MessageSquare className="h-6 w-6 fill-current" />}
        Message Seller
      </button>
      <button 
        onClick={handleMakeOffer}
        className="w-full border-2 border-border py-5 rounded-[24px] font-black uppercase italic text-xl hover:bg-accent transition-all active:scale-95"
      >
        Make Offer
      </button>
    </div>
  );
}
