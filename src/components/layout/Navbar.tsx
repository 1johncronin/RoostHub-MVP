import Link from 'next/link';
import { Menu, Search, User, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Logo } from './Logo';
import { createClient } from '@/lib/supabase/server';
import { signout } from '@/app/auth/actions';

export async function Navbar() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        {/* Left: Mobile Menu & Logo */}
        <div className="flex items-center gap-4">
          <button className="md:hidden p-2 -ml-2 text-muted-foreground hover:text-foreground">
            <Menu className="h-6 w-6" />
          </button>
          
          <Link href="/" className="flex items-center hover:opacity-90 transition-opacity">
            <Logo />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6 ml-6 text-sm font-medium text-muted-foreground">
            <Link href="/marketplace" className="hover:text-primary transition-colors">Marketplace</Link>
            <Link href="/garage" className="hover:text-primary transition-colors">Garage</Link>
            <Link href="/dj-booth" className="hover:text-primary transition-colors flex items-center gap-1">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              DJ Booth
            </Link>
          </div>
        </div>

        {/* Right: Search & Actions */}
        <div className="flex items-center gap-2 md:gap-4">
          <Link href="/marketplace" className="p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-full transition-colors">
            <Search className="h-5 w-5" />
          </Link>
          
          {user ? (
            <div className="flex items-center gap-2">
                <Link href="/garage" className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-xs border border-primary/20">
                    {user.email?.[0].toUpperCase()}
                </Link>
                <form action={signout}>
                    <button type="submit" className="p-2 text-muted-foreground hover:text-destructive transition-colors">
                        <LogOut className="h-5 w-5" />
                    </button>
                </form>
            </div>
          ) : (
            <>
                <Link 
                    href="/login" 
                    className="hidden md:inline-flex items-center justify-center rounded-full text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2"
                >
                    Sign In
                </Link>
                <Link 
                    href="/login" 
                    className="md:hidden p-2 text-muted-foreground hover:text-foreground"
                >
                    <User className="h-5 w-5" />
                </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
