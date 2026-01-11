import { ArrowLeft, Mail, MapPin, MessageSquare, HelpCircle, Shield, Users } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Contact Us | RoostHub',
  description: 'Get in touch with the RoostHub team. Support, partnerships, and general inquiries.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8">
          <ArrowLeft className="h-4 w-4" /> Back to Home
        </Link>

        <h1 className="text-3xl md:text-4xl font-black italic uppercase font-space-grotesk mb-2">Contact Us</h1>
        <p className="text-muted-foreground mb-8">We're here to help. Reach out through any of the channels below.</p>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <ContactCard
            icon={<HelpCircle className="h-6 w-6" />}
            title="Customer Support"
            description="Questions about your account, listings, or transactions"
            email="support@getrookd.com"
            responseTime="24-48 hours"
          />
          <ContactCard
            icon={<MessageSquare className="h-6 w-6" />}
            title="General Inquiries"
            description="General questions about RoostHub"
            email="info@getrookd.com"
            responseTime="2-3 business days"
          />
          <ContactCard
            icon={<Users className="h-6 w-6" />}
            title="Partnerships"
            description="Business partnerships, sponsorships, and collaborations"
            email="partner@getrookd.com"
            responseTime="3-5 business days"
          />
          <ContactCard
            icon={<Shield className="h-6 w-6" />}
            title="Legal & Compliance"
            description="Legal matters, DMCA notices, and compliance inquiries"
            email="legal@getrookd.com"
            responseTime="5-7 business days"
          />
        </div>

        {/* Mailing Address */}
        <div className="bg-card border border-border rounded-2xl p-6 mb-12">
          <div className="flex items-center gap-3 mb-4">
            <MapPin className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-black uppercase">Mailing Address</h2>
          </div>
          <p className="font-bold">Transparency Technologies, LLC (DBA RoostHub)</p>
          <p className="text-muted-foreground">PO Box 7399</p>
          <p className="text-muted-foreground">Breckenridge, CO 80424</p>
          <p className="text-muted-foreground">United States</p>
        </div>

        {/* FAQ Section */}
        <div className="mb-12">
          <h2 className="text-xl font-black italic uppercase font-space-grotesk mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <FAQItem
              question="How do I create a listing?"
              answer="Navigate to the 'Sell' page from the main navigation. You'll be guided through adding photos, details, and pricing for your machine."
            />
            <FAQItem
              question="How do I report a suspicious listing?"
              answer="Use the 'Report' button on any listing page, or email support@getrookd.com with the listing URL and your concerns."
            />
            <FAQItem
              question="How do I delete my account?"
              answer="Contact support@getrookd.com with your request. We'll process account deletions within 30 days per our Privacy Policy."
            />
            <FAQItem
              question="Is RoostHub free to use?"
              answer="Creating an account, browsing listings, and basic features are free. Premium features may have associated fees, which are clearly disclosed."
            />
            <FAQItem
              question="How do transactions work?"
              answer="RoostHub connects buyers and sellers. Transactions happen directly between users. We recommend meeting in safe, public locations and using secure payment methods."
            />
          </div>
        </div>

        {/* Community */}
        <div className="bg-primary/10 border border-primary/20 rounded-2xl p-6 text-center">
          <h2 className="text-xl font-black uppercase mb-3">Join the Community</h2>
          <p className="text-muted-foreground mb-4">
            Connect with other riders, share knowledge, and stay updated on the latest from RoostHub.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/education" className="px-6 py-2 bg-primary text-white rounded-xl font-bold hover:scale-105 transition-transform">
              Education Basecamp
            </Link>
            <Link href="/marketplace" className="px-6 py-2 bg-card border border-border rounded-xl font-bold hover:bg-muted transition-colors">
              Browse Marketplace
            </Link>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-wrap gap-4">
            <Link href="/terms" className="text-sm text-primary hover:underline">Terms of Service</Link>
            <Link href="/privacy" className="text-sm text-primary hover:underline">Privacy Policy</Link>
            <Link href="/legal" className="text-sm text-primary hover:underline">Legal Information</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactCard({ icon, title, description, email, responseTime }: {
  icon: React.ReactNode;
  title: string;
  description: string;
  email: string;
  responseTime: string;
}) {
  return (
    <div className="bg-card border border-border rounded-2xl p-6 hover:border-primary/50 transition-colors">
      <div className="text-primary mb-3">{icon}</div>
      <h3 className="font-black uppercase mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground mb-4">{description}</p>
      <a href={`mailto:${email}`} className="text-primary hover:underline font-medium block mb-2">{email}</a>
      <p className="text-xs text-muted-foreground">Typical response: {responseTime}</p>
    </div>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  return (
    <div className="p-4 bg-card border border-border rounded-xl">
      <h3 className="font-bold mb-2">{question}</h3>
      <p className="text-sm text-muted-foreground">{answer}</p>
    </div>
  );
}
