CREATE TABLE IF NOT EXISTS public.showcase_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    image_url TEXT,
    title TEXT NOT NULL,
    description TEXT,
    label TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.catalog_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    value TEXT,
    provider TEXT,
    folder_url TEXT,
    payment_conditions TEXT,
    recommendation_tags TEXT,
    image_url TEXT,
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- RLS Configuration
ALTER TABLE public.showcase_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.catalog_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public_select_showcase" ON public.showcase_items FOR SELECT TO public USING (true);
CREATE POLICY "auth_insert_showcase" ON public.showcase_items FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "auth_update_showcase" ON public.showcase_items FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "auth_delete_showcase" ON public.showcase_items FOR DELETE TO authenticated USING (true);

CREATE POLICY "public_select_catalog" ON public.catalog_items FOR SELECT TO public USING (true);
CREATE POLICY "auth_insert_catalog" ON public.catalog_items FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "auth_update_catalog" ON public.catalog_items FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "auth_delete_catalog" ON public.catalog_items FOR DELETE TO authenticated USING (true);

-- Seed user and data
DO $$
DECLARE
  new_user_id uuid := gen_random_uuid();
BEGIN
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'admin@example.com') THEN
    INSERT INTO auth.users (
      id, instance_id, email, encrypted_password, email_confirmed_at,
      created_at, updated_at, raw_app_meta_data, raw_user_meta_data,
      is_super_admin, role, aud,
      confirmation_token, recovery_token, email_change_token_new,
      email_change, email_change_token_current,
      phone, phone_change, phone_change_token, reauthentication_token
    ) VALUES (
      new_user_id,
      '00000000-0000-0000-0000-000000000000',
      'admin@example.com',
      crypt('admin123', gen_salt('bf')),
      NOW(), NOW(), NOW(),
      '{"provider": "email", "providers": ["email"]}',
      '{"name": "Admin"}',
      false, 'authenticated', 'authenticated',
      '', '', '', '', '', NULL, '', '', ''
    );
  END IF;
END $$;

INSERT INTO public.showcase_items (title, description, image_url, label) VALUES 
('Analisador Bioquímico BS-200', 'Equipamento semi-novo, totalmente revisado com garantia de 6 meses.', 'https://img.usecurling.com/p/400/300?q=laboratory%20machine', 'Última Unidade'),
('Reagentes Hematologia', 'Kit completo de reagentes para linha Sysmex com vencimento em 45 dias.', 'https://img.usecurling.com/p/400/300?q=medical%20vials', 'Validade Curta - 40% OFF');

INSERT INTO public.catalog_items (name, value, provider, folder_url, payment_conditions, recommendation_tags, image_url, description) VALUES
('Mindray BC-3000 Plus', 'Sob Consulta', 'Mindray', '#', 'Até 24x sem juros', 'Humano, Hematologia, Até 50, 51 a 200', 'https://img.usecurling.com/p/400/300?q=medical%20machine', 'Analisador hematológico automatizado ideal para laboratórios de pequeno porte.');
