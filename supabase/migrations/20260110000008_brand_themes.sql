-- Add brand theme to profiles
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS theme_brand TEXT DEFAULT 'roosthub';

-- Update RLS logic to allow users to set their theme
-- (Existing profile update policy already handles this)
