'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, PlusSquare, Car, MessageSquare, Menu, X, Star, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';

export function MobileNav() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: 'Home', icon: Home, href: '/' },
    { label: 'Explore', icon: Search, href: '/marketplace' },
    { label: 'Sell', icon: PlusSquare, href: '/sell' },
    { label: 'Garage', icon: Car, href: '/garage' },
    { label: 'Inbox', icon: MessageSquare, href: '/messages' },
  ];

  const drawerItems = [
    { label: 'Education', icon: BookOpen, href: '/education' },
    { label: 'DJ Booth', icon: Star, href: '/dj-booth' },
    { label: 'Marketplace', icon: Search, href: '/marketplace' },
    { label: 'My Garage', icon: Car, href: '/garage' },
  ];

  // Close menu on navigation
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Drawer Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[100] md:hidden">
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)} />
            <div className="absolute left-0 top-0 bottom-0 w-3/4 max-w-sm bg-card border-r border-border p-8 animate-in slide-in-from-left duration-300">
                <div className="flex items-center justify-between mb-12">
                    <h2 className="text-2xl font-black italic uppercase text-primary">RoostHub</h2>
                    <button onClick={() => setIsMenuOpen(false)}>
                        <X className="h-6 w-6" />
                    </button>
                </div>
                
                <nav className="space-y-6">
                    {drawerItems.map((item) => (
                        <Link 
                            key={item.href} 
                            href={item.href}
                            className="flex items-center gap-4 text-xl font-black uppercase italic hover:text-primary transition-colors"
                        >
                            <item.icon className="h-6 w-6 text-primary" />
                            {item.label}
                        </Link>
                    ))}
                </nav>
            </div>
        </div>
      )}

      {/* Persistent Bottom Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-lg border-t border-border px-6 py-3 flex justify-between items-center z-50">
        <button 
          onClick={() => setIsMenuOpen(true)}
          className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground"
        >
          <Menu className="h-6 w-6" />
          <span className="text-[10px] font-bold uppercase tracking-tighter">Menu</span>
        </button>

        {navItems.slice(1, 4).map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 transition-all",
                isActive ? "text-primary scale-110" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className={cn("h-6 w-6", isActive && "fill-current")} />
              <span className="text-[10px] font-bold uppercase tracking-tighter">{item.label}</span>
            </Link>
          );
        })}

        <Link 
            href="/messages"
            className={cn(
              "flex flex-col items-center gap-1 transition-all",
              pathname === '/messages' ? "text-primary scale-110" : "text-muted-foreground hover:text-foreground"
            )}
        >
            <MessageSquare className={cn("h-6 w-6", pathname === '/messages' && "fill-current")} />
            <span className="text-[10px] font-bold uppercase tracking-tighter">Inbox</span>
        </Link>
      </div>
    </>
  );
}