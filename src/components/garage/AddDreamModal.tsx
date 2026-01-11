'use client';

import { useState } from 'react';
import { addGarageDream } from '@/app/actions/dreams';
import { Plus, X, Star, Loader2 } from 'lucide-react';
import { MOTORSPORT_MAKES, MACHINE_MODELS } from '@/lib/data/machine-reference';

export function AddDreamModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedMake, setSelectedMake] = useState('');

  const availableModels = MACHINE_MODELS[selectedMake] || [];

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const res = await addGarageDream(formData);
    if (res.success) {
      setIsOpen(false);
    } else {
      alert(res.error);
    }
    setLoading(false);
  }

  if (!isOpen) return (
    <button 
        onClick={() => setIsOpen(true)}
        className="p-2 bg-primary/10 text-primary hover:bg-primary hover:text-white rounded-xl transition-all"
    >
        <Plus className="h-4 w-4" />
    </button>
  );

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-card border-2 border-border w-full max-w-md rounded-[40px] p-8 shadow-2xl space-y-6 relative">
        <button onClick={() => setIsOpen(false)} className="absolute top-6 right-6 p-2 hover:bg-muted rounded-full transition-colors">
            <X className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-3">
            <div className="p-3 bg-primary/10 rounded-2xl">
                <Star className="h-6 w-6 text-primary fill-primary" />
            </div>
            <div>
                <h3 className="font-black text-xl italic uppercase font-space-grotesk">Dream Machine</h3>
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-tight">Set alerts for your next ride.</p>
            </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Make</label>
                    <select 
                        name="make" 
                        required 
                        value={selectedMake}
                        onChange={(e) => setSelectedMake(e.target.value)}
                        className="w-full p-3 rounded-xl bg-muted/50 border border-border focus:ring-2 focus:ring-primary/50 outline-none font-bold"
                    >
                        <option value="">Any Make</option>
                        {MOTORSPORT_MAKES.map(m => <option key={m.name} value={m.name}>{m.name}</option>)}
                    </select>
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Model</label>
                    <select 
                        name="model" 
                        disabled={!selectedMake}
                        className="w-full p-3 rounded-xl bg-muted/50 border border-border focus:ring-2 focus:ring-primary/50 outline-none font-bold italic disabled:opacity-50"
                    >
                        <option value="">{selectedMake ? 'Any Model' : 'Choose Make'}</option>
                        {availableModels.map(m => <option key={m} value={m}>{m}</option>)}
                        <option value="Other">Other / Custom</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Min Year</label>
                    <input name="min_year" type="number" placeholder="2020" className="w-full p-3 rounded-xl bg-muted/50 border border-border focus:ring-2 focus:ring-primary/50 outline-none font-bold" />
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Max Price</label>
                    <input name="max_price" type="number" placeholder="10000" className="w-full p-3 rounded-xl bg-muted/50 border border-border focus:ring-2 focus:ring-primary/50 outline-none font-bold" />
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Search Radius (KM)</label>
                <input name="radius" type="number" defaultValue={100} className="w-full p-3 rounded-xl bg-muted/50 border border-border focus:ring-2 focus:ring-primary/50 outline-none font-bold" />
            </div>

            <button 
                type="submit" 
                disabled={loading}
                className="w-full py-4 bg-primary text-white rounded-[20px] font-black uppercase italic text-sm hover:scale-[1.02] transition-all shadow-xl shadow-primary/30 flex items-center justify-center gap-2"
            >
                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Subscribe to Dream"}
            </button>
        </form>
      </div>
    </div>
  );
}
