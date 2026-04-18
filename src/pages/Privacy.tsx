import { Link } from "react-router-dom";
import { EVENT_CONFIG } from "@/config/event";

const Privacy = () => (
  <main className="container mx-auto px-4 py-16 max-w-3xl font-body">
    <Link to="/" className="text-sm text-primary hover:underline">← Back</Link>
    <h1 className="font-display text-4xl font-bold text-gradient-gold mt-4 mb-2">Privacy Notice</h1>
    <p className="text-xs text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" })}</p>

    <div className="space-y-6 text-sm text-muted-foreground leading-relaxed">
      <section>
        <h2 className="text-xl font-semibold text-foreground mb-2">1. Who we are</h2>
        <p>This Privacy Notice describes how <strong>Horalix</strong> ("we", "us", "our") collects and processes personal data in connection with the sale of tickets to {EVENT_CONFIG.fullTitle}. Horalix is the data controller for the personal data described below.</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-foreground mb-2">2. Data we collect</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>Identity & contact data:</strong> name, email address, phone number provided during checkout.</li>
          <li><strong>Order data:</strong> ticket type, quantity, order number, optional notes and promo codes.</li>
          <li><strong>Technical data:</strong> IP address, device identifiers, browser type, and usage telemetry.</li>
          <li><strong>Support data:</strong> any messages you send us via support channels.</li>
        </ul>
        <p className="mt-2">Payment card details are collected and processed directly by our payment provider (Paddle) and are not stored by us.</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-foreground mb-2">3. Purposes & legal basis</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>To fulfil your order</strong> (contract performance) — issuing tickets, sending confirmations, granting venue entry.</li>
          <li><strong>To provide customer support</strong> (legitimate interests / contract performance).</li>
          <li><strong>Security and fraud prevention</strong> (legitimate interests).</li>
          <li><strong>Legal compliance</strong> (legal obligation) — tax, accounting, and regulatory requirements.</li>
          <li><strong>Service improvement</strong> (legitimate interests) — analytics on aggregate usage.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-foreground mb-2">4. Sharing your data</h2>
        <p>We share personal data with the following categories of recipients:</p>
        <ul className="list-disc pl-6 space-y-1 mt-2">
          <li><strong>Paddle.com Market Limited</strong> — our Merchant of Record, who handles payment processing, billing, tax compliance, invoicing, refunds, and subscription management.</li>
          <li><strong>Service providers / subprocessors</strong> — hosting, database, email delivery, and analytics providers acting on our instructions.</li>
          <li><strong>Venue and event operators</strong> — for ticket validation and entry control.</li>
          <li><strong>Professional advisers</strong> — legal, accounting, and audit advisers.</li>
          <li><strong>Authorities</strong> — where required by law or to protect our rights.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-foreground mb-2">5. International transfers</h2>
        <p>Some of our service providers may process data outside the EEA / UK. Where this happens, we rely on appropriate safeguards such as Standard Contractual Clauses or adequacy decisions.</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-foreground mb-2">6. Retention</h2>
        <p>We keep order and identity data for as long as necessary to fulfil the event and to comply with legal, accounting, and tax obligations (typically up to 10 years). Technical and analytics data are retained for shorter periods and then deleted or anonymised.</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-foreground mb-2">7. Your rights</h2>
        <p>Subject to applicable law, you have the right to access, rectify, erase, restrict, or object to processing of your personal data, the right to data portability, and the right to withdraw consent at any time. You may also lodge a complaint with your local data protection authority. We aim to respond to requests within one month.</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-foreground mb-2">8. Security</h2>
        <p>We implement appropriate technical and organisational measures — including encryption in transit, access controls, and least-privilege practices — to protect your personal data.</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-foreground mb-2">9. Cookies</h2>
        <p>We use strictly necessary cookies to operate the site and may use limited analytics cookies to understand aggregate usage. You can manage cookies through your browser settings.</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-foreground mb-2">10. Contact</h2>
        <p>For privacy questions or to exercise your rights, contact us at <a href={`mailto:${EVENT_CONFIG.supportEmail}`} className="text-primary hover:underline">{EVENT_CONFIG.supportEmail}</a>.</p>
      </section>
    </div>
  </main>
);

export default Privacy;
