ALTER TABLE public.catalog_items
ADD COLUMN IF NOT EXISTS reagent_name TEXT,
ADD COLUMN IF NOT EXISTS cost_per_test NUMERIC,
ADD COLUMN IF NOT EXISTS avg_ticket_price NUMERIC;
