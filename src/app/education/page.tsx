'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BookOpen, Flame, Zap, Shield, Scale, Users, Bike, Snowflake, Car, ChevronRight, Calculator, Wrench, ShoppingCart, MessageSquare, GraduationCap, Mountain, Gauge, MapPin, Loader2 } from 'lucide-react';
import { getLocationFromZipcode } from '@/app/actions/zipcode';

export default function EducationPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-6 bg-gradient-to-br from-primary/20 via-background to-background overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-64 h-64 bg-primary rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-primary rounded-full blur-3xl" />
        </div>
        <div className="max-w-5xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6 border border-primary/20">
            <GraduationCap className="h-4 w-4 text-primary" />
            <span className="text-xs font-black uppercase tracking-widest text-primary">Education Basecamp</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black italic uppercase font-space-grotesk mb-6">
            Your Journey into <span className="text-primary">Dirt & Snow</span> Starts Here
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Motorsports can be intimidating. Different machines, different engines, different cultures.
            We built this to be your guide—whether you're buying your first bike or your tenth sled.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <span className="px-3 py-1 bg-card border border-border rounded-full text-sm font-bold">Dirt Bikes</span>
            <span className="px-3 py-1 bg-card border border-border rounded-full text-sm font-bold">Snowmobiles</span>
            <span className="px-3 py-1 bg-card border border-border rounded-full text-sm font-bold">Side-by-Sides</span>
            <span className="px-3 py-1 bg-card border border-border rounded-full text-sm font-bold">ATVs</span>
            <span className="px-3 py-1 bg-card border border-border rounded-full text-sm font-bold">Snowbike Kits</span>
          </div>
        </div>
      </section>

      {/* Quick Start Paths */}
      <section className="py-16 px-6 border-b border-border">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-black italic uppercase font-space-grotesk mb-2 text-center">Choose Your Path</h2>
          <p className="text-center text-muted-foreground mb-10">What brings you here today?</p>
          <div className="grid md:grid-cols-3 gap-6">
            <PathCard
              href="/education/getting-started"
              icon={<Bike className="h-8 w-8" />}
              title="I'm Brand New"
              description="Never ridden before? Start here. We'll walk you through everything from machine types to your first ride."
              color="from-green-500/20 to-green-500/5"
            />
            <PathCard
              href="/education/buying-guide"
              icon={<ShoppingCart className="h-8 w-8" />}
              title="I'm Buying"
              description="Ready to purchase but not sure what to look for? Our buying guides help you avoid costly mistakes."
              color="from-blue-500/20 to-blue-500/5"
            />
            <PathCard
              href="/education/maintenance"
              icon={<Wrench className="h-8 w-8" />}
              title="I Own & Maintain"
              description="Already riding? Level up with maintenance schedules, mod guides, and performance tips."
              color="from-orange-500/20 to-orange-500/5"
            />
          </div>
        </div>
      </section>

      {/* Deep Dive Topics */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-black italic uppercase font-space-grotesk mb-8 text-center">Deep Dives</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <TopicCard href="/education/engines" icon={<Flame />} title="Engine Types" subtitle="2-Stroke, 4-Stroke, Turbo" />
            <TopicCard href="/education/machines" icon={<Bike />} title="Machine Types" subtitle="Every category explained" />
            <TopicCard href="/education/safety" icon={<Shield />} title="Safety & Gear" subtitle="Protect yourself right" />
            <TopicCard href="/education/laws" icon={<Scale />} title="Laws & Trails" subtitle="Know before you go" />
          </div>
        </div>
      </section>

      {/* Interactive Tools */}
      <section className="py-16 px-6 bg-muted/30">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-8">
            <Calculator className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-black italic uppercase font-space-grotesk">Interactive Tools</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* CC Equivalency Calculator */}
            <CCCalculator />

            {/* Altitude Power Loss */}
            <AltitudeCalculator />
          </div>
        </div>
      </section>

      {/* The Machines - Quick Overview */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-black italic uppercase font-space-grotesk mb-8 text-center">The Machines</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <MachineCard
              icon={<Bike className="h-10 w-10" />}
              title="Dirt Bikes"
              description="From 50cc kids' bikes to 450cc beasts. Motocross, enduro, trail, dual-sport—each built for different terrain and riding styles."
              brands={['KTM', 'Yamaha', 'Honda', 'Husqvarna', 'Kawasaki', 'GasGas']}
              link="/education/machines#dirt-bikes"
            />
            <MachineCard
              icon={<Snowflake className="h-10 w-10" />}
              title="Snowmobiles"
              description="Mountain sleds climb 12,000ft peaks. Trail machines cruise hundreds of miles. Crossovers do both. Choose your adventure."
              brands={['Ski-Doo', 'Polaris', 'Arctic Cat', 'Yamaha', 'Lynx']}
              link="/education/machines#snowmobiles"
            />
            <MachineCard
              icon={<Car className="h-10 w-10" />}
              title="OHV / UTV"
              description="Four-wheel freedom. Sport UTVs hit 80+ mph in the dunes. Utility models work the ranch. Rock crawlers conquer the impossible."
              brands={['Polaris', 'Can-Am', 'Honda', 'Kawasaki', 'Yamaha']}
              link="/education/machines#ohv"
            />
          </div>
        </div>
      </section>

      {/* 2-Stroke vs 4-Stroke Preview */}
      <section className="py-16 px-6 bg-muted/30">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-black italic uppercase font-space-grotesk mb-4 text-center">The Engine Debate</h2>
          <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
            2-stroke or 4-stroke? It's not about which is "better"—it's about what fits your riding style.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            <EnginePreviewCard
              title="2-Stroke"
              icon={<Zap className="h-6 w-6 text-yellow-500" />}
              tagline="Light, loud, legendary"
              highlights={[
                'Power-to-weight king',
                'That iconic "braap"',
                'Simpler = easier rebuilds',
                'Requires pre-mix fuel'
              ]}
            />
            <EnginePreviewCard
              title="4-Stroke"
              icon={<Flame className="h-6 w-6 text-orange-500" />}
              tagline="Smooth, torquey, refined"
              highlights={[
                'Linear, manageable power',
                'No mixing oil',
                'Strong low-end grunt',
                'More complex maintenance'
              ]}
            />
          </div>
          <div className="text-center mt-8">
            <Link href="/education/engines" className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-black italic uppercase hover:scale-105 transition-transform">
              Full Engine Guide <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Community Knowledge */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Users className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-black italic uppercase font-space-grotesk">Community Knowledge</h2>
          </div>
          <p className="text-center text-muted-foreground mb-10 max-w-xl mx-auto">
            Real tips from real riders. The stuff you only learn from years in the saddle.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <CommunityTip
              category="Dirt Bike"
              tip="Change your air filter after every dusty ride, not every few rides. A $15 filter saves a $1500 top-end."
              author="12-year MX rider"
            />
            <CommunityTip
              category="Snowmobile"
              tip="Track tension matters more than you think. Check it when the track is cold. Too tight kills bearings, too loose derails."
              author="Mountain sled guide, CO"
            />
            <CommunityTip
              category="Buying Used"
              tip="Always ask for maintenance records. No records = assume nothing was done. Budget for a full service on any used machine."
              author="Shop owner, 20+ years"
            />
            <CommunityTip
              category="Safety"
              tip="Your first crash will happen. Wear all your gear every single time, even on short rides. That's when complacency kills."
              author="ER nurse & rider"
            />
          </div>
          <div className="mt-10 p-6 bg-card border border-dashed border-primary/30 rounded-2xl text-center">
            <MessageSquare className="h-8 w-8 text-primary mx-auto mb-3" />
            <h3 className="font-black italic uppercase mb-2">Got a Tip to Share?</h3>
            <p className="text-sm text-muted-foreground mb-4">Help the next generation of riders. Submit your hard-earned wisdom.</p>
            <button className="px-6 py-2 bg-primary/10 text-primary rounded-xl font-bold hover:bg-primary/20 transition-colors">
              Submit a Tip
            </button>
          </div>
        </div>
      </section>

      {/* Brand Encyclopedia Teaser */}
      <section className="py-16 px-6 bg-muted/30">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl font-black italic uppercase font-space-grotesk mb-4">Brand Encyclopedia</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            The history, the models, the legacy. From KTM's Austrian precision to Ski-Doo's Canadian heritage.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {['KTM', 'Yamaha', 'Honda', 'Husqvarna', 'Ski-Doo', 'Polaris', 'Arctic Cat', 'Can-Am', 'GasGas', 'Kawasaki'].map(brand => (
              <span key={brand} className="px-4 py-2 bg-card border border-border rounded-xl font-bold hover:border-primary/50 cursor-pointer transition-colors">
                {brand}
              </span>
            ))}
          </div>
          <p className="text-sm text-muted-foreground italic">Brand pages coming soon</p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-black italic uppercase font-space-grotesk mb-6">
            Ready to <span className="text-primary">Ride?</span>
          </h2>
          <p className="text-muted-foreground mb-8">
            Knowledge is power. Now put it to use. Build your garage, find your next machine, join the community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/garage" className="px-8 py-4 bg-primary text-white rounded-xl font-black italic uppercase hover:scale-105 transition-transform shadow-xl shadow-primary/30">
              Build Your Garage
            </Link>
            <Link href="/marketplace" className="px-8 py-4 bg-card border border-border rounded-xl font-black italic uppercase hover:bg-muted transition-colors">
              Browse Marketplace
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

