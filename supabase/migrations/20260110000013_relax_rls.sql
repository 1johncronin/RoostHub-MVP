-- Relax RLS for MVP testing: Allow verified email users to list
DROP POLICY IF EXISTS "Verified email users can insert listings." ON listings;
CREATE POLICY "Verified email users can insert listings." ON listings FOR INSERT WITH CHECK (
  auth.uid() = seller_id AND 
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = auth.uid() 
    AND email_verified_at IS NOT NULL
  )
);
