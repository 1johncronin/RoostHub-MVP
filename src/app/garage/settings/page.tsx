'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { cn } from '@/lib/utils';
import { CheckCircle, XCircle, Phone, Mail, ShieldCheck, Loader2, Bike, Zap, Snowflake, Droplets, Sun, MapPin, Save } from 'lucide-react';
import { useVisualMode } from '@/components/mode-provider';
import { updateProfile as updateProfileAction } from '@/app/actions/profiles';

export default function SettingsPage() {
  const supabase = createClient();
  const { mode, setMode, brand, setBrand } = useVisualMode();
  const [profile, setProfile] = useState<any>(null);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [verifyingPhone, setVerifyingPhone] = useState(false);
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  useEffect(() => {
    async function loadProfile() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        setProfile(data);
      }
      setLoading(false);
    }
    loadProfile();
  }, []);

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !profile) return;

    setUploadingAvatar(true);
    try {
        const fileExt = file.name.split('.').pop();
        const filePath = `${profile.id}/avatar-${Math.random()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
            .from('avatars')
            .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
            .from('avatars')
            .getPublicUrl(filePath);

        const { error: updateError } = await supabase
            .from('profiles')
            .update({ avatar_url: publicUrl })
            .eq('id', profile.id);

        if (updateError) throw updateError;

        setProfile((prev: any) => ({ ...prev, avatar_url: publicUrl }));
        alert("Avatar updated!");
    } catch (error: any) {
        alert(error.message);
    } finally {
        setUploadingAvatar(false);
    }
  };

  const BRANDS = [
    { id: 'roosthub', name: 'RoostHub (Purple)', color: 'bg-[#7C3AED]' },
    { id: 'ktm', name: 'KTM (Orange)', color: 'bg-[#FF6600]' },
    { id: 'yamaha', name: 'Yamaha (Blue)', color: 'bg-[#0000FF]' },
    { id: 'honda', name: 'Honda (Red)', color: 'bg-[#FF0000]' },
    { id: 'kawasaki', name: 'Kawasaki (Green)', color: 'bg-[#00FF00]' },
    { id: 'suzuki', name: 'Suzuki (Yellow)', color: 'bg-[#FFFF00]' },
  ];

  async function handleSetBrand(brandId: string) {
    console.log('Switching to brand:', brandId);
    setBrand(brandId); // Optimistic Update (Immediate UI change)
    
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
        await supabase.from('profiles').update({ theme_brand: brandId }).eq('id', user.id);
        setProfile((prev: any) => ({ ...prev, theme_brand: brandId }));
    }
  }

  async function handleSendOTP() {
    setVerifyingPhone(true);
    const { error } = await supabase.auth.signInWithOtp({ phone });
    if (error) alert(error.message);
    else setOtpSent(true);
    setVerifyingPhone(false);
  }

  async function handleVerifyOTP() {
    setVerifyingPhone(true);
    const { error } = await supabase.auth.verifyOtp({ phone, token: otp, type: 'sms' });
    if (error) alert(error.message);
    else {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
          await supabase.from('profiles').update({
              phone_verified_at: new Date().toISOString(),
              verification_level: profile?.email_verified_at ? 'verified' : 'basic'
          }).eq('id', user.id);
          window.location.reload();
      }
    }
    setVerifyingPhone(false);
  }

  async function handleSaveLocation(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const res = await updateProfileAction(formData);
    if (res.success) alert("Basecamp updated!");
    else alert(res.error);
    setLoading(false);
  }

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="animate-spin text-primary" /></div>;

  return (
    <div className="container max-w-2xl py-12 pb-32">
      <h1 className="text-3xl font-black italic uppercase font-space-grotesk mb-8 text-primary tracking-tight">Customization</h1>
      
      <div className="space-y-8">
        {/* Profile Picture Card */}
        <div className="bg-card border border-border p-8 rounded-3xl space-y-6 shadow-xl relative z-20">
            <div className="flex items-center gap-6">
                <div className="relative group">
                    <div className="h-24 w-24 rounded-full bg-primary/10 border-4 border-background flex items-center justify-center overflow-hidden font-black text-4xl text-primary italic font-roboto-condensed">
                        {profile?.avatar_url ? (
                            <img src={profile.avatar_url} alt={profile.username} className="w-full h-full object-cover" />
                        ) : (
                            profile?.username?.[0].toUpperCase()
                        )}
                    </div>
                    {uploadingAvatar && (
                        <div className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center">
                            <Loader2 className="h-6 w-6 text-white animate-spin" />
                        </div>
                    )}
                </div>
                <div className="space-y-2">
                    <h3 className="font-black text-xl italic uppercase font-space-grotesk text-foreground">Profile Image</h3>
                    <div className="flex gap-2">
                        <button 
                            onClick={() => document.getElementById('avatar-input')?.click()}
                            disabled={uploadingAvatar}
                            className="bg-primary text-primary-foreground px-4 py-2 rounded-xl font-black uppercase italic text-xs hover:scale-105 transition-all shadow-lg shadow-primary/20 disabled:opacity-50"
                        >
                            Change Photo
                        </button>
                        <input 
                            id="avatar-input"
                            type="file" 
                            accept="image/*" 
                            onChange={handleAvatarUpload}
                            className="hidden" 
                        />
                    </div>
                </div>
            </div>
        </div>

        {/* Brand Theme Card */}
        <div className="bg-card border border-border p-8 rounded-3xl space-y-6 shadow-xl relative z-20">
            <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-2xl">
                    <Bike className="h-6 w-6 text-primary" />
                </div>
                <div>
                    <h3 className="font-black text-xl italic uppercase font-space-grotesk text-foreground">Choose your Brand</h3>
                    <p className="text-sm text-muted-foreground font-medium uppercase tracking-tight leading-tight">Skin the entire app for your machine.</p>
                </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {BRANDS.map((b) => (
                    <button
                        key={b.id}
                        type="button"
                        onClick={() => handleSetBrand(b.id)}
                        className={cn(
                            "flex items-center gap-3 p-4 rounded-2xl border-2 transition-all group cursor-pointer active:scale-95",
                            brand === b.id ? "border-primary bg-primary/10 shadow-[0_0_20px_rgba(124,58,237,0.2)]" : "border-border hover:border-primary/30"
                        )}
                    >
                        <div className={cn("h-4 w-4 rounded-full shadow-inner shrink-0", b.color)} />
                        <span className={cn(
                            "text-[10px] font-black uppercase italic truncate",
                            brand === b.id ? "text-primary" : "text-muted-foreground"
                        )}>{b.name}</span>
                    </button>
                ))}
            </div>
        </div>

        {/* Visual Effects Card */}
        <div className="bg-card border border-border p-8 rounded-3xl space-y-6 shadow-xl relative z-20">
            <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-2xl">
                    <Zap className="h-6 w-6 text-primary" />
                </div>
                <div>
                    <h3 className="font-black text-xl italic uppercase font-space-grotesk text-foreground">Screen Vibe</h3>
                    <p className="text-sm text-muted-foreground font-medium uppercase tracking-tight">Environmental Overlays.</p>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
                <button
                    type="button"
                    onClick={() => setMode('normal')}
                    className={cn(
                        "flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all cursor-pointer active:scale-95",
                        mode === 'normal' ? "border-primary bg-primary/5 shadow-lg" : "border-border"
                    )}
                >
                    <Sun className="h-5 w-5 text-muted-foreground" />
                    <span className="text-[10px] font-black uppercase italic">Normal</span>
                </button>
                <button
                    type="button"
                    onClick={() => setMode('winter')}
                    className={cn(
                        "flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all cursor-pointer active:scale-95",
                        mode === 'winter' ? "border-primary bg-primary/5 shadow-lg" : "border-border"
                    )}
                >
                    <Snowflake className="h-5 w-5 text-blue-400" />
                    <span className="text-[10px] font-black uppercase italic">Winter</span>
                </button>
                <button
                    type="button"
                    onClick={() => setMode('dirty')}
                    className={cn(
                        "flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all cursor-pointer active:scale-95",
                        mode === 'dirty' ? "border-primary bg-primary/5 shadow-lg" : "border-border"
                    )}
                >
                    <Droplets className="h-5 w-5 text-[#4a3721]" />
                    <span className="text-[10px] font-black uppercase italic">Dirty</span>
                </button>
            </div>
        </div>

        {/* Basecamp Location Card */}
        <div className="bg-card border border-border p-8 rounded-3xl space-y-6 shadow-xl relative z-20">
            <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-2xl">
                    <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                    <h3 className="font-black text-xl italic uppercase font-space-grotesk text-foreground">Basecamp</h3>
                    <p className="text-sm text-muted-foreground font-medium uppercase tracking-tight">Your Home Location for Local Search.</p>
                </div>
            </div>

            <form onSubmit={handleSaveLocation} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">City</label>
                        <input name="city" defaultValue={profile?.city} className="w-full p-3 rounded-xl bg-muted/50 border border-border focus:ring-2 focus:ring-primary/50 outline-none font-bold" placeholder="e.g. Bend" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">State / Province</label>
                        <input name="state" defaultValue={profile?.state} className="w-full p-3 rounded-xl bg-muted/50 border border-border focus:ring-2 focus:ring-primary/50 outline-none font-bold" placeholder="e.g. OR" />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Zip / Postal Code</label>
                        <input name="postal_code" defaultValue={profile?.postal_code} className="w-full p-3 rounded-xl bg-muted/50 border border-border focus:ring-2 focus:ring-primary/50 outline-none font-bold" placeholder="e.g. 97701" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Country</label>
                        <input name="country" defaultValue={profile?.country || 'USA'} className="w-full p-3 rounded-xl bg-muted/50 border border-border focus:ring-2 focus:ring-primary/50 outline-none font-bold" placeholder="e.g. USA" />
                    </div>
                </div>
                <button 
                    type="submit"
                    className="w-full bg-primary text-primary-foreground py-4 rounded-2xl font-black uppercase italic text-sm hover:scale-[1.02] transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-2"
                >
                    <Save className="h-4 w-4" /> Save Basecamp
                </button>
            </form>
        </div>

        <h2 className="text-2xl font-black italic uppercase font-space-grotesk text-primary tracking-tight mt-12">Trust & Verification</h2>
        
        <div className="space-y-6">
            <div className="bg-card border border-border p-6 rounded-xl flex items-center justify-between shadow-lg">
            <div className="flex items-center gap-4">
                <div className="p-3 bg-muted rounded-full">
                <Mail className="h-6 w-6 text-muted-foreground" />
                </div>
                <div>
                <h3 className="font-bold">Email Verification</h3>
                <p className="text-sm text-muted-foreground font-medium uppercase tracking-tight">Required to list items and message sellers.</p>
                </div>
            </div>
            {profile?.email_verified_at ? (
                <div className="flex items-center gap-1 text-green-500 font-bold text-sm">
                <CheckCircle className="h-5 w-5" />
                <span>VERIFIED</span>
                </div>
            ) : (
                <div className="flex items-center gap-1 text-destructive font-bold text-sm">
                <XCircle className="h-5 w-5" />
                <span>NOT VERIFIED</span>
                </div>
            )}
            </div>

            <div className="bg-card border border-border p-6 rounded-xl space-y-4 shadow-lg">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                <div className="p-3 bg-muted rounded-full">
                    <Phone className="h-6 w-6 text-muted-foreground" />
                </div>
                <div>
                    <h3 className="font-bold">Phone Verification</h3>
                    <p className="text-sm text-muted-foreground font-medium uppercase tracking-tight">Verification via SMS OTP.</p>
                </div>
                </div>
                {profile?.phone_verified_at ? (
                <div className="flex items-center gap-1 text-green-500 font-bold text-sm">
                    <CheckCircle className="h-5 w-5" />
                    <span>VERIFIED</span>
                </div>
                ) : (
                <div className="text-destructive font-bold text-sm uppercase italic">Not Verified</div>
                )}
            </div>

            {!profile?.phone_verified_at && (
                <div className="pt-4 border-t border-border mt-4">
                {!otpSent ? (
                    <div className="flex gap-2">
                    <input 
                        type="tel" 
                        placeholder="+15550000000" 
                        className="flex-1 bg-background border border-input rounded-md px-3 py-2 text-foreground"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                    <button 
                        onClick={handleSendOTP}
                        disabled={verifyingPhone}
                        className="bg-primary text-primary-foreground px-4 py-2 rounded-md font-bold text-sm disabled:opacity-50 cursor-pointer"
                    >
                        Send OTP
                    </button>
                    </div>
                ) : (
                    <div className="flex gap-2">
                    <input 
                        type="text" 
                        placeholder="Enter 6-digit code" 
                        className="flex-1 bg-background border border-input rounded-md px-3 py-2 text-foreground"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                    />
                    <button 
                        onClick={handleVerifyOTP}
                        disabled={verifyingPhone}
                        className="bg-primary text-primary-foreground px-4 py-2 rounded-md font-bold text-sm disabled:opacity-50 cursor-pointer"
                    >
                        Verify
                    </button>
                    </div>
                )}
                </div>
            )}
            </div>

            <div className={cn(
                "p-8 rounded-[32px] border-2 flex flex-col items-center text-center gap-4 transition-all shadow-2xl",
                profile?.verification_level === 'verified' ? "border-primary bg-primary/5" : "border-dashed border-border bg-muted/20"
            )}>
                <ShieldCheck className={cn("h-16 w-16 transition-all", profile?.verification_level === 'verified' ? "text-primary animate-bounce-slow" : "text-muted-foreground opacity-30")} />
                <div>
                    <h3 className="text-2xl font-black italic uppercase font-space-grotesk tracking-tight">Status: <span className="text-primary">{profile?.verification_level || 'BASIC'}</span></h3>
                    <p className="text-sm text-muted-foreground mt-2 max-w-sm font-medium leading-relaxed uppercase tracking-tight">
                        {profile?.verification_level === 'verified' 
                            ? "Omniscient Status Active. You have full access to marketplace publishing, real-time messaging, and priority featured listing credits."
                            : "Unlock the full RoostHub experience. Verify your email and phone to start selling and chatting with the community."}
                    </p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}