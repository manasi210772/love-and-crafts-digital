-- Add explicit admin SELECT policies for better access control clarity

-- Orders: Allow admins to view all orders for order management
CREATE POLICY "Admins can view all orders" 
ON public.orders
FOR SELECT 
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Profiles: Allow admins to view all profiles for user management
CREATE POLICY "Admins can view all profiles" 
ON public.profiles
FOR SELECT 
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Cart items: Allow admins to view all cart items for analytics
CREATE POLICY "Admins can view all cart items" 
ON public.cart_items
FOR SELECT 
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Workshop registrations: Allow admins to view all registrations for management
CREATE POLICY "Admins can view all workshop registrations" 
ON public.workshop_registrations
FOR SELECT 
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Add comments for documentation
COMMENT ON POLICY "Admins can view all orders" ON public.orders IS 
'Allows admin users to view all orders for order management and reporting purposes.';

COMMENT ON POLICY "Admins can view all profiles" ON public.profiles IS 
'Allows admin users to view all user profiles for customer support and management.';

COMMENT ON POLICY "Admins can view all cart items" ON public.cart_items IS 
'Allows admin users to view all cart items for analytics and inventory management.';

COMMENT ON POLICY "Admins can view all workshop registrations" ON public.workshop_registrations IS 
'Allows admin users to view all workshop registrations for event management.';