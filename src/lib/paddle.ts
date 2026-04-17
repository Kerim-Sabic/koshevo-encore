import { supabase } from "@/integrations/supabase/client";

const clientToken = import.meta.env.VITE_PAYMENTS_CLIENT_TOKEN;

declare global {
  interface Window {
    Paddle: any;
  }
}

let paddleInitialized = false;
let paddleInitPromise: Promise<void> | null = null;

export function getPaymentsEnvironment(): "sandbox" | "live" {
  return clientToken?.startsWith("test_") ? "sandbox" : "live";
}

export async function initializePaddle(): Promise<void> {
  if (paddleInitialized) return;
  if (paddleInitPromise) return paddleInitPromise;

  if (!clientToken) {
    throw new Error("Payments client token is not configured");
  }

  paddleInitPromise = new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>('script[data-paddle-sdk="true"]');
    const onReady = () => {
      try {
        const env = clientToken.startsWith("test_") ? "sandbox" : "production";
        window.Paddle.Environment.set(env);
        window.Paddle.Initialize({ token: clientToken });
        paddleInitialized = true;
        resolve();
      } catch (e) {
        reject(e);
      }
    };
    if (existing && window.Paddle) return onReady();
    const script = existing ?? document.createElement("script");
    script.src = "https://cdn.paddle.com/paddle/v2/paddle.js";
    script.dataset.paddleSdk = "true";
    script.onload = onReady;
    script.onerror = () => reject(new Error("Failed to load payments SDK"));
    if (!existing) document.head.appendChild(script);
  });

  return paddleInitPromise;
}

const priceIdCache = new Map<string, string>();

export async function getPaddlePriceId(priceId: string): Promise<string> {
  if (priceIdCache.has(priceId)) return priceIdCache.get(priceId)!;

  const { data, error } = await supabase.functions.invoke("get-paddle-price", {
    body: { priceId, environment: getPaymentsEnvironment() },
  });
  if (error || !data?.paddleId) {
    throw new Error(`Failed to resolve price: ${priceId}`);
  }
  priceIdCache.set(priceId, data.paddleId);
  return data.paddleId;
}
