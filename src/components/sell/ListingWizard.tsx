'use client';

import { useState, useEffect } from 'react';
import { createListing } from '@/app/actions/listings'; 
import { Loader2, Upload, CheckCircle, ChevronRight, ChevronLeft, Info, DollarSign } from 'lucide-react';
import { cn } from '@/lib/utils';
import { createClient } from '@/lib/supabase/client';
import { MOTORSPORT_MAKES, MACHINE_MODELS, getEstimatedValue } from '@/lib/data/machine-reference';

interface WizardProps {
  userId: string;
}

type ListingType = 'machine' | 'part' | 'gear' | 'storage';

export function ListingWizard({ userId }: WizardProps) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [suggestedModels, setSuggestedModels] = useState<string[]>([]);
  const [estimatedValue, setEstimatedValue] = useState<number | null>(null);
  
  const [formData, setFormData] = useState({
    type: 'machine' as ListingType,
    title: '',
    price: '',
    description: '',
    make: '',
    model: '',
    year: '2024',
    location: '',
    hours: '',
    miles: '',
    vin: '',
    space_type: 'Garage',
    access_type: '24/7',
  });

  useEffect(() => {
    async function decodeVin() {
        if (formData.vin.length === 17) {
            try {
                const res = await fetch('/api/ai/decode-vin', {
                    method: 'POST',
                    body: JSON.stringify({ vin: formData.vin })
                });
                const data = await res.json();
                if (data.Make || data.Model) {
                    setFormData(prev => ({
                        ...prev,
                        make: data.Make || prev.make,
                        model: data.Model || prev.model,
                        year: data.Year?.toString() || prev.year,
                        title: `${data.Year || prev.year} ${data.Make || prev.make} ${data.Model || prev.model}`
                    }));
                }
            } catch (e) {
                console.error("VIN decoding failed", e);
            }
        }
    }
    decodeVin();
  }, [formData.vin]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const selectSuggestion = (model: string) => {
    setFormData(prev => ({ ...prev, model, title: `${prev.year} ${prev.make} ${model}` }));
  };

  const handleNext = () => setStep(prev => prev + 1);
  const handleBack = () => setStep(prev => prev - 1);

  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const supabase = createClient();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
        setFiles(Array.from(e.target.files));
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
        // 1. Create the listing
        const form = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            form.append(key, value);
        });
        form.append('userId', userId);
        const { id: listingId } = await createListing(form) as any;

        // 2. Upload Files if any
        if (files.length > 0) {
            setUploading(true);
            for (const file of files) {
                const path = `${userId}/${listingId}/${Date.now()}-${file.name}`;
                const { data, error } = await supabase.storage
                    .from('listing-media')
                    .upload(path, file);
                
                if (data) {
                    const { data: { publicUrl } } = supabase.storage.from('listing-media').getPublicUrl(path);
                    await supabase.from('listing_media').insert({
                        listing_id: listingId,
                        url: publicUrl,
                        media_type: file.type.startsWith('video') ? 'video' : 'image'
                    });
                }
            }
        }
        window.location.href = '/marketplace';
    } catch (e) {
        console.error(e);
        alert("Submission failed");
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="bg-card border border-border rounded-3xl p-6 md:p-10 shadow-2xl">
      {/* Progress */}
      <div className="flex items-center gap-4 mb-10 overflow-x-auto no-scrollbar">
        {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex items-center gap-2 flex-shrink-0">
                <div className={cn(
                    "h-8 w-8 rounded-full flex items-center justify-center text-xs font-black italic font-space-grotesk transition-all",
                    step >= s ? "bg-primary text-primary-foreground scale-110 shadow-lg shadow-primary/20" : "bg-muted text-muted-foreground opacity-50"
                )}>
                    {s}
                </div>
                <div className={cn("h-1 w-8 rounded-full", step > s ? "bg-primary" : "bg-muted")} />
            </div>
        ))}
      </div>

      {/* Steps */}
      <div className="min-h-[400px]">
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-3xl font-black italic uppercase font-space-grotesk text-primary">What's for sale?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {['machine', 'part', 'gear', 'storage'].map((t) => (
                <button
                  key={t}
                  onClick={() => setFormData(prev => ({ ...prev, type: t as ListingType }))}
                  className={cn(
                    "p-6 rounded-2xl border-2 text-left transition-all hover:border-primary group relative overflow-hidden",
                    formData.type === t ? "border-primary bg-primary/5" : "border-border bg-muted/20"
                  )}
                >
                  <span className="capitalize font-black italic font-space-grotesk text-xl block mb-1 group-hover:text-primary transition-colors">
                    {t === 'storage' ? 'Roostorage' : t}
                  </span>
                  <span className="text-[10px] text-muted-foreground font-bold uppercase leading-tight">
                    {t === 'machine' ? 'Dirt bikes, sleds, ATVs' : t === 'part' ? 'Components & mods' : t === 'gear' ? 'Helmets & apparel' : 'Lease space for toys'}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-3xl font-black italic uppercase font-space-grotesk text-primary">The Specs</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {formData.type === 'storage' ? (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-black uppercase tracking-widest text-muted-foreground mb-2">Space Type</label>
                            <select name="space_type" value={formData.space_type} onChange={handleChange} className="w-full p-3 rounded-xl bg-muted/50 border border-border focus:ring-2 focus:ring-primary/50 outline-none font-bold">
                                <option>Garage</option>
                                <option>Shop</option>
                                <option>Trailer Spot</option>
                                <option>Covered Parking</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-black uppercase tracking-widest text-muted-foreground mb-2">Access</label>
                            <select name="access_type" value={formData.access_type} onChange={handleChange} className="w-full p-3 rounded-xl bg-muted/50 border border-border focus:ring-2 focus:ring-primary/50 outline-none font-bold">
                                <option>24/7</option>
                                <option>Appointment Only</option>
                                <option>Daylight Hours</option>
                            </select>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-black uppercase tracking-widest text-muted-foreground mb-2">Year</label>
                            <select name="year" value={formData.year} onChange={handleChange} className="w-full p-3 rounded-xl bg-muted/50 border border-border focus:ring-2 focus:ring-primary/50 outline-none font-bold">
                                {Array.from({length: 26}, (_, i) => 2026 - i).map(y => (
                                    <option key={y} value={y}>{y}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs font-black uppercase tracking-widest text-muted-foreground mb-2">Make</label>
                            <select name="make" value={formData.make} onChange={handleChange} className="w-full p-3 rounded-xl bg-muted/50 border border-border focus:ring-2 focus:ring-primary/50 outline-none font-bold">
                                <option value="">Select Brand</option>
                                {MOTORSPORT_MAKES.map(m => (
                                    <option key={m.name} value={m.name}>{m.name}</option>
                                ))}
                            </select>
                        </div>

                                            <div className="relative">

                                                <label className="block text-xs font-black uppercase tracking-widest text-muted-foreground mb-2">Model</label>

                                                <input name="model" value={formData.model} onChange={handleChange} autoComplete="off" className="w-full p-3 rounded-xl bg-muted/50 border border-border focus:ring-2 focus:ring-primary/50 outline-none font-bold" placeholder="e.g. 300 XC-W" />

                                                

                                                {suggestedModels.length > 0 && !formData.model.includes(suggestedModels[0]) && (

                                                    <div className="absolute z-50 top-full left-0 w-full mt-2 bg-popover border border-border rounded-xl shadow-2xl p-2 max-h-48 overflow-y-auto overflow-x-hidden backdrop-blur-md">

                                                        {suggestedModels.filter(m => m.toLowerCase().includes(formData.model.toLowerCase())).map(m => (

                                                            <button key={m} onClick={() => selectSuggestion(m)} className="w-full text-left px-4 py-2 hover:bg-primary hover:text-primary-foreground rounded-lg text-sm font-bold transition-colors truncate">

                                                                {m}

                                                            </button>

                                                        ))}

                                                    </div>

                                                )}

                                            </div>

                        

                                            <div>

                                                <label className="block text-xs font-black uppercase tracking-widest text-muted-foreground mb-2">VIN / Serial</label>

                                                <input name="vin" value={formData.vin} onChange={handleChange} className="w-full p-3 rounded-xl bg-muted/50 border border-border focus:ring-2 focus:ring-primary/50 outline-none font-mono uppercase font-bold" placeholder="17-DIGIT VIN" maxLength={17} />

                                                <p className="text-[9px] text-muted-foreground mt-1 font-bold uppercase tracking-tighter italic">Required for secure verification and history.</p>

                                            </div>

                                        </div>

                        
                )}

                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-black uppercase tracking-widest text-muted-foreground mb-2">Hours</label>
                            <input name="hours" type="number" value={formData.hours} onChange={handleChange} className="w-full p-3 rounded-xl bg-muted/50 border border-border focus:ring-2 focus:ring-primary/50 outline-none font-bold" placeholder="0.0" />
                        </div>
                        <div>
                            <label className="block text-xs font-black uppercase tracking-widest text-muted-foreground mb-2">Miles</label>
                            <input name="miles" type="number" value={formData.miles} onChange={handleChange} className="w-full p-3 rounded-xl bg-muted/50 border border-border focus:ring-2 focus:ring-primary/50 outline-none font-bold" placeholder="0" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-black uppercase tracking-widest text-muted-foreground mb-2">Price ($)</label>
                        <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary" />
                            <input name="price" type="number" value={formData.price} onChange={handleChange} className="w-full pl-10 pr-4 py-3 rounded-xl bg-muted/50 border border-border focus:ring-2 focus:ring-primary/50 outline-none font-black text-xl text-primary" placeholder="0.00" />
                        </div>
                        {estimatedValue && (
                            <div className="mt-2 p-3 bg-primary/5 border border-primary/10 rounded-lg flex items-start gap-2">
                                <Info className="h-4 w-4 text-primary mt-0.5" />
                                <p className="text-[10px] font-bold text-primary uppercase tracking-tight">
                                    Roost Intelligence: Average market value for this {formData.make} is approx. ${estimatedValue.toLocaleString()}.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <h2 className="text-3xl font-black italic uppercase font-space-grotesk text-primary">Media</h2>
            <div 
                onClick={() => document.getElementById('file-upload')?.click()}
                className="border-4 border-dashed border-border rounded-3xl p-16 text-center hover:bg-primary/5 hover:border-primary/50 transition-all cursor-pointer flex flex-col items-center justify-center group"
            >
                <div className="p-6 bg-muted rounded-full group-hover:scale-110 transition-transform mb-4">
                    <Upload className="h-12 w-12 text-primary" />
                </div>
                <p className="font-black italic uppercase text-xl font-space-grotesk tracking-tight">
                    {files.length > 0 ? `${files.length} Files Selected` : 'Drop photos here'}
                </p>
                <p className="text-sm text-muted-foreground font-medium mt-2">Up to 10 photos + 1 high-res video clip</p>
                <input 
                    id="file-upload"
                    type="file" 
                    multiple 
                    accept="image/*,video/*" 
                    onChange={handleFileChange}
                    className="hidden" 
                />
            </div>
            {files.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
                    {files.map((f, i) => (
                        <div key={i} className="p-2 bg-muted rounded-lg text-[10px] font-bold truncate uppercase">{f.name}</div>
                    ))}
                </div>
            )}
          </div>
        )}

        {step === 4 && (
          <div className="space-y-8">
            <h2 className="text-3xl font-black italic uppercase font-space-grotesk text-primary">Final Review</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="aspect-[4/3] bg-muted rounded-2xl flex items-center justify-center italic text-muted-foreground font-bold">
                    [Preview Thumbnail]
                </div>
                <div className="space-y-4">
                    <h3 className="text-2xl font-black italic uppercase font-space-grotesk leading-none">{formData.title || 'Untitled Listing'}</h3>
                    <div className="text-3xl font-black italic text-primary font-space-grotesk tracking-tighter">${formData.price || '0.00'}</div>
                    <div className="flex gap-2">
                        <span className="bg-muted px-2 py-1 rounded text-[10px] font-black uppercase">{formData.year}</span>
                        <span className="bg-muted px-2 py-1 rounded text-[10px] font-black uppercase">{formData.make}</span>
                        <span className="bg-muted px-2 py-1 rounded text-[10px] font-black uppercase">{formData.hours || '0'} Hours</span>
                    </div>
                    <p className="text-sm text-muted-foreground font-medium line-clamp-3">{formData.description || 'No description provided.'}</p>
                </div>
            </div>

            <div className="flex items-center gap-3 p-6 bg-primary/10 text-primary rounded-2xl border border-primary/20">
                <CheckCircle className="h-6 w-6 fill-primary text-background" />
                <div className="text-sm font-bold uppercase tracking-tight">Your listing will be verified and boosted immediately.</div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-12 pt-8 border-t border-border">
        <button
          onClick={handleBack}
          disabled={step === 1 || loading}
          className="px-8 py-3 rounded-xl text-sm font-black uppercase italic hover:bg-accent disabled:opacity-50 transition-colors"
        >
          Back
        </button>
        
        {step < 4 ? (
          <button
            onClick={handleNext}
            className="px-8 py-3 rounded-xl bg-foreground text-background dark:bg-white dark:text-black text-sm font-black uppercase italic hover:opacity-90 transition-all flex items-center gap-2 group"
          >
            Next <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-10 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-black uppercase italic hover:scale-105 transition-all shadow-xl shadow-primary/30 flex items-center gap-2"
          >
            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Publish to RoostHub"}
          </button>
        )}
      </div>
    </div>
  );
}
