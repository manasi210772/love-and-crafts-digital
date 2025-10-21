-- Ensure RLS is enabled on profiles table (should already be enabled, but verify)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Add INSERT policy for order_items to prevent price manipulation
-- Only allow inserting order items for orders that belong to the authenticated user
CREATE POLICY "Users can insert items only for own orders"
ON public.order_items
FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1
    FROM public.orders
    WHERE orders.id = order_items.order_id
    AND orders.user_id = auth.uid()
  )
);

-- Add UPDATE policy for order_items to prevent tampering (defensive)
CREATE POLICY "Prevent order item updates"
ON public.order_items
FOR UPDATE
USING (false);

-- Add DELETE policy for order_items to prevent unauthorized deletion
CREATE POLICY "Prevent order item deletion"
ON public.order_items
FOR DELETE
USING (false);