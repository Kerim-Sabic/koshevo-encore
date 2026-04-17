import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Check, ArrowLeft, Loader2, Mail } from "lucide-react";
import { PaymentTestModeBanner } from "@/components/PaymentTestModeBanner";
import { supabase } from "@/integrations/supabase/client";
import { EVENT_CONFIG } from "@/config/event";

interface OrderSummary {
  order_number: string;
  buyer_name: string;
  email: string;
  sector_name: string;
  quantity: number;
  total_amount: number;
  currency: string;
}

export default function CheckoutReturn() {
  const [searchParams] = useSearchParams();
  const isPaddleSuccess = searchParams.get("paddle") === "success";
  const [order, setOrder] = useState<OrderSummary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isPaddleSuccess) {
      setLoading(false);
      return;
    }
    // Webhook may take a few seconds; poll for the latest order matching this session.
    // We use the most recent order created in the last 2 minutes as a heuristic since
    // the success URL doesn't carry an order ID.
    let cancelled = false;
    let attempts = 0;
    const poll = async () => {
      attempts++;
      const { data } = await supabase
        .from("orders")
        .select("order_number, buyer_name, email, sector_name, quantity, total_amount, currency")
        .order("created_at", { ascending: false })
        .limit(1);
      if (cancelled) return;
      if (data && data.length > 0) {
        setOrder(data[0] as OrderSummary);
        setLoading(false);
        return;
      }
      if (attempts < 10) {
        setTimeout(poll, 1500);
      } else {
        setLoading(false);
      }
    };
    poll();
    return () => {
      cancelled = true;
    };
  }, [isPaddleSuccess]);

  return (
    <div className="min-h-screen bg-background">
      <PaymentTestModeBanner />
      <div className="container mx-auto px-4 py-20 max-w-lg text-center">
        {!isPaddleSuccess ? (
          <div className="space-y-4">
            <h1 className="text-2xl font-display font-bold text-foreground">No payment found</h1>
            <Link to="/" className="text-primary underline font-body">Return home</Link>
          </div>
        ) : loading ? (
          <div className="space-y-6">
            <Loader2 className="w-10 h-10 text-primary animate-spin mx-auto" />
            <p className="text-muted-foreground font-body">Confirming your payment…</p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto">
              <Check className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl font-display font-bold text-foreground">Payment Complete!</h1>
            {order && (
              <div className="glass-panel-strong rounded-xl p-6 text-left space-y-2 font-body text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Order</span>
                  <span className="text-foreground font-semibold">{order.order_number}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Name</span>
                  <span className="text-foreground">{order.buyer_name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Sector</span>
                  <span className="text-foreground">{order.sector_name} × {order.quantity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total</span>
                  <span className="text-gradient-gold font-display font-bold">
                    {order.total_amount} {order.currency}
                  </span>
                </div>
              </div>
            )}
            <p className="text-muted-foreground font-body text-sm flex items-center justify-center gap-2">
              <Mail className="w-4 h-4" />
              A confirmation will be sent to {order?.email || "your email"}.
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-body font-semibold text-sm hover:opacity-90 transition-all"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
