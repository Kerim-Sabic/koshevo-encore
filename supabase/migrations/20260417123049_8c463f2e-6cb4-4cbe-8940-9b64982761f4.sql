
ALTER TABLE public.sectors ADD COLUMN IF NOT EXISTS paddle_price_id text;
ALTER TABLE public.sectors ADD COLUMN IF NOT EXISTS sold_count integer NOT NULL DEFAULT 0;
ALTER TABLE public.sectors ADD COLUMN IF NOT EXISTS capacity integer;

ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS paddle_transaction_id text UNIQUE;

UPDATE public.sectors SET paddle_price_id = 'ticket_fan_pit_eur' WHERE id = 'fan-pit';
UPDATE public.sectors SET paddle_price_id = 'ticket_istok_eur' WHERE id = 'istok';
UPDATE public.sectors SET paddle_price_id = 'ticket_zapad_eur' WHERE id = 'zapad';
UPDATE public.sectors SET paddle_price_id = 'ticket_parter_2_eur' WHERE id = 'parter-2';
UPDATE public.sectors SET paddle_price_id = 'ticket_parter_1_eur' WHERE id = 'parter-1';
UPDATE public.sectors SET paddle_price_id = 'ticket_giveaway_entry_eur' WHERE id = 'entry_giveaway';

CREATE INDEX IF NOT EXISTS idx_orders_paddle_tx ON public.orders(paddle_transaction_id);
