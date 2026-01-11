'use client';

import { useState, useEffect } from 'react';
import { addToGarage } from '@/app/actions/garage'; 
import { Loader2, Upload, CheckCircle, ChevronRight, ChevronLeft, Info, Bike, Wrench } from 'lucide-react';
import { cn } from '@/lib/utils';
import { createClient } from '@/lib/supabase/client';
import { MOTORSPORT_MAKES } from '@/lib/data/machine-reference';

interface WizardProps {
  userId: string;
}

export function CollectionWizard({ userId }: WizardProps) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: '2024',
    category: 'Motocross',
    hours: '0',
    vin: '',
  });

  const [avatar, setAvatar] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const supabase = createClient();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatar(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
        let avatarUrl = null;

        // 1. Upload Avatar if any
        if (avatar) {
            const path = `${userId}/garage/${Date.now()}-${avatar.name}`;
            const { data } = await supabase.storage.from('listing-media').upload(path, avatar);
            if (data) {
                const { data: { publicUrl } } = supabase.storage.from('listing-media').getPublicUrl(path);
                avatarUrl = publicUrl;
            }
        }

        // 2. Add to Garage
        const form = new FormData();
        Object.entries(formData).forEach(([key, value]) => form.append(key, value));
        if (avatarUrl) form.append('avatar_url', avatarUrl);

        const result = await addToGarage(form);
        if (result.error) throw new Error(result.error);

        window.location.href = '/garage?success=added';
    } catch (e: any) {
        alert(e.message);
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="bg-card border border-border rounded-3xl p-6 md:p-10 shadow-2xl">
      {/* Steps */}
      <div className="min-h-[400px]">
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-3xl font-black italic uppercase font-space-grotesk text-primary">The Hardware</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    <div>
                        <label className="block text-xs font-black uppercase tracking-widest text-muted-foreground mb-2">Model</label>
                        <input name="model" value={formData.model} onChange={handleChange} className="w-full p-3 rounded-xl bg-muted/50 border border-border focus:ring-2 focus:ring-primary/50 outline-none font-bold" placeholder="e.g. CRF450R" />
                    </div>
                </div>
                <div className="space-y-4">
                    <div>
                        <label className="block text-xs font-black uppercase tracking-widest text-muted-foreground mb-2">Hours</label>
                        <input name="hours" type="number" value={formData.hours} onChange={handleChange} className="w-full p-3 rounded-xl bg-muted/50 border border-border focus:ring-2 focus:ring-primary/50 outline-none font-bold" placeholder="0.0" />
                    </div>
                    <div>
                        <label className="block text-xs font-black uppercase tracking-widest text-muted-foreground mb-2">VIN (Optional)</label>
                        <input name="vin" value={formData.vin} onChange={handleChange} className="w-full p-3 rounded-xl bg-muted/50 border border-border focus:ring-2 focus:ring-primary/50 outline-none font-mono uppercase font-bold" placeholder="17-DIGIT VIN" />
                    </div>
                </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-3xl font-black italic uppercase font-space-grotesk text-primary">Fleet Photo</h2>
            <div 
                onClick={() => document.getElementById('avatar-upload')?.click()}
                className="aspect-video border-4 border-dashed border-border rounded-3xl overflow-hidden flex flex-col items-center justify-center cursor-pointer hover:bg-primary/5 transition-all"
            >
                {preview ? (
                    <img src={preview} className="w-full h-full object-cover" />
                ) : (
                    <div className="text-center p-8">
                        <Upload className="h-12 w-12 text-primary mx-auto mb-4" />
                        <p className="font-black italic uppercase text-lg">Add a Photo</p>
                        <p className="text-xs text-muted-foreground font-medium">Show off this machine in your profile collection.</p>
                    </div>
                )}
                <input id="avatar-upload" type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-12 pt-8 border-t border-border">
        <button
          onClick={() => step === 1 ? window.location.href = '/garage' : setStep(1)}
          className="px-8 py-3 rounded-xl text-sm font-black uppercase italic hover:bg-accent transition-colors"
        >
          {step === 1 ? "Cancel" : "Back"}
        </button>
        
        {step === 1 ? (
          <button
            onClick={() => setStep(2)}
            disabled={!formData.make || !formData.model}
            className="px-8 py-3 rounded-xl bg-primary text-white text-sm font-black uppercase italic hover:scale-105 transition-all flex items-center gap-2 disabled:opacity-50"
          >
            Next <ChevronRight className="h-4 w-4" />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-10 py-3 rounded-xl bg-primary text-white text-sm font-black uppercase italic hover:scale-105 transition-all shadow-xl shadow-primary/30 flex items-center gap-2"
          >
            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Add to Garage"}
          </button>
        )}
      </div>
    </div>
  );
}