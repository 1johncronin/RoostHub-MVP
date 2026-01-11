import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";
import { ArrowRight, Bike, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden bg-background">
          <div className="container relative z-10 px-4 md:px-6">
            <div className="max-w-3xl space-y-6">
              <h1 className="text-5xl md:text-7xl font-roboto-condensed font-bold italic tracking-tighter leading-[0.9]">
                BUY. SELL. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">
                  ROOST.
                </span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-[600px]">
                The premier marketplace and content engine for dirt bikes, snowmobiles, and timber sleds. Verified listings, real community.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link 
                  href="/marketplace" 
                  className="inline-flex items-center justify-center rounded-full text-base font-semibold bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-8 transition-transform hover:scale-105"
                >
                  Browse Listings
                </Link>
                <Link 
                  href="/sell" 
                  className="inline-flex items-center justify-center rounded-full text-base font-semibold border border-input bg-background hover:bg-accent hover:text-accent-foreground h-12 px-8 transition-colors"
                >
                  Sell Your Machine
                </Link>
              </div>
            </div>
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -z-10" />
        </section>

        {/* Categories Grid */}
        <section className="py-16 bg-muted/30 border-y border-border/50">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: "Machines", icon: Bike, desc: "MX, Enduro, Sleds, ATVs" },
                { title: "Parts", icon: Zap, desc: "OEM, Aftermarket, Mods" },
                { title: "Gear", icon: ArrowRight, desc: "Helmets, Boots, Kits" },
              ].map((cat, i) => (
                <Link 
                  key={i} 
                  href={`/search?type=${cat.title.toLowerCase()}`}
                  className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 hover:border-primary/50 transition-colors"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-roboto-condensed font-bold text-2xl uppercase italic">{cat.title}</h3>
                    <cat.icon className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <p className="text-muted-foreground">{cat.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}