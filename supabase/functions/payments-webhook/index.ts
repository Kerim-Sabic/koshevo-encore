import { createClient } from "npm:@supabase/supabase-js@2";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { type PaddleEnv, EventName, verifyWebhook } from "../_shared/paddle.ts";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
);

serve(async (req) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const url = new URL(req.url);
  const env = (url.searchParams.get("env") || "sandbox") as PaddleEnv;

  try {
    const event: any = await verifyWebhook(req, env);
    console.log("Received event:", event.eventType, "env:", env);

    switch (event.eventType) {
      case EventName.TransactionCompleted:
        await handleTransactionCompleted(event.data);
        break;
      case EventName.TransactionPaymentFailed:
        console.log("Payment failed:", event.data.id);
        break;
      default:
        console.log("Unhandled event:", event.eventType);
    }

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("Webhook error:", e);
    return new Response("Webhook error", { status: 400 });
  }
});

async function handleTransactionCompleted(data: any) {
  const txId = data.id as string;

  // Idempotency: if order already exists for this transaction, skip
  const { data: existing } = await supabase
    .from("orders")
    .select("id")
    .eq("paddle_transaction_id", txId)
    .maybeSingle();
  if (existing) {
    console.log("Order already exists for tx:", txId);
    return;
  }

  const customData = data.customData || {};
  const item = data.items?.[0] || {};
  const priceExternalId =
    item.price?.importMeta?.externalId || customData.priceExternalId || "";
  const quantity = item.quantity || 1;

  // Look up sector by paddle_price_id
  let sectorName = customData.sectorName || "Unknown";
  let sectorId: string | null = null;
  if (priceExternalId) {
    const { data: sector } = await supabase
      .from("sectors")
      .select("id, name")
      .eq("paddle_price_id", priceExternalId)
      .maybeSingle();
    if (sector) {
      sectorId = sector.id;
      sectorName = sector.name;
    }
  }

  const totalAmount = (data.details?.totals?.total || data.payments?.[0]?.amount || 0) / 100;
  const currency = (data.currencyCode || "EUR").toUpperCase();
  const orderNumber = `KSV-${Date.now().toString(36).toUpperCase()}`;

  const buyerName = customData.buyerName || "Customer";
  const email = data.customer?.email || customData.email || "";
  const phone = customData.phone || "";

  const { error: insertErr } = await supabase.from("orders").insert({
    order_number: orderNumber,
    buyer_name: buyerName,
    email,
    phone,
    sector_name: sectorName,
    quantity,
    total_amount: totalAmount,
    currency,
    paddle_transaction_id: txId,
    status: "completed",
    note: customData.note || null,
    promo_code: customData.promoCode || null,
  });

  if (insertErr) {
    console.error("Failed to insert order:", insertErr);
    throw insertErr;
  }

  // Decrement sector availability (sold_count)
  if (sectorId) {
    const { data: current } = await supabase
      .from("sectors")
      .select("sold_count, capacity")
      .eq("id", sectorId)
      .maybeSingle();
    if (current) {
      const newSold = (current.sold_count || 0) + quantity;
      const updates: Record<string, any> = { sold_count: newSold };
      if (current.capacity && newSold >= current.capacity) {
        updates.available = false;
      }
      await supabase.from("sectors").update(updates).eq("id", sectorId);
    }
  }

  console.log("Order created:", orderNumber, "tx:", txId);
}
