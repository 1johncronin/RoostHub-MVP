import { ArrowLeft, Mail, MapPin, Shield, Scale, FileText, Users } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Legal Information | RoostHub',
  description: 'Legal information, company details, and compliance information for RoostHub.',
};

export default function LegalPage() {
  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8">
          <ArrowLeft className="h-4 w-4" /> Back to Home
        </Link>

        <h1 className="text-3xl md:text-4xl font-black italic uppercase font-space-grotesk mb-2">Legal Information</h1>
        <p className="text-muted-foreground mb-8">Company details, compliance, and legal resources</p>

        <div className="space-y-8">
          {/* Company Information */}
          <section className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-primary/10 rounded-xl">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-xl font-black uppercase">Company Information</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Legal Entity</p>
                <p className="font-bold">Transparency Technologies, LLC</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Doing Business As</p>
                <p className="font-bold">RoostHub</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Jurisdiction</p>
                <p className="font-bold">State of Colorado, USA</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Type</p>
                <p className="font-bold">Limited Liability Company</p>
              </div>
            </div>
          </section>

          {/* Contact Information */}
          <section className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-primary/10 rounded-xl">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-xl font-black uppercase">Contact Information</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Mailing Address</p>
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground mt-1" />
                    <div>
                      <p className="font-bold">Transparency Technologies, LLC</p>
                      <p className="text-muted-foreground">PO Box 7399</p>
                      <p className="text-muted-foreground">Breckenridge, CO 80424</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">General Inquiries</p>
                  <a href="mailto:info@getrookd.com" className="text-primary hover:underline font-medium">info@getrookd.com</a>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Customer Support</p>
                  <a href="mailto:support@getrookd.com" className="text-primary hover:underline font-medium">support@getrookd.com</a>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Legal & Compliance</p>
                  <a href="mailto:legal@getrookd.com" className="text-primary hover:underline font-medium">legal@getrookd.com</a>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Business & Partnerships</p>
                  <a href="mailto:partner@getrookd.com" className="text-primary hover:underline font-medium">partner@getrookd.com</a>
                </div>
              </div>
            </div>
          </section>

          {/* Legal Documents */}
          <section className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-primary/10 rounded-xl">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-xl font-black uppercase">Legal Documents</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <Link href="/terms" className="p-4 bg-muted/50 rounded-xl hover:bg-muted transition-colors">
                <p className="font-bold">Terms of Service</p>
                <p className="text-sm text-muted-foreground">Rules governing your use of RoostHub</p>
              </Link>
              <Link href="/privacy" className="p-4 bg-muted/50 rounded-xl hover:bg-muted transition-colors">
                <p className="font-bold">Privacy Policy</p>
                <p className="text-sm text-muted-foreground">How we collect and use your data</p>
              </Link>
            </div>
          </section>

          {/* Compliance */}
          <section className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-primary/10 rounded-xl">
                <Scale className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-xl font-black uppercase">Compliance</h2>
            </div>
            <div className="space-y-4 text-sm text-muted-foreground">
              <p>
                <strong className="text-foreground">CCPA/CPRA Compliance:</strong> California residents have specific privacy
                rights under the California Consumer Privacy Act and California Privacy Rights Act. See our Privacy Policy
                for details on exercising these rights.
              </p>
              <p>
                <strong className="text-foreground">CAN-SPAM Compliance:</strong> We comply with the CAN-SPAM Act. You can
                opt out of marketing communications at any time via the unsubscribe link in emails or through your account settings.
              </p>
              <p>
                <strong className="text-foreground">DMCA:</strong> We respond to valid copyright infringement notices under
                the Digital Millennium Copyright Act. To report copyright infringement, contact{' '}
                <a href="mailto:legal@getrookd.com" className="text-primary hover:underline">legal@getrookd.com</a>.
              </p>
            </div>
          </section>

          {/* Report Issues */}
          <section className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-primary/10 rounded-xl">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-xl font-black uppercase">Report an Issue</h2>
            </div>
            <div className="space-y-4 text-sm text-muted-foreground">
              <p>
                <strong className="text-foreground">Fraudulent Listings:</strong> If you encounter a suspicious or fraudulent
                listing, please report it immediately to{' '}
                <a href="mailto:support@getrookd.com" className="text-primary hover:underline">support@getrookd.com</a>.
              </p>
              <p>
                <strong className="text-foreground">Harassment or Abuse:</strong> Report any harassment or abusive behavior
                from other users to our support team for investigation.
              </p>
              <p>
                <strong className="text-foreground">Security Vulnerabilities:</strong> If you discover a security vulnerability,
                please responsibly disclose it to{' '}
                <a href="mailto:legal@getrookd.com" className="text-primary hover:underline">legal@getrookd.com</a>.
              </p>
            </div>
          </section>

          {/* Disclaimer */}
          <section className="p-6 bg-muted/30 rounded-2xl border border-border">
            <h3 className="font-black uppercase mb-3">Disclaimer</h3>
            <p className="text-sm text-muted-foreground">
              RoostHub is a marketplace platform that connects buyers and sellers. We do not own, inspect, or guarantee
              any items listed on the platform. All transactions are between individual users, and RoostHub is not a
              party to these transactions. Users are responsible for verifying the accuracy of listings, the condition
              of items, and compliance with applicable laws regarding vehicle sales and transfers. Use the platform at
              your own risk.
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Transparency Technologies, LLC. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            RoostHub is a trademark of Transparency Technologies, LLC.
          </p>
        </div>
      </div>
    </div>
  );
}
