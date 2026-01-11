import { BookOpen, Flame, Zap, Shield, Scale, Users, Bike, Snowflake, Car } from 'lucide-react';

export const metadata = {
  title: 'Education Basecamp | RoostHub',
  description: 'Your starting point for understanding dirt bikes, snowmobiles, and powersports. Learn about 2-stroke vs 4-stroke, getting involved, laws, and more.',
};

export default function EducationPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-6 bg-gradient-to-br from-primary/20 via-background to-background">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
            <BookOpen className="h-4 w-4 text-primary" />
            <span className="text-xs font-black uppercase tracking-widest text-primary">Education Basecamp</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black italic uppercase font-space-grotesk mb-6">
            Welcome to the <span className="text-primary">Dirt & Snow</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            New to motorsports? No worries. Whether you're eyeing your first dirt bike, dreaming of mountain sleds,
            or just curious about the culture—this is your starting point.
          </p>
        </div>
      </section>

      {/* Sport Types */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-black italic uppercase font-space-grotesk mb-8 text-center">
            The Machines
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <SportCard
              icon={<Bike className="h-8 w-8" />}
              title="Dirt Bikes"
              description="From motocross tracks to enduro trails. 2-strokes that scream, 4-strokes that pound. Your gateway to off-road freedom."
              types={['Motocross', 'Enduro', 'Dual Sport', 'Trails', 'Cross Country']}
            />
            <SportCard
              icon={<Snowflake className="h-8 w-8" />}
              title="Snowmobiles"
              description="Mountain sleds that climb the impossible. Trail cruisers built for miles. When the snow falls, we ride."
              types={['Mountain', 'Trail', 'Crossover', 'Utility', 'Snowbike Kits']}
            />
            <SportCard
              icon={<Car className="h-8 w-8" />}
              title="OHV / Side-by-Side"
              description="ATVs and UTVs for work and play. From rock crawling to dune ripping—four wheels of pure capability."
              types={['Sport UTV', 'Utility UTV', 'ATV', 'Rock Crawlers']}
            />
          </div>
        </div>
      </section>

      {/* 2-Stroke vs 4-Stroke */}
      <section className="py-16 px-6 bg-muted/30">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-black italic uppercase font-space-grotesk mb-8 text-center">
            2-Stroke vs 4-Stroke
          </h2>
          <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
            The age-old debate. Both have their place, and understanding the difference helps you choose your perfect machine.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            <EngineCard
              title="2-Stroke"
              icon={<Zap className="h-6 w-6 text-yellow-500" />}
              tagline="Light, loud, and legendary"
              pros={[
                'Lighter weight for the same power',
                'Simpler engine = easier rebuilds',
                'That unmistakable "braap" sound',
                'Snappy, instant power delivery',
                'Generally cheaper to buy'
              ]}
              cons={[
                'Requires pre-mix oil in fuel',
                'More frequent top-end rebuilds',
                'Can be harder to ride smoothly',
                'Less low-end torque'
              ]}
            />
            <EngineCard
              title="4-Stroke"
              icon={<Flame className="h-6 w-6 text-orange-500" />}
              tagline="Smooth, powerful, refined"
              pros={[
                'More linear, manageable power',
                'Better fuel economy',
                'No mixing oil with gas',
                'Strong low-end torque',
                'Longer intervals between rebuilds'
              ]}
              cons={[
                'Heavier than equivalent 2-stroke',
                'More complex engine = pricier repairs',
                'Generally more expensive to buy',
                'Valve adjustments required'
              ]}
            />
          </div>
          <div className="mt-10 p-6 bg-card rounded-2xl border border-border">
            <h3 className="font-black italic uppercase text-lg mb-3">Quick Rule of Thumb</h3>
            <p className="text-muted-foreground">
              <strong className="text-foreground">250cc 2-stroke ≈ 450cc 4-stroke</strong> in terms of power output.
              A 125cc 2-stroke is roughly equivalent to a 250cc 4-stroke. This is why you'll see different displacement
              classes in racing—they're matched for competitive balance.
            </p>
          </div>
        </div>
      </section>

      {/* Turbos & Performance */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-black italic uppercase font-space-grotesk mb-8 text-center">
            Turbos & Performance
          </h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-muted-foreground mb-4">
                In the snowmobile world, turbochargers have become game-changers—especially for mountain riding at altitude
                where naturally aspirated engines lose power.
              </p>
              <p className="text-muted-foreground mb-4">
                Machines like the <strong className="text-foreground">Polaris Pro RMK 9R</strong> and <strong className="text-foreground">Ski-Doo Summit X Turbo</strong> push
                180-200+ horsepower to conquer the steepest climbs.
              </p>
              <p className="text-muted-foreground">
                In the UTV world, turbo models like the <strong className="text-foreground">RZR Pro R</strong> and <strong className="text-foreground">Can-Am Maverick X3</strong> dominate
                desert racing and dune performance.
              </p>
            </div>
            <div className="bg-card rounded-2xl border border-border p-6">
              <h3 className="font-black italic uppercase text-lg mb-4">Why Turbo at Altitude?</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">01</span>
                  <span>At 10,000ft, naturally aspirated engines lose ~30% power</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">02</span>
                  <span>Turbos compress thin air to maintain sea-level performance</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">03</span>
                  <span>Essential for serious mountain sledding in the Rockies, Cascades, and beyond</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Getting Involved */}
      <section className="py-16 px-6 bg-muted/30">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-8">
            <Users className="h-8 w-8 text-primary" />
            <h2 className="text-2xl md:text-3xl font-black italic uppercase font-space-grotesk">
              Getting Involved
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <InvolvementCard
              number="01"
              title="Take a Class"
              description="MSF dirt bike schools, avalanche safety courses, and UTV training programs exist nationwide. Start smart."
            />
            <InvolvementCard
              number="02"
              title="Find Your Crew"
              description="Local riding clubs, Facebook groups, and forums connect you with experienced riders who know the terrain."
            />
            <InvolvementCard
              number="03"
              title="Start Small"
              description="Don't buy a 450 as your first bike. A 250F or even 125 2-stroke teaches you fundamentals without overwhelming power."
            />
            <InvolvementCard
              number="04"
              title="Gear Up Right"
              description="Helmet, boots, gloves, goggles—non-negotiable. Chest protector, knee braces, and neck brace for serious riding."
            />
          </div>
        </div>
      </section>

      {/* Laws & Regulations */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-8">
            <Scale className="h-8 w-8 text-primary" />
            <h2 className="text-2xl md:text-3xl font-black italic uppercase font-space-grotesk">
              Laws & Regulations
            </h2>
          </div>
          <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
            Rules vary by state, province, and land type. Knowing them keeps trails open for everyone.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <LawCard
              title="Registration & Titles"
              items={[
                'Most states require OHV registration',
                'Some require titles, others don\'t',
                'Display stickers/plates as required',
                'Keep registration docs with you'
              ]}
            />
            <LawCard
              title="Where to Ride"
              items={[
                'Public lands (BLM, National Forest)',
                'State OHV parks and trails',
                'Private tracks and properties',
                'Never on highways (unless dual-sport legal)'
              ]}
            />
            <LawCard
              title="Age & Safety Requirements"
              items={[
                'Youth age restrictions vary by state',
                'Helmet laws (most states require)',
                'Spark arrestors on public lands',
                'Sound limits at some areas (96dB typical)'
              ]}
            />
          </div>
          <div className="mt-8 p-6 bg-primary/10 rounded-2xl border border-primary/20 text-center">
            <p className="font-bold">Always check local regulations before you ride.</p>
            <p className="text-sm text-muted-foreground mt-2">
              Resources: <span className="text-primary">BLM.gov</span>, <span className="text-primary">fs.usda.gov</span>, your state's DMV/OHV program
            </p>
          </div>
        </div>
      </section>

      {/* Safety */}
      <section className="py-16 px-6 bg-muted/30">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-8">
            <Shield className="h-8 w-8 text-primary" />
            <h2 className="text-2xl md:text-3xl font-black italic uppercase font-space-grotesk">
              Ride Safe, Ride Long
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <SafetyItem title="Never Ride Alone" description="Especially in backcountry. Carry a satellite communicator (Garmin InReach, Zoleo) when cell service is gone." />
              <SafetyItem title="Know Your Limits" description="Fatigue causes crashes. If you're tired, stop. The trail will be there tomorrow." />
              <SafetyItem title="Avalanche Awareness" description="For snowmobilers: take an AIARE course, carry beacon/shovel/probe, check forecasts daily." />
              <SafetyItem title="Hydrate & Fuel" description="Dehydration sneaks up fast. Bring water, snacks, and extra fuel for longer rides." />
            </div>
            <div className="space-y-4">
              <SafetyItem title="Pre-Ride Inspection" description="Check tire pressure, chain tension, fluid levels, and controls before every ride." />
              <SafetyItem title="Respect the Land" description="Stay on designated trails. Pack out what you pack in. Tread lightly." />
              <SafetyItem title="Weather Awareness" description="Mountain weather changes fast. Check forecasts, watch the sky, have a bailout plan." />
              <SafetyItem title="Emergency Kit" description="First aid, basic tools, tire repair, tow strap. Hope for the best, prepare for the worst." />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-black italic uppercase font-space-grotesk mb-6">
            Ready to <span className="text-primary">Join the Community?</span>
          </h2>
          <p className="text-muted-foreground mb-8">
            RoostHub is where riders connect, buy, sell, and share their passion.
            Add your machines to your Garage, explore the Marketplace, and become part of something bigger.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/garage" className="px-8 py-4 bg-primary text-white rounded-xl font-black italic uppercase hover:scale-105 transition-transform shadow-xl shadow-primary/30">
              Build Your Garage
            </a>
            <a href="/marketplace" className="px-8 py-4 bg-card border border-border rounded-xl font-black italic uppercase hover:bg-muted transition-colors">
              Explore Marketplace
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

function SportCard({ icon, title, description, types }: { icon: React.ReactNode; title: string; description: string; types: string[] }) {
  return (
    <div className="bg-card border border-border rounded-2xl p-6 hover:border-primary/50 transition-colors">
      <div className="text-primary mb-4">{icon}</div>
      <h3 className="text-xl font-black italic uppercase mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground mb-4">{description}</p>
      <div className="flex flex-wrap gap-2">
        {types.map(type => (
          <span key={type} className="px-2 py-1 bg-muted rounded-lg text-xs font-bold">{type}</span>
        ))}
      </div>
    </div>
  );
}

function EngineCard({ title, icon, tagline, pros, cons }: { title: string; icon: React.ReactNode; tagline: string; pros: string[]; cons: string[] }) {
  return (
    <div className="bg-card border border-border rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-2">
        {icon}
        <h3 className="text-xl font-black italic uppercase">{title}</h3>
      </div>
      <p className="text-sm text-muted-foreground italic mb-4">{tagline}</p>
      <div className="space-y-4">
        <div>
          <h4 className="text-xs font-black uppercase tracking-widest text-green-500 mb-2">Pros</h4>
          <ul className="space-y-1">
            {pros.map((pro, i) => (
              <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                <span className="text-green-500">+</span> {pro}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-black uppercase tracking-widest text-red-500 mb-2">Cons</h4>
          <ul className="space-y-1">
            {cons.map((con, i) => (
              <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                <span className="text-red-500">-</span> {con}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function InvolvementCard({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <div className="bg-card border border-border rounded-2xl p-5">
      <span className="text-3xl font-black text-primary/30">{number}</span>
      <h3 className="font-black italic uppercase mt-2 mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

function LawCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="bg-card border border-border rounded-2xl p-5">
      <h3 className="font-black italic uppercase mb-4">{title}</h3>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
            <span className="text-primary">•</span> {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function SafetyItem({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
      <div>
        <h4 className="font-black text-sm">{title}</h4>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
