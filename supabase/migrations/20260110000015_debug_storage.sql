-- PERMISSIVE STORAGE POLICIES FOR DEBUGGING
-- 1. Ensure bucket is definitely public
UPDATE storage.buckets SET public = true WHERE id = 'listing-media';

-- 2. Allow ALL authenticated users to do EVERYTHING in this bucket for now
DROP POLICY IF EXISTS "Authenticated users can upload listing media." ON storage.objects;
CREATE POLICY "Debug: Allow all uploads" ON storage.objects FOR INSERT 
TO authenticated
WITH CHECK (bucket_id = 'listing-media');

DROP POLICY IF EXISTS "Listing media is publicly accessible." ON storage.objects;
CREATE POLICY "Debug: Allow all selects" ON storage.objects FOR SELECT 
USING (bucket_id = 'listing-media');

DROP POLICY IF EXISTS "Users can update own listing media." ON storage.objects;
CREATE POLICY "Debug: Allow all updates" ON storage.objects FOR UPDATE 
TO authenticated
USING (bucket_id = 'listing-media');

DROP POLICY IF EXISTS "Users can delete own listing media." ON storage.objects;
CREATE POLICY "Debug: Allow all deletes" ON storage.objects FOR DELETE 
TO authenticated
USING (bucket_id = 'listing-media');
