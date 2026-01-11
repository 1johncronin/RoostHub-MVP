import { Flame, Zap, Wind, ArrowLeft, CheckCircle, XCircle, Wrench, DollarSign, Volume2, Gauge } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Engine Types: 2-Stroke vs 4-Stroke vs Turbo | RoostHub Education',
  description: 'Deep dive into motorsport engine types. Understand the differences between 2-stroke, 4-stroke, and turbocharged engines for dirt bikes, snowmobiles, and UTVs.',
};

export default function EnginesPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="py-12 px-6 border-b border-border">
        <div className="max-w-4xl mx-auto">
          <Link href="/education" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="h-4 w-4" /> Back to Education
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-primary/10 rounded-2xl">
              <Flame className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-black italic uppercase font-space-grotesk">Engine Types</h1>
              <p className="text-muted-foreground">The complete guide to what powers your machine</p>
            </div>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto prose prose-invert">
          <p className="text-lg text-muted-foreground leading-relaxed">
            Understanding engine types is fundamental to choosing the right machine. Each type has distinct characteristics
            that affect power delivery, maintenance, weight, and riding experience. This guide breaks down everything you
            need to know about 2-strokes, 4-strokes, and turbocharged engines.
          </p>
        </div>
      </section>

      {/* 2-Stroke Deep Dive */}
      <section className="py-12 px-6 bg-muted/30" id="2-stroke">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Zap className="h-8 w-8 text-yellow-500" />
            <h2 className="text-2xl md:text-3xl font-black italic uppercase font-space-grotesk">2-Stroke Engines</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-10">
            <div>
              <h3 className="font-black uppercase text-lg mb-4">How It Works</h3>
              <p className="text-muted-foreground mb-4">
                A 2-stroke engine completes a power cycle in just two strokes of the piston (one up, one down),
                meaning it fires once every revolution. This gives it a significant power-to-weight advantage over
                4-strokes of similar displacement.
              </p>
              <p className="text-muted-foreground mb-4">
                The engine uses ports in the cylinder walls (rather than valves) to control intake and exhaust.
                Oil is mixed directly with the fuel (pre-mix) to lubricate the engine since there's no separate
                oil reservoir for the crankcase.
              </p>
              <div className="p-4 bg-card rounded-xl border border-border">
                <h4 className="font-bold text-sm mb-2">Common Pre-Mix Ratios</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• <strong>32:1</strong> - Break-in or older engines</li>
                  <li>• <strong>40:1</strong> - Standard ratio for most bikes</li>
                  <li>• <strong>50:1</strong> - Modern synthetic oils</li>
                </ul>
              </div>
            </div>
            <div className="space-y-4">
              <ProConCard
                title="Advantages"
                icon={<CheckCircle className="h-5 w-5 text-green-500" />}
                items={[
                  'Lighter weight for equivalent power output',
                  'Simpler engine design with fewer moving parts',
                  'Easier and cheaper top-end rebuilds',
                  'Explosive, instant power delivery',
                  'That iconic "braap" exhaust note',
                  'Generally lower purchase price'
                ]}
                positive
              />
              <ProConCard
                title="Disadvantages"
                icon={<XCircle className="h-5 w-5 text-red-500" />}
                items={[
                  'Requires mixing oil with fuel',
                  'More frequent rebuilds needed',
                  'Less linear power (can be harder to control)',
                  'Higher emissions',
                  'Less fuel efficient',
                  'Peaky powerband requires more skill'
                ]}
                positive={false}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <InfoCard
              icon={<Wrench className="h-5 w-5" />}
              title="Maintenance"
              description="Top-end rebuilds every 30-80 hours depending on riding style. Bottom-end can last 100-200+ hours with proper maintenance."
            />
            <InfoCard
              icon={<DollarSign className="h-5 w-5" />}
              title="Rebuild Cost"
              description="Top-end: $200-500. Bottom-end: $500-1000. Much cheaper than 4-stroke equivalents."
            />
            <InfoCard
              icon={<Volume2 className="h-5 w-5" />}
              title="The Sound"
              description="The distinctive high-pitched 'ring-ding-ding' or 'braap' is unmistakable. It's a cultural icon."
            />
          </div>
        </div>
      </section>

      {/* 4-Stroke Deep Dive */}
      <section className="py-12 px-6" id="4-stroke">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Flame className="h-8 w-8 text-orange-500" />
            <h2 className="text-2xl md:text-3xl font-black italic uppercase font-space-grotesk">4-Stroke Engines</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-10">
            <div>
              <h3 className="font-black uppercase text-lg mb-4">How It Works</h3>
              <p className="text-muted-foreground mb-4">
                A 4-stroke engine completes a power cycle in four strokes: intake, compression, power, and exhaust.
                This means it fires once every two revolutions of the crankshaft. Modern 4-strokes use overhead
                cams and valves to control airflow.
              </p>
              <p className="text-muted-foreground mb-4">
                Oil is stored in a separate sump and circulates through the engine via an oil pump. This means
                you don't mix oil with fuel, but you do need to check and change the oil regularly.
              </p>
              <div className="p-4 bg-card rounded-xl border border-border">
                <h4 className="font-bold text-sm mb-2">Key Components</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• <strong>Camshaft(s)</strong> - Control valve timing</li>
                  <li>• <strong>Valves</strong> - Intake and exhaust (2-5 per cylinder)</li>
                  <li>• <strong>Timing chain</strong> - Synchronizes cam to crank</li>
                  <li>• <strong>Oil pump</strong> - Circulates lubrication</li>
                </ul>
              </div>
            </div>
            <div className="space-y-4">
              <ProConCard
                title="Advantages"
                icon={<CheckCircle className="h-5 w-5 text-green-500" />}
                items={[
                  'More linear, controllable power delivery',
                  'Better fuel efficiency',
                  'No mixing oil with gas',
                  'Strong low-end torque',
                  'Longer intervals between rebuilds',
                  'Easier to ride smoothly'
                ]}
                positive
              />
              <ProConCard
                title="Disadvantages"
                icon={<XCircle className="h-5 w-5 text-red-500" />}
                items={[
                  'Heavier than equivalent 2-stroke',
                  'More complex = expensive repairs',
                  'Higher purchase price',
                  'Valve adjustments required',
                  'Engine braking can be aggressive',
                  'Less "exciting" powerband'
                ]}
                positive={false}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <InfoCard
              icon={<Wrench className="h-5 w-5" />}
              title="Maintenance"
              description="Valve checks every 15-30 hours. Top-end rebuild at 100-200 hours. Bottom-end can last 300+ hours."
            />
            <InfoCard
              icon={<DollarSign className="h-5 w-5" />}
              title="Rebuild Cost"
              description="Valve work: $300-800. Top-end: $800-1500. Bottom-end: $1500-3000+. Significantly more than 2-strokes."
            />
            <InfoCard
              icon={<Gauge className="h-5 w-5" />}
              title="Power Character"
              description="Broad, usable power throughout the RPM range. Strong torque off idle makes for tractable power."
            />
          </div>
        </div>
      </section>

      {/* Turbo Section */}
      <section className="py-12 px-6 bg-muted/30" id="turbo">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Wind className="h-8 w-8 text-blue-500" />
            <h2 className="text-2xl md:text-3xl font-black italic uppercase font-space-grotesk">Turbocharged Engines</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-10">
            <div>
              <h3 className="font-black uppercase text-lg mb-4">Why Turbo?</h3>
              <p className="text-muted-foreground mb-4">
                Turbochargers are most common in snowmobiles and UTVs. They use exhaust gases to spin a turbine
                that compresses incoming air, allowing more fuel to be burned and producing significantly more power.
              </p>
              <p className="text-muted-foreground mb-4">
                In mountain snowmobiling, turbos are essential. At 10,000+ feet elevation, naturally aspirated
                engines lose 30%+ of their power. A turbo maintains sea-level performance regardless of altitude.
              </p>
              <div className="p-4 bg-card rounded-xl border border-border">
                <h4 className="font-bold text-sm mb-2">Popular Turbo Machines</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• <strong>Ski-Doo Summit X Turbo</strong> - 180+ HP mountain sled</li>
                  <li>• <strong>Polaris Pro RMK 9R</strong> - Patriot Boost engine</li>
                  <li>• <strong>Can-Am Maverick X3</strong> - 200 HP desert dominator</li>
                  <li>• <strong>Polaris RZR Pro R</strong> - 225 HP UTV beast</li>
                </ul>
              </div>
            </div>
            <div className="space-y-4">
              <ProConCard
                title="Advantages"
                icon={<CheckCircle className="h-5 w-5 text-green-500" />}
                items={[
                  'Massive power gains (50-100%+)',
                  'Maintains power at altitude',
                  'Better power-to-displacement ratio',
                  'Essential for serious mountain riding'
                ]}
                positive
              />
              <ProConCard
                title="Disadvantages"
                icon={<XCircle className="h-5 w-5 text-red-500" />}
                items={[
                  'Higher purchase price ($2-5k+ premium)',
                  'More complex = more failure points',
                  'Turbo lag (slight delay)',
                  'Premium fuel often required',
                  'Heat management critical'
                ]}
                positive={false}
              />
            </div>
          </div>

          <div className="p-6 bg-primary/10 rounded-2xl border border-primary/20">
            <h3 className="font-black uppercase text-lg mb-3">Altitude Rule of Thumb</h3>
            <p className="text-muted-foreground">
              Naturally aspirated engines lose approximately <strong className="text-foreground">3% power per 1,000 feet</strong> of elevation.
              At 10,000 feet, that's a 30% loss. A 150 HP sled becomes a 105 HP sled. Turbos compress the thin air
              back to sea-level density, maintaining full power where you need it most.
            </p>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-black italic uppercase font-space-grotesk mb-8 text-center">Quick Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-black uppercase text-sm">Factor</th>
                  <th className="text-center py-3 px-4 font-black uppercase text-sm text-yellow-500">2-Stroke</th>
                  <th className="text-center py-3 px-4 font-black uppercase text-sm text-orange-500">4-Stroke</th>
                  <th className="text-center py-3 px-4 font-black uppercase text-sm text-blue-500">Turbo 4-Stroke</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <ComparisonRow label="Power-to-Weight" values={['Excellent', 'Good', 'Good']} />
                <ComparisonRow label="Maintenance Frequency" values={['High', 'Medium', 'Medium-High']} />
                <ComparisonRow label="Rebuild Cost" values={['Low', 'High', 'Very High']} />
                <ComparisonRow label="Fuel Efficiency" values={['Poor', 'Good', 'Moderate']} />
                <ComparisonRow label="Ease of Riding" values={['Harder', 'Easier', 'Easier']} />
                <ComparisonRow label="Purchase Price" values={['Lower', 'Higher', 'Highest']} />
                <ComparisonRow label="Altitude Performance" values={['Poor', 'Poor', 'Excellent']} />
                <ComparisonRow label="Low-End Torque" values={['Weak', 'Strong', 'Very Strong']} />
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Choosing Guide */}
      <section className="py-12 px-6 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-black italic uppercase font-space-grotesk mb-8 text-center">Which One Is Right For You?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <ChoiceCard
              engine="2-Stroke"
              color="border-yellow-500/50"
              ideal={[
                'You love the raw, visceral experience',
                'Weight matters (enduro, hard enduro)',
                'You enjoy wrenching on your bike',
                'Budget is a concern',
                'You want that iconic sound'
              ]}
            />
            <ChoiceCard
              engine="4-Stroke"
              color="border-orange-500/50"
              ideal={[
                'You want manageable, usable power',
                'Longer service intervals preferred',
                'Trail riding and varied terrain',
                'You\'re newer to riding',
                'You don\'t want to mix fuel'
              ]}
            />
            <ChoiceCard
              engine="Turbo"
              color="border-blue-500/50"
              ideal={[
                'You ride at high altitude',
                'Maximum power is the goal',
                'Mountain snowmobiling',
                'Desert/dune UTV driving',
                'Budget isn\'t a primary concern'
              ]}
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-black italic uppercase font-space-grotesk mb-4">Keep Learning</h2>
          <p className="text-muted-foreground mb-8">Now that you understand engines, explore what machine is right for you.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/education/machines" className="px-6 py-3 bg-primary text-white rounded-xl font-black italic uppercase hover:scale-105 transition-transform">
              Machine Types
            </Link>
            <Link href="/education/buying-guide" className="px-6 py-3 bg-card border border-border rounded-xl font-black italic uppercase hover:bg-muted transition-colors">
              Buying Guide
            </Link>
            <Link href="/education" className="px-6 py-3 bg-card border border-border rounded-xl font-black italic uppercase hover:bg-muted transition-colors">
              All Topics
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function ProConCard({ title, icon, items, positive }: { title: string; icon: React.ReactNode; items: string[]; positive: boolean }) {
  return (
    <div className={`p-4 rounded-xl border ${positive ? 'bg-green-500/5 border-green-500/20' : 'bg-red-500/5 border-red-500/20'}`}>
      <div className="flex items-center gap-2 mb-3">
        {icon}
        <h4 className="font-black uppercase text-sm">{title}</h4>
      </div>
      <ul className="space-y-1">
        {items.map((item, i) => (
          <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
            <span className={positive ? 'text-green-500' : 'text-red-500'}>{positive ? '+' : '-'}</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function InfoCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="p-4 bg-card border border-border rounded-xl">
      <div className="flex items-center gap-2 mb-2 text-primary">
        {icon}
        <h4 className="font-black uppercase text-sm">{title}</h4>
      </div>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

function ComparisonRow({ label, values }: { label: string; values: string[] }) {
  return (
    <tr className="border-b border-border/50">
      <td className="py-3 px-4 font-medium">{label}</td>
      {values.map((v, i) => (
        <td key={i} className="py-3 px-4 text-center text-muted-foreground">{v}</td>
      ))}
    </tr>
  );
}

function ChoiceCard({ engine, color, ideal }: { engine: string; color: string; ideal: string[] }) {
  return (
    <div className={`p-5 bg-card border-2 ${color} rounded-2xl`}>
      <h3 className="font-black italic uppercase text-lg mb-4">{engine}</h3>
      <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Ideal If:</p>
      <ul className="space-y-2">
        {ideal.map((item, i) => (
          <li key={i} className="text-sm flex items-start gap-2">
            <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
