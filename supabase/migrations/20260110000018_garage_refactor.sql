-- 1. Decouple Machines from Listings: Add standalone Garage Machines
CREATE TABLE garage_machines (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  owner_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  year INT NOT NULL,
  make TEXT NOT NULL,
  model TEXT NOT NULL,
  category TEXT,
  hours FLOAT DEFAULT 0,
  mileage FLOAT DEFAULT 0,
  vin TEXT,
  avatar_url TEXT, -- Machine specific photo
  is_for_sale BOOLEAN DEFAULT FALSE,
  listing_id UUID REFERENCES listings(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Groq AI Garage Assistant: Conversations
CREATE TABLE garage_ai_chats (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  machine_id UUID REFERENCES garage_machines(id) ON DELETE CASCADE,
  role TEXT NOT NULL, -- 'user' or 'assistant'
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Roost Garage Dreams: Subscriptions
CREATE TABLE garage_dreams (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  dream_make TEXT,
  dream_model TEXT,
  min_year INT,
  max_price NUMERIC,
  geo_radius_km INT DEFAULT 100,
  lat FLOAT,
  lng FLOAT,
  is_notified BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS
ALTER TABLE garage_machines ENABLE ROW LEVEL SECURITY;
ALTER TABLE garage_ai_chats ENABLE ROW LEVEL SECURITY;
ALTER TABLE garage_dreams ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own garage machines." ON garage_machines FOR ALL USING (auth.uid() = owner_id);
CREATE POLICY "Users can view own AI chats." ON garage_ai_chats FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can send AI messages." ON garage_ai_chats FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can manage own dreams." ON garage_dreams FOR ALL USING (auth.uid() = user_id);
