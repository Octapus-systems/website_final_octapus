CREATE SCHEMA IF NOT EXISTS private;
REVOKE ALL ON SCHEMA private FROM PUBLIC, anon, authenticated;

CREATE OR REPLACE FUNCTION private.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  select exists (select 1 from public.user_roles where user_id = _user_id and role = _role)
$$;
REVOKE ALL ON FUNCTION private.has_role(uuid, public.app_role) FROM PUBLIC, anon, authenticated;

DROP POLICY "Admins manage roles" ON public.user_roles;
CREATE POLICY "Admins manage roles" ON public.user_roles FOR ALL TO authenticated
  USING (private.has_role(auth.uid(), 'admin')) WITH CHECK (private.has_role(auth.uid(), 'admin'));

DROP POLICY "Editors manage posts" ON public.posts;
CREATE POLICY "Editors manage posts" ON public.posts FOR ALL TO authenticated
  USING (private.has_role(auth.uid(), 'admin') OR private.has_role(auth.uid(), 'editor'))
  WITH CHECK (private.has_role(auth.uid(), 'admin') OR private.has_role(auth.uid(), 'editor'));

DROP POLICY "Authenticated can read published posts" ON public.posts;
CREATE POLICY "Authenticated can read published posts" ON public.posts FOR SELECT TO authenticated
  USING (status = 'published' OR private.has_role(auth.uid(), 'admin') OR private.has_role(auth.uid(), 'editor'));

DROP POLICY "Admins delete leads" ON public.leads;
CREATE POLICY "Admins delete leads" ON public.leads FOR DELETE TO authenticated
  USING (private.has_role(auth.uid(), 'admin'));

DROP POLICY "Admins update leads" ON public.leads;
CREATE POLICY "Admins update leads" ON public.leads FOR UPDATE TO authenticated
  USING (private.has_role(auth.uid(), 'admin') OR private.has_role(auth.uid(), 'editor'))
  WITH CHECK (private.has_role(auth.uid(), 'admin') OR private.has_role(auth.uid(), 'editor'));

DROP POLICY "Admins read leads" ON public.leads;
CREATE POLICY "Admins read leads" ON public.leads FOR SELECT TO authenticated
  USING (private.has_role(auth.uid(), 'admin') OR private.has_role(auth.uid(), 'editor'));

DROP POLICY "Editors manage site content" ON public.site_content;
CREATE POLICY "Editors manage site content" ON public.site_content FOR ALL TO authenticated
  USING (private.has_role(auth.uid(), 'admin') OR private.has_role(auth.uid(), 'editor'))
  WITH CHECK (private.has_role(auth.uid(), 'admin') OR private.has_role(auth.uid(), 'editor'));

DROP FUNCTION IF EXISTS public.has_role(uuid, public.app_role);