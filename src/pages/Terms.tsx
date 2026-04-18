import { Link } from "react-router-dom";
import { EVENT_CONFIG } from "@/config/event";

const Terms = () => (
  <main className="container mx-auto px-4 py-16 max-w-3xl font-body">
    <Link to="/" className="text-sm text-primary hover:underline">← Back</Link>
    <h1 className="font-display text-4xl font-bold text-gradient-gold mt-4 mb-2">Terms & Conditions</h1>
    <p className="text-xs text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" })}</p>

    <div className="space-y-6 text-sm text-muted-foreground leading-relaxed">
      <section>
        <h2 className="text-xl font-semibold text-foreground mb-2">1. Who we are</h2>
        <p>These Terms & Conditions ("Terms") govern your use of this website and the purchase of tickets to {EVENT_CONFIG.fullTitle} from <strong>Horalix</strong> ("we", "us", "our"). By using the site or buying a ticket, you agree to these Terms.</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-foreground mb-2">2. The service</h2>
        <p>We sell digital event tickets delivered electronically as e-tickets containing a QR code. Tickets grant entry to the event subject to the venue's rules.</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-foreground mb-2">3. Eligibility & accounts</h2>
        <p>You must be of legal age to enter into a binding contract in your jurisdiction, or have the consent of a parent or guardian. You agree to provide accurate information at checkout and to keep it up to date.</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-foreground mb-2">4. Payments and Merchant of Record</h2>
        <p>Our order process is conducted by our online reseller <strong>Paddle.com</strong>. Paddle.com is the Merchant of Record for all our orders. Paddle provides all customer service inquiries and handles returns. Payment, billing, taxes, cancellation, and refund mechanics are governed by <a href="https://www.paddle.com/legal/checkout-buyer-terms" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Paddle's Buyer Terms</a>.</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-foreground mb-2">5. Refunds</h2>
        <p>See our <Link to="/refunds" className="text-primary hover:underline">Refund Policy</Link>. Refunds are processed by Paddle.</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-foreground mb-2">6. Acceptable use</h2>
        <p>You agree not to misuse the service. In particular, you must not: (a) use it for any unlawful purpose; (b) commit fraud, send spam, or resell tickets in violation of applicable law; (c) infringe intellectual property rights; or (d) interfere with the security of the site (including malware, probing, or scraping).</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-foreground mb-2">7. Intellectual property</h2>
        <p>All software, content, branding, trademarks, and design elements of this site are owned by Horalix or its licensors. We grant you a limited, non-exclusive, non-transferable right to use the site for purchasing and managing tickets. No other rights are granted.</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-foreground mb-2">8. Tickets, entry, and event changes</h2>
        <p>Each ticket admits one person and is valid only for the date, time, and sector printed on it. The organiser and venue may refuse entry for safety, security, or rule violations. If the event is postponed, tickets remain valid for the rescheduled date. If the event is cancelled, refunds will be issued via Paddle.</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-foreground mb-2">9. Service availability</h2>
        <p>We do not guarantee that the website will be uninterrupted, timely, secure, or error-free. We may modify, suspend, or discontinue parts of the service at any time.</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-foreground mb-2">10. Suspension and termination</h2>
        <p>We may suspend or terminate your access to the site or invalidate orders in case of: (a) material breach of these Terms; (b) non-payment or chargeback; (c) suspected fraud or security risk; or (d) repeated or serious policy violations.</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-foreground mb-2">11. Warranties and liability</h2>
        <p>To the fullest extent permitted by law, we disclaim all implied warranties, including merchantability and fitness for a particular purpose. Our aggregate liability arising out of or related to these Terms is limited to the amount you paid for the ticket(s) in question. We are not liable for indirect, consequential, or special damages. Nothing in these Terms excludes liability for fraud, death, or personal injury caused by negligence where such exclusion is not permitted by law.</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-foreground mb-2">12. Governing law</h2>
        <p>These Terms are governed by the laws of the seller's jurisdiction. Disputes shall be resolved in the competent courts of that jurisdiction, without prejudice to mandatory consumer protection rights.</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-foreground mb-2">13. Contact</h2>
        <p>Questions? Contact us at <a href={`mailto:${EVENT_CONFIG.supportEmail}`} className="text-primary hover:underline">{EVENT_CONFIG.supportEmail}</a>.</p>
      </section>
    </div>
  </main>
);

export default Terms;
