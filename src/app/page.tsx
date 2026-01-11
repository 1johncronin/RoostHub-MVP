import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";
import { ArrowRight, Bike, Zap, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <div className="flex flex-col font-sans">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-24 md:py-40 overflow-hidden bg-background">
          <div className="container relative z-10 px-4 md:px-6">
            <div className="max-w-4xl space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest animate-pulse">
                <Zap className="h-3 w-3 fill-current" />
                The Future of Motorsports
              </div>
              <h1 className="text-6xl md:text-8xl font-space-grotesk font-black italic tracking-tighter leading-[0.85] uppercase">
                BUY. SELL. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6B2CF5] via-[#A855F7] to-[#EC4899] drop-shadow-sm">
                  ROOST.
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-[600px] font-medium leading-relaxed">
                The premier marketplace and content engine for <span className="text-foreground">dirt bikes</span>, <span className="text-foreground">snowmobiles</span>, and <span className="text-foreground">timber sleds</span>.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link 
                  href="/marketplace" 
                  className="inline-flex items-center justify-center rounded-2xl text-lg font-bold bg-primary text-primary-foreground hover:bg-primary/90 h-14 px-10 transition-all hover:scale-105 hover:shadow-[0_0_30px_-5px_rgba(107,44,245,0.5)]"
                >
                  Browse Marketplace
                </Link>
                <Link 
                  href="/sell" 
                  className="inline-flex items-center justify-center rounded-2xl text-lg font-bold border-2 border-border bg-background hover:bg-accent hover:text-accent-foreground h-14 px-10 transition-all"
                >
                  Sell Your Machine
                </Link>
              </div>
            </div>
          </div>
          
          {/* Vibrant Decorative Elements */}
          <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/4 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px] -z-10 animate-pulse" />
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        </section>

                        {/* Categories Grid */}

                        <section className="py-24 bg-muted/10 border-y border-border/50">

                          <div className="container px-4 md:px-6">

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                              {[

                                { title: "Machines", icon: Bike, desc: "MX, Enduro, Sleds, ATVs", color: "from-blue-500/20" },

                                { title: "Parts", icon: Zap, desc: "OEM, Aftermarket, Mods", color: "from-purple-500/20" },

                                { title: "Gear", icon: ArrowRight, desc: "Helmets, Boots, Kits", color: "from-pink-500/20" },

                                { title: "Roostorage", icon: ShieldCheck, desc: "Secure Space for your Toys", color: "from-amber-500/20" },

                              ].map((cat, i) => (

                                <Link 

                                  key={i} 

                                  href={`/marketplace?type=${cat.title.toLowerCase() === 'machines' ? 'machine' : cat.title.toLowerCase() === 'roostorage' ? 'storage' : cat.title.toLowerCase().replace(/s$/, '')}`}

                                  className="group relative overflow-hidden rounded-3xl border border-border bg-card p-8 hover:border-primary/50 transition-all hover:-translate-y-1 hover:shadow-xl"

                                >

                                  <div className={cn("absolute inset-0 bg-gradient-to-br to-transparent opacity-0 group-hover:opacity-100 transition-opacity", cat.color)} />

                                  <div className="relative z-10">

                                    <div className="flex items-center justify-between mb-6">

                                        <div className="p-3 rounded-2xl bg-muted group-hover:bg-primary group-hover:text-primary-foreground transition-colors">

                                            <cat.icon className="h-8 w-8" />

                                        </div>

                                        <ArrowRight className="h-5 w-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0" />

                                    </div>

                                    <h3 className="font-space-grotesk font-black text-3xl uppercase italic mb-2 tracking-tight">{cat.title}</h3>

                                    <p className="text-muted-foreground font-medium">{cat.desc}</p>

                                  </div>

                                </Link>

                              ))}

                            </div>

                          </div>

                        </section>

                

                      </main>

                    </div>

                  );

                }

                

        