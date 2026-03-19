-- Create leads table for Atendimento Consultivo
CREATE TABLE IF NOT EXISTS public.leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    city TEXT NOT NULL,
    interest TEXT NOT NULL,
    segment TEXT,
    equipment_type TEXT,
    reagent_type TEXT,
    equipment_model TEXT,
    volume TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Policies for leads table
DROP POLICY IF EXISTS "auth_all_leads" ON public.leads;
CREATE POLICY "auth_all_leads" ON public.leads 
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "public_insert_leads" ON public.leads;
CREATE POLICY "public_insert_leads" ON public.leads 
  FOR INSERT TO public WITH CHECK (true);

-- Ensure site_content default keys exist
INSERT INTO public.site_content (key, value) VALUES
  ('address', 'Av. Menino Marcelo, 1234 - Serraria, Maceió - AL, CEP: 57000-000'),
  ('phone_general', '(82) 3000-0000'),
  ('phone_whatsapp', '(82) 99999-9999'),
  ('faq_items', '[{"question":"Qual o prazo médio de entrega?","answer":"Para Maceió e região, entregas em 24h. Restante do Nordeste de 2 a 5 dias úteis."},{"question":"Vocês realizam a instalação e treinamento?","answer":"Sim! Todos os equipamentos incluem entrega técnica, instalação e treinamento."}]')
ON CONFLICT (key) DO NOTHING;
