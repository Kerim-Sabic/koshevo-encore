import { Link } from "react-router-dom";
import { EVENT_CONFIG } from "@/config/event";

const Refunds = () => (
  <main className="container mx-auto px-4 py-16 max-w-3xl font-body">
    <Link to="/" className="text-sm text-primary hover:underline">← Back</Link>
    <h1 className="font-display text-4xl font-bold text-gradient-gold mt-4 mb-2">Refund Policy</h1>
    <p className="text-xs text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" })}</p>

    <div className="space-y-6 text-sm text-muted-foreground leading-relaxed">
      <section>
        <h2 className="text-xl font-semibold text-foreground mb-2">30-day money-back guarantee</h2>
        <p><strong>Horalix</strong> offers a 30-day money-back guarantee on ticket purchases for {EVENT_CONFIG.fullTitle}. If you change your mind, you may request a full refund within 30 days of your order date.</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-foreground mb-2">How to request a refund</h2>
        <p>Refunds are processed by our payment provider and Merchant of Record, <strong>Paddle</strong>. To request a refund:</p>
        <ol className="list-decimal pl-6 space-y-1 mt-2">
          <li>Visit <a href="https://paddle.net" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">paddle.net</a> and look up your order using the email address you used at checkout.</li>
          <li>Or contact our support team at <a href={`mailto:${EVENT_CONFIG.supportEmail}`} className="text-primary hover:underline">{EVENT_CONFIG.supportEmail}</a> and we will help you process the refund through Paddle.</li>
        </ol>
        <p className="mt-2">Refunds are typically returned to the original payment method within 5–10 business days, depending on your bank.</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-foreground mb-2">Event cancellation or postponement</h2>
        <p>If the event is officially cancelled, all tickets will be refunded automatically. If the event is postponed, tickets remain valid for the rescheduled date; if you cannot attend the new date, you may request a refund through the process above.</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-foreground mb-2">Contact</h2>
        <p>Questions about refunds? Email us at <a href={`mailto:${EVENT_CONFIG.supportEmail}`} className="text-primary hover:underline">{EVENT_CONFIG.supportEmail}</a>.</p>
      </section>
    </div>
  </main>
);

export default Refunds;
