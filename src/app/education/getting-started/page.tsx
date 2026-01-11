import { Bike, ArrowLeft, CheckCircle, AlertTriangle, DollarSign, Users, Shield, MapPin, Wrench, GraduationCap } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Getting Started: Complete Beginner\'s Guide | RoostHub Education',
  description: 'New to motorsports? Start here. Everything you need to know about getting into dirt bikes, snowmobiles, and powersports.',
};

export default function GettingStartedPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="py-12 px-6 border-b border-border">
        <div className="max-w-4xl mx-auto">
          <Link href="/education" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="h-4 w-4" /> Back to Education
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-green-500/10 rounded-2xl">
              <GraduationCap className="h-8 w-8 text-green-500" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-black italic uppercase font-space-grotesk">Getting Started</h1>
              <p className="text-muted-foreground">Your complete beginner's guide to powersports</p>
            </div>
          </div>
        </div>
      </section>

      {/* Welcome */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="p-6 bg-gradient-to-br from-green-500/10 to-transparent rounded-2xl border border-green-500/20 mb-10">
            <h2 className="text-xl font-black italic uppercase mb-3">Welcome to the Community</h2>
            <p className="text-muted-foreground">
              You're about to enter one of the most passionate, welcoming communities in motorsports. Whether you're
              drawn to the adrenaline of motocross, the freedom of trail riding, the challenge of mountain sledding,
              or the adventure of side-by-side exploration—there's a place for you here. This guide will help you
              take those first steps confidently.
            </p>
          </div>
        </div>
      </section>

      {/* Step 1: Understand the Sports */}
      <section className="py-12 px-6 bg-muted/30">
        <div className="max-w-5xl mx-auto">
          <StepHeader number="01" title="Understand What You're Getting Into" />

          <p className="text-muted-foreground mb-8 max-w-3xl">
            "Powersports" covers a lot of ground. Before you buy anything, understand the different disciplines
            and figure out what excites you most.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <SportOverview
              title="Dirt Biking"
              description="Off-road motorcycle riding across various terrains and disciplines."
              disciplines={[
                { name: 'Motocross', desc: 'Racing on closed, groomed dirt tracks with jumps' },
                { name: 'Enduro', desc: 'Long-distance off-road riding, timed sections' },
                { name: 'Trail Riding', desc: 'Casual riding on forest trails and fire roads' },
                { name: 'Dual Sport', desc: 'Street-legal bikes for on and off-road' },
              ]}
            />
            <SportOverview
              title="Snowmobiling"
              description="Motorized winter sport on snow-covered terrain."
              disciplines={[
                { name: 'Mountain', desc: 'Deep powder, steep climbs, high altitude' },
                { name: 'Trail', desc: 'Groomed paths, long-distance cruising' },
                { name: 'Crossover', desc: 'Versatile for both mountain and trail' },
                { name: 'Snowbike', desc: 'Dirt bike with ski/track conversion kit' },
              ]}
            />
            <SportOverview
              title="ATV / Quad"
              description="Four-wheeled all-terrain vehicles."
              disciplines={[
                { name: 'Sport', desc: 'Fast, agile, for trails and tracks' },
                { name: 'Utility', desc: 'Work-focused, hauling, ranch use' },
                { name: 'Youth', desc: 'Smaller, speed-limited for kids' },
              ]}
            />
            <SportOverview
              title="UTV / Side-by-Side"
              description="Multi-passenger off-road vehicles with roll cages."
              disciplines={[
                { name: 'Sport', desc: 'High-performance desert and dune machines' },
                { name: 'Utility', desc: 'Work vehicles with cargo beds' },
                { name: 'Rock Crawler', desc: 'Low-speed, extreme terrain capability' },
              ]}
            />
          </div>

          <div className="p-4 bg-card border border-border rounded-xl">
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Pro Tip:</strong> Watch YouTube videos of each discipline.
              See what gets you excited. Talk to riders at local dealerships or riding areas. Most are happy
              to share their passion with newcomers.
            </p>
          </div>
        </div>
      </section>

      {/* Step 2: Safety First */}
      <section className="py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <StepHeader number="02" title="Safety Gear Is Non-Negotiable" />

          <p className="text-muted-foreground mb-8 max-w-3xl">
            Before you even sit on a machine, you need proper gear. This isn't optional. The gear you wear
            can be the difference between a minor incident and a life-changing injury.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <GearCard
              title="Helmet"
              priority="CRITICAL"
              description="DOT/ECE certified at minimum. MIPS technology recommended. Replace after any crash."
              budget="$150-600+"
            />
            <GearCard
              title="Boots"
              priority="CRITICAL"
              description="Proper MX/enduro boots. They protect ankles, shins, and feet from impacts and burns."
              budget="$150-500"
            />
            <GearCard
              title="Gloves"
              priority="ESSENTIAL"
              description="Proper fit, reinforced palms. Your hands hit the ground first in most falls."
              budget="$25-80"
            />
            <GearCard
              title="Goggles"
              priority="ESSENTIAL"
              description="Protect eyes from debris, dust, branches. Get a good seal with your helmet."
              budget="$40-150"
            />
            <GearCard
              title="Jersey & Pants"
              priority="RECOMMENDED"
              description="Purpose-built riding gear. Abrasion-resistant, vented for heat management."
              budget="$100-300"
            />
            <GearCard
              title="Chest Protector"
              priority="RECOMMENDED"
              description="Roost deflection and impact protection. Essential for anything beyond casual trail."
              budget="$80-300"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-5 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="h-5 w-5 text-yellow-500" />
                <h4 className="font-black uppercase text-sm">Advanced Protection</h4>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                As you progress, consider adding:
              </p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• <strong>Knee braces</strong> - CTi, Asterisk, EVS ($400-1500/pair)</li>
                <li>• <strong>Neck brace</strong> - Leatt, Atlas ($300-500)</li>
                <li>• <strong>Body armor</strong> - Full upper body protection</li>
              </ul>
            </div>
            <div className="p-5 bg-blue-500/10 border border-blue-500/20 rounded-xl">
              <div className="flex items-center gap-2 mb-3">
                <Shield className="h-5 w-5 text-blue-500" />
                <h4 className="font-black uppercase text-sm">Snowmobile-Specific</h4>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Winter adds requirements:
              </p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• <strong>Avalanche gear</strong> - Beacon, shovel, probe</li>
                <li>• <strong>Heated gear</strong> - Gloves, jacket liners</li>
                <li>• <strong>Snowmobile suit</strong> - Insulated, waterproof</li>
                <li>• <strong>Balaclava</strong> - Face protection from cold</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Step 3: Training */}
      <section className="py-12 px-6 bg-muted/30">
        <div className="max-w-5xl mx-auto">
          <StepHeader number="03" title="Get Proper Training" />

          <p className="text-muted-foreground mb-8 max-w-3xl">
            Even if you've ridden bicycles your whole life, motorsports require new skills. Professional
            instruction accelerates your learning and builds good habits from day one.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <TrainingCard
              title="MSF DirtBike School"
              type="Dirt Bike"
              description="Motorcycle Safety Foundation offers structured off-road courses. They provide bikes and gear."
              link="https://msf-usa.org"
            />
            <TrainingCard
              title="Avalanche Courses"
              type="Snowmobile"
              description="AIARE courses teach avalanche awareness, rescue techniques, and decision-making for backcountry."
              link="https://avtraining.org"
            />
            <TrainingCard
              title="UTV Training"
              type="UTV"
              description="Manufacturers and organizations offer ROV (Recreational Off-Highway Vehicle) safety courses."
              link="https://rohva.org"
            />
          </div>

          <div className="p-5 bg-card border border-border rounded-xl">
            <h4 className="font-black uppercase text-sm mb-3">Learning Resources</h4>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground">
              <div>
                <p className="font-bold text-foreground mb-1">YouTube Channels:</p>
                <ul className="space-y-1">
                  <li>• Rocky Mountain ATV/MC (how-to's)</li>
                  <li>• Enduro Lessons (technique)</li>
                  <li>• 509 Films (snowmobile)</li>
                </ul>
              </div>
              <div>
                <p className="font-bold text-foreground mb-1">Community Resources:</p>
                <ul className="space-y-1">
                  <li>• Local riding clubs</li>
                  <li>• Facebook groups for your area</li>
                  <li>• Dealership riding events</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Step 4: Your First Machine */}
      <section className="py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <StepHeader number="04" title="Choosing Your First Machine" />

          <p className="text-muted-foreground mb-8 max-w-3xl">
            This is where it gets exciting—and where many beginners make mistakes. The key principle:
            <strong className="text-foreground"> start smaller than you think you need.</strong>
          </p>

          <div className="p-5 bg-red-500/10 border border-red-500/20 rounded-xl mb-8">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              <h4 className="font-black uppercase text-sm">Common Beginner Mistakes</h4>
            </div>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• <strong>Buying too much bike</strong> - A 450cc MX bike as your first dirt bike is a recipe for fear and bad habits</li>
              <li>• <strong>Skipping the learning curve</strong> - Respect the process. Even pro riders started on smaller bikes</li>
              <li>• <strong>Buying based on looks</strong> - That race replica is built for pros, not learners</li>
              <li>• <strong>New vs. used</strong> - A quality used beginner bike often makes more sense financially</li>
            </ul>
          </div>

          <h3 className="font-black uppercase text-lg mb-4">Recommended Starter Machines</h3>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <StarterMachine
              category="Dirt Bikes (Adult)"
              recommendations={[
                { name: 'Honda CRF250F', why: 'Air-cooled, fuel-injected, forgiving' },
                { name: 'Yamaha TTR230', why: 'Legendary reliability, low seat height' },
                { name: 'Kawasaki KLX230R', why: 'Modern EFI, great for trails' },
                { name: 'Any 125cc 2-stroke', why: 'Light, teaches throttle control' },
              ]}
            />
            <StarterMachine
              category="Dirt Bikes (Youth)"
              recommendations={[
                { name: 'Honda CRF50/110', why: 'The gold standard for kids' },
                { name: 'Yamaha PW50/TTR50', why: 'Auto clutch, speed limiter' },
                { name: 'KTM 50/65 SX', why: 'Race-ready for competitive kids' },
              ]}
            />
            <StarterMachine
              category="Snowmobiles"
              recommendations={[
                { name: 'Used 600cc trail sled', why: 'Learn fundamentals before power' },
                { name: 'Ski-Doo Renegade Adrenaline', why: 'Versatile, manageable' },
                { name: 'Polaris Indy', why: 'Trail-focused, reliable' },
              ]}
            />
            <StarterMachine
              category="UTV / Side-by-Side"
              recommendations={[
                { name: 'Polaris RZR 200 (Youth)', why: 'Speed limited, roll cage' },
                { name: 'Honda Talon 1000R', why: 'Reliable, capable, not extreme' },
                { name: 'Used base model RZR', why: 'Learn before you spend $30k+' },
              ]}
            />
          </div>

          <div className="p-4 bg-primary/10 border border-primary/20 rounded-xl">
            <p className="text-sm">
              <strong className="text-primary">The Goal:</strong> Learn proper technique on a machine that doesn't
              scare you. You'll progress faster on a bike you're comfortable with. You can always upgrade once
              you've developed skills and understand what you actually want.
            </p>
          </div>
        </div>
      </section>

      {/* Step 5: Where to Ride */}
      <section className="py-12 px-6 bg-muted/30">
        <div className="max-w-5xl mx-auto">
          <StepHeader number="05" title="Find Places to Ride" />

          <p className="text-muted-foreground mb-8 max-w-3xl">
            Knowing where you can legally and safely ride is crucial. Riding in unauthorized areas damages
            our community's reputation and can close trails for everyone.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <RidingLocation
              icon={<MapPin className="h-5 w-5" />}
              title="OHV Parks"
              description="Dedicated off-highway vehicle parks with maintained trails for all skill levels"
            />
            <RidingLocation
              icon={<MapPin className="h-5 w-5" />}
              title="Public Lands"
              description="BLM and National Forest lands often allow OHV use on designated routes"
            />
            <RidingLocation
              icon={<MapPin className="h-5 w-5" />}
              title="MX Tracks"
              description="Private motocross tracks offer practice days for all skill levels"
            />
            <RidingLocation
              icon={<MapPin className="h-5 w-5" />}
              title="Private Property"
              description="With landowner permission, private land can be a great learning space"
            />
          </div>

          <div className="p-5 bg-card border border-border rounded-xl">
            <h4 className="font-black uppercase text-sm mb-3">Finding Riding Areas</h4>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground">
              <ul className="space-y-2">
                <li>• <strong>onX Offroad</strong> - App showing legal OHV trails</li>
                <li>• <strong>Trailforks</strong> - Trail database and GPS</li>
                <li>• <strong>Your state's OHV program</strong> - Official trail systems</li>
              </ul>
              <ul className="space-y-2">
                <li>• <strong>Local dealerships</strong> - Know all the spots</li>
                <li>• <strong>Riding clubs</strong> - Group rides, local knowledge</li>
                <li>• <strong>BLM.gov / fs.usda.gov</strong> - Federal land info</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Step 6: Join the Community */}
      <section className="py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <StepHeader number="06" title="Join the Community" />

          <p className="text-muted-foreground mb-8 max-w-3xl">
            Powersports is as much about community as it is about riding. The friendships, the shared
            experiences, the knowledge passed down—that's what keeps people in the sport for decades.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <CommunityCard
              icon={<Users className="h-6 w-6" />}
              title="Local Clubs"
              description="Riding clubs organize events, maintain trails, and welcome newcomers. Search '[your area] dirt bike club' or 'snowmobile club'."
            />
            <CommunityCard
              icon={<Users className="h-6 w-6" />}
              title="Online Forums"
              description="ThumperTalk, ADVRider, HCS, Snowest—forums have decades of knowledge and helpful members."
            />
            <CommunityCard
              icon={<Users className="h-6 w-6" />}
              title="Social Groups"
              description="Facebook groups for your area, brand, or discipline. Great for finding riding buddies."
            />
          </div>

          <div className="p-6 bg-gradient-to-br from-primary/10 to-transparent rounded-2xl border border-primary/20">
            <h3 className="font-black italic uppercase text-lg mb-3">You're Part of Something Bigger</h3>
            <p className="text-muted-foreground">
              When you join this community, you're joining millions of riders worldwide who share your passion.
              We look out for each other on the trail. We stop to help strangers with broken machines.
              We teach our kids the same values. Welcome to the family.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 bg-muted/30">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-black italic uppercase font-space-grotesk mb-4">Ready for Next Steps?</h2>
          <p className="text-muted-foreground mb-8">Continue your education or start building your garage.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/education/buying-guide" className="px-6 py-3 bg-primary text-white rounded-xl font-black italic uppercase hover:scale-105 transition-transform">
              Buying Guide
            </Link>
            <Link href="/education/engines" className="px-6 py-3 bg-card border border-border rounded-xl font-black italic uppercase hover:bg-muted transition-colors">
              Engine Types
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

