'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Bell, Check, ExternalLink, Loader2, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export function NotificationBell() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function loadNotifications() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from('notifications')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);
      
      if (data) setNotifications(data);
      setLoading(false);
    }

    loadNotifications();

    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
        },
        (payload) => {
          setNotifications(prev => [payload.new, ...prev].slice(0, 5));
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const unreadCount = notifications.filter(n => !n.is_read).length;

  const markRead = async (id: string) => {
    await supabase.from('notifications').update({ is_read: true }).eq('id', id);
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, is_read: true } : n));
  };

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-full transition-colors relative h-10 w-10 flex items-center justify-center"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
            <span className="absolute top-1 right-1 h-4 w-4 bg-primary text-white text-[8px] font-black rounded-full flex items-center justify-center animate-bounce shadow-lg shadow-primary/40 border border-background">
                {unreadCount}
            </span>
        )}
      </button>

      {isOpen && (
        <div className="fixed inset-x-4 top-20 md:absolute md:inset-auto md:top-full md:right-0 mt-2 w-auto md:w-80 bg-background/95 backdrop-blur-xl border-2 border-border rounded-[32px] shadow-2xl overflow-hidden z-[100] animate-in fade-in zoom-in-95 duration-200 ring-1 ring-black/5">
            <div className="p-4 bg-primary/10 border-b border-border flex items-center justify-between">
                <h3 className="text-xs font-black uppercase italic tracking-widest text-primary">Notifications</h3>
                <button onClick={() => setIsOpen(false)} className="md:hidden">
                    <X className="h-4 w-4 text-muted-foreground" />
                </button>
            </div>
            
            <div className="max-h-[60vh] md:max-h-96 overflow-y-auto no-scrollbar">
                {loading ? (
                    <div className="p-8 flex justify-center"><Loader2 className="h-5 w-5 animate-spin text-primary" /></div>
                ) : notifications.length === 0 ? (
                    <div className="p-12 text-center">
                        <Bell className="h-8 w-8 text-muted-foreground/20 mx-auto mb-2" />
                        <p className="text-[10px] font-bold text-muted-foreground uppercase">No new alerts.</p>
                    </div>
                ) : (
                    notifications.map((n) => (
                        <div key={n.id} className={cn(
                            "p-4 border-b border-border/50 hover:bg-muted/30 transition-colors relative group",
                            !n.is_read && "bg-primary/5"
                        )}>
                            {!n.is_read && <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary" />}
                            <div className="space-y-1">
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-black uppercase italic text-primary">{n.title}</span>
                                    <span className="text-[8px] text-muted-foreground font-bold">{new Date(n.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                </div>
                                <p className="text-[11px] font-medium text-foreground leading-tight">{n.content}</p>
                                <div className="flex gap-2 pt-2">
                                    {n.link && (
                                        <Link 
                                            href={n.link} 
                                            onClick={() => { setIsOpen(false); markRead(n.id); }}
                                            className="text-[8px] font-black uppercase italic bg-primary text-white px-3 py-1.5 rounded-lg flex items-center gap-1 hover:scale-105 transition-all"
                                        >
                                            View Listing <ExternalLink className="h-2 w-2" />
                                        </Link>
                                    )}
                                    {!n.is_read && (
                                        <button 
                                            onClick={() => markRead(n.id)}
                                            className="text-[8px] font-black uppercase italic border border-border px-3 py-1.5 rounded-lg hover:bg-accent transition-all"
                                        >
                                            Dismiss
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
            <Link href="/garage" onClick={() => setIsOpen(false)} className="block p-4 bg-muted/50 text-center text-[9px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors border-t border-border">
                Manage Garage Dreams
            </Link>
        </div>
      )}
    </div>
  );
}