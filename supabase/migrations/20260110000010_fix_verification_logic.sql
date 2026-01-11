-- 1. Improve the user trigger to sync email verification status
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, username, full_name, avatar_url, email_verified_at)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'username', lower(split_part(new.email, '@', 1)) || floor(random() * 1000)::text),
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url',
    new.email_confirmed_at
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Relax RLS slightly for MVP testing: Allow verified email users to list
DROP POLICY IF EXISTS "Verified users can insert listings." ON listings;
CREATE POLICY "Verified email users can insert listings." ON listings FOR INSERT WITH CHECK (
  auth.uid() = seller_id AND 
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = auth.uid() 
    AND email_verified_at IS NOT NULL
  )
);
