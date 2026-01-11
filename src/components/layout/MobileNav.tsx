'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, PlusSquare, Bike, MessageCircle, User } from 'lucide-react';
import { cn } from '@/lib/utils';

export function MobileNav() {
  const pathname = usePathname();

  const NAV_ITEMS = [
    { label: 'Home', href: '/', icon: Home },
    { label: 'Market', href: '/marketplace', icon: Search },
    { label: 'Sell', href: '/sell', icon: PlusSquare, primary: true },
    { label: 'Messages', href: '/messages', icon: MessageCircle },
    { label: 'Garage', href: '/garage', icon: User },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-t border-border px-4 pb-safe">
      <div className="flex justify-between items-center h-16">
        {NAV_ITEMS.map((item) => (
          <Link 
            key={item.label} 
            href={item.href}
            className={cn(
              "flex flex-col items-center justify-center gap-1 transition-all",
              pathname === item.href ? "text-primary scale-110" : "text-muted-foreground",
              item.primary && "relative -top-4"
            )}
          >
            <div className={cn(
                "p-2 rounded-2xl transition-all",
                item.primary ? "bg-primary text-white shadow-xl shadow-primary/40 scale-125 border-4 border-background" : ""
            )}>
                <item.icon className="h-5 w-5" strokeWidth={pathname === item.href ? 3 : 2} />
            </div>
            {!item.primary && <span className="text-[10px] font-black uppercase italic tracking-tighter">{item.label}</span>}
          </Link>
        ))}
      </div>
    </div>
  );
}
