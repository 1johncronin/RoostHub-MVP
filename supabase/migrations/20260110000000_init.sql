-- ENUMS
CREATE TYPE user_role AS ENUM ('user', 'dealer', 'admin');
CREATE TYPE verification_level AS ENUM ('basic', 'verified', 'dealer');
CREATE TYPE listing_type AS ENUM ('machine', 'part', 'gear');
CREATE TYPE listing_status AS ENUM ('draft', 'active', 'sold', 'archived');
CREATE TYPE condition_grade AS ENUM ('new', 'excellent', 'good', 'fair', 'salvage');

-- TABLES

-- Profiles (Extends Supabase Auth)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  role user_role DEFAULT 'user',
  verification_level verification_level DEFAULT 'basic',
  email_verified_at TIMESTAMPTZ,
  phone_verified_at TIMESTAMPTZ,
  stripe_customer_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Listings (Base table for all items)
CREATE TABLE listings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  seller_id UUID REFERENCES profiles(id) NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  price NUMERIC(10, 2) NOT NULL,
  currency TEXT DEFAULT 'USD',
  type listing_type NOT NULL,
  status listing_status DEFAULT 'draft',
  location_lat FLOAT,
  location_lng FLOAT,
  location_name TEXT,
  is_featured BOOLEAN DEFAULT FALSE,
  featured_until TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Machines (Specific specs, 1:1 with listings)
CREATE TABLE machines (
  listing_id UUID REFERENCES listings(id) PRIMARY KEY,
  year INT NOT NULL,
  make TEXT NOT NULL,
  model TEXT NOT NULL,
  category TEXT, -- e.g., 'Motocross', 'Enduro'
  hours FLOAT,
  mileage FLOAT,
  vin TEXT,
  title_status TEXT,
  condition condition_grade
);

-- Parts (Specific specs, 1:1 with listings)
CREATE TABLE parts (
  listing_id UUID REFERENCES listings(id) PRIMARY KEY,
  part_number TEXT,
  condition condition_grade,
  fitment_notes TEXT
);

-- Media (Photos/Videos for listings)
CREATE TABLE listing_media (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  listing_id UUID REFERENCES listings(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  media_type TEXT NOT NULL, -- 'image' or 'video'
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Social: Posts (Standard feed items & DJ Booth outputs)
CREATE TABLE posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  author_id UUID REFERENCES profiles(id) NOT NULL,
  media_url TEXT NOT NULL,
  thumbnail_url TEXT,
  caption TEXT,
  post_type TEXT DEFAULT 'standard', -- 'standard', 'dj_reel', 'listing_share'
  linked_listing_id UUID REFERENCES listings(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Interactions
CREATE TABLE likes (
  user_id UUID REFERENCES profiles(id),
  post_id UUID REFERENCES posts(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, post_id)
);

CREATE TABLE comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id),
  post_id UUID REFERENCES posts(id),
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE follows (
  follower_id UUID REFERENCES profiles(id),
  following_id UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (follower_id, following_id)
);

-- Payments
CREATE TABLE listing_promotions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  listing_id UUID REFERENCES listings(id),
  stripe_checkout_session_id TEXT,
  amount_paid NUMERIC,
  promotion_type TEXT, -- 'featured', 'bump'
  start_time TIMESTAMPTZ,
  end_time TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS POLICIES (Simplified for MVP setup)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE machines ENABLE ROW LEVEL SECURITY;
ALTER TABLE parts ENABLE ROW LEVEL SECURITY;
ALTER TABLE listing_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE follows ENABLE ROW LEVEL SECURITY;
ALTER TABLE listing_promotions ENABLE ROW LEVEL SECURITY;

-- Profiles: Public read, User update
CREATE POLICY "Public profiles are viewable by everyone." ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile." ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile." ON profiles FOR UPDATE USING (auth.uid() = id);

-- Listings: Public read (active), Owner update
CREATE POLICY "Listings are viewable by everyone." ON listings FOR SELECT USING (status = 'active' OR auth.uid() = seller_id);

CREATE POLICY "Verified users can insert listings." ON listings FOR INSERT WITH CHECK (
  auth.uid() = seller_id AND 
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = auth.uid() 
    AND verification_level IN ('verified', 'dealer')
    AND email_verified_at IS NOT NULL
    AND phone_verified_at IS NOT NULL
  )
);

CREATE POLICY "Users can update own listings." ON listings FOR UPDATE USING (auth.uid() = seller_id);

