import { ArrowLeft, Mountain, Wrench, Snowflake, Zap, Heart } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'About RoostHub | Meet the Founder',
  description: 'Meet Jack Cronin, founder of RoostHub. An avid ski racer, adventurer, and throttle twister building the future of motorsports.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-20 px-6 bg-gradient-to-br from-primary/20 via-background to-background overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 right-10 w-64 h-64 bg-primary rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-primary rounded-full blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto relative">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8">
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Link>

          <h1 className="text-4xl md:text-6xl font-black italic uppercase font-space-grotesk mb-6">
            Built by a <span className="text-primary">Rider</span>, for Riders
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            RoostHub wasn't built in a boardroom. It was built in a garage, between track days and powder runs,
            by someone who lives this life every single day.
          </p>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 items-start">
            <div className="md:col-span-1">
              <div className="aspect-square bg-gradient-to-br from-primary/20 to-primary/5 rounded-3xl flex items-center justify-center border border-primary/20">
                <div className="text-center p-6">
                  <div className="text-6xl font-black text-primary mb-2">JC</div>
                  <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Founder</p>
                </div>
              </div>
            </div>

            <div className="md:col-span-2 space-y-6">
              <div>
                <h2 className="text-3xl font-black italic uppercase font-space-grotesk mb-2">Jack Cronin</h2>
                <p className="text-primary font-bold">Founder & Chief Throttle Twister</p>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                Avid ski racer, adventurer, and throttle twister. I graduated high school and headed straight to
                <strong className="text-foreground"> WyoTech in Laramie, Wyoming</strong>—because when your passion is machines,
                you don't sit in a lecture hall, you get your hands dirty.
              </p>

              <p className="text-muted-foreground leading-relaxed">
                Every day I'm out there sending as many roosts as I can. It's snowmobile season right now, and there's
                nothing like the feeling of fresh powder under the track and a mountain waiting to be climbed.
              </p>

              <p className="text-muted-foreground leading-relaxed">
                Currently, I'm working as a <strong className="text-foreground">Snowcat Mechanic at Copper Mountain</strong>—keeping
                the big cats running so everyone can enjoy the mountain. There's something special about being part of the
                machine that makes the mountain possible.
              </p>

              <div className="pt-4">
                <p className="text-lg font-black italic">
                  "RoostHub is the platform I always wished existed. A place where riders can connect, buy and sell their
                  machines, and share the knowledge that makes this community special. Let's do this."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Passions Grid */}
      <section className="py-16 px-6 bg-muted/30">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-black italic uppercase font-space-grotesk mb-8 text-center">The Life</h2>
          <div className="grid md:grid-cols-4 gap-4">
            <PassionCard
              icon={<Mountain className="h-6 w-6" />}
              title="Ski Racing"
              description="Carving turns since day one"
            />
            <PassionCard
              icon={<Snowflake className="h-6 w-6" />}
              title="Snowmobiles"
              description="Mountain sleds in the backcountry"
            />
            <PassionCard
              icon={<Zap className="h-6 w-6" />}
              title="Dirt Bikes"
              description="Two wheels, endless trails"
            />
            <PassionCard
              icon={<Wrench className="h-6 w-6" />}
              title="Wrenching"
              description="WyoTech trained, hands dirty"
            />
          </div>
        </div>
      </section>

      {/* Why RoostHub */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-black italic uppercase font-space-grotesk mb-8 text-center">Why RoostHub?</h2>

          <div className="space-y-6">
            <ReasonCard
              number="01"
              title="The marketplace we needed"
              description="Buying and selling machines shouldn't be scattered across Facebook groups, Craigslist, and random forums. We deserve a dedicated space that understands what we're selling and who we're selling to."
            />
            <ReasonCard
              number="02"
              title="Knowledge should be shared"
              description="The stuff you learn from years in the saddle—the tricks, the maintenance tips, the 'wish I knew that sooner' moments—that knowledge should be passed down, not lost."
            />
            <ReasonCard
              number="03"
              title="Community over everything"
              description="We stop to help strangers on the trail. We loan tools in the pits. We teach kids to ride. That spirit should exist online too."
            />
            <ReasonCard
              number="04"
              title="Built with respect"
              description="RoostHub is built by Transparency Technologies because that's what we believe in—being straight up, honest, and building something the community can trust."
            />
          </div>
        </div>
      </section>

      {/* Company Info */}
      <section className="py-16 px-6 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <div className="bg-card border border-border rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <Heart className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-black uppercase">The Company</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Legal Entity</p>
                <p className="font-bold">Transparency Technologies, LLC</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Headquarters</p>
                <p className="font-bold">Breckenridge, Colorado</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Founded</p>
                <p className="font-bold">2024</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Mission</p>
                <p className="font-bold">Building transparent, community-first platforms</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-black italic uppercase font-space-grotesk mb-6">
            Ready to <span className="text-primary">Join Us?</span>
          </h2>
          <p className="text-muted-foreground mb-8">
            Whether you're buying your first bike or selling your tenth sled, RoostHub is your home.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/garage" className="px-8 py-4 bg-primary text-white rounded-xl font-black italic uppercase hover:scale-105 transition-transform shadow-xl shadow-primary/30">
              Build Your Garage
            </Link>
            <Link href="/marketplace" className="px-8 py-4 bg-card border border-border rounded-xl font-black italic uppercase hover:bg-muted transition-colors">
              Explore Marketplace
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function PassionCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="p-5 bg-card border border-border rounded-2xl text-center hover:border-primary/50 transition-colors">
      <div className="text-primary mb-3 flex justify-center">{icon}</div>
      <h3 className="font-black uppercase text-sm mb-1">{title}</h3>
      <p className="text-xs text-muted-foreground">{description}</p>
    </div>
  );
}

function ReasonCard({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <div className="flex gap-4 p-5 bg-card border border-border rounded-xl">
      <span className="text-3xl font-black text-primary/30">{number}</span>
      <div>
        <h3 className="font-black uppercase mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
