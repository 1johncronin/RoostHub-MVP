import { Wrench, ArrowLeft, Clock, AlertTriangle, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Maintenance Schedules & Tips | RoostHub Education',
  description: 'Complete maintenance guides for dirt bikes, snowmobiles, and UTVs. Know when to service what.',
};

export default function MaintenancePage() {
  return (
    <div className="min-h-screen">
      <section className="py-12 px-6 border-b border-border">
        <div className="max-w-4xl mx-auto">
          <Link href="/education" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="h-4 w-4" /> Back to Education
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-orange-500/10 rounded-2xl">
              <Wrench className="h-8 w-8 text-orange-500" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-black italic uppercase font-space-grotesk">Maintenance</h1>
              <p className="text-muted-foreground">Keep your machine running right</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-lg text-muted-foreground mb-10 max-w-3xl">
            Regular maintenance is what separates machines that last from machines that fail. Here's what you need
            to know to keep your ride in peak condition.
          </p>

          {/* Dirt Bike Schedule */}
          <div className="mb-12">
            <h2 className="text-xl font-black italic uppercase font-space-grotesk mb-6">Dirt Bike Maintenance</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <ScheduleCard
                interval="Every Ride"
                items={['Check air filter', 'Inspect chain tension', 'Check tire pressure', 'Visual inspection for leaks', 'Test brakes']}
              />
              <ScheduleCard
                interval="Every 5-10 Hours"
                items={['Clean/oil air filter', 'Lube chain', 'Check spoke tension', 'Inspect brake pads', 'Check coolant level']}
              />
              <ScheduleCard
                interval="Every 15-30 Hours"
                items={['Change oil', 'Check valve clearance (4-stroke)', 'Inspect clutch plates', 'Check fork oil level', 'Grease linkage bearings']}
              />
            </div>
          </div>

          {/* Snowmobile Schedule */}
          <div className="mb-12">
            <h2 className="text-xl font-black italic uppercase font-space-grotesk mb-6">Snowmobile Maintenance</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <ScheduleCard
                interval="Every Ride"
                items={['Check track tension', 'Inspect belt condition', 'Check coolant level', 'Test brakes', 'Visual inspection']}
              />
              <ScheduleCard
                interval="Every 500 Miles"
                items={['Grease suspension', 'Check/adjust track alignment', 'Inspect carbides', 'Check chaincase oil', 'Inspect hyfax']}
              />
              <ScheduleCard
                interval="Annual/Pre-Season"
                items={['Change chaincase oil', 'Inspect/replace belt', 'Full suspension service', 'Check all bearings', 'Coolant flush']}
              />
            </div>
          </div>

          {/* UTV Schedule */}
          <div className="mb-12">
            <h2 className="text-xl font-black italic uppercase font-space-grotesk mb-6">UTV / Side-by-Side Maintenance</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <ScheduleCard
                interval="Every Ride"
                items={['Check tire pressure', 'Inspect belt (CVT)', 'Check fluid levels', 'Test 4WD engagement', 'Visual safety check']}
              />
              <ScheduleCard
                interval="Every 25 Hours"
                items={['Change engine oil', 'Clean air filter', 'Grease all zerks', 'Check CV boots', 'Inspect brake pads']}
              />
              <ScheduleCard
                interval="Every 100 Hours"
                items={['Change CVT belt', 'Differential fluid change', 'Coolant service', 'Spark plug replacement', 'Full suspension check']}
              />
            </div>
          </div>

          {/* Pro Tips */}
          <div className="p-6 bg-primary/10 border border-primary/20 rounded-2xl">
            <h3 className="font-black uppercase mb-4">Pro Tips</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                <p className="text-muted-foreground"><strong className="text-foreground">Keep a log.</strong> Track hours, maintenance, and issues. Future you (or buyers) will thank you.</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                <p className="text-muted-foreground"><strong className="text-foreground">Don't skip the small stuff.</strong> A $15 air filter saves a $1500 top-end.</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                <p className="text-muted-foreground"><strong className="text-foreground">Use OEM or quality aftermarket.</strong> Cheap parts cost more in the long run.</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                <p className="text-muted-foreground"><strong className="text-foreground">Learn to wrench.</strong> Basic maintenance skills save money and deepen your connection to the machine.</p>
              </div>
            </div>
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
          </div>
        </div>
      </section>
    </div>
  );
}

function ScheduleCard({ interval, items }: { interval: string; items: string[] }) {
  return (
    <div className="p-5 bg-card border border-border rounded-xl">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="h-5 w-5 text-primary" />
        <h3 className="font-black uppercase">{interval}</h3>
      </div>
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
