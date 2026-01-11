import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Terms of Service | RoostHub',
  description: 'RoostHub Terms of Service - Read our terms and conditions for using the RoostHub motorsports marketplace platform.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8">
          <ArrowLeft className="h-4 w-4" /> Back to Home
        </Link>

        <h1 className="text-3xl md:text-4xl font-black italic uppercase font-space-grotesk mb-2">Terms of Service</h1>
        <p className="text-muted-foreground mb-8">Last Updated: January 2025</p>

        <div className="prose prose-invert prose-sm max-w-none space-y-8">
          <section>
            <h2 className="text-xl font-black uppercase mb-4">1. Introduction and Acceptance</h2>
            <p className="text-muted-foreground leading-relaxed">
              Welcome to RoostHub. These Terms of Service ("Terms") govern your access to and use of RoostHub's website,
              mobile applications, and services (collectively, the "Platform"), operated by Transparency Technologies, LLC
              ("RoostHub," "we," "us," or "our").
            </p>
            <p className="text-muted-foreground leading-relaxed">
              By accessing or using our Platform, you agree to be bound by these Terms. If you do not agree to these Terms,
              you may not access or use the Platform. We reserve the right to modify these Terms at any time, and such
              modifications will be effective immediately upon posting on the Platform.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black uppercase mb-4">2. Eligibility</h2>
            <p className="text-muted-foreground leading-relaxed">To use RoostHub, you must:</p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Be at least 18 years of age</li>
              <li>Be legally capable of entering into binding contracts</li>
              <li>Not have been previously suspended or removed from our Platform</li>
              <li>Comply with all applicable laws and regulations regarding the sale and purchase of motorized vehicles and equipment</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-black uppercase mb-4">3. Services Provided</h2>
            <p className="text-muted-foreground leading-relaxed">RoostHub provides a platform for motorsports enthusiasts to:</p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li><strong>Marketplace:</strong> Buy, sell, and browse dirt bikes, snowmobiles, ATVs, UTVs, and related equipment</li>
              <li><strong>Garage:</strong> Catalog and manage your personal collection of machines</li>
              <li><strong>Dream Alerts:</strong> Set notifications for specific machines you're looking for</li>
              <li><strong>AI-Powered Tools:</strong> VIN decoding, machine analysis, and intelligent search capabilities</li>
              <li><strong>Messaging:</strong> Communicate with buyers and sellers through our platform</li>
              <li><strong>Education:</strong> Access guides, tutorials, and community knowledge about motorsports</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              RoostHub is a platform that connects buyers and sellers. We are not a party to any transaction between users
              and do not guarantee the quality, safety, or legality of any listed items.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black uppercase mb-4">4. Account Registration and Security</h2>
            <p className="text-muted-foreground leading-relaxed">When creating an account, you agree to:</p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Provide accurate, current, and complete information</li>
              <li>Maintain and update your information to keep it accurate</li>
              <li>Keep your password secure and confidential</li>
              <li>Accept responsibility for all activities under your account</li>
              <li>Notify us immediately of any unauthorized use of your account</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-black uppercase mb-4">5. Listing and Selling</h2>
            <p className="text-muted-foreground leading-relaxed">When listing items for sale, you represent and warrant that:</p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>You have the legal right to sell the item</li>
              <li>The item description is accurate and not misleading</li>
              <li>All photos are of the actual item being sold</li>
              <li>The item is not stolen, encumbered, or subject to any liens (unless disclosed)</li>
              <li>You will complete the transaction as described in your listing</li>
              <li>You comply with all applicable laws regarding vehicle sales, including title transfer requirements</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-black uppercase mb-4">6. Prohibited Conduct</h2>
            <p className="text-muted-foreground leading-relaxed">You agree not to:</p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Post false, misleading, or fraudulent listings</li>
              <li>Sell stolen property or items you don't have the right to sell</li>
              <li>Harass, threaten, or intimidate other users</li>
              <li>Circumvent the Platform to complete transactions off-platform to avoid fees</li>
              <li>Use the Platform for any illegal purpose</li>
              <li>Attempt to manipulate prices or engage in price-fixing</li>
              <li>Create multiple accounts to evade bans or restrictions</li>
              <li>Scrape, harvest, or collect user data without authorization</li>
              <li>Introduce malware, viruses, or other harmful code</li>
              <li>Impersonate another person or entity</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-black uppercase mb-4">7. Content and Intellectual Property</h2>
            <p className="text-muted-foreground leading-relaxed">
              By posting content on RoostHub (including listings, photos, reviews, and comments), you grant us a
              non-exclusive, worldwide, royalty-free license to use, display, reproduce, and distribute that content
              in connection with operating and promoting the Platform.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              You retain ownership of your content but are responsible for ensuring you have the right to share it
              and that it doesn't infringe on others' intellectual property rights.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              RoostHub and its logo, design elements, and original content are owned by Transparency Technologies, LLC
              and are protected by copyright and trademark laws.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black uppercase mb-4">8. AI-Powered Features</h2>
            <p className="text-muted-foreground leading-relaxed">
              RoostHub utilizes artificial intelligence for various features including VIN decoding, machine identification,
              and search optimization. While we strive for accuracy, AI-generated information is provided for convenience
              and should not be relied upon as the sole source of truth. Users should independently verify important
              information, especially regarding vehicle specifications, values, and history.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black uppercase mb-4">9. Fees and Payments</h2>
            <p className="text-muted-foreground leading-relaxed">
              RoostHub may charge fees for certain services, including premium listings, featured placements, or
              transaction facilitation. All applicable fees will be clearly disclosed before you incur them.
              Fees are non-refundable unless otherwise stated.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black uppercase mb-4">10. Disclaimers</h2>
            <p className="text-muted-foreground leading-relaxed">
              THE PLATFORM IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED.
              WE DO NOT WARRANT THAT THE PLATFORM WILL BE UNINTERRUPTED, ERROR-FREE, OR SECURE.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              RoostHub does not inspect, verify, or guarantee the accuracy of listings, the quality or safety of items,
              or the ability of sellers to complete sales. All transactions are at your own risk.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black uppercase mb-4">11. Limitation of Liability</h2>
            <p className="text-muted-foreground leading-relaxed">
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, ROOSTHUB AND ITS OFFICERS, DIRECTORS, EMPLOYEES, AND AGENTS
              SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING
              FROM YOUR USE OF THE PLATFORM.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              OUR TOTAL LIABILITY SHALL NOT EXCEED THE GREATER OF: (A) THE AMOUNT YOU PAID TO ROOSTHUB IN THE
              TWELVE MONTHS PRECEDING THE CLAIM, OR (B) ONE HUNDRED DOLLARS ($100 USD).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black uppercase mb-4">12. Indemnification</h2>
            <p className="text-muted-foreground leading-relaxed">
              You agree to indemnify and hold harmless RoostHub and its affiliates from any claims, damages, losses,
              or expenses (including reasonable attorneys' fees) arising from your use of the Platform, your violation
              of these Terms, or your violation of any rights of another party.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black uppercase mb-4">13. Dispute Resolution</h2>
            <p className="text-muted-foreground leading-relaxed">
              Any disputes arising from these Terms or your use of the Platform shall be resolved through binding
              arbitration in Denver, Colorado, in accordance with the rules of the American Arbitration Association.
              You agree to waive your right to participate in class action lawsuits or class-wide arbitration.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black uppercase mb-4">14. Termination</h2>
            <p className="text-muted-foreground leading-relaxed">
              We reserve the right to suspend or terminate your account at any time, with or without cause, and with
              or without notice. Upon termination, your right to use the Platform will immediately cease, but provisions
              that by their nature should survive termination will remain in effect.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black uppercase mb-4">15. Governing Law</h2>
            <p className="text-muted-foreground leading-relaxed">
              These Terms shall be governed by and construed in accordance with the laws of the State of Colorado,
              without regard to its conflict of law provisions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black uppercase mb-4">16. Contact Information</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have questions about these Terms, please contact us:
            </p>
            <div className="bg-card border border-border rounded-xl p-4 mt-4">
              <p className="font-bold">Transparency Technologies, LLC</p>
              <p className="text-muted-foreground">PO Box 7399</p>
              <p className="text-muted-foreground">Breckenridge, CO 80424</p>
              <p className="text-muted-foreground mt-2">
                General Inquiries: <a href="mailto:info@getrookd.com" className="text-primary hover:underline">info@getrookd.com</a>
              </p>
              <p className="text-muted-foreground">
                Support: <a href="mailto:support@getrookd.com" className="text-primary hover:underline">support@getrookd.com</a>
              </p>
              <p className="text-muted-foreground">
                Legal: <a href="mailto:legal@getrookd.com" className="text-primary hover:underline">legal@getrookd.com</a>
              </p>
            </div>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-wrap gap-4">
            <Link href="/privacy" className="text-sm text-primary hover:underline">Privacy Policy</Link>
            <Link href="/legal" className="text-sm text-primary hover:underline">Legal Information</Link>
            <Link href="/contact" className="text-sm text-primary hover:underline">Contact Us</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
