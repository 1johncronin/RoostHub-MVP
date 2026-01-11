import Link from 'next/link';

export function Footer() {
  return (
    <footer className="w-full border-t border-border bg-muted/40 py-12 hidden md:block">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          <div className="flex flex-col gap-2">
            <span className="font-roboto-condensed font-bold italic text-xl tracking-tight">
              ROOST<span className="text-primary">HUB</span>
            </span>
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} Transparency Technologies, LLC<br />
              All rights reserved.
            </p>
          </div>
          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            <h3 className="font-semibold text-foreground">Marketplace</h3>
            <Link href="/marketplace" className="hover:underline">Browse All</Link>
            <Link href="/sell" className="hover:underline">Sell</Link>
            <Link href="/garage" className="hover:underline">My Garage</Link>
          </div>
          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            <h3 className="font-semibold text-foreground">Learn</h3>
            <Link href="/education" className="hover:underline">Education Basecamp</Link>
            <Link href="/education/getting-started" className="hover:underline">Getting Started</Link>
            <Link href="/education/buying-guide" className="hover:underline">Buying Guide</Link>
          </div>
          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            <h3 className="font-semibold text-foreground">Company</h3>
            <Link href="/contact" className="hover:underline">Contact Us</Link>
            <Link href="/legal" className="hover:underline">About</Link>
            <a href="mailto:partner@getrookd.com" className="hover:underline">Partnerships</a>
          </div>
          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            <h3 className="font-semibold text-foreground">Legal</h3>
            <Link href="/terms" className="hover:underline">Terms of Service</Link>
            <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
            <a href="mailto:support@getrookd.com" className="hover:underline">Support</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
