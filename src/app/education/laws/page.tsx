import { Scale, ArrowLeft, MapPin, FileText, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Laws & Regulations | RoostHub Education',
  description: 'OHV laws, registration requirements, where to ride legally. Know the rules before you ride.',
};

export default function LawsPage() {
  return (
    <div className="min-h-screen">
      <section className="py-12 px-6 border-b border-border">
        <div className="max-w-4xl mx-auto">
          <Link href="/education" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="h-4 w-4" /> Back to Education
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-purple-500/10 rounded-2xl">
              <Scale className="h-8 w-8 text-purple-500" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-black italic uppercase font-space-grotesk">Laws & Trails</h1>
              <p className="text-muted-foreground">Know the rules, keep trails open</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="p-6 bg-yellow-500/10 border border-yellow-500/20 rounded-2xl mb-10">
            <div className="flex items-center gap-3 mb-3">
              <AlertTriangle className="h-6 w-6 text-yellow-500" />
              <h2 className="text-xl font-black uppercase">Why This Matters</h2>
            </div>
            <p className="text-muted-foreground">
              Illegal riding damages land, creates conflicts with other users, and gives ammunition to those
              who want to close our trails. Every rider who breaks the rules makes it harder for all of us.
              Riding responsibly keeps trails open for future generations.
            </p>
          </div>

          {/* Registration */}
          <h2 className="text-xl font-black italic uppercase font-space-grotesk mb-6">Registration & Titles</h2>
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <InfoCard
              icon={<FileText className="h-5 w-5" />}
              title="OHV Registration"
              description="Most states require off-highway vehicle registration. Fees fund trail maintenance and access. Display stickers as required."
            />
            <InfoCard
              icon={<FileText className="h-5 w-5" />}
              title="Titles"
              description="Requirements vary by state. Some states title OHVs, others only register. Check your state DMV for specific requirements."
            />
            <InfoCard
              icon={<FileText className="h-5 w-5" />}
              title="Insurance"
              description="Liability insurance may be required on public lands. Even if not required, it's smart protection."
            />
            <InfoCard
              icon={<FileText className="h-5 w-5" />}
              title="Documentation"
              description="Keep registration, proof of ownership, and insurance with your machine. Some areas require on-person carry."
            />
          </div>

          {/* Where to Ride */}
          <h2 className="text-xl font-black italic uppercase font-space-grotesk mb-6">Where to Ride Legally</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <LocationCard title="BLM Land" description="Bureau of Land Management areas often allow OHV use on designated routes." />
            <LocationCard title="National Forest" description="Many National Forests have OHV trail systems. Check forest-specific regulations." />
            <LocationCard title="State OHV Parks" description="Dedicated OHV areas with maintained trails for all skill levels." />
            <LocationCard title="Private Land" description="With owner permission. Written permission recommended." />
          </div>

          <div className="p-5 bg-card border border-border rounded-xl mb-12">
            <h3 className="font-black uppercase mb-3">Finding Legal Riding Areas</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground">
              <ul className="space-y-2">
                <li>• <strong>BLM.gov</strong> - Federal land info</li>
                <li>• <strong>fs.usda.gov</strong> - National Forest info</li>
                <li>• <strong>Your state's OHV program</strong> - Official trail maps</li>
              </ul>
              <ul className="space-y-2">
                <li>• <strong>onX Offroad app</strong> - Shows legal routes</li>
                <li>• <strong>Trailforks</strong> - Trail database</li>
                <li>• <strong>Local dealerships & clubs</strong> - Know the area</li>
              </ul>
            </div>
          </div>

          {/* Common Requirements */}
          <h2 className="text-xl font-black italic uppercase font-space-grotesk mb-6">Common Requirements</h2>
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <RequirementCard
              title="Spark Arrestor"
              description="Required on public lands to prevent wildfires. Must be USFS-approved."
            />
            <RequirementCard
              title="Sound Limits"
              description="Many areas enforce 96dB limits. Aftermarket exhausts may not be legal."
            />
            <RequirementCard
              title="Age Restrictions"
              description="Youth age limits vary by state and machine type. Supervision often required."
            />
            <RequirementCard
              title="Helmet Laws"
              description="Most states require helmets for OHV operation. Check your state's specific rules."
            />
            <RequirementCard
              title="Flag/Whip"
              description="Required in dune areas for visibility. Usually 8ft minimum height."
            />
            <RequirementCard
              title="Operating Hours"
              description="Some areas have dawn-to-dusk restrictions or seasonal closures."
            />
          </div>

          {/* Respect */}
          <div className="p-6 bg-primary/10 border border-primary/20 rounded-2xl">
            <h3 className="font-black uppercase mb-4">Tread Lightly</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <ul className="space-y-2 text-muted-foreground">
                <li>• Stay on designated trails</li>
                <li>• Pack out everything you pack in</li>
                <li>• Respect wildlife and vegetation</li>
                <li>• Yield to non-motorized users</li>
              </ul>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Minimize noise in sensitive areas</li>
                <li>• Avoid wet trails that damage easily</li>
                <li>• Report illegal activity</li>
                <li>• Join trail maintenance efforts</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-muted/30">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-black italic uppercase font-space-grotesk mb-4">Keep Learning</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/education/safety" className="px-6 py-3 bg-primary text-white rounded-xl font-black italic uppercase hover:scale-105 transition-transform">
              Safety Guide
            </Link>
            <Link href="/education/getting-started" className="px-6 py-3 bg-card border border-border rounded-xl font-black italic uppercase hover:bg-muted transition-colors">
              Getting Started
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function InfoCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="p-5 bg-card border border-border rounded-xl">
      <div className="flex items-center gap-2 mb-2 text-primary">
        {icon}
        <h4 className="font-black uppercase">{title}</h4>
      </div>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

function LocationCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="p-4 bg-card border border-border rounded-xl text-center">
      <MapPin className="h-5 w-5 text-primary mx-auto mb-2" />
      <h4 className="font-black uppercase text-sm mb-1">{title}</h4>
      <p className="text-xs text-muted-foreground">{description}</p>
    </div>
  );
}

function RequirementCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="p-4 bg-card border border-border rounded-xl">
      <h4 className="font-black uppercase text-sm mb-1">{title}</h4>
      <p className="text-xs text-muted-foreground">{description}</p>
    </div>
  );
}
