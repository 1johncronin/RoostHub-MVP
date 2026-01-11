-- Saved Searches for Alerts
CREATE TABLE saved_searches (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) NOT NULL,
  search_query TEXT,
  filter_type TEXT, -- machine, part, etc.
  filter_make TEXT,
  filter_model TEXT,
  last_checked_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE saved_searches ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own saved searches." ON saved_searches FOR ALL USING (auth.uid() = user_id);
