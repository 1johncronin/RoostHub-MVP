'use client';

import { createClient } from '@/lib/supabase/client';
import { notFound } from 'next/navigation';
import { Logo } from '@/components/layout/Logo';
import { Share2, Download, Bike, ShieldCheck, Instagram, Facebook, Send as SendIcon, Link as LinkIcon, Check, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect, use } from 'react';
import { cn } from '@/lib/utils';

export default function PostViewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const supabase = createClient();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function loadPost() {
      const { data } = await supabase
        .from('posts')
        .select('*, profiles(username), listings(*, machines(*), maintenance_logs(*))')
        .eq('id', id)
        .single();
      
      if (data) setPost(data);
      setLoading(false);
    }
    loadPost();
  }, [id]);

  const handleDownload = async () => {
    if (!post?.media_url) return;
    try {
        const response = await fetch(post.media_url);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `roosthub-reel-${id.slice(0, 5)}.mp4`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
    } catch (e) {
        console.error("Download failed", e);
        alert("Failed to save video. Please try again.");
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) return <div className="min-h-screen bg-black flex items-center justify-center"><Loader2 className="animate-spin text-primary h-12 w-12" /></div>;
  if (!post) notFound();

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 font-sans">
      <div className="max-w-md w-full space-y-6">
        {/* Logo Header */}
        <div className="flex justify-center mb-8">
            <Link href="/"><Logo /></Link>
        </div>

        {/* Video Player */}
        <div className="aspect-[9/16] w-full bg-zinc-900 rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative">
            <video 
                src={post.media_url} 
                controls 
                autoPlay 
                loop 
                className="w-full h-full object-cover"
            />
            
            {/* Sales Overlay */}
            {post.listings && (
                <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-xl p-4 rounded-2xl border border-white/10">
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="font-black italic uppercase text-sm font-space-grotesk tracking-tight">{post.listings.title}</h3>
                            <div className="text-primary font-black text-lg">${post.listings.price.toLocaleString()}</div>
                        </div>
                        <div className="bg-primary text-white text-[10px] font-black px-2 py-1 rounded uppercase italic">FOR SALE</div>
                    </div>
                </div>
            )}
        </div>

        {/* Action Bar */}
        <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
                <button 
                    onClick={handleDownload}
                    className="bg-white text-black py-4 rounded-2xl font-black uppercase italic text-sm flex items-center justify-center gap-2 hover:bg-zinc-200 transition-all active:scale-95"
                >
                    <Download className="h-4 w-4" /> Save Video
                </button>
                <button 
                    onClick={handleCopyLink}
                    className={cn(
                        "py-4 rounded-2xl font-black uppercase italic text-sm flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg",
                        copied ? "bg-green-500 text-white" : "bg-primary text-white shadow-primary/20 hover:opacity-90"
                    )}
                >
                    {copied ? <Check className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}
                    {copied ? "Copied!" : "Share Link"}
                </button>
            </div>

            {/* Social Shortcuts */}
            <div className="flex justify-between items-center px-2 pt-2">
                <button onClick={handleCopyLink} className="flex flex-col items-center gap-1 group">
                    <div className="p-3 bg-zinc-800 rounded-full group-hover:bg-gradient-to-tr from-[#f09433] via-[#e6683c] to-[#bc1888] transition-all">
                        <Instagram className="h-5 w-5" />
                    </div>
                    <span className="text-[9px] font-bold text-zinc-500 uppercase">Insta</span>
                </button>
                <button onClick={handleCopyLink} className="flex flex-col items-center gap-1 group">
                    <div className="p-3 bg-zinc-800 rounded-full group-hover:bg-black transition-all">
                        <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.89-.6-4.13-1.47-.13 1.15-.14 2.3-.14 3.45 0 1.93-.35 3.91-1.58 5.45-1.27 1.64-3.25 2.63-5.3 2.89-2.06.26-4.34-.24-5.99-1.74-1.65-1.5-2.55-3.75-2.43-5.92.12-2.17 1.21-4.28 3.08-5.46 1.64-1.04 3.71-1.32 5.58-.72V7.05c-1.35-.42-2.8-.29-4.01.44-1.21.73-2.1 1.99-2.3 3.39-.2 1.4.15 2.89 1.01 4.01.86 1.12 2.23 1.83 3.62 1.9 1.4.07 2.85-.43 3.8-1.44.95-1.01 1.35-2.45 1.35-3.83V.02z"/></svg>
                    </div>
                    <span className="text-[9px] font-bold text-zinc-500 uppercase">TikTok</span>
                </button>
                <button onClick={handleCopyLink} className="flex flex-col items-center gap-1 group">
                    <div className="p-3 bg-zinc-800 rounded-full group-hover:bg-[#1877F2] transition-all">
                        <Facebook className="h-5 w-5" />
                    </div>
                    <span className="text-[9px] font-bold text-zinc-500 uppercase">FB</span>
                </button>
                <button onClick={handleCopyLink} className="flex flex-col items-center gap-1 group">
                    <div className="p-3 bg-zinc-800 rounded-full group-hover:bg-white group-hover:text-black transition-all">
                        <SendIcon className="h-5 w-5" />
                    </div>
                    <span className="text-[9px] font-bold text-zinc-500 uppercase">Direct</span>
                </button>
            </div>
        </div>

        {/* Seller Info */}
        {post.listings && (
            <div className="bg-zinc-900/50 border border-white/5 p-6 rounded-3xl space-y-4">
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary italic">
                        {post.profiles?.username?.[0].toUpperCase()}
                    </div>
                    <div>
                        <div className="text-sm font-black italic uppercase">@{post.profiles?.username}</div>
                        <div className="text-[10px] text-white/40 font-bold uppercase flex items-center gap-1">
                            <ShieldCheck className="h-3 w-3 text-primary" /> Verified Seller
                        </div>
                    </div>
                </div>
            </div>
        )}
      </div>
    </div>
  );
}
