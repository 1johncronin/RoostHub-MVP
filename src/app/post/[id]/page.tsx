import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import { Metadata, ResolvingMetadata } from 'next';
import { Logo } from '@/components/layout/Logo';
import { Share2, Download, Bike, ShieldCheck } from 'lucide-react';
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
        <div className="grid grid-cols-2 gap-4">
            <button className="bg-white text-black py-4 rounded-2xl font-black uppercase italic text-sm flex items-center justify-center gap-2 hover:bg-zinc-200 transition-all">
                <Download className="h-4 w-4" /> Save Video
            </button>
            <button className="bg-primary text-white py-4 rounded-2xl font-black uppercase italic text-sm flex items-center justify-center gap-2 hover:opacity-90 shadow-lg shadow-primary/20 transition-all">
                <Share2 className="h-4 w-4" /> Share Link
            </button>
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