// Interactive CC Calculator
function CCCalculator() {
  const [strokeType, setStrokeType] = useState<'2' | '4'>('2');
  const [cc, setCc] = useState(250);

  const equivalent = strokeType === '2' ? Math.round(cc * 1.8) : Math.round(cc / 1.8);
  const equivalentLabel = strokeType === '2' ? '4-stroke' : '2-stroke';

  return (
    <div className="bg-card border border-border rounded-2xl p-6">
      <h3 className="font-black italic uppercase text-lg mb-4 flex items-center gap-2">
        <Gauge className="h-5 w-5 text-primary" />
        CC Equivalency Calculator
      </h3>
      <p className="text-sm text-muted-foreground mb-4">
        Compare power output across engine types. A 250cc 2-stroke ≈ 450cc 4-stroke.
      </p>
      <div className="space-y-4">
        <div>
          <label className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-2 block">I have a:</label>
          <div className="flex gap-2">
            <button
              onClick={() => setStrokeType('2')}
              className={`flex-1 py-2 rounded-lg font-bold transition-colors ${strokeType === '2' ? 'bg-primary text-white' : 'bg-muted hover:bg-muted/80'}`}
            >
              2-Stroke
            </button>
            <button
              onClick={() => setStrokeType('4')}
              className={`flex-1 py-2 rounded-lg font-bold transition-colors ${strokeType === '4' ? 'bg-primary text-white' : 'bg-muted hover:bg-muted/80'}`}
            >
              4-Stroke
            </button>
          </div>
        </div>
        <div>
          <label className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-2 block">Displacement (cc)</label>
          <input
            type="number"
            value={cc}
            onChange={(e) => setCc(Number(e.target.value))}
            className="w-full p-3 rounded-xl bg-muted/50 border border-border font-bold text-lg"
          />
        </div>
        <div className="p-4 bg-primary/10 rounded-xl border border-primary/20">
          <p className="text-sm text-muted-foreground">Roughly equivalent to:</p>
          <p className="text-2xl font-black text-primary">{equivalent}cc {equivalentLabel}</p>
        </div>
      </div>
    </div>
  );
}

