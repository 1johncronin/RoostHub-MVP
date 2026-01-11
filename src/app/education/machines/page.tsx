import { Bike, ArrowLeft, Snowflake, Car, Zap } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Machine Types Explained | RoostHub Education',
  description: 'Complete guide to dirt bikes, snowmobiles, ATVs, and UTVs. Every category and discipline explained.',
};

export default function MachinesPage() {
  return (
    <div className="min-h-screen">
      <section className="py-12 px-6 border-b border-border">
        <div className="max-w-4xl mx-auto">
          <Link href="/education" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="h-4 w-4" /> Back to Education
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-primary/10 rounded-2xl">
              <Bike className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-black italic uppercase font-space-grotesk">Machine Types</h1>
              <p className="text-muted-foreground">Every category, every discipline</p>
            </div>
          </div>
        </div>
      </section>

      {/* Dirt Bikes */}
      <section className="py-12 px-6" id="dirt-bikes">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Bike className="h-8 w-8 text-orange-500" />
            <h2 className="text-2xl font-black italic uppercase font-space-grotesk">Dirt Bikes</h2>
          </div>

          <p className="text-muted-foreground mb-8 max-w-3xl">
            Off-road motorcycles designed for various terrains and disciplines. From closed-course racing to
            multi-day adventures, there's a dirt bike for every type of riding.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <DisciplineCard
              title="Motocross (MX)"
              description="Closed-course racing on groomed tracks with jumps, berms, and whoops. Bikes are lightweight, high-strung, and built for speed."
              characteristics={['125cc-450cc', 'No lights/street equipment', 'Stiff suspension for jumps', 'Aggressive ergonomics']}
              brands={['KTM', 'Yamaha', 'Honda', 'Husqvarna', 'Kawasaki', 'GasGas']}
            />
            <DisciplineCard
              title="Enduro"
              description="Off-road racing through varied terrain—woods, hills, rocky sections. Timed events over long distances."
              characteristics={['200cc-500cc', 'Softer suspension', 'May have lights', 'Wider ratio gearbox']}
              brands={['KTM', 'Husqvarna', 'Beta', 'Sherco', 'GasGas']}
            />
            <DisciplineCard
              title="Trail / Recreation"
              description="Casual off-road riding. These bikes prioritize comfort and reliability over outright performance."
              characteristics={['125cc-450cc', 'Air-cooled options', 'Lower seat height', 'More forgiving power']}
              brands={['Honda', 'Yamaha', 'Kawasaki', 'Suzuki']}
            />
            <DisciplineCard
              title="Dual Sport"
              description="Street-legal bikes capable off-road. Compromise between dirt and street performance."
              characteristics={['250cc-700cc', 'DOT tires, lights, signals', 'Plated and titled', 'Adventure capability']}
              brands={['KTM', 'Honda', 'Yamaha', 'Kawasaki', 'Husqvarna']}
            />
          </div>
        </div>
      </section>

      {/* Snowmobiles */}
      <section className="py-12 px-6 bg-muted/30" id="snowmobiles">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Snowflake className="h-8 w-8 text-blue-500" />
            <h2 className="text-2xl font-black italic uppercase font-space-grotesk">Snowmobiles</h2>
          </div>

          <p className="text-muted-foreground mb-8 max-w-3xl">
            Motorized vehicles for snow travel. From high-altitude mountain climbing to long-distance trail
            cruising, snowmobiles open up winter terrain like nothing else.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <DisciplineCard
              title="Mountain"
              description="Built for deep powder and steep climbs. Lightweight with long tracks for flotation."
              characteristics={['600cc-900cc', '154\"-174\" tracks', 'Turbo options for altitude', 'Narrow, lightweight chassis']}
              brands={['Ski-Doo', 'Polaris', 'Arctic Cat', 'Lynx']}
            />
            <DisciplineCard
              title="Trail"
              description="Designed for groomed trails. Comfort and reliability for all-day rides."
              characteristics={['600cc-900cc', '120\"-137\" tracks', 'Plush suspension', 'Storage capacity']}
              brands={['Ski-Doo', 'Polaris', 'Yamaha', 'Arctic Cat']}
            />
            <DisciplineCard
              title="Crossover"
              description="Versatile machines for both trail and off-trail. Jack of all trades."
              characteristics={['600cc-850cc', '137\"-154\" tracks', 'Adjustable suspension', 'Moderate weight']}
              brands={['Ski-Doo', 'Polaris', 'Arctic Cat']}
            />
            <DisciplineCard
              title="Snowbike Kits"
              description="Convert dirt bikes to snow machines. Combine MX agility with snow capability."
              characteristics={['Fits 250cc-450cc dirt bikes', 'Ski + single track', 'Lightweight', 'Technical climbing']}
              brands={['Timbersled', 'Yeti', 'CMX', 'Camso']}
            />
          </div>
        </div>
      </section>

      {/* OHV/UTV */}
      <section className="py-12 px-6" id="ohv">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Car className="h-8 w-8 text-green-500" />
            <h2 className="text-2xl font-black italic uppercase font-space-grotesk">OHV / UTV / ATV</h2>
          </div>

          <p className="text-muted-foreground mb-8 max-w-3xl">
            Four-wheeled off-highway vehicles. ATVs (quads) seat one rider, UTVs (side-by-sides) seat multiple
            passengers with roll cages and seat belts.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <DisciplineCard
              title="Sport ATV"
              description="High-performance quads for racing and aggressive trail riding."
              characteristics={['250cc-700cc', 'Manual transmission', 'Sport suspension', 'Lightweight']}
              brands={['Yamaha', 'Honda', 'Kawasaki', 'Suzuki']}
            />
            <DisciplineCard
              title="Utility ATV"
              description="Work-focused quads with racks, towing capacity, and 4WD."
              characteristics={['400cc-1000cc', 'CVT transmission', '4WD', 'Cargo racks']}
              brands={['Polaris', 'Can-Am', 'Honda', 'Yamaha']}
            />
            <DisciplineCard
              title="Sport UTV"
              description="High-performance side-by-sides for dunes, desert, and racing."
              characteristics={['900cc-1000cc+', 'Turbo options', 'Long-travel suspension', '100+ HP']}
              brands={['Polaris RZR', 'Can-Am Maverick', 'Honda Talon', 'Yamaha YXZ']}
            />
            <DisciplineCard
              title="Utility UTV"
              description="Work vehicles with cargo beds, towing, and multi-passenger seating."
              characteristics={['500cc-1000cc', 'Dump beds', '4WD', 'Towing capacity']}
              brands={['Polaris Ranger', 'Can-Am Defender', 'John Deere', 'Kubota']}
            />
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-muted/30">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-black italic uppercase font-space-grotesk mb-4">Keep Learning</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/education/engines" className="px-6 py-3 bg-primary text-white rounded-xl font-black italic uppercase hover:scale-105 transition-transform">
              Engine Types
            </Link>
            <Link href="/education/buying-guide" className="px-6 py-3 bg-card border border-border rounded-xl font-black italic uppercase hover:bg-muted transition-colors">
              Buying Guide
            </Link>
            <Link href="/marketplace" className="px-6 py-3 bg-card border border-border rounded-xl font-black italic uppercase hover:bg-muted transition-colors">
              Browse Marketplace
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function DisciplineCard({ title, description, characteristics, brands }: { title: string; description: string; characteristics: string[]; brands: string[] }) {
  return (
    <div className="p-6 bg-card border border-border rounded-2xl">
      <h3 className="font-black italic uppercase text-lg mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground mb-4">{description}</p>
      <div className="mb-4">
        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">Characteristics</p>
        <ul className="space-y-1">
          {characteristics.map((c, i) => (
            <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" /> {c}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-wrap gap-2">
        {brands.map(brand => (
          <span key={brand} className="px-2 py-1 bg-muted rounded-lg text-xs font-bold">{brand}</span>
        ))}
      </div>
    </div>
  );
}
