import Link from 'next/link';

export function Footer() {
  return (
    <footer className="w-full border-t border-border bg-muted/40 py-12">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="flex flex-col gap-2">
            <span className="font-roboto-condensed font-bold italic text-xl tracking-tight">
              ROOST<span className="text-primary">HUB</span>
            </span>
            <p className="text-xs text-muted-foreground">
              © 2026 RoostHub Inc.<br />
              All rights reserved.
            </p>
          </div>
          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            <h3 className="font-semibold text-foreground">Marketplace</h3>
            <Link href="/search?type=machine" className="hover:underline">Machines</Link>
            <Link href="/search?type=part" className="hover:underline">Parts</Link>
            <Link href="/search?type=gear" className="hover:underline">Gear</Link>
          </div>
          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            <h3 className="font-semibold text-foreground">Community</h3>
            <Link href="/garage" className="hover:underline">The Garage</Link>
            <Link href="/dj-booth" className="hover:underline">DJ Booth</Link>
            <Link href="/feed" className="hover:underline">Feed</Link>
          </div>
          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            <h3 className="font-semibold text-foreground">Legal</h3>
            <Link href="/terms" className="hover:underline">Terms</Link>
            <Link href="/privacy" className="hover:underline">Privacy</Link>
            <Link href="/support" className="hover:underline">Support</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
