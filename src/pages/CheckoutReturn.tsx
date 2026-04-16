import { useSearchParams, Link } from "react-router-dom";
import { Check, ArrowLeft } from "lucide-react";
import { PaymentTestModeBanner } from "@/components/PaymentTestModeBanner";

export default function CheckoutReturn() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  return (
    <div className="min-h-screen bg-background">
      <PaymentTestModeBanner />
      <div className="container mx-auto px-4 py-20 max-w-lg text-center">
        {sessionId ? (
          <div className="space-y-6">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto">
              <Check className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl font-display font-bold text-foreground">Payment Complete!</h1>
            <p className="text-muted-foreground font-body">
              Your tickets have been confirmed. You'll receive a confirmation email shortly with your e-ticket and QR code.
            </p>
            <p className="text-xs text-muted-foreground font-body">Session: {sessionId}</p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-body font-semibold text-sm hover:opacity-90 transition-all"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            <h1 className="text-2xl font-display font-bold text-foreground">No session found</h1>
            <Link to="/" className="text-primary underline font-body">Return home</Link>
          </div>
        )}
      </div>
    </div>
  );
}
