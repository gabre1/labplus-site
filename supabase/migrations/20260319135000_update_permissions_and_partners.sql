-- Fix permissions to resolve 42501 Permission Denied errors
GRANT USAGE ON SCHEMA public TO anon, authenticated;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.showcase_items TO authenticated, anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.catalog_items TO authenticated, anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.site_content TO authenticated, anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.leads TO authenticated, anon;

-- Update the default CTA text
UPDATE public.site_content SET value = 'Atendimento Consultivo' WHERE key = 'nav_btn_diagnostic';

-- Add the lead_recipient_email setting
INSERT INTO public.site_content (key, value)
VALUES ('lead_recipient_email', 'contato@labplus.com.br')
ON CONFLICT (key) DO NOTHING;

-- Create Partners table
CREATE TABLE IF NOT EXISTS public.partners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  logo_url TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS and setup policies for partners
ALTER TABLE public.partners ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public_select_partners" ON public.partners
  FOR SELECT TO public USING (true);

CREATE POLICY "auth_all_partners" ON public.partners
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.partners TO authenticated, anon;

-- Seed some initial partners
INSERT INTO public.partners (name, logo_url) VALUES 
('Roche', 'https://img.usecurling.com/i?q=roche&color=blue&shape=solid-black'),
('Mindray', 'https://img.usecurling.com/i?q=mindray&color=red&shape=solid-black'),
('Sysmex', 'https://img.usecurling.com/i?q=sysmex&color=black&shape=solid-black');
