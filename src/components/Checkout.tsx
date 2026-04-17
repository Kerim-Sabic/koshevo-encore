import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, X, Loader2, ExternalLink } from "lucide-react";
import { EVENT_CONFIG, type Sector } from "@/config/event";
import { initializePaddle, getPaddlePriceId } from "@/lib/paddle";
import { z } from "zod";

const buyerSchema = z.object({
  fullName: z.string().trim().min(2, "Name is required").max(100),
  email: z.string().trim().email("Valid email required").max(255),
  phone: z.string().trim().min(6, "Phone is required").max(30),
  note: z.string().max(500).optional(),
  promoCode: z.string().max(30).optional(),
});

interface CheckoutProps {
  sector: Sector;
  quantity: number;
  onClose: () => void;
}

const Checkout = ({ sector, quantity, onClose }: CheckoutProps) => {
  const [form, setForm] = useState({ fullName: "", email: "", phone: "", note: "", promoCode: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Display in BAM (KM), charge in EUR (~1 EUR = 1.96 BAM)
  const eurRate = 1.96;
  const subtotalBAM = sector.price * quantity;
  const feeBAM = Math.round((subtotalBAM * EVENT_CONFIG.serviceFeePercent) / 100);
  const totalBAM = subtotalBAM + feeBAM;
  const totalEUR = (totalBAM / eurRate).toFixed(2);

  const updateField = (field: string, value: string) => {
    setForm((p) => ({ ...p, [field]: value }));
    setErrors((p) => ({ ...p, [field]: "" }));
  };

  const handleCheckout = async () => {
    const result = buyerSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((e) => {
        fieldErrors[e.path[0] as string] = e.message;
      });
      setErrors(fieldErrors);
      return;
    }

    if (!sector.paddlePriceId) {
      setError("This ticket type is not yet configured for payment. Please try another sector.");
      return;
    }

    setSubmitting(true);
    setError(null);
    try {
      await initializePaddle();
      const paddlePriceId = await getPaddlePriceId(sector.paddlePriceId);

      window.Paddle.Checkout.open({
        items: [{ priceId: paddlePriceId, quantity }],
        customer: { email: form.email },
        customData: {
          buyerName: form.fullName,
          email: form.email,
          phone: form.phone,
          sectorName: sector.name,
          sectorId: sector.id,
          priceExternalId: sector.paddlePriceId,
          note: form.note || "",
          promoCode: form.promoCode || "",
        },
        settings: {
          displayMode: "overlay",
          successUrl: `${window.location.origin}/checkout/return?paddle=success`,
          allowLogout: false,
          variant: "one-page",
        },
      });
    } catch (e: any) {
      console.error(e);
      setError(e?.message || "Failed to open checkout");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground font-body text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm overflow-y-auto"
    >
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground font-body text-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Cancel
          </button>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Close">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3 space-y-4">
            <h2 className="text-2xl font-display font-bold text-foreground mb-6">Your Details</h2>
            <div>
              <label className="text-xs text-muted-foreground font-body uppercase tracking-wider mb-1.5 block">Full Name *</label>
              <input className={inputClass} value={form.fullName} onChange={(e) => updateField("fullName", e.target.value)} placeholder="Your full name" />
              {errors.fullName && <p className="text-destructive text-xs mt-1 font-body">{errors.fullName}</p>}
            </div>
            <div>
              <label className="text-xs text-muted-foreground font-body uppercase tracking-wider mb-1.5 block">Email Address *</label>
              <input className={inputClass} type="email" value={form.email} onChange={(e) => updateField("email", e.target.value)} placeholder="your@email.com" />
              {errors.email && <p className="text-destructive text-xs mt-1 font-body">{errors.email}</p>}
            </div>
            <div>
              <label className="text-xs text-muted-foreground font-body uppercase tracking-wider mb-1.5 block">Phone *</label>
              <input className={inputClass} type="tel" value={form.phone} onChange={(e) => updateField("phone", e.target.value)} placeholder="+387 ..." />
              {errors.phone && <p className="text-destructive text-xs mt-1 font-body">{errors.phone}</p>}
            </div>
            <div>
              <label className="text-xs text-muted-foreground font-body uppercase tracking-wider mb-1.5 block">Promo Code</label>
              <input className={inputClass} value={form.promoCode} onChange={(e) => updateField("promoCode", e.target.value)} placeholder="Optional" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground font-body uppercase tracking-wider mb-1.5 block">Note</label>
              <textarea className={`${inputClass} resize-none h-20`} value={form.note} onChange={(e) => updateField("note", e.target.value)} placeholder="Optional note" />
            </div>

            {error && (
              <div className="p-4 rounded-lg bg-destructive/10 text-destructive text-sm font-body">
                {error}
              </div>
            )}

            <button
              onClick={handleCheckout}
              disabled={submitting}
              className="w-full py-3.5 rounded-lg bg-primary text-primary-foreground font-body font-semibold text-sm uppercase tracking-wider hover:opacity-90 transition-all disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <ExternalLink className="w-4 h-4" />}
              {submitting ? "Opening secure checkout..." : "Continue to Secure Payment"}
            </button>

            <p className="text-xs text-muted-foreground font-body text-center">
              Charged in EUR (~€{totalEUR}) via our secure payment provider.
            </p>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-2">
            <div className="glass-panel-strong rounded-xl p-5 sticky top-8">
              <h3 className="font-display font-semibold text-foreground mb-4">Order Summary</h3>
              <div className="space-y-3 text-sm font-body">
                <div className="flex justify-between text-muted-foreground"><span>{EVENT_CONFIG.artist}</span></div>
                <div className="flex justify-between text-muted-foreground"><span>{EVENT_CONFIG.displayDate} • {EVENT_CONFIG.time}</span></div>
                <div className="h-px bg-border my-3" />
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{sector.name} × {quantity}</span>
                  <span className="text-foreground">{subtotalBAM} {EVENT_CONFIG.currency}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Service fee</span>
                  <span className="text-foreground">{feeBAM} {EVENT_CONFIG.currency}</span>
                </div>
                <div className="h-px bg-border my-3" />
                <div className="flex justify-between text-lg font-display font-bold">
                  <span className="text-foreground">Total</span>
                  <span className="text-gradient-gold">{totalBAM} {EVENT_CONFIG.currency}</span>
                </div>
                <p className="text-xs text-muted-foreground text-right">≈ €{totalEUR}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Checkout;
