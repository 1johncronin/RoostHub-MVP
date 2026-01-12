-- Add SELECT policies for related tables that are missing them
-- These tables have INSERT policies but no SELECT policies, blocking reads

-- Machines: Public read (via listing join)
DROP POLICY IF EXISTS "Machines are viewable by everyone." ON machines;
CREATE POLICY "Machines are viewable by everyone." ON machines FOR SELECT USING (true);

-- Parts: Public read
DROP POLICY IF EXISTS "Parts are viewable by everyone." ON parts;
CREATE POLICY "Parts are viewable by everyone." ON parts FOR SELECT USING (true);

-- Listing Media: Public read
DROP POLICY IF EXISTS "Listing media is viewable by everyone." ON listing_media;
CREATE POLICY "Listing media is viewable by everyone." ON listing_media FOR SELECT USING (true);

-- Storage Spaces: Public read
DROP POLICY IF EXISTS "Storage spaces are viewable by everyone." ON storage_spaces;
CREATE POLICY "Storage spaces are viewable by everyone." ON storage_spaces FOR SELECT USING (true);
