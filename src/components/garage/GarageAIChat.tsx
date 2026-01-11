'use client';

import { useState, useRef, useEffect } from 'react';
import { askGarageAI } from '@/app/actions/ai-garage';
import { MessageSquare, Send, Loader2, Bot, User, Wrench } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export function GarageAIChat({ machineId, machineName }: { machineId: string, machineName: string }) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg: ChatMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await askGarageAI(machineId, input);
      if (res.content) {
        setMessages(prev => [...prev, { role: 'assistant', content: res.content }]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[500px] bg-card border-2 border-border rounded-[32px] overflow-hidden shadow-2xl">
      <div className="p-6 bg-primary/5 border-b border-border flex items-center gap-3">
        <div className="p-2 bg-primary rounded-xl">
            <Wrench className="h-5 w-5 text-primary-foreground" />
        </div>
        <div>
            <h3 className="font-black italic uppercase text-sm font-space-grotesk leading-none">AI Mechanic</h3>
            <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mt-1">Consulting for your {machineName}</p>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 no-scrollbar">
        {messages.length === 0 && (
            <div className="text-center py-10 opacity-50 space-y-2">
                <Bot className="h-10 w-10 mx-auto" />
                <p className="text-xs font-bold uppercase italic tracking-tighter">Ask me anything about maintenance, parts, or torque specs.</p>
            </div>
        )}
        {messages.map((msg, i) => (
          <div key={i} className={cn(
            "flex gap-3 max-w-[85%]",
            msg.role === 'user' ? "ml-auto flex-row-reverse" : "mr-auto"
          )}>
            <div className={cn(
                "h-8 w-8 rounded-full shrink-0 flex items-center justify-center",
                msg.role === 'user' ? "bg-accent" : "bg-primary text-primary-foreground"
            )}>
                {msg.role === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
            </div>
            <div className={cn(
              "p-4 rounded-2xl text-sm font-medium leading-relaxed",
              msg.role === 'user' ? "bg-accent text-accent-foreground" : "bg-muted border border-border"
            )}>
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex gap-3 animate-pulse">
            <div className="h-8 w-8 rounded-full bg-primary/20" />
            <div className="h-12 w-32 rounded-2xl bg-muted" />
          </div>
        )}
      </div>

      <div className="p-4 bg-muted/30 border-t border-border">
        <div className="relative">
            <input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about oil types, piston kits..."
                className="w-full bg-background border-2 border-border rounded-2xl px-4 py-3 pr-12 outline-none focus:border-primary transition-all font-bold italic text-sm"
            />
            <button 
                onClick={handleSend}
                disabled={loading || !input.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-primary text-white rounded-xl hover:scale-105 transition-all disabled:opacity-50"
            >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </button>
        </div>
      </div>
    </div>
  );
}
