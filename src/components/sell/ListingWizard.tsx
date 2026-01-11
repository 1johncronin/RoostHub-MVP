'use client';

import { useState } from 'react';
import { createListing } from '@/app/actions/listings'; // We will create this next
import { Loader2, Upload, CheckCircle, ChevronRight, ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

interface WizardProps {
  userId: string;
}

type ListingType = 'machine' | 'part' | 'gear';

export function ListingWizard({ userId }: WizardProps) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    type: 'machine' as ListingType,
    title: '',
    price: '',
    description: '',
    make: '',
    model: '',
    year: '',
    location: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNext = () => setStep(prev => prev + 1);
  const handleBack = () => setStep(prev => prev - 1);

  const handleSubmit = async () => {
    setLoading(true);
    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      form.append(key, value);
    });
    form.append('userId', userId);

    await createListing(form);
    setLoading(false);
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6 md:p-8 shadow-sm">
      {/* Progress */}
      <div className="flex items-center gap-2 mb-8 text-sm font-medium text-muted-foreground">
        <span className={cn(step >= 1 && "text-primary")}>1. Type</span>
        <ChevronRight className="h-4 w-4" />
        <span className={cn(step >= 2 && "text-primary")}>2. Details</span>
        <ChevronRight className="h-4 w-4" />
        <span className={cn(step >= 3 && "text-primary")}>3. Photos</span>
        <ChevronRight className="h-4 w-4" />
        <span className={cn(step >= 4 && "text-primary")}>4. Review</span>
      </div>

      {/* Steps */}
      <div className="min-h-[300px]">
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold">What are you selling?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {['machine', 'part', 'gear'].map((t) => (
                <button
                  key={t}
                  onClick={() => setFormData(prev => ({ ...prev, type: t as ListingType }))}
                  className={cn(
                    "p-6 rounded-lg border-2 text-left transition-all hover:border-primary",
                    formData.type === t ? "border-primary bg-primary/5" : "border-border"
                  )}
                >
                  <span className="capitalize font-bold text-lg block mb-1">{t}</span>
                  <span className="text-sm text-muted-foreground">
                    {t === 'machine' ? 'Dirt bikes, sleds, ATVs' : t === 'part' ? 'Components & mods' : 'Helmets & apparel'}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4 max-w-md">
            <h2 className="text-xl font-bold">The Details</h2>
            
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input name="title" value={formData.title} onChange={handleChange} className="w-full p-2 border rounded-md bg-background" placeholder="2023 KTM 300..." />
            </div>

            <div className="grid grid-cols-2 gap-4">
               <div>
                <label className="block text-sm font-medium mb-1">Price ($)</label>
                <input name="price" type="number" value={formData.price} onChange={handleChange} className="w-full p-2 border rounded-md bg-background" placeholder="0.00" />
              </div>
               <div>
                <label className="block text-sm font-medium mb-1">Location</label>
                <input name="location" value={formData.location} onChange={handleChange} className="w-full p-2 border rounded-md bg-background" placeholder="City, State" />
              </div>
            </div>

            {formData.type === 'machine' && (
               <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Year</label>
                    <input name="year" type="number" value={formData.year} onChange={handleChange} className="w-full p-2 border rounded-md bg-background" placeholder="2024" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Make</label>
                    <input name="make" value={formData.make} onChange={handleChange} className="w-full p-2 border rounded-md bg-background" placeholder="KTM" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Model</label>
                    <input name="model" value={formData.model} onChange={handleChange} className="w-full p-2 border rounded-md bg-background" placeholder="300 XC" />
                  </div>
               </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea name="description" value={formData.description} onChange={handleChange} className="w-full p-2 border rounded-md bg-background min-h-[100px]" placeholder="Tell us about it..." />
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Photos & Video</h2>
            <div className="border-2 border-dashed border-border rounded-xl p-12 text-center hover:bg-muted/50 transition-colors cursor-pointer flex flex-col items-center justify-center">
                <Upload className="h-10 w-10 text-muted-foreground mb-4" />
                <p className="font-medium">Click to upload photos</p>
                <p className="text-xs text-muted-foreground mt-1">JPG, PNG, MP4 allowed</p>
            </div>
            <p className="text-xs text-muted-foreground text-center">For MVP demo, we'll skip actual file upload logic here.</p>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold">Ready to Launch?</h2>
            
            <div className="bg-muted/30 p-4 rounded-lg space-y-2">
                <div className="flex justify-between">
                    <span className="text-muted-foreground">Listing</span>
                    <span className="font-medium">{formData.title || 'Untitled'}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-muted-foreground">Price</span>
                    <span className="font-medium">${formData.price || '0'}</span>
                </div>
                 <div className="flex justify-between">
                    <span className="text-muted-foreground">Category</span>
                    <span className="font-medium capitalize">{formData.type}</span>
                </div>
            </div>

            <div className="flex items-center gap-2 p-4 bg-primary/10 text-primary rounded-lg text-sm">
                <CheckCircle className="h-5 w-5" />
                <span>Your listing will be live immediately after publishing.</span>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-8 pt-6 border-t border-border">
        <button
          onClick={handleBack}
          disabled={step === 1 || loading}
          className="px-6 py-2 rounded-full text-sm font-medium hover:bg-accent disabled:opacity-50"
        >
          Back
        </button>
        
        {step < 4 ? (
          <button
            onClick={handleNext}
            className="px-6 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90"
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-8 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 flex items-center gap-2"
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            Publish Listing
          </button>
        )}
      </div>
    </div>
  );
}
