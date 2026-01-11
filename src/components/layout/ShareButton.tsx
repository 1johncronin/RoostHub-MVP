'use client';

import { Share2, Check } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface ShareButtonProps {
  title: string;
  text?: string;
  url?: string;
  className?: string;
  variant?: 'outline' | 'ghost' | 'default';
  showLabel?: boolean;
}

export function ShareButton({ title, text, url, className, variant = 'default', showLabel = false }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareUrl = url || window.location.href;
    const shareData = {
      title,
      text: text || `Check out this listing on RoostHub: ${title}`,
      url: shareUrl,
    };

    if (navigator.share && navigator.canShare?.(shareData)) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Error sharing', err);
      }
    } else {
      // Fallback to clipboard
      try {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy: ', err);
      }
    }
  };

  return (
    <button
      onClick={handleShare}
      className={cn(
        "flex items-center gap-2 transition-all active:scale-95",
        variant === 'outline' && "border border-border p-3 rounded-xl hover:bg-accent",
        variant === 'ghost' && "p-2 hover:bg-accent rounded-full",
        variant === 'default' && "bg-muted/50 border border-border p-4 rounded-2xl flex items-center justify-center text-xs font-black uppercase italic hover:bg-muted w-full",
        className
      )}
    >
      {copied ? (
        <Check className={cn("h-4 w-4 text-green-500", !showLabel && "h-5 w-5")} />
      ) : (
        <Share2 className={cn("h-4 w-4", !showLabel && "h-5 w-5")} />
      )}
      {showLabel && <span>{copied ? 'Copied!' : 'Share'}</span>}
      {variant === 'default' && !showLabel && <span>{copied ? 'Link Copied!' : 'Share This Listing'}</span>}
    </button>
  );
}
