import { Shield, ArrowLeft, AlertTriangle, CheckCircle, Heart } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Safety Guide | RoostHub Education',
  description: 'Essential safety information for dirt bikes, snowmobiles, and powersports. Gear, practices, and emergency preparedness.',
};

export default function SafetyPage() {
  return (
    <div className="min-h-screen">
      <section className="py-12 px-6 border-b border-border">
        <div className="max-w-4xl mx-auto">
          <Link href="/education" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="h-4 w-4" /> Back to Education
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-red-500/10 rounded-2xl">
              <Shield className="h-8 w-8 text-red-500" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-black italic uppercase font-space-grotesk">Safety & Gear</h1>
              <p className="text-muted-foreground">Come home safe every time</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-2xl mb-10">
            <div className="flex items-center gap-3 mb-3">
              <Heart className="h-6 w-6 text-red-500" />
              <h2 className="text-xl font-black uppercase">Safety Is Not Optional</h2>
            </div>
            <p className="text-muted-foreground">
              Every piece of gear you wear exists because someone got hurt without it. The goal is to ride
              for decades, not just today. Proper gear and smart practices make that possible.
            </p>
          </div>

          {/* Essential Gear */}
          <h2 className="text-xl font-black italic uppercase font-space-grotesk mb-6">Essential Gear</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            <GearItem title="Helmet" level="CRITICAL" description="DOT/ECE minimum. Replace after any impact. MIPS technology helps with rotational forces." />
            <GearItem title="Boots" level="CRITICAL" description="Purpose-built MX/enduro boots. Protect ankles, shins, feet. No hiking boots or sneakers." />
            <GearItem title="Goggles" level="CRITICAL" description="Protect eyes from debris, dust, roost. Good seal with helmet. Tear-offs for racing." />
            <GearItem title="Gloves" level="ESSENTIAL" description="Proper fit, reinforced palms. First to hit the ground in a crash." />
            <GearItem title="Jersey & Pants" level="ESSENTIAL" description="Vented, abrasion-resistant. Designed for the rigors of off-road." />
            <GearItem title="Chest Protector" level="RECOMMENDED" description="Roost protection and impact absorption. Essential for anything beyond casual." />
            <GearItem title="Knee Braces" level="ADVANCED" description="CTi, Asterisk, EVS. Protect ACL/MCL. Worth the investment for serious riding." />
            <GearItem title="Neck Brace" level="ADVANCED" description="Leatt, Atlas. Prevents hyperextension. Standard in racing." />
            <GearItem title="Body Armor" level="ADVANCED" description="Full upper body protection for aggressive riding." />
          </div>

          {/* Smart Practices */}
          <h2 className="text-xl font-black italic uppercase font-space-grotesk mb-6">Smart Practices</h2>
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <SafetyTip
              icon={<AlertTriangle className="h-5 w-5 text-yellow-500" />}
              title="Never Ride Alone"
              description="Especially in backcountry. Carry satellite communicators (Garmin InReach, Zoleo) when cell service is unavailable."
            />
            <SafetyTip
              icon={<AlertTriangle className="h-5 w-5 text-yellow-500" />}
              title="Know Your Limits"
              description="Fatigue causes crashes. Ego causes crashes. Know when to stop. The trail will be there tomorrow."
            />
            <SafetyTip
              icon={<AlertTriangle className="h-5 w-5 text-yellow-500" />}
              title="Pre-Ride Check"
              description="T-CLOCS: Tires, Controls, Lights, Oil, Chassis, Stands. Every ride. Every time."
            />
            <SafetyTip
              icon={<AlertTriangle className="h-5 w-5 text-yellow-500" />}
              title="Weather Awareness"
              description="Mountain weather changes fast. Check forecasts. Watch the sky. Have a bailout plan."
            />
            <SafetyTip
              icon={<AlertTriangle className="h-5 w-5 text-yellow-500" />}
              title="Hydrate & Fuel"
              description="Dehydration affects reaction time. Bring water, electrolytes, snacks. More than you think you need."
            />
            <SafetyTip
              icon={<AlertTriangle className="h-5 w-5 text-yellow-500" />}
              title="Emergency Kit"
              description="First aid, basic tools, tire repair, tow strap. Hope for the best, prepare for the worst."
            />
          </div>

          {/* Snowmobile Specific */}
          <div className="p-6 bg-blue-500/10 border border-blue-500/20 rounded-2xl mb-12">
            <h3 className="font-black uppercase mb-4">Snowmobile-Specific Safety</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-bold mb-2">Avalanche Essentials:</p>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Beacon, shovel, probe (BSP) - non-negotiable</li>
                  <li>• Take an AIARE course</li>
                  <li>• Check avalanche.org daily</li>
                  <li>• Practice rescue scenarios</li>
                </ul>
              </div>
              <div>
                <p className="font-bold mb-2">Cold Weather:</p>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Dress in layers, manage moisture</li>
                  <li>• Know frostbite and hypothermia signs</li>
                  <li>• Carry emergency warmth (fire starter, bivy)</li>
                  <li>• Tell someone your plans and return time</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-muted/30">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-black italic uppercase font-space-grotesk mb-4">Keep Learning</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/education/getting-started" className="px-6 py-3 bg-primary text-white rounded-xl font-black italic uppercase hover:scale-105 transition-transform">
              Getting Started
            </Link>
            <Link href="/education/laws" className="px-6 py-3 bg-card border border-border rounded-xl font-black italic uppercase hover:bg-muted transition-colors">
              Laws & Trails
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function GearItem({ title, level, description }: { title: string; level: string; description: string }) {
  const levelColor = level === 'CRITICAL' ? 'text-red-500 bg-red-500/10' : level === 'ESSENTIAL' ? 'text-yellow-500 bg-yellow-500/10' : level === 'RECOMMENDED' ? 'text-blue-500 bg-blue-500/10' : 'text-purple-500 bg-purple-500/10';
  return (
    <div className="p-4 bg-card border border-border rounded-xl">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-black uppercase">{title}</h4>
        <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${levelColor}`}>{level}</span>
      </div>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

function SafetyTip({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="p-5 bg-card border border-border rounded-xl">
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <h4 className="font-black uppercase">{title}</h4>
      </div>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
