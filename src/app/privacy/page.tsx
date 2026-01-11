import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy | RoostHub',
  description: 'RoostHub Privacy Policy - Learn how we collect, use, and protect your personal information.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8">
          <ArrowLeft className="h-4 w-4" /> Back to Home
        </Link>

        <h1 className="text-3xl md:text-4xl font-black italic uppercase font-space-grotesk mb-2">Privacy Policy</h1>
        <p className="text-muted-foreground mb-8">Last Updated: January 2025</p>

        <div className="prose prose-invert prose-sm max-w-none space-y-8">
          <section>
            <h2 className="text-xl font-black uppercase mb-4">1. Introduction</h2>
            <p className="text-muted-foreground leading-relaxed">
              Transparency Technologies, LLC, doing business as RoostHub ("RoostHub," "we," "us," or "our"), is committed
              to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your
              information when you use our website, mobile applications, and services (collectively, the "Platform").
            </p>
            <p className="text-muted-foreground leading-relaxed">
              By using RoostHub, you consent to the data practices described in this Privacy Policy. If you do not agree
              with our practices, please do not use our Platform.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black uppercase mb-4">2. Information We Collect</h2>

            <h3 className="text-lg font-bold mt-6 mb-3">2.1 Information You Provide</h3>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li><strong>Account Information:</strong> Name, email address, phone number, password, and profile photo</li>
              <li><strong>Profile Information:</strong> Location, preferences, and interests related to motorsports</li>
              <li><strong>Listing Information:</strong> Machine details, photos, descriptions, pricing, and location</li>
              <li><strong>Garage Information:</strong> Details about machines in your personal collection</li>
              <li><strong>Communications:</strong> Messages sent through our platform, support inquiries, and feedback</li>
              <li><strong>Payment Information:</strong> When applicable, payment card details processed securely by our payment processor (Stripe)</li>
            </ul>

            <h3 className="text-lg font-bold mt-6 mb-3">2.2 Information Collected Automatically</h3>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li><strong>Device Information:</strong> Device type, operating system, unique device identifiers, browser type</li>
              <li><strong>Usage Data:</strong> Pages visited, features used, search queries, time spent on the Platform</li>
              <li><strong>Location Data:</strong> General location based on IP address; precise location only with your consent</li>
              <li><strong>Cookies and Tracking:</strong> We use cookies and similar technologies to enhance your experience</li>
            </ul>

            <h3 className="text-lg font-bold mt-6 mb-3">2.3 Information from Third Parties</h3>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li><strong>Social Login:</strong> If you sign in via Google or other providers, we receive basic profile information</li>
              <li><strong>Analytics Providers:</strong> We receive aggregated analytics data about Platform usage</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-black uppercase mb-4">3. How We Use Your Information</h2>
            <p className="text-muted-foreground leading-relaxed">We use collected information to:</p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Create and manage your account</li>
              <li>Facilitate marketplace transactions and communications between users</li>
              <li>Power AI features including VIN decoding, machine analysis, and intelligent search</li>
              <li>Send notifications about your listings, messages, and Dream Alerts</li>
              <li>Improve our Platform, develop new features, and enhance user experience</li>
              <li>Detect and prevent fraud, abuse, and security threats</li>
              <li>Comply with legal obligations and enforce our Terms of Service</li>
              <li>Send promotional communications (with your consent, and you can opt out)</li>
              <li>Conduct research and analysis using anonymized, aggregated data</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-black uppercase mb-4">4. How We Share Your Information</h2>

            <h3 className="text-lg font-bold mt-6 mb-3">4.1 With Other Users</h3>
            <p className="text-muted-foreground leading-relaxed">
              When you create listings or interact on the marketplace, certain information (username, profile photo,
              listing details, general location) is visible to other users. Messages are shared with recipients.
            </p>

            <h3 className="text-lg font-bold mt-6 mb-3">4.2 With Service Providers</h3>
            <p className="text-muted-foreground leading-relaxed">
              We share information with third-party service providers who perform services on our behalf, including:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Cloud hosting and storage (Supabase, Vercel)</li>
              <li>Payment processing (Stripe)</li>
              <li>Email communications (Resend)</li>
              <li>AI services (Groq)</li>
              <li>Analytics and performance monitoring</li>
            </ul>

            <h3 className="text-lg font-bold mt-6 mb-3">4.3 For Legal Reasons</h3>
            <p className="text-muted-foreground leading-relaxed">
              We may disclose information when required by law, in response to legal process, to protect our rights,
              to investigate fraud or security issues, or to protect the safety of our users.
            </p>

            <h3 className="text-lg font-bold mt-6 mb-3">4.4 Business Transfers</h3>
            <p className="text-muted-foreground leading-relaxed">
              In the event of a merger, acquisition, or sale of assets, user information may be transferred to the
              acquiring entity.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black uppercase mb-4">5. Data Retention</h2>
            <p className="text-muted-foreground leading-relaxed">
              We retain your personal information for as long as your account is active or as needed to provide you
              services. We may retain certain information for longer periods as required by law or for legitimate
              business purposes (such as resolving disputes or enforcing agreements).
            </p>
            <p className="text-muted-foreground leading-relaxed">
              You can request deletion of your account and associated data by contacting us at{' '}
              <a href="mailto:support@getrookd.com" className="text-primary hover:underline">support@getrookd.com</a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black uppercase mb-4">6. Data Security</h2>
            <p className="text-muted-foreground leading-relaxed">
              We implement appropriate technical and organizational measures to protect your information, including
              encryption in transit (TLS/SSL), secure password hashing, and access controls. However, no method of
              transmission over the internet is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black uppercase mb-4">7. Your Rights and Choices</h2>

            <h3 className="text-lg font-bold mt-6 mb-3">7.1 Access and Correction</h3>
            <p className="text-muted-foreground leading-relaxed">
              You can access and update most of your personal information through your account settings. For additional
              requests, contact us at <a href="mailto:privacy@getrookd.com" className="text-primary hover:underline">privacy@getrookd.com</a>.
            </p>

            <h3 className="text-lg font-bold mt-6 mb-3">7.2 Deletion</h3>
            <p className="text-muted-foreground leading-relaxed">
              You can request deletion of your personal data by contacting us. Note that some information may be
              retained as required by law or for legitimate business purposes.
            </p>

            <h3 className="text-lg font-bold mt-6 mb-3">7.3 Marketing Communications</h3>
            <p className="text-muted-foreground leading-relaxed">
              You can opt out of promotional emails by clicking the unsubscribe link in any email or updating your
              notification preferences in your account settings.
            </p>

            <h3 className="text-lg font-bold mt-6 mb-3">7.4 Cookies</h3>
            <p className="text-muted-foreground leading-relaxed">
              Most browsers allow you to control cookies through their settings. Disabling cookies may affect Platform functionality.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black uppercase mb-4">8. California Privacy Rights (CCPA/CPRA)</h2>
            <p className="text-muted-foreground leading-relaxed">
              California residents have additional rights under the California Consumer Privacy Act (CCPA) and California
              Privacy Rights Act (CPRA), including the right to:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Know what personal information we collect and how it's used</li>
              <li>Request deletion of personal information</li>
              <li>Opt out of the "sale" or "sharing" of personal information</li>
              <li>Non-discrimination for exercising privacy rights</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              To exercise these rights, contact us at <a href="mailto:privacy@getrookd.com" className="text-primary hover:underline">privacy@getrookd.com</a>.
              We will respond within 45 days.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black uppercase mb-4">9. Children's Privacy</h2>
            <p className="text-muted-foreground leading-relaxed">
              RoostHub is not intended for children under 18. We do not knowingly collect personal information from
              children under 18. If we learn we have collected such information, we will delete it promptly.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black uppercase mb-4">10. International Users</h2>
            <p className="text-muted-foreground leading-relaxed">
              RoostHub is operated in the United States. If you access the Platform from outside the United States,
              your information may be transferred to, stored, and processed in the United States, where data protection
              laws may differ from your jurisdiction.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black uppercase mb-4">11. Changes to This Policy</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of material changes by posting
              the updated policy on our Platform and updating the "Last Updated" date. Your continued use after changes
              constitutes acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black uppercase mb-4">12. Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have questions about this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="bg-card border border-border rounded-xl p-4 mt-4">
              <p className="font-bold">Transparency Technologies, LLC (DBA RoostHub)</p>
              <p className="text-muted-foreground">PO Box 7399</p>
              <p className="text-muted-foreground">Breckenridge, CO 80424</p>
              <p className="text-muted-foreground mt-2">
                Privacy Inquiries: <a href="mailto:privacy@getrookd.com" className="text-primary hover:underline">privacy@getrookd.com</a>
              </p>
              <p className="text-muted-foreground">
                General Support: <a href="mailto:support@getrookd.com" className="text-primary hover:underline">support@getrookd.com</a>
              </p>
            </div>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-wrap gap-4">
            <Link href="/terms" className="text-sm text-primary hover:underline">Terms of Service</Link>
            <Link href="/legal" className="text-sm text-primary hover:underline">Legal Information</Link>
            <Link href="/contact" className="text-sm text-primary hover:underline">Contact Us</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
