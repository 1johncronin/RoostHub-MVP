-- Set up storage for listing media
INSERT INTO storage.buckets (id, name, public) VALUES ('listing-media', 'listing-media', true) ON CONFLICT (id) DO NOTHING;

-- Storage Policies
CREATE POLICY "Listing media is publicly accessible." ON storage.objects FOR SELECT USING (bucket_id = 'listing-media');

CREATE POLICY "Authenticated users can upload listing media." ON storage.objects FOR INSERT 
WITH CHECK (
    bucket_id = 'listing-media' AND 
    auth.role() = 'authenticated'
);

-- Allow users to update and delete their own files
CREATE POLICY "Users can update own listing media." ON storage.objects FOR UPDATE
USING (bucket_id = 'listing-media' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete own listing media." ON storage.objects FOR DELETE
USING (bucket_id = 'listing-media' AND auth.uid()::text = (storage.foldername(name))[1]);