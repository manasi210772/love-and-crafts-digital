-- Drop the existing SELECT policy
DROP POLICY IF EXISTS "Admins can view all subscriptions" ON public.newsletter_subscribers;

-- Create a more explicit SELECT policy that clearly restricts to admins only
CREATE POLICY "Only admins can view subscriptions" 
ON public.newsletter_subscribers
FOR SELECT 
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Add a comment to document the security intention
COMMENT ON POLICY "Only admins can view subscriptions" ON public.newsletter_subscribers IS 
'Restricts SELECT access to admin users only. Regular users cannot view any email addresses in the newsletter_subscribers table, preventing email harvesting and spam attacks.';