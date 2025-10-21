-- Ensure RLS is enabled on profiles table
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Check if INSERT policy exists, if not create it
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'order_items' 
    AND policyname = 'Users can insert items only for own orders'
  ) THEN
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
  END IF;
END $$;

-- Add UPDATE policy if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'order_items' 
    AND policyname = 'Prevent order item updates'
  ) THEN
    CREATE POLICY "Prevent order item updates"
    ON public.order_items
    FOR UPDATE
    USING (false);
  END IF;
END $$;

-- Add DELETE policy if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'order_items' 
    AND policyname = 'Prevent order item deletion'
  ) THEN
    CREATE POLICY "Prevent order item deletion"
    ON public.order_items
    FOR DELETE
    USING (false);
  END IF;
END $$;