// Altitude Power Loss Calculator
function AltitudeCalculator() {
  const [zipcode, setZipcode] = useState('');
  const [altitude, setAltitude] = useState(5000);
  const [location, setLocation] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const powerLoss = Math.round((altitude / 1000) * 3);

  async function handleZipLookup() {
    if (zipcode.length !== 5) return;
    setLoading(true);
    const result = await getLocationFromZipcode(zipcode);
    if (result.data) {
      const elev = result.data.elevation_ft || 1000;
      setAltitude(elev);
      setLocation(`${result.data.city}, ${result.data.stateAbbr}`);
    }
    setLoading(false);
  }

  return (
    <div className="bg-card border border-border rounded-2xl p-6">
      <h3 className="font-black italic uppercase text-lg mb-4 flex items-center gap-2">
        <Mountain className="h-5 w-5 text-primary" />
        Altitude Power Loss
      </h3>
      <p className="text-sm text-muted-foreground mb-4">
        Naturally aspirated engines lose ~3% power per 1,000ft. Enter your zip to see your local power loss.
      </p>
      <div className="space-y-4">
        {/* Zipcode Quick Lookup */}
        <div>
          <label className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-2 block">Your Zipcode</label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={zipcode}
                onChange={(e) => setZipcode(e.target.value.replace(/\D/g, '').slice(0, 5))}
                onKeyDown={(e) => e.key === 'Enter' && handleZipLookup()}
                placeholder="Enter zip"
                className="w-full p-3 pl-10 rounded-xl bg-muted/50 border border-border font-bold"
                maxLength={5}
              />
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
            <button
              onClick={handleZipLookup}
              disabled={zipcode.length !== 5 || loading}
              className="px-4 py-3 bg-primary text-white rounded-xl font-bold disabled:opacity-50"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Go'}
            </button>
          </div>
          {location && (
            <p className="text-sm text-primary font-bold mt-2">{location} • {altitude.toLocaleString()} ft</p>
          )}
        </div>

        {/* Manual Slider */}
        <div>
          <label className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-2 block">Or adjust manually</label>
          <input
            type="range"
            min="0"
            max="14000"
            step="500"
            value={altitude}
            onChange={(e) => { setAltitude(Number(e.target.value)); setLocation(null); }}
            className="w-full accent-primary"
          />
          <div className="flex justify-between text-sm text-muted-foreground mt-1">
            <span>Sea Level</span>
            <span className="font-bold text-foreground">{altitude.toLocaleString()} ft</span>
            <span>14,000 ft</span>
          </div>
        </div>

        <div className="p-4 bg-primary/10 rounded-xl border border-primary/20">
          <p className="text-sm text-muted-foreground">Estimated power loss (NA engine):</p>
          <p className="text-2xl font-black text-primary">~{powerLoss}%</p>
          <p className="text-xs text-muted-foreground mt-1">
            {powerLoss > 20 ? 'Consider a turbo for serious mountain riding' : powerLoss > 10 ? 'Noticeable but manageable' : 'Minimal impact'}
          </p>
        </div>
      </div>
    </div>
  );
}

