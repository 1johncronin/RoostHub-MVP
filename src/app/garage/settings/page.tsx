'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { CheckCircle, XCircle, Phone, Mail, ShieldCheck, Loader2, Bike } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function SettingsPage() {
  const supabase = createClient();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
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

  async function handleSendOTP() {
    setVerifyingPhone(true);
    // Supabase Phone OTP Flow
    const { error } = await supabase.auth.signInWithOtp({
      phone: phone,
    });
    if (error) {
      alert(error.message);
    } else {
      setOtpSent(true);
    }
    setVerifyingPhone(false);
  }

  async function handleVerifyOTP() {
    setVerifyingPhone(true);
    const { error } = await supabase.auth.verifyOtp({
      phone: phone,
      token: otp,
      type: 'sms',
    });
    
    if (error) {
      alert(error.message);
    } else {
      // Update profile status in DB (This would ideally be a trigger on auth.users)
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

  const BRANDS = [
    { id: 'roosthub', name: 'RoostHub (Purple)', color: 'bg-[#7C3AED]' },
    { id: 'ktm', name: 'KTM (Orange)', color: 'bg-[#FF6600]' },
    { id: 'yamaha', name: 'Yamaha (Blue)', color: 'bg-[#0000FF]' },
    { id: 'honda', name: 'Honda (Red)', color: 'bg-[#FF0000]' },
    { id: 'kawasaki', name: 'Kawasaki (Green)', color: 'bg-[#00FF00]' },
    { id: 'suzuki', name: 'Suzuki (Yellow)', color: 'bg-[#FFFF00]' },
  ];

  async function handleSetBrand(brandId: string) {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
        await supabase.from('profiles').update({ theme_brand: brandId }).eq('id', user.id);
        document.body.setAttribute('data-brand', brandId);
        setProfile((prev: any) => ({ ...prev, theme_brand: brandId }));
    }
  }

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="animate-spin text-primary" /></div>;

  return (
    <div className="container max-w-2xl py-12">
      <h1 className="text-3xl font-black italic uppercase font-space-grotesk mb-8 text-primary tracking-tight">Customization</h1>
      
      <div className="space-y-8">
        {/* Brand Theme Card */}
        <div className="bg-card border border-border p-8 rounded-3xl space-y-6 shadow-xl">
            <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-2xl">
                    <Bike className="h-6 w-6 text-primary" />
                </div>
                <div>
                    <h3 className="font-black text-xl italic uppercase font-space-grotesk">Choose your Brand</h3>
                    <p className="text-sm text-muted-foreground font-medium uppercase tracking-tight">Personalize the app colors for your machine.</p>
                </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {BRANDS.map((b) => (
                    <button
                        key={b.id}
                        onClick={() => handleSetBrand(b.id)}
                        className={cn(
                            "flex items-center gap-3 p-3 rounded-2xl border-2 transition-all group",
                            profile?.theme_brand === b.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"
                        )}
                    >
                        <div className={cn("h-4 w-4 rounded-full shadow-inner", b.color)} />
                        <span className="text-[10px] font-black uppercase italic truncate">{b.name}</span>
                    </button>
                ))}
            </div>
        </div>

        <h2 className="text-2xl font-black italic uppercase font-space-grotesk text-primary tracking-tight mt-12">Trust & Verification</h2>
        {/* Email Verification Card */}
        <div className="bg-card border border-border p-6 rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-muted rounded-full">
              <Mail className="h-6 w-6 text-muted-foreground" />
            </div>
            <div>
              <h3 className="font-bold">Email Verification</h3>
              <p className="text-sm text-muted-foreground">Required to list items and message sellers.</p>
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

        {/* Phone Verification Card */}
        <div className="bg-card border border-border p-6 rounded-xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-muted rounded-full">
                <Phone className="h-6 w-6 text-muted-foreground" />
              </div>
              <div>
                <h3 className="font-bold">Phone Verification</h3>
                <p className="text-sm text-muted-foreground">Verification via SMS OTP.</p>
              </div>
            </div>
            {profile?.phone_verified_at ? (
              <div className="flex items-center gap-1 text-green-500 font-bold text-sm">
                <CheckCircle className="h-5 w-5" />
                <span>VERIFIED</span>
              </div>
            ) : (
              <div className="text-destructive font-bold text-sm">NOT VERIFIED</div>
            )}
          </div>

          {!profile?.phone_verified_at && (
            <div className="pt-4 border-t border-border mt-4">
              {!otpSent ? (
                <div className="flex gap-2">
                  <input 
                    type="tel" 
                    placeholder="+15550000000" 
                    className="flex-1 bg-background border border-input rounded-md px-3 py-2"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  <button 
                    onClick={handleSendOTP}
                    disabled={verifyingPhone}
                    className="bg-primary text-primary-foreground px-4 py-2 rounded-md font-bold text-sm disabled:opacity-50"
                  >
                    Send OTP
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="Enter 6-digit code" 
                    className="flex-1 bg-background border border-input rounded-md px-3 py-2"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                  <button 
                    onClick={handleVerifyOTP}
                    disabled={verifyingPhone}
                    className="bg-primary text-primary-foreground px-4 py-2 rounded-md font-bold text-sm disabled:opacity-50"
                  >
                    Verify
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Global Verification Status */}
        <div className={cn(
            "p-6 rounded-xl border-2 flex flex-col items-center text-center gap-4",
            profile?.verification_level === 'verified' ? "border-primary bg-primary/5" : "border-dashed border-border bg-muted/20"
        )}>
            <ShieldCheck className={cn("h-12 w-12", profile?.verification_level === 'verified' ? "text-primary" : "text-muted-foreground")} />
            <div>
                <h3 className="text-xl font-bold">Verification Level: <span className="text-primary uppercase italic">{profile?.verification_level || 'BASIC'}</span></h3>
                <p className="text-sm text-muted-foreground mt-1 max-w-sm">
                    {profile?.verification_level === 'verified' 
                        ? "You're all set! You can now publish unlimited listings and message anyone in the community."
                        : "Verify your email and phone to unlock marketplace features."}
                </p>
            </div>
        </div>
      </div>
    </div>
  );
}
