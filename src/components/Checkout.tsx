import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, CreditCard, Check, Loader2, X } from "lucide-react";
import { EVENT_CONFIG, type Sector } from "@/config/event";
import { z } from "zod";

const buyerSchema = z.object({
  fullName: z.string().trim().min(2, "Name is required").max(100),
  email: z.string().trim().email("Valid email required").max(255),
  phone: z.string().trim().min(6, "Phone is required").max(30),
  note: z.string().max(500).optional(),
  promoCode: z.string().max(30).optional(),
  acceptTerms: z.literal(true, { errorMap: () => ({ message: "You must accept the terms" }) }),
});

type BuyerData = z.infer<typeof buyerSchema>;

interface CheckoutProps {
  sector: Sector;
  quantity: number;
  onClose: () => void;
  onComplete: (order: { orderNumber: string; buyerName: string; email: string; sector: string; quantity: number; total: number }) => void;
}

const steps = ["Details", "Payment", "Confirm"];

const Checkout = ({ sector, quantity, onClose, onComplete }: CheckoutProps) => {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ fullName: "", email: "", phone: "", note: "", promoCode: "", acceptTerms: false });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const subtotal = sector.price * quantity;
  const fee = Math.round(subtotal * EVENT_CONFIG.serviceFeePercent / 100);
  const total = subtotal + fee;

  const updateField = (field: string, value: string | boolean) => {
    setForm((p) => ({ ...p, [field]: value }));
    setErrors((p) => ({ ...p, [field]: "" }));
  };

  const validateDetails = () => {
    const result = buyerSchema.safeParse({ ...form, acceptTerms: true });
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((e) => { fieldErrors[e.path[0] as string] = e.message; });
      setErrors(fieldErrors);
      return false;
    }
    return true;
  };

  const handlePayment = () => {
    if (!form.acceptTerms) {
      setErrors({ acceptTerms: "You must accept the terms" });
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const orderNumber = `KSV-${Date.now().toString(36).toUpperCase()}`;
      onComplete({ orderNumber, buyerName: form.fullName, email: form.email, sector: sector.name, quantity, total });
    }, 2000);
  };

  const inputClass = "w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground font-body text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm overflow-y-auto"
    >
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button onClick={step > 0 ? () => setStep(step - 1) : onClose} className="flex items-center gap-2 text-muted-foreground hover:text-foreground font-body text-sm transition-colors">
            <ArrowLeft className="w-4 h-4" /> {step > 0 ? "Back" : "Cancel"}
          </button>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Close">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Steps indicator */}
        <div className="flex items-center justify-center gap-2 mb-10">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-body font-semibold ${
                i <= step ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
              }`}>
                {i < step ? <Check className="w-4 h-4" /> : i + 1}
              </div>
              <span className={`text-xs font-body hidden sm:inline ${i <= step ? "text-foreground" : "text-muted-foreground"}`}>{s}</span>
              {i < steps.length - 1 && <div className={`w-8 sm:w-16 h-px ${i < step ? "bg-primary" : "bg-border"}`} />}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Main */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              {step === 0 && (
                <motion.div key="details" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
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
                  <button
                    onClick={() => validateDetails() && setStep(1)}
                    className="w-full py-3.5 rounded-lg bg-primary text-primary-foreground font-body font-semibold text-sm uppercase tracking-wider hover:opacity-90 transition-all"
                  >
                    Continue to Payment
                  </button>
                </motion.div>
              )}

              {step === 1 && (
                <motion.div key="payment" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
                  <h2 className="text-2xl font-display font-bold text-foreground mb-6">Payment</h2>

                  {/* Quick pay */}
                  <div className="grid grid-cols-2 gap-3">
                    <button className="py-3 rounded-lg bg-foreground text-background font-body font-semibold text-sm flex items-center justify-center gap-2">
                       Apple Pay
                    </button>
                    <button className="py-3 rounded-lg bg-foreground text-background font-body font-semibold text-sm flex items-center justify-center gap-2">
                      G Pay
                    </button>
                  </div>

                  <div className="flex items-center gap-3 text-muted-foreground text-xs font-body">
                    <div className="flex-1 h-px bg-border" />or pay with card<div className="flex-1 h-px bg-border" />
                  </div>

                  <div>
                    <label className="text-xs text-muted-foreground font-body uppercase tracking-wider mb-1.5 block">Card Number</label>
                    <input className={inputClass} placeholder="4242 4242 4242 4242" maxLength={19} />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-muted-foreground font-body uppercase tracking-wider mb-1.5 block">Expiry</label>
                      <input className={inputClass} placeholder="MM / YY" maxLength={7} />
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground font-body uppercase tracking-wider mb-1.5 block">CVC</label>
                      <input className={inputClass} placeholder="123" maxLength={4} />
                    </div>
                  </div>

                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" checked={form.acceptTerms} onChange={(e) => updateField("acceptTerms", e.target.checked)} className="mt-1 accent-primary" />
                    <span className="text-xs text-muted-foreground font-body">
                      I accept the <a href="#" className="text-primary underline">Terms & Conditions</a> and <a href="#" className="text-primary underline">Privacy Policy</a>.
                    </span>
                  </label>
                  {errors.acceptTerms && <p className="text-destructive text-xs font-body">{errors.acceptTerms}</p>}

                  <button
                    onClick={handlePayment}
                    disabled={loading}
                    className="w-full py-3.5 rounded-lg bg-primary text-primary-foreground font-body font-semibold text-sm uppercase tracking-wider hover:opacity-90 transition-all glow-gold disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Processing...</> : <><CreditCard className="w-4 h-4" /> Complete Purchase — {total} {EVENT_CONFIG.currency}</>}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-2">
            <div className="glass-panel-strong rounded-xl p-5 sticky top-8">
              <h3 className="font-display font-semibold text-foreground mb-4">Order Summary</h3>
              <div className="space-y-3 text-sm font-body">
                <div className="flex justify-between text-muted-foreground">
                  <span>{EVENT_CONFIG.artist}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>{EVENT_CONFIG.displayDate} • {EVENT_CONFIG.time}</span>
                </div>
                <div className="h-px bg-border my-3" />
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{sector.name} × {quantity}</span>
                  <span className="text-foreground">{subtotal} {EVENT_CONFIG.currency}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Service fee</span>
                  <span className="text-foreground">{fee} {EVENT_CONFIG.currency}</span>
                </div>
                <div className="h-px bg-border my-3" />
                <div className="flex justify-between text-lg font-display font-bold">
                  <span className="text-foreground">Total</span>
                  <span className="text-gradient-gold">{total} {EVENT_CONFIG.currency}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Checkout;