function StepHeader({ number, title }: { number: string; title: string }) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <span className="text-4xl font-black text-primary/30">{number}</span>
      <h2 className="text-xl md:text-2xl font-black italic uppercase font-space-grotesk">{title}</h2>
    </div>
  );
}

function SportOverview({ title, description, disciplines }: { title: string; description: string; disciplines: { name: string; desc: string }[] }) {
  return (
    <div className="p-5 bg-card border border-border rounded-xl">
      <h3 className="font-black italic uppercase text-lg mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground mb-4">{description}</p>
      <div className="space-y-2">
        {disciplines.map((d, i) => (
          <div key={i} className="text-sm">
            <span className="font-bold">{d.name}</span>
            <span className="text-muted-foreground"> — {d.desc}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function GearCard({ title, priority, description, budget }: { title: string; priority: string; description: string; budget: string }) {
  const priorityColor = priority === 'CRITICAL' ? 'text-red-500 bg-red-500/10' : priority === 'ESSENTIAL' ? 'text-yellow-500 bg-yellow-500/10' : 'text-blue-500 bg-blue-500/10';
  return (
    <div className="p-4 bg-card border border-border rounded-xl">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-black uppercase">{title}</h4>
        <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${priorityColor}`}>{priority}</span>
      </div>
      <p className="text-sm text-muted-foreground mb-2">{description}</p>
      <p className="text-xs font-bold text-primary">{budget}</p>
    </div>
  );
}

function TrainingCard({ title, type, description, link }: { title: string; type: string; description: string; link: string }) {
  return (
    <div className="p-5 bg-card border border-border rounded-xl">
      <span className="text-xs font-bold uppercase tracking-widest text-primary">{type}</span>
      <h4 className="font-black uppercase mt-1 mb-2">{title}</h4>
      <p className="text-sm text-muted-foreground mb-3">{description}</p>
      <a href={link} target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-primary hover:underline">
        Learn More →
      </a>
    </div>
  );
}

function StarterMachine({ category, recommendations }: { category: string; recommendations: { name: string; why: string }[] }) {
  return (
    <div className="p-5 bg-card border border-border rounded-xl">
      <h4 className="font-black italic uppercase mb-4">{category}</h4>
      <div className="space-y-3">
        {recommendations.map((r, i) => (
          <div key={i} className="text-sm">
            <p className="font-bold">{r.name}</p>
            <p className="text-muted-foreground text-xs">{r.why}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function RidingLocation({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="p-4 bg-card border border-border rounded-xl text-center">
      <div className="text-primary mb-2 flex justify-center">{icon}</div>
      <h4 className="font-black uppercase text-sm mb-1">{title}</h4>
      <p className="text-xs text-muted-foreground">{description}</p>
    </div>
  );
}

function CommunityCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="p-5 bg-card border border-border rounded-xl">
      <div className="text-primary mb-3">{icon}</div>
      <h4 className="font-black uppercase mb-2">{title}</h4>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
