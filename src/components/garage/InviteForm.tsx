'use client';

import { useState } from 'react';
import { sendInvite } from '@/app/actions/invites';
import { Loader2, Zap, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export function InviteForm() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setStatus('idle');
    
    try {
        const result = await sendInvite(email) as any;
        if (result?.error) {
            setStatus('error');
            setMessage(result.error.message || "Failed to send. If you are in test mode, you can only send to yourself.");
        } else {
            setStatus('success');
            setEmail('');
        }
    } catch (err) {
        setStatus('error');
        setMessage("Something went wrong.");
    } finally {
        setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 pt-2">
        <div className="flex gap-2 max-w-md">
            <input 
                type="email" 
                placeholder="rider@example.com" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-background border border-border rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/50 font-bold italic text-foreground"
            />
            <button 
                type="submit" 
                disabled={loading || status === 'success'}
                className={cn(
                    "px-6 py-3 rounded-2xl font-black uppercase italic text-xs transition-all shadow-lg flex items-center gap-2",
                    status === 'success' ? "bg-green-500 text-white" : "bg-primary text-white hover:scale-105 shadow-primary/20 disabled:opacity-50"
                )}
            >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : status === 'success' ? <Check className="h-4 w-4" /> : "Send Invite"}
            </button>
        </div>
        
        {status === 'success' && (
            <p className="text-green-500 text-[10px] font-bold uppercase italic">Invitation sent! Tell your friend to check their inbox.</p>
        )}
        {status === 'error' && (
            <p className="text-destructive text-[10px] font-bold uppercase italic">{message}</p>
        )}
    </form>
  );
}
