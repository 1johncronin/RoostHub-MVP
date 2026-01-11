import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import { Metadata, ResolvingMetadata } from 'next';
import { Logo } from '@/components/layout/Logo';
import { Share2, Download, Bike, ShieldCheck, Instagram, Facebook, Send as SendIcon, Link as LinkIcon } from 'lucide-react';
import Link from 'next/link';

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { id } = await params;
  const supabase = await createClient();

  const { data: post } = await supabase
    .from('posts')
    .select('*, listings(*, machines(*))')
    .eq('id', id)
    .single();

  if (!post) return { title: 'Post Not Found' };

  const title = post.caption || `Check out this RoostHub Reel`;
  const description = post.listings 
    ? `For Sale: ${post.listings.title} | $${post.listings.price.toLocaleString()} | ${post.listings.machines?.hours} Hours`
    : `Epic moto content on RoostHub.`;
  
  const image = post.thumbnail_url || post.media_url;

  return {
    title: `RoostHub | ${title}`,
    description,
    openGraph: {
      title,
      description,
      images: [image],
      type: 'video.other',
      videos: [{ url: post.media_url }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
}

export default async function PostViewPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: post } = await supabase
    .from('posts')
    .select('*, profiles(username), listings(*, machines(*), maintenance_logs(*))')
    .eq('id', id)
    .single();

  if (!post) notFound();

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
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
            
            {/* Sales Overlay (Meta Info) */}
            {post.listings && (
                <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-xl p-4 rounded-2xl border border-white/10">
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="font-black italic uppercase text-sm font-space-grotesk tracking-tight">{post.listings.title}</h3>
                            <div className="text-primary font-black text-lg">${post.listings.price.toLocaleString()}</div>
                        </div>
                        <div className="bg-primary text-white text-[10px] font-black px-2 py-1 rounded uppercase italic">FOR SALE</div>
                    </div>
                    {post.listings.machines && (
                        <div className="mt-2 flex gap-2 text-[9px] font-bold uppercase tracking-widest text-white/60">
                            <span>{post.listings.machines.hours} Hours</span>
                            <span>•</span>
                            <span>{post.listings.location_name}</span>
                        </div>
                    )}
                </div>
            )}
        </div>

        {/* Action Bar */}
        <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
                <button className="bg-white text-black py-4 rounded-2xl font-black uppercase italic text-sm flex items-center justify-center gap-2 hover:bg-zinc-200 transition-all">
                    <Download className="h-4 w-4" /> Save Video
                </button>
                <button className="bg-primary text-white py-4 rounded-2xl font-black uppercase italic text-sm flex items-center justify-center gap-2 hover:opacity-90 shadow-lg shadow-primary/20 transition-all">
                    <Share2 className="h-4 w-4" /> Share Link
                </button>
            </div>

            <div className="flex justify-between items-center px-2">
                <button className="flex flex-col items-center gap-1 group">
                    <div className="p-3 bg-zinc-800 rounded-full group-hover:bg-gradient-to-tr from-[#f09433] via-[#e6683c] to-[#bc1888] transition-all">
                        <Instagram className="h-5 w-5" />
                    </div>
                    <span className="text-[10px] font-bold text-zinc-500 group-hover:text-white uppercase">Instagram</span>
                </button>
                <button className="flex flex-col items-center gap-1 group">
                    <div className="p-3 bg-zinc-800 rounded-full group-hover:bg-black transition-all">
                        <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.89-.6-4.13-1.47-.13 1.15-.14 2.3-.14 3.45 0 1.93-.35 3.91-1.58 5.45-1.27 1.64-3.25 2.63-5.3 2.89-2.06.26-4.34-.24-5.99-1.74-1.65-1.74-2.55-3.75-2.43-5.92.12-2.17 1.21-4.28 3.08-5.46 1.64-1.04 3.71-1.32 5.58-.72V7.05c-1.35-.42-2.8-.29-4.01.44-1.21.73-2.1 1.99-2.3 3.39-.2 1.4.15 2.89 1.01 4.01.86 1.12 2.23 1.83 3.62 1.9 1.4.07 2.85-.43 3.8-1.44.95-1.01 1.35-2.45 1.35-3.83V.02z"/></svg>
                    </div>
                    <span className="text-[10px] font-bold text-zinc-500 group-hover:text-white uppercase">TikTok</span>
                </button>
                <button className="flex flex-col items-center gap-1 group">
                    <div className="p-3 bg-zinc-800 rounded-full group-hover:bg-[#1877F2] transition-all">
                        <Facebook className="h-5 w-5" />
                    </div>
                    <span className="text-[10px] font-bold text-zinc-500 group-hover:text-white uppercase">Facebook</span>
                </button>
                <button className="flex flex-col items-center gap-1 group">
                    <div className="p-3 bg-zinc-800 rounded-full group-hover:bg-[#1DA1F2] transition-all">
                        <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 7.719 8.502 11.231h-6.653l-5.208-6.817-5.964 6.817H1.613l7.73-8.258L1.15 2.25h6.822l4.704 6.229 5.568-6.229zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/></svg>
                    </div>
                    <span className="text-[10px] font-bold text-zinc-500 group-hover:text-white uppercase">X / Twitter</span>
                </button>
            </div>
        </div>

        {/* Seller Info / History */}
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
                
                {post.listings.maintenance_logs?.length > 0 && (
                    <div className="pt-4 border-t border-white/5">
                        <div className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-2">Omniscient History</div>
                        <p className="text-xs text-white/60 leading-relaxed">
                            This machine has <span className="text-white font-bold">{post.listings.maintenance_logs.length} documented service events</span>. 
                            The history is certified by RoostHub.
                        </p>
                    </div>
                )}
            </div>
        )}
      </div>
    </div>
  );
}