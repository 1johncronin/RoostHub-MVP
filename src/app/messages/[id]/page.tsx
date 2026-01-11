'use client';

import { useState, useEffect, useRef, use } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Send, ArrowLeft, ShieldCheck, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function ChatThreadPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: threadId } = use(params);
  const supabase = createClient();
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [user, setUser] = useState<any>(null);
  const [thread, setThread] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function init() {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      const { data: threadData } = await supabase
        .from('message_threads')
        .select(`
            *, 
            listings(title),
            buyer:profiles!message_threads_buyer_id_fkey(username),
            seller:profiles!message_threads_seller_id_fkey(username)
        `)
        .eq('id', threadId)
        .single();
      setThread(threadData);

      const { data: initialMessages } = await supabase
        .from('messages')
        .select('*')
        .eq('thread_id', threadId)
        .order('created_at', { ascending: true });
      
      setMessages(initialMessages || []);
      setLoading(false);
    }

    init();

    // Subscribe to real-time changes
    const channel = supabase
      .channel(`thread:${threadId}`)
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messages', filter: `thread_id=eq.${threadId}` },
        (payload) => {
          setMessages((prev) => [...prev, payload.new]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [threadId]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !user) return;

    const messageContent = newMessage;
    setNewMessage('');

    await supabase.from('messages').insert({
      thread_id: threadId,
      sender_id: user.id,
      content: messageContent,
    });
  };

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="animate-spin text-primary" /></div>;

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] bg-muted/10 font-sans">
      {/* Header */}
      <div className="bg-background border-b border-border p-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <Link href="/messages" className="p-2 hover:bg-muted rounded-full">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="font-black italic uppercase text-sm font-space-grotesk tracking-tight">
                {thread?.listings?.title}
            </h1>
            <p className="text-[10px] text-muted-foreground font-bold tracking-widest uppercase flex items-center gap-1">
                <ShieldCheck className="h-3 w-3 text-primary" /> Verified Conversation
            </p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((m, i) => {
          const isMe = m.sender_id === user?.id;
          const showAvatar = i === 0 || messages[i-1].sender_id !== m.sender_id;
          
          return (
            <div key={m.id} className={cn("flex flex-col", isMe ? "items-end" : "items-start")}>
              <div className={cn("flex items-end gap-2 max-w-[85%]", isMe ? "flex-row-reverse" : "flex-row")}>
                {!isMe && showAvatar && (
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-[10px] italic border border-primary/20 shrink-0 mb-1">
                        {thread?.buyer_id === m.sender_id ? thread?.buyer?.username?.[0] : thread?.seller?.username?.[0]}
                    </div>
                )}
                {!isMe && !showAvatar && <div className="w-8" />}
                
                <div className={cn(
                    "px-5 py-3 rounded-2xl text-sm font-medium shadow-sm transition-all",
                    isMe 
                        ? "bg-primary text-white rounded-br-none shadow-[0_4px_15px_-5px_rgba(107,44,245,0.4)]" 
                        : "bg-card border border-border rounded-bl-none text-foreground"
                )}>
                    {m.content}
                </div>
              </div>
              <div className={cn("text-[9px] font-black uppercase italic tracking-widest text-muted-foreground mt-1 mx-10")}>
                {new Date(m.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          );
        })}
        <div ref={scrollRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-background border-t border-border">
        <form onSubmit={handleSendMessage} className="max-w-4xl mx-auto flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Send a message..."
            className="flex-1 bg-muted/50 border border-border rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-primary/50 font-medium"
          />
          <button type="submit" className="bg-primary text-white p-2 rounded-xl hover:scale-105 transition-transform">
            <Send className="h-5 w-5" />
          </button>
        </form>
      </div>
    </div>
  );
}
