-- DJ Booth: Render Jobs
CREATE TABLE render_jobs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) NOT NULL,
  template_id TEXT NOT NULL,
  status TEXT DEFAULT 'pending', -- pending, processing, completed, failed
  input_assets JSONB, -- Array of paths in storage
  output_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS for Render Jobs
ALTER TABLE render_jobs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own render jobs." ON render_jobs FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own render jobs." ON render_jobs FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Storage Buckets (Note: Bucket creation is usually done via API/Dashboard in Supabase, 
-- but we can insert into storage.buckets if using the local stack or sql editor with permissions)
-- For this migration, we'll assume buckets 'dj-raw' and 'dj-output' are created manually or via seed.
-- We will add RLS for storage objects though.

-- Policy for DJ Raw Uploads
-- bucket_id = 'dj-raw'
-- CREATE POLICY "Users can upload own DJ assets" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'dj-raw' AND auth.uid() = owner);
-- CREATE POLICY "Users can read own DJ assets" ON storage.objects FOR SELECT USING (bucket_id = 'dj-raw' AND auth.uid() = owner);
