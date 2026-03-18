CREATE TABLE IF NOT EXISTS public.site_content (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    key TEXT UNIQUE NOT NULL,
    value TEXT,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "public_select_site_content" ON public.site_content FOR SELECT TO public USING (true);
CREATE POLICY "auth_all_site_content" ON public.site_content FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Seed Initial Data
INSERT INTO public.site_content (key, value) VALUES
('logo_url', 'https://img.usecurling.com/i?q=labplus&color=blue&shape=outline'),
('hero_title', 'Excelência em Diagnóstico e Suporte Laboratorial'),
('hero_description', 'Equipamentos de ponta, insumos de alta qualidade e assistência técnica especializada para garantir a máxima eficiência do seu laboratório.'),
('about_text', 'A Labplus Diagnóstica nasceu com o propósito de elevar o padrão do suporte laboratorial. Localizados estrategicamente em Maceió, Alagoas, garantimos agilidade logística incomparável.'),
('contact_email', 'contato@labplus.com.br'),
('contact_phone', '(82) 3000-0000 / (82) 99999-9999')
ON CONFLICT (key) DO NOTHING;
