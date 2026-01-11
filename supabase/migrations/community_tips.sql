-- Community Tips Table
-- Run this in your Supabase SQL editor to create the community_tips table

CREATE TABLE IF NOT EXISTS community_tips (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  category TEXT NOT NULL,
  tip TEXT NOT NULL CHECK (char_length(tip) >= 20 AND char_length(tip) <= 500),
  author_note TEXT DEFAULT 'Anonymous Rider',
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE community_tips ENABLE ROW LEVEL SECURITY;

-- Anyone can read approved tips
CREATE POLICY "Anyone can read approved tips"
  ON community_tips FOR SELECT
  USING (status = 'approved');

-- Authenticated users can insert tips
CREATE POLICY "Authenticated users can insert tips"
  ON community_tips FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Allow anonymous tip submissions (optional - remove if you want auth required)
CREATE POLICY "Anonymous users can insert tips"
  ON community_tips FOR INSERT
  TO anon
  WITH CHECK (user_id IS NULL);

-- Users can see their own pending tips
CREATE POLICY "Users can see their own tips"
  ON community_tips FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- Create index for faster queries
CREATE INDEX idx_community_tips_status ON community_tips(status);
CREATE INDEX idx_community_tips_category ON community_tips(category);
CREATE INDEX idx_community_tips_created_at ON community_tips(created_at DESC);

-- Add is_admin column to profiles if not exists
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS is_admin BOOLEAN DEFAULT false;
