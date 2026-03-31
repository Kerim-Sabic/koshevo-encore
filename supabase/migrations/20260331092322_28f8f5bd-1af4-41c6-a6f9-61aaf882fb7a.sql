
-- Create sectors table for managing ticket prices
CREATE TABLE public.sectors (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  price NUMERIC NOT NULL,
  description TEXT NOT NULL,
  badge TEXT,
  available BOOLEAN NOT NULL DEFAULT true,
  max_per_order INTEGER NOT NULL DEFAULT 10,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.sectors ENABLE ROW LEVEL SECURITY;

-- Anyone can read sectors (public pricing)
CREATE POLICY "Sectors are publicly readable" ON public.sectors FOR SELECT USING (true);

-- Only admins can modify sectors
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role
  )
$$;

-- Admin policies for sectors
CREATE POLICY "Admins can update sectors" ON public.sectors FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can insert sectors" ON public.sectors FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Users can read their own roles
CREATE POLICY "Users can read own roles" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);

-- Seed initial sector data
INSERT INTO public.sectors (id, name, price, description, badge, available, max_per_order) VALUES
  ('fan-pit', 'Fan Pit', 75, 'Closest to the stage. Standing zone with unmatched energy and direct artist proximity.', 'Premium', true, 6),
  ('istok', 'Istok', 55, 'East tribune seating with excellent panoramic stage views and elevated comfort.', NULL, true, 8),
  ('zapad', 'Zapad', 55, 'West tribune seating with prime sightlines and premium atmosphere.', 'Popular', true, 8),
  ('parter-2', 'Parter 2', 45, 'Central floor standing area behind Fan Pit. Great views, vibrant crowd energy.', NULL, true, 10),
  ('parter-1', 'Parter 1', 35, 'Floor standing with full stage visibility. Ideal balance of value and experience.', 'Best Value', true, 10);

-- Timestamp trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_sectors_updated_at BEFORE UPDATE ON public.sectors FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
