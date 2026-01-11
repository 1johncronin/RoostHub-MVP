-- Set up storage for listing media
-- Note: Create 'listing-media' bucket in dashboard first or use this SQL
INSERT INTO storage.buckets (id, name, public) VALUES ('listing-media', 'listing-media', true) ON CONFLICT DO NOTHING;

-- Storage Policies
CREATE POLICY "Listing media is publicly accessible." ON storage.objects FOR SELECT USING (bucket_id = 'listing-media');

CREATE POLICY "Authenticated users can upload listing media." ON storage.objects FOR INSERT 
WITH CHECK (
    bucket_id = 'listing-media' AND 
    auth.role() = 'authenticated'
);

CREATE POLICY "Users can delete own listing media." ON storage.objects FOR DELETE
USING (
    bucket_id = 'listing-media' AND 
    (storage.foldername(name))[1] = auth.uid()::text
);
