import { createClient } from "npm:@supabase/supabase-js@2";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { type StripeEnv, verifyWebhook } from "../_shared/stripe.ts";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
);

serve(async (req) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const url = new URL(req.url);
  const env = (url.searchParams.get('env') || 'sandbox') as StripeEnv;

  try {
    const event = await verifyWebhook(req, env);
    console.log("Received event:", event.type, "env:", env);

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const metadata = session.metadata || {};
      const orderNumber = `KSV-${Date.now().toString(36).toUpperCase()}`;

      await supabase.from("orders").insert({
        order_number: orderNumber,
        buyer_name: metadata.buyerName || 'Unknown',
        email: session.customer_email || metadata.email || '',
        phone: metadata.phone || '',
        sector_name: metadata.sectorName || '',
        quantity: parseInt(metadata.quantity || '1'),
        total_amount: (session.amount_total || 0) / 100,
        currency: (session.currency || 'bam').toUpperCase(),
        stripe_session_id: session.id,
        status: 'completed',
        note: metadata.note || null,
        promo_code: metadata.promoCode || null,
      });

      console.log("Order created:", orderNumber);
    }

    return new Response(JSON.stringify({ received: true }), {
      status: 200, headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("Webhook error:", e);
    return new Response("Webhook error", { status: 400 });
  }
});
