import { ShoppingCart, ArrowLeft, CheckCircle, XCircle, AlertTriangle, DollarSign, Search, FileText, Wrench } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Buying Guide: How to Buy Used Powersports | RoostHub Education',
  description: 'Complete guide to buying used dirt bikes, snowmobiles, and UTVs. What to look for, red flags to avoid, and how to negotiate.',
};

export default function BuyingGuidePage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="py-12 px-6 border-b border-border">
        <div className="max-w-4xl mx-auto">
          <Link href="/education" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="h-4 w-4" /> Back to Education
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-blue-500/10 rounded-2xl">
              <ShoppingCart className="h-8 w-8 text-blue-500" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-black italic uppercase font-space-grotesk">Buying Guide</h1>
              <p className="text-muted-foreground">Don't get burned—know what to look for</p>
            </div>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            Buying used powersports equipment can save you thousands—or cost you thousands if you get it wrong.
            This guide teaches you how to inspect machines, spot red flags, and negotiate like a pro.
          </p>

          <div className="p-5 bg-primary/10 border border-primary/20 rounded-xl">
            <h3 className="font-black uppercase mb-2">The Golden Rule</h3>
            <p className="text-muted-foreground">
              <strong className="text-foreground">If something feels off, walk away.</strong> There will always be another
              machine. The one you regret buying is the one you knew was wrong but bought anyway.
            </p>
          </div>
        </div>
      </section>

      {/* Before You Shop */}
      <section className="py-12 px-6 bg-muted/30">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-black italic uppercase font-space-grotesk mb-8">Before You Shop</h2>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="p-5 bg-card border border-border rounded-xl">
              <h3 className="font-black uppercase mb-4 flex items-center gap-2">
                <Search className="h-5 w-5 text-primary" /> Research Fair Prices
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Check NADA guides for baseline values</li>
                <li>• Search completed eBay/Facebook listings</li>
                <li>• Account for your local market conditions</li>
                <li>• Factor in any needed maintenance</li>
              </ul>
            </div>
            <div className="p-5 bg-card border border-border rounded-xl">
              <h3 className="font-black uppercase mb-4 flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" /> Know What You Need
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Define your riding style and terrain</li>
                <li>• Set a realistic total budget (machine + gear + maintenance)</li>
                <li>• Decide: project bike or ready-to-ride?</li>
                <li>• Research common issues for your target models</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Inspection Checklist */}
      <section className="py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-black italic uppercase font-space-grotesk mb-8">Inspection Checklist</h2>

          <div className="space-y-8">
            <InspectionCategory
              title="Engine & Drivetrain"
              items={[
                { check: 'Cold start behavior', detail: 'Should fire easily. Hard starting suggests issues.' },
                { check: 'Idle quality', detail: 'Smooth and consistent. Hunting idle = carburetor/sensor issues.' },
                { check: 'Smoke from exhaust', detail: 'Blue = oil burning. White = coolant. Black = rich mixture.' },
                { check: 'Clutch engagement', detail: 'Should grab smoothly, not slip or grab suddenly.' },
                { check: 'Transmission shifts', detail: 'All gears should engage cleanly. Listen for grinding.' },
                { check: 'Chain/belt condition', detail: 'Check tension, wear, sprocket teeth.' },
                { check: 'Oil condition', detail: 'Check color (milky = water). Ask when last changed.' },
              ]}
            />

            <InspectionCategory
              title="Frame & Suspension"
              items={[
                { check: 'Frame cracks', detail: 'Look at welds, steering head, swingarm pivot. Any cracks = walk away.' },
                { check: 'Fork seals', detail: 'Push down on forks. Any oil seepage = seal replacement needed.' },
                { check: 'Fork action', detail: 'Should be smooth through full travel. Binding = worn bushings.' },
                { check: 'Rear shock', detail: 'Check for oil leaks, smooth action.' },
                { check: 'Linkage bearings', detail: 'Grab swingarm, check for play. Worn bearings affect handling.' },
                { check: 'Steering head bearings', detail: 'With front wheel off ground, should turn smoothly without notches.' },
              ]}
            />

            <InspectionCategory
              title="Brakes & Wheels"
              items={[
                { check: 'Brake pad thickness', detail: 'Check both front and rear. Pads are cheap, rotors aren\'t.' },
                { check: 'Rotor condition', detail: 'Look for grooves, warping, minimum thickness.' },
                { check: 'Brake fluid', detail: 'Should be clear, not dark brown.' },
                { check: 'Wheel bearings', detail: 'Spin wheels, listen for roughness. Grab wheel, check for play.' },
                { check: 'Rim condition', detail: 'Dents, cracks, or heavy scratches affect tire seating.' },
                { check: 'Tire condition', detail: 'Tread depth, sidewall cracking, age (check date code).' },
              ]}
            />

            <InspectionCategory
              title="Electrical & Controls"
              items={[
                { check: 'All lights work', detail: 'High/low beam, turn signals, brake light.' },
                { check: 'Kill switch', detail: 'Should immediately stop engine.' },
                { check: 'Throttle return', detail: 'Should snap back when released.' },
                { check: 'Clutch/brake lever feel', detail: 'No binding, proper adjustment.' },
                { check: 'Wiring condition', detail: 'Look for hacked repairs, exposed wires, melted connectors.' },
                { check: 'Battery (if applicable)', detail: 'Should hold charge. Check terminals for corrosion.' },
              ]}
            />
          </div>
        </div>
      </section>

      {/* Red Flags */}
      <section className="py-12 px-6 bg-red-500/5">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <AlertTriangle className="h-8 w-8 text-red-500" />
            <h2 className="text-2xl font-black italic uppercase font-space-grotesk">Red Flags - Walk Away</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              'Seller won\'t let you do a cold start',
              'No title or registration issues',
              'Pressure to decide immediately',
              'Won\'t meet at their home',
              'Inconsistent story about history',
              'Fresh oil/fluids hiding problems',
              'Aftermarket exhaust without jetting',
              'VIN doesn\'t match paperwork',
              'Multiple previous owners with no records',
              'Significantly below market price',
              'Frame repairs or welds',
              'Refuses a pre-purchase inspection',
            ].map((flag, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-card border border-red-500/20 rounded-lg">
                <XCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                <span className="text-sm">{flag}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Good Signs */}
      <section className="py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <CheckCircle className="h-8 w-8 text-green-500" />
            <h2 className="text-2xl font-black italic uppercase font-space-grotesk">Good Signs</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              'Complete maintenance records',
              'Single owner, adult rider',
              'Stored indoors',
              'Original plastics/parts available',
              'Dealer service history',
              'Reasonable about inspection/test ride',
              'Knows specifics about the bike',
              'Clear title in their name',
              'OEM or quality aftermarket parts',
              'Priced at market value',
            ].map((sign, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-card border border-green-500/20 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                <span className="text-sm">{sign}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Negotiation */}
      <section className="py-12 px-6 bg-muted/30">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <DollarSign className="h-8 w-8 text-primary" />
            <h2 className="text-2xl font-black italic uppercase font-space-grotesk">Negotiation Tips</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <NegotiationTip
                title="Know your ceiling"
                description="Decide your max price before you arrive. Don't exceed it. Ever."
              />
              <NegotiationTip
                title="Point out issues, don't insult"
                description="'The fork seals need replacing, that's $200' works better than 'this thing is beat.'"
              />
              <NegotiationTip
                title="Bring cash"
                description="Cash in hand is powerful. 'I can give you $X right now' closes deals."
              />
            </div>
            <div className="space-y-4">
              <NegotiationTip
                title="Be ready to walk"
                description="The best negotiating position is genuine willingness to leave."
              />
              <NegotiationTip
                title="Consider the whole package"
                description="Extras (gear, parts, stands) can be included instead of price drops."
              />
              <NegotiationTip
                title="Don't show too much excitement"
                description="If seller knows you're in love, they won't negotiate."
              />
            </div>
          </div>
        </div>
      </section>

      {/* Post-Purchase */}
      <section className="py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Wrench className="h-8 w-8 text-primary" />
            <h2 className="text-2xl font-black italic uppercase font-space-grotesk">After You Buy</h2>
          </div>

          <div className="p-6 bg-card border border-border rounded-2xl">
            <h3 className="font-black uppercase mb-4">Day-One Service Checklist</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Even if the seller claims everything was just serviced, do this yourself or have a shop do it:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-primary" /> Change oil and filter</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-primary" /> Change coolant</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-primary" /> Fresh air filter</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-primary" /> Inspect/replace spark plug</li>
              </ul>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-primary" /> Check all bolts/fasteners</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-primary" /> Lube cables and pivot points</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-primary" /> Check brake fluid</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-primary" /> Set sag/suspension for your weight</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 bg-muted/30">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-black italic uppercase font-space-grotesk mb-4">Ready to Find Your Machine?</h2>
          <p className="text-muted-foreground mb-8">Browse our marketplace or continue learning.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/marketplace" className="px-6 py-3 bg-primary text-white rounded-xl font-black italic uppercase hover:scale-105 transition-transform">
              Browse Marketplace
            </Link>
            <Link href="/education/maintenance" className="px-6 py-3 bg-card border border-border rounded-xl font-black italic uppercase hover:bg-muted transition-colors">
              Maintenance Guide
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

function InspectionCategory({ title, items }: { title: string; items: { check: string; detail: string }[] }) {
  return (
    <div className="p-6 bg-card border border-border rounded-2xl">
      <h3 className="font-black italic uppercase text-lg mb-4">{title}</h3>
      <div className="space-y-3">
        {items.map((item, i) => (
          <div key={i} className="flex items-start gap-3">
            <div className="w-5 h-5 rounded border-2 border-primary/30 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-sm">{item.check}</p>
              <p className="text-xs text-muted-foreground">{item.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function NegotiationTip({ title, description }: { title: string; description: string }) {
  return (
    <div className="p-4 bg-card border border-border rounded-xl">
      <h4 className="font-black uppercase text-sm mb-1">{title}</h4>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