function PathCard({ href, icon, title, description, color }: { href: string; icon: React.ReactNode; title: string; description: string; color: string }) {
  return (
    <Link href={href} className={`block bg-gradient-to-br ${color} border border-border rounded-2xl p-6 hover:border-primary/50 hover:scale-[1.02] transition-all group`}>
      <div className="text-primary mb-4">{icon}</div>
      <h3 className="text-xl font-black italic uppercase mb-2 group-hover:text-primary transition-colors">{title}</h3>
      <p className="text-sm text-muted-foreground mb-4">{description}</p>
      <span className="inline-flex items-center gap-1 text-sm font-bold text-primary">
        Start Here <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
      </span>
    </Link>
  );
}

function TopicCard({ href, icon, title, subtitle }: { href: string; icon: React.ReactNode; title: string; subtitle: string }) {
  return (
    <Link href={href} className="flex items-center gap-4 p-4 bg-card border border-border rounded-xl hover:border-primary/50 transition-colors group">
      <div className="text-primary">{icon}</div>
      <div>
        <h3 className="font-black text-sm group-hover:text-primary transition-colors">{title}</h3>
        <p className="text-xs text-muted-foreground">{subtitle}</p>
      </div>
      <ChevronRight className="h-4 w-4 ml-auto text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
    </Link>
  );
}

function MachineCard({ icon, title, description, brands, link }: { icon: React.ReactNode; title: string; description: string; brands: string[]; link: string }) {
  return (
    <div className="bg-card border border-border rounded-2xl p-6 hover:border-primary/50 transition-colors">
      <div className="text-primary mb-4">{icon}</div>
      <h3 className="text-xl font-black italic uppercase mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground mb-4">{description}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {brands.slice(0, 4).map(brand => (
          <span key={brand} className="px-2 py-1 bg-muted rounded-lg text-xs font-bold">{brand}</span>
        ))}
        {brands.length > 4 && <span className="px-2 py-1 text-xs text-muted-foreground">+{brands.length - 4} more</span>}
      </div>
      <Link href={link} className="text-sm font-bold text-primary hover:underline inline-flex items-center gap-1">
        Learn More <ChevronRight className="h-3 w-3" />
      </Link>
    </div>
  );
}

function EnginePreviewCard({ title, icon, tagline, highlights }: { title: string; icon: React.ReactNode; tagline: string; highlights: string[] }) {
  return (
    <div className="bg-card border border-border rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-2">
        {icon}
        <h3 className="text-xl font-black italic uppercase">{title}</h3>
      </div>
      <p className="text-sm text-muted-foreground italic mb-4">{tagline}</p>
      <ul className="space-y-2">
        {highlights.map((h, i) => (
          <li key={i} className="text-sm flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            {h}
          </li>
        ))}
      </ul>
    </div>
  );
}

function CommunityTip({ category, tip, author }: { category: string; tip: string; author: string }) {
  return (
    <div className="bg-card border border-border rounded-xl p-5">
      <span className="text-xs font-black uppercase tracking-widest text-primary">{category}</span>
      <p className="text-sm mt-2 mb-3">"{tip}"</p>
      <p className="text-xs text-muted-foreground">— {author}</p>
    </div>
  );
}
