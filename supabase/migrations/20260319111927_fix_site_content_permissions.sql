-- Grant usage on public schema to ensure roles can access tables
GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;

-- Grant explicit permissions to the table to prevent 403 Permission Denied
GRANT SELECT ON public.site_content TO anon;
GRANT ALL ON public.site_content TO authenticated;
GRANT ALL ON public.site_content TO service_role;

-- Ensure RLS is enabled on the site_content table
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

-- Safely drop existing policies to refresh them
DROP POLICY IF EXISTS "public_select_site_content" ON public.site_content;
DROP POLICY IF EXISTS "auth_all_site_content" ON public.site_content;

-- Active policy that allows the public (anon) role to SELECT data
CREATE POLICY "public_select_site_content" ON public.site_content 
  FOR SELECT TO public USING (true);

-- Active policy that allows the authenticated role to perform all operations
CREATE POLICY "auth_all_site_content" ON public.site_content 
  FOR ALL TO authenticated USING (true) WITH CHECK (true);
