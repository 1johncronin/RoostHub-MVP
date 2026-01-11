-- 1. Finalize Listings Policy (Relaxed for MVP)
DROP POLICY IF EXISTS "Verified email users can insert listings." ON listings;
CREATE POLICY "Users can insert own listings." ON listings FOR INSERT WITH CHECK (auth.uid() = seller_id);

-- 2. Add Machine Policies
DROP POLICY IF EXISTS "Users can insert own machine details." ON machines;
CREATE POLICY "Users can insert own machine details." ON machines FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM listings 
    WHERE id = machines.listing_id 
    AND seller_id = auth.uid()
  )
);

-- 3. Add Parts Policies
DROP POLICY IF EXISTS "Users can insert own parts details." ON parts;
CREATE POLICY "Users can insert own parts details." ON parts FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM listings 
    WHERE id = parts.listing_id 
    AND seller_id = auth.uid()
  )
);

-- 4. Add Listing Media Policies
DROP POLICY IF EXISTS "Users can insert own listing media." ON listing_media;
CREATE POLICY "Users can insert own listing media." ON listing_media FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM listings 
    WHERE id = listing_media.listing_id 
    AND seller_id = auth.uid()
  )
);

-- 5. Add Storage Spaces Policies
DROP POLICY IF EXISTS "Users can insert own storage spaces." ON storage_spaces;
CREATE POLICY "Users can insert own storage spaces." ON storage_spaces FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM listings 
    WHERE id = storage_spaces.listing_id 
    AND seller_id = auth.uid()
  )
);
