-- Enhance Posts for Virality
ALTER TABLE posts ADD COLUMN IF NOT EXISTS metadata JSONB DEFAULT '{}'; 
-- Stores { price, location, brand, total_hours } snapshot for sharing

-- Add index for viral sharing
CREATE INDEX IF NOT EXISTS idx_posts_type ON posts(post_type);

-- Ensure listings can be linked to posts
-- (Already exists as linked_listing_id)
