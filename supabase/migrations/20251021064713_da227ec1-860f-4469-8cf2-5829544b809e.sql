-- Add UPDATE policy for orders - only admins can update order status
CREATE POLICY "Only admins can update orders"
ON public.orders
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Add DELETE policy for orders - prevent deletion entirely for data integrity
CREATE POLICY "Prevent order deletion"
ON public.orders
FOR DELETE
USING (false);