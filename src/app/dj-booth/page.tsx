'use client';

import { useState, useRef } from 'react';
import { Upload, Music, Video, Scissors, Play, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { createClient } from '@/lib/supabase/client';

export default function DJBoothPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const supabase = createClient();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleProcess = async () => {
    if (!selectedFile) return;
    setIsProcessing(true);

    try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            alert("Please login first");
            return;
        }

        // 1. Upload File
        const fileName = `${user.id}/reels/${Date.now()}-${selectedFile.name}`;
        console.log('Uploading DJ reel to path:', fileName);

        const { data: uploadData, error: uploadError } = await supabase.storage
            .from('listing-media') 
            .upload(fileName, selectedFile);

        if (uploadError) {
            console.error('DJ Upload Error:', uploadError);
            throw uploadError;
        }

        const { data: { publicUrl } } = supabase.storage.from('listing-media').getPublicUrl(fileName);

        // 2. Create Post
        // Optional: Let user link a listing here. For MVP we'll grab the latest machine.
        const { data: latestListing } = await supabase
            .from('listings')
            .select('id')
            .eq('seller_id', user.id)
            .eq('type', 'machine')
            .order('created_at', { ascending: false })
            .limit(1)
            .single();

        const { data: post, error: postError } = await supabase
            .from('posts')
            .insert({
                author_id: user.id,
                media_url: publicUrl,
                post_type: 'dj_reel',
                linked_listing_id: latestListing?.id || null,
                caption: "New build highlights from the DJ Booth! 🏁"
            })
            .select()
            .single();

        if (postError) throw postError;

        // 3. Create Render Job (Background)
        await supabase.from('render_jobs').insert({
            user_id: user.id,
            template_id: 'hype-reel',
            status: 'pending',
            input_assets: [fileName]
        });

        window.location.href = `/post/${post.id}`;
    } catch (error: any) {
        console.error(error);
        alert("Error: " + error.message);
    } finally {
        setIsProcessing(false);
    }
  };

  return (
    <div className="container min-h-screen py-8 flex flex-col md:flex-row gap-8">
        {/* Left: Editor */}
        <div className="flex-1 flex flex-col gap-6">
            <div>
                <h1 className="text-3xl font-roboto-condensed font-bold italic uppercase tracking-tight flex items-center gap-2">
                    DJ BOOTH <span className="text-primary text-sm not-italic font-normal normal-case border border-primary px-2 py-0.5 rounded-full">Beta</span>
                </h1>
                <p className="text-muted-foreground">Create highlight reels from your ride footage.</p>
            </div>

            <div className="aspect-video bg-black rounded-xl overflow-hidden relative group border border-border">
                {previewUrl ? (
                    <video src={previewUrl} controls className="w-full h-full object-contain" />
                ) : (
                    <div 
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full h-full flex flex-col items-center justify-center text-muted-foreground hover:bg-white/5 transition-colors cursor-pointer"
                    >
                        <Upload className="h-12 w-12 mb-4 opacity-50" />
                        <p className="font-medium">Upload Clip</p>
                        <p className="text-xs opacity-70">Drag & drop or click to browse</p>
                    </div>
                )}
                <input 
                    type="file" 
                    accept="video/*" 
                    ref={fileInputRef} 
                    onChange={handleFileSelect} 
                    className="hidden" 
                />
            </div>

            {/* Timeline / Controls Stub */}
            <div className="bg-card border border-border p-4 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button className="p-2 hover:bg-accent rounded-md text-muted-foreground hover:text-foreground">
                        <Scissors className="h-5 w-5" />
                    </button>
                    <button className="p-2 hover:bg-accent rounded-md text-muted-foreground hover:text-foreground">
                        <Music className="h-5 w-5" />
                    </button>
                    <button className="p-2 hover:bg-accent rounded-md text-muted-foreground hover:text-foreground">
                        <Video className="h-5 w-5" />
                    </button>
                </div>
                <div className="h-1 flex-1 bg-muted mx-4 rounded-full overflow-hidden">
                    <div className="h-full w-1/3 bg-primary/50" />
                </div>
                <span className="text-xs font-mono text-muted-foreground">00:00 / 00:15</span>
            </div>
        </div>

        {/* Right: Sidebar Actions */}
        <div className="w-full md:w-80 flex flex-col gap-6">
            <div className="bg-card border border-border rounded-xl p-6 space-y-4">
                <h3 className="font-bold">Templates</h3>
                <div className="space-y-2">
                    {['Hype Reel (15s)', 'Slow Motion', 'Story Mode (9:16)'].map((t, i) => (
                        <button key={i} className="w-full text-left px-4 py-3 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-all text-sm font-medium">
                            {t}
                        </button>
                    ))}
                </div>
            </div>

            <button 
                onClick={handleProcess}
                disabled={!selectedFile || isProcessing}
                className={cn(
                    "w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all",
                    !selectedFile 
                        ? "bg-muted text-muted-foreground cursor-not-allowed"
                        : "bg-primary text-primary-foreground hover:scale-[1.02] shadow-lg shadow-primary/25"
                )}
            >
                {isProcessing ? (
                    <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Uploading...
                    </>
                ) : (
                    <>
                        <Play className="h-5 w-5 fill-current" />
                        Generate Reel
                    </>
                )}
            </button>
        </div>
    </div>
  );
}